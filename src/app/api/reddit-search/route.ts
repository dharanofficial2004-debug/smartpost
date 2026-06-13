import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// ── types ────────────────────────────────────────────────────────────────────

export interface RedditSearchPost {
  id: string;
  title: string;
  body: string;
  fullUrl: string;
  subreddit: string;
  upvotes: number;
  commentCount: number;
  createdAt: Date;
  timeAgo: string;
  author: string;
}

type DateRange = '24h' | '7d' | '30d' | '3m' | '6m';
type SortBy = 'new' | 'top' | 'comments';

// ── helpers ──────────────────────────────────────────────────────────────────

function mapTimeFilter(dateRange: DateRange): string {
  return { '24h': 'day', '7d': 'week', '30d': 'month', '3m': 'year', '6m': 'year' }[dateRange];
}

// Reddit only respects t= when sort=top or sort=relevance — NOT with sort=new.
// We use sort=relevance when a time filter is active so t= is honoured.
// For sort=new with no meaningful time filter we keep sort=new.
function effectiveSort(sortBy: SortBy, dateRange: DateRange): string {
  if (sortBy === 'new' && dateRange !== '6m') {
    // Force relevance so t= is respected; newest-first within window
    return 'relevance';
  }
  return { new: 'new', top: 'top', comments: 'top' }[sortBy];
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

function decodeXml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

// ── RSS fetcher (same working implementation as validate-idea route) ──────────

async function fetchSingleRSS(
  url: string,
): Promise<RedditSearchPost[]> {
  let xml = '';
  const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

  console.log(`\n[fetchSingleRSS] Fetching RSS URL: ${url}`);

  // 1. Try standard fetch first
  try {
    console.log(`[fetchSingleRSS] Attempting HTTP fetch...`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': ua,
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    });

    console.log(`[fetchSingleRSS] HTTP status: ${res.status} ${res.statusText}`);
    if (res.ok) {
      xml = await res.text();
      console.log(`[fetchSingleRSS] HTTP fetch succeeded, content length: ${xml.length} bytes`);
    } else {
      console.warn(`[fetchSingleRSS] HTTP fetch returned non-ok status. Trying curl fallback...`);
    }
  } catch (err: any) {
    console.error(`[fetchSingleRSS] HTTP fetch failed: ${err?.message || err}. Trying curl fallback...`);
  }

  // 2. Try curl fallback if standard fetch did not get the feed
  if (!xml || (!xml.includes('<feed') && !xml.includes('<rss'))) {
    try {
      console.log(`[fetchSingleRSS] Running curl command fallback...`);
      const { stdout } = await execAsync(`curl -s -L --max-time 8 -A "${ua}" "${url}"`, {
        maxBuffer: 1024 * 1024 * 10
      });
      xml = stdout;
      console.log(`[fetchSingleRSS] Curl command succeeded, content length: ${xml.length} bytes`);
    } catch (err: any) {
      console.error(`[fetchSingleRSS] Curl fallback failed:`, err?.message || err);
    }
  }

  if (!xml || (!xml.includes('<feed') && !xml.includes('<rss'))) {
    console.error(`[fetchSingleRSS] Failed to retrieve valid RSS/Atom feed content from URL: ${url}`);
    if (xml) {
      console.error(`[fetchSingleRSS] Content snippet received (first 300 chars):`, xml.slice(0, 300));
    }
    return [];
  }

  const posts: RedditSearchPost[] = [];
  const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);

  let parsedCount = 0;
  let skippedCount = 0;

  for (const match of entryMatches) {
    const block = match[1];

    const title = decodeXml(extractTag(block, 'title'));
    const linkAttrMatch = block.match(/<link[^>]+href="([^"]+)"/);
    const link = linkAttrMatch?.[1] ?? '';
    if (!title || !link) {
      skippedCount++;
      continue;
    }

    // Skip subreddit community entries — must be an actual post with /comments/
    if (!link.includes('/comments/')) {
      skippedCount++;
      continue;
    }
    if (title === '[deleted]' || title === '[removed]') {
      skippedCount++;
      continue;
    }

    const atomIdMatch = block.match(/<id>t3_([a-z0-9]+)<\/id>/);
    const linkIdMatch = link.match(/\/comments\/([a-z0-9]+)\//);
    const id = atomIdMatch?.[1] ?? linkIdMatch?.[1];
    if (!id) {
      skippedCount++;
      continue;
    }

    const rawContent = extractTag(block, 'content');
    const plainContent = decodeXml(rawContent)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Do NOT skip posts just because the body text is short/empty (e.g. link/image posts)
    const bodyText = plainContent || '';

    const categoryMatch = block.match(/<category[^>]+term="([^"]+)"/);
    const subredditFromLink = link.match(/reddit\.com\/r\/([^/]+)\//);
    const postSubreddit = categoryMatch?.[1] ?? subredditFromLink?.[1] ?? 'reddit';

    const authorMatch = block.match(/<name>([^<]+)<\/name>/);
    const author = authorMatch?.[1]?.replace('/u/', '') ?? 'unknown';

    const updatedMatch = block.match(/<updated>([^<]+)<\/updated>/) ??
                         block.match(/<published>([^<]+)<\/published>/);
    const createdAt = updatedMatch?.[1] ? new Date(updatedMatch[1]) : new Date();
    const fullUrl = link.replace(/\?.*$/, '');

    posts.push({
      id,
      title,
      body: bodyText.slice(0, 500),
      fullUrl,
      subreddit: postSubreddit,
      upvotes: 1, // Default to 1
      commentCount: 0, // Default to 0
      createdAt,
      timeAgo: timeAgo(createdAt),
      author,
    });
    parsedCount++;
  }

  console.log(`[fetchSingleRSS] Done. Parsed: ${parsedCount}, Skipped: ${skippedCount} entries.`);
  return posts;
}

// Fetch Reddit posts using the RSS search endpoint (highly reliable, no rate limits)
async function fetchRedditRSS(
  keyword: string,
  subreddits: string[],
  sortBy: SortBy,
  dateRange: DateRange,
): Promise<RedditSearchPost[]> {
  const t = mapTimeFilter(dateRange);
  const sort = effectiveSort(sortBy, dateRange);

  console.log(`\n--- [reddit-search] STARTING RSS SEARCH ---`);
  console.log(`[reddit-search] Keyword: "${keyword}"`);
  console.log(`[reddit-search] Subreddits: ${JSON.stringify(subreddits)}`);
  console.log(`[reddit-search] Sort: "${sort}", Time filter: "${t}"`);

  let urls: string[] = [];

  if (subreddits.length === 0) {
    const q = encodeURIComponent(keyword);
    urls = [`https://www.reddit.com/search.rss?q=${q}&sort=${sort}&t=${t}&limit=100`];
  } else {
    // Reddit RSS search supports OR logic inside queries
    const subredditFilter = subreddits.map(s => `subreddit:${s}`).join(' OR ');
    const q = encodeURIComponent(`${keyword} (${subredditFilter})`);
    urls = [`https://www.reddit.com/search.rss?q=${q}&sort=${sort}&t=${t}&limit=100`];
  }

  console.log(`[reddit-search] Formed search URLs:`, urls);

  const results = await Promise.all(urls.map(fetchSingleRSS));
  const seen = new Set<string>();
  const posts: RedditSearchPost[] = [];
  
  for (const batch of results) {
    for (const post of batch) {
      if (!seen.has(post.id)) {
        seen.add(post.id);
        posts.push(post);
      }
    }
  }

  console.log(`[reddit-search] Deduplicated total posts found: ${posts.length}`);
  console.log(`--- [reddit-search] END RSS SEARCH ---\n`);
  return posts;
}




// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const keyword: string = (body?.keyword ?? '').trim();
    const subredditRaw: string = (body?.subreddit ?? '').trim();
    const dateRange: DateRange = body?.dateRange ?? '30d';
    const sortBy: SortBy = body?.sortBy ?? 'new';

    if (!keyword || keyword.length < 2) {
      return NextResponse.json({ error: 'Please enter a keyword to search.' }, { status: 400 });
    }

    // Support comma-separated subreddits
    const subreddits = subredditRaw
      ? subredditRaw.split(',').map(s => s.trim()).filter(Boolean).slice(0, 5)
      : [];

    const posts = await fetchRedditRSS(keyword, subreddits, sortBy, dateRange);

    return NextResponse.json({ posts, total: posts.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[reddit-search]', msg);

    if (msg.includes('timeout') || msg.includes('AbortError')) {
      return NextResponse.json(
        { error: 'Reddit search timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

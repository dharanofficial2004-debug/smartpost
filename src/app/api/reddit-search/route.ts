import { NextRequest, NextResponse } from 'next/server';

// ── types ─────────────────────────────────────────────────────────────────────

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

type DateRange  = '24h' | '7d' | '30d' | '3m' | '6m';
type SortBy     = 'new' | 'top' | 'comments';

// ── helpers ───────────────────────────────────────────────────────────────────

// Reddit only honours t= with sort=relevance or sort=top, NOT sort=new
function buildParams(sortBy: SortBy, dateRange: DateRange): { sort: string; t: string } {
  const t = ({ '24h': 'day', '7d': 'week', '30d': 'month', '3m': 'year', '6m': 'year' } as Record<DateRange,string>)[dateRange];
  // force relevance so t= is always respected
  const sort = sortBy === 'top' ? 'top' : 'relevance';
  return { sort, t };
}

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  const d = Math.floor(s/86400);
  if (d < 30)  return `${d}d ago`;
  const mo = Math.floor(d/30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo/12)}y ago`;
}

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m?.[1]?.trim() ?? '';
}

function decodeXml(str: string): string {
  return str
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

// ── single RSS page fetch ─────────────────────────────────────────────────────

async function fetchRSSPage(url: string): Promise<{ posts: RedditSearchPost[]; nextCursor: string | null }> {
  console.log(`[reddit-search] GET ${url}`);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });

  if (!res.ok) {
    console.log(`[reddit-search] HTTP ${res.status}`);
    return { posts: [], nextCursor: null };
  }

  const xml = await res.text();
  const posts: RedditSearchPost[] = [];

  // Extract the "after" cursor from the feed id for next-page pagination
  // Reddit Atom feed includes it in <id> like: /search.rss?...&after=t3_xxxxx
  const afterMatch = xml.match(/after=(t3_[a-z0-9]+)/);
  const nextCursor = afterMatch?.[1] ?? null;

  const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);

  for (const match of entryMatches) {
    const block = match[1];

    const title = decodeXml(extractTag(block, 'title'));
    const linkAttrMatch = block.match(/<link[^>]+href="([^"]+)"/);
    const link = linkAttrMatch?.[1] ?? '';
    if (!title || !link || !link.includes('/comments/')) continue;
    if (title === '[deleted]' || title === '[removed]') continue;

    const atomIdMatch = block.match(/<id>t3_([a-z0-9]+)<\/id>/);
    const linkIdMatch = link.match(/\/comments\/([a-z0-9]+)\//);
    const id = atomIdMatch?.[1] ?? linkIdMatch?.[1];
    if (!id) continue;

    const rawContent = extractTag(block, 'content');
    const body = decodeXml(rawContent).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    const categoryMatch = block.match(/<category[^>]+term="([^"]+)"/);
    const srFromLink = link.match(/reddit\.com\/r\/([^/]+)\//);
    const subreddit = categoryMatch?.[1] ?? srFromLink?.[1] ?? 'reddit';

    const authorMatch = block.match(/<name>([^<]+)<\/name>/);
    const author = (authorMatch?.[1] ?? 'unknown').replace('/u/', '');

    const dateMatch = block.match(/<updated>([^<]+)<\/updated>/) ?? block.match(/<published>([^<]+)<\/published>/);
    const createdAt = dateMatch?.[1] ? new Date(dateMatch[1]) : new Date();

    posts.push({
      id, title,
      body: body.slice(0, 500),
      fullUrl: link.replace(/\?.*$/, ''),
      subreddit, upvotes: 1, commentCount: 0,
      createdAt, timeAgo: timeAgo(createdAt), author,
    });
  }

  console.log(`[reddit-search] Parsed ${posts.length} posts`);
  return { posts, nextCursor: posts.length > 0 ? posts[posts.length - 1].id : null };
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const keyword: string    = (body?.keyword ?? '').trim();
    const subredditRaw: string = (body?.subreddit ?? '').trim();
    const dateRange: DateRange = body?.dateRange  ?? '30d';
    const sortBy: SortBy       = body?.sortBy     ?? 'new';
    const limit: number        = Math.min(Math.max(Number(body?.limit ?? 25), 25), 100);
    // afterId is the last post ID from the previous page — used for pagination
    const afterId: string | undefined = body?.afterId || undefined;

    if (!keyword || keyword.length < 2) {
      return NextResponse.json({ error: 'Please enter a keyword to search.' }, { status: 400 });
    }

    const subreddits = subredditRaw
      ? subredditRaw.split(',').map((s: string) => s.trim()).filter(Boolean).slice(0, 5)
      : [];

    const { sort, t } = buildParams(sortBy, dateRange);

    let q: string;
    if (subreddits.length === 0) {
      q = encodeURIComponent(keyword);
    } else {
      const srFilter = subreddits.map((s: string) => `subreddit:${s}`).join(' OR ');
      q = encodeURIComponent(`${keyword} (${srFilter})`);
    }

    // Build URL — add after= for pagination pages
    let url = `https://www.reddit.com/search.rss?q=${q}&sort=${sort}&t=${t}&limit=${limit}`;
    if (afterId) url += `&after=t3_${afterId}`;

    const { posts } = await fetchRSSPage(url);

    const lastId = posts.length > 0 ? posts[posts.length - 1].id : null;
    const hasMore = posts.length === limit;

    console.log(`[reddit-search] Returning ${posts.length} posts, hasMore: ${hasMore}`);

    return NextResponse.json({ posts, total: posts.length, hasMore, lastId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[reddit-search]', msg);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

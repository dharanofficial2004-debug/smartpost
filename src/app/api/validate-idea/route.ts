import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
import { supabase } from '@/lib/supabase';
import { generateJSON } from '@/lib/ai-provider';
import type { ValidationReport, RedditPost } from '@/types/validation';

// ── helpers ─────────────────────────────────────────────────────────────────

function hashIdea(idea: string): string {
  return crypto.createHash('md5').update(idea.trim().toLowerCase()).digest('hex');
}

interface PullPushPost {
  id: string;
  title: string;
  selftext?: string;
  subreddit: string;
  score: number;
  num_comments: number;
  permalink: string;
}


async function searchReddit(keyword: string): Promise<PullPushPost[]> {
  const posts = await fetchRedditRSS(keyword);
  console.log(`[searchReddit] "${keyword}" → ${posts.length} posts total`);
  return posts;
}

async function fetchRedditRSS(keyword: string): Promise<PullPushPost[]> {
  try {
    const url = `https://www.reddit.com/search.rss?q=${encodeURIComponent(keyword)}&sort=relevance&limit=25`;
    let xml = '';
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

    // 1. Try standard fetch first
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': ua,
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        signal: AbortSignal.timeout(6000),
        cache: 'no-store',
      });

      if (res.ok) {
        xml = await res.text();
      } else {
        console.log(`[fetchRedditRSS] fetch returned status ${res.status} for "${keyword}". Trying curl fallback...`);
      }
    } catch (err: any) {
      console.log(`[fetchRedditRSS] fetch failed for "${keyword}" (${err?.message || err}). Trying curl fallback...`);
    }

    // 2. Try curl fallback if standard fetch did not get the feed
    if (!xml || (!xml.includes('<feed') && !xml.includes('<rss'))) {
      try {
        const { stdout } = await execAsync(`curl -s -L --max-time 8 -A "${ua}" "${url}"`, {
          maxBuffer: 1024 * 1024 * 10
        });
        xml = stdout;
      } catch (err: any) {
        console.error(`[fetchRedditRSS] curl fallback failed for "${keyword}"`, err?.message || err);
      }
    }

    if (!xml || (!xml.includes('<feed') && !xml.includes('<rss'))) {
      console.log(`[fetchRedditRSS] failed to retrieve valid RSS feed for "${keyword}"`);
      return [];
    }

    // Reddit returns Atom feed (<entry> tags), NOT RSS 2.0 (<item> tags)
    const items: PullPushPost[] = [];
    const entryMatches = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);

    for (const match of entryMatches) {
      const block = match[1];

      // Title is plain text inside <title>
      const title = decodeXml(extractTag(block, 'title'));

      // Link is an attribute: <link href="https://www.reddit.com/r/.../comments/ID/..." />
      const linkAttrMatch = block.match(/<link[^>]+href="([^"]+)"/);
      const link = linkAttrMatch?.[1] ?? '';

      // Content is HTML-encoded inside <content type="html">
      const rawContent = extractTag(block, 'content');
      const plainContent = decodeXml(rawContent).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      // Subreddit from <category term="subredditName" ...> or from link
      const categoryMatch = block.match(/<category[^>]+term="([^"]+)"/);
      const subredditFromLink = link.match(/reddit\.com\/r\/([^/]+)\//);
      const subreddit = categoryMatch?.[1] ?? subredditFromLink?.[1] ?? 'reddit';

      // Post ID from <id>t3_POSTID</id> or from link
      const atomIdMatch = block.match(/<id>t3_([a-z0-9]+)<\/id>/);
      const linkIdMatch = link.match(/\/comments\/([a-z0-9]+)\//);
      const id = atomIdMatch?.[1] ?? linkIdMatch?.[1] ?? Math.random().toString(36).slice(2);

      // Permalink path from link
      const permalinkMatch = link.match(/reddit\.com(\/r\/.+)/);
      const permalink = permalinkMatch?.[1]?.replace(/\?.*$/, '') ?? '/';

      if (title && link) {
        items.push({
          id,
          title,
          selftext: plainContent.slice(0, 300),
          subreddit,
          score: 1, // Atom feed does not include score
          num_comments: 0,
          permalink,
        });
      }
    }

    console.log(`[fetchRedditRSS] Parsed ${items.length} items for: "${keyword}"`);
    return items;
  } catch (err) {
    console.log(`[fetchRedditRSS] Error for "${keyword}":`, err);
    return [];
  }
}


// Helper: extract content between XML tags

// Helper: extract content between XML tags
function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

// Helper: decode XML entities
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

function buildRedditUrl(post: PullPushPost): string {
  return post.permalink
    ? `https://reddit.com${post.permalink}`
    : `https://reddit.com/r/${post.subreddit}`;
}

// ── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea: string = (body?.idea ?? '').trim();
    const sessionId: string = body?.sessionId ?? '';

    if (!idea || idea.length < 5) {
      return NextResponse.json({ error: 'Please enter a valid idea (at least 5 characters).' }, { status: 400 });
    }

    // ── Step 1: Check cache ──────────────────────────────────────────────────
    const ideaHash = hashIdea(idea);
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: cached } = await supabase
      .from('idea_validations')
      .select('report, reddit_posts, created_at')
      .eq('idea_hash', ideaHash)
      .gte('created_at', cutoff)
      .maybeSingle();

    if (cached) {
      return NextResponse.json({
        report: cached.report as ValidationReport,
        cached: true,
        createdAt: cached.created_at,
      });
    }

    // ── Step 2: AI generates Reddit search keywords ──────────────────────────
    const keywordsSystemPrompt = `You are a Reddit researcher. Given a micro-SaaS idea, generate 6-8 specific search queries that would find Reddit posts where real users are complaining about the exact pain this idea solves. Focus on problem language, not solution language. Return ONLY a JSON array of strings. No keys, no object wrappers — just a raw JSON array like ["query one","query two"].`;

    const keywordsRaw = await generateJSON(
      keywordsSystemPrompt,
      `Micro-SaaS idea: "${idea}"`
    );

    let keywords: string[] = [];
    try {
      // Handle both array and {keywords:[...]} shapes
      const parsed = JSON.parse(keywordsRaw);
      if (Array.isArray(parsed)) {
        keywords = parsed.filter((k): k is string => typeof k === 'string');
      } else if (parsed?.keywords && Array.isArray(parsed.keywords)) {
        keywords = parsed.keywords;
      } else {
        // Grab first array value from the object
        const firstArr = Object.values(parsed).find(Array.isArray) as string[] | undefined;
        keywords = firstArr ?? [];
      }
    } catch {
      keywords = [idea]; // fallback to raw idea if parse fails
    }

    if (keywords.length === 0) keywords = [idea];

    // ── Step 3: Search Reddit in parallel ───────────────────────────────────
    const rawResults = await Promise.all(keywords.map(searchReddit));

    // Deduplicate by post ID, sort by score, take top 30
    const seen = new Set<string>();
    const allPosts: PullPushPost[] = [];
    for (const batch of rawResults) {
      for (const post of batch) {
        if (!seen.has(post.id)) {
          seen.add(post.id);
          allPosts.push(post);
        }
      }
    }
    allPosts.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const topPosts = allPosts.slice(0, 30);

    // ── Step 4: AI generates full validation report ──────────────────────────
    const postsForPrompt = topPosts.map((p) => ({
      title: p.title,
      body: (p.selftext ?? '').slice(0, 300),
      subreddit: p.subreddit,
      score: p.score,
      comments: p.num_comments,
    }));

    // ── Step 4a: AI annotates each post with painLevel ──────────────────────
    // We ask the AI to assign painLevel per post ID — nothing else.
    // All other post fields are built directly from PullPush data (never AI).
    const annotationSystemPrompt = `You are a market research analyst. Given a micro-SaaS idea and a list of Reddit posts (each with an id and body), classify each post's pain level as "high", "medium", or "low" based on how strongly the post signals user pain that the idea would solve. Return ONLY valid JSON — an object mapping post id to pain level, like: {"abc123":"high","def456":"low"}. No other keys.`;

    const annotationUserPrompt = `
Idea: "${idea}"

Posts to classify:
${JSON.stringify(
  topPosts.map((p) => ({
    id: p.id,
    body: `${p.title} ${(p.selftext ?? '').slice(0, 200)}`,
  })),
  null,
  2
)}
`.trim();

    let painMap: Record<string, 'high' | 'medium' | 'low'> = {};
    if (topPosts.length > 0) {
      try {
        const annotationRaw = await generateJSON(annotationSystemPrompt, annotationUserPrompt);
        const parsed = JSON.parse(annotationRaw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          painMap = parsed as Record<string, 'high' | 'medium' | 'low'>;
        }
      } catch {
        // painMap stays empty — posts will default to "medium"
      }
    }

    // Build the redditPosts array ourselves — never trust AI for IDs or URLs
    const builtRedditPosts: RedditPost[] = topPosts.map((p) => ({
      id: p.id,
      title: p.title,
      url: buildRedditUrl(p),
      subreddit: p.subreddit,
      score: p.score ?? 0,
      commentCount: p.num_comments ?? 0,
      painLevel: painMap[p.id] ?? 'medium',
      excerpt: (p.selftext ?? '').slice(0, 150).trim(),
    }));

    console.log(`[validate-idea] Reddit search returned ${topPosts.length} posts for idea: "${idea}"`);

    // ── Step 4b: AI generates the rest of the report (no redditPosts) ────────
    const reportSystemPrompt = `You are an expert startup market analyst. Analyze a micro-SaaS idea using real Reddit pain posts and return a structured JSON report. Return ONLY valid JSON, no markdown, no preamble. The JSON must match this EXACT shape — do NOT include a redditPosts key:
{
  "verdict": "valid" | "risky" | "invalid",
  "summary": "one sentence explanation of verdict",
  "demandScore": number between 0 and 10,
  "competitionLevel": "low" | "medium" | "high",
  "marketFit": "strong" | "moderate" | "weak",
  "keywords": ["keyword used to search Reddit"],
  "competitors": [{"name": "string", "url": "https://...", "note": "one line about why it is a competitor"}],
  "swot": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "opportunities": ["string"],
    "threats": ["string"]
  }
}`;

    const reportUserPrompt = `
Idea: "${idea}"

Reddit posts found (${topPosts.length} total):
${JSON.stringify(postsForPrompt, null, 2)}

Keywords used to search Reddit:
${JSON.stringify(keywords)}

Instructions:
- If 0 Reddit posts found, set verdict to "invalid" and demandScore to 1
- Identify 2-5 real competitors (actual companies/tools) with valid URLs
- SWOT should have 3-4 items per quadrant
- demandScore reflects volume and intensity of Reddit pain signals
- Do NOT include a redditPosts key in your response
`.trim();

    const reportRaw = await generateJSON(reportSystemPrompt, reportUserPrompt);

    let report: ValidationReport;
    try {
      const parsed = JSON.parse(reportRaw);

      // Normalise verdict — AI may return capitalised or unexpected values
      const rawVerdict = (parsed.verdict ?? '').toString().toLowerCase().trim();
      const verdict: ValidationReport['verdict'] =
        rawVerdict === 'valid' ? 'valid' :
        rawVerdict === 'invalid' ? 'invalid' :
        'risky'; // default to risky for anything unexpected

      report = {
        ...parsed,
        verdict,
        // Always override with our own correctly-built data
        keywords: parsed.keywords?.length ? parsed.keywords : keywords,
        redditPosts: builtRedditPosts,
      } as ValidationReport;
    } catch {
      return NextResponse.json(
        { error: 'AI returned an invalid response. Please try again.' },
        { status: 502 }
      );
    }

    // ── Step 5: Save to Supabase ─────────────────────────────────────────────
    await supabase.from('idea_validations').upsert(
      {
        idea_text: idea,
        idea_hash: ideaHash,
        report: report,
        reddit_posts: topPosts,
        session_id: sessionId || null,
      },
      { onConflict: 'idea_hash' }
    );

    return NextResponse.json({
      report,
      cached: false,
      createdAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[validate-idea]', message);

    if (message.includes('OPENAI_API_KEY') || message.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: message }, { status: 503 });
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again in a moment.' },
      { status: 500 }
    );
  }
}

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ExternalLink, Loader2, Check, Search,
  MessageSquare, TriangleAlert, X, Sparkles,
  Clock, TrendingUp, Users,
} from 'lucide-react';
import type { RedditSearchPost } from '@/app/api/reddit-search/route';
import { saveToWaitlist } from '@/lib/waitlist';
import { openRedditPopup } from '@/components/ui/SlidePanel';

declare global { interface Window { gtag?: (...args: unknown[]) => void; } }

// ── types ─────────────────────────────────────────────────────────────────────
type DateRange  = '24h' | '7d' | '30d' | '3m' | '6m';
type SortBy     = 'new' | 'top' | 'comments';
type MinUpvotes = 0 | 5 | 10 | 25 | 50;

// ── constants ─────────────────────────────────────────────────────────────────
const QUICK_CHIPS = [
  'recommend a tool', 'looking for alternative',
  'need help with marketing', 'find customers',
  'struggling with SEO', 'need a CRM',
  'automate my workflow', 'best tool for',
];

const POPULAR_SEARCHES = [
  { icon: <TrendingUp size={14} />, label: 'SaaS founders looking for tools',     fill: 'recommend saas tool' },
  { icon: <Users size={14} />,      label: 'Businesses needing marketing help',   fill: 'need marketing help' },
  { icon: <Sparkles size={14} />,   label: 'Startups asking for recommendations', fill: 'looking for recommendation startup' },
];

const DATE_RANGE_LABEL: Record<DateRange, string> = {
  '24h': 'last 24h', '7d': 'last 7d', '30d': 'last 30d',
  '3m': 'last 3mo', '6m': 'last 6mo',
};
const SORT_LABEL: Record<SortBy, string> = {
  new: 'recent', top: 'top voted', comments: 'discussed',
};

// ── EmailCapture ──────────────────────────────────────────────────────────────
function EmailCapture({ source, keyword, postUrl, successMsg, onSuccess }: {
  source: string; keyword: string; postUrl: string;
  successMsg: string; onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'dup' | 'err'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    const r = await saveToWaitlist({ email, source, keywordSearched: keyword, postUrl });
    if (r.duplicate) { setStatus('dup'); return; }
    if (!r.success)  { setStatus('err'); return; }
    setStatus('done');
    window.gtag?.('event', source === 'draft_reply' ? 'draft_reply_signup' : 'outreach_signup',
      { keyword_searched: keyword });
    setTimeout(onSuccess, 1200);
  };

  if (status === 'done') return (
    <p className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 flex items-center gap-1.5">
      <Check size={11} /> {successMsg}
    </p>
  );
  if (status === 'dup') return (
    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">Already on the list!</p>
  );
  return (
    <form onSubmit={submit} className="flex gap-1.5 mt-2">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 min-w-0 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-slate-400 transition-colors bg-white" />
      <button type="submit" disabled={status === 'loading'}
        className="shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center gap-1">
        {status === 'loading' ? <Loader2 size={11} className="animate-spin" /> : 'Notify Me'}
      </button>
    </form>
  );
}

// ── SkeletonCard ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-20 rounded-full bg-slate-100" />
        <div className="h-5 w-14 rounded bg-slate-100" />
      </div>
      <div className="h-4 w-4/5 rounded bg-slate-100 mb-2" />
      <div className="h-3 w-full rounded bg-slate-100 mb-1" />
      <div className="h-3 w-2/3 rounded bg-slate-100 mb-4" />
      <div className="flex gap-2">
        <div className="h-7 w-20 rounded-lg bg-slate-100" />
        <div className="h-7 w-24 rounded-lg bg-slate-100" />
        <div className="h-7 w-24 rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

// ── RedditPostCard ────────────────────────────────────────────────────────────
function RedditPostCard({ post, keyword }: { post: RedditSearchPost; keyword: string }) {
  const [expanded,   setExpanded]   = useState(false);
  const [showDraft,  setShowDraft]  = useState(false);
  const [showTrack,  setShowTrack]  = useState(false);
  const [draftDone,  setDraftDone]  = useState(false);
  const [trackDone,  setTrackDone]  = useState(false);
  const BODY_LIMIT = 180;
  const isLong = post.body.length > BODY_LIMIT;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all">
      {/* Card header */}
      <div className="px-4 pt-4 pb-3">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="rounded-full bg-orange-50 text-orange-600 border border-orange-100 px-2.5 py-0.5 text-[11px] font-semibold shrink-0">
              r/{post.subreddit}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock size={10} /> {post.timeAgo}
            </span>
            <span className="text-[11px] text-slate-400">▲ {post.upvotes}</span>
            <span className="text-[11px] text-slate-400">💬 {post.commentCount}</span>
          </div>
          <button
            onClick={() => {
              window.gtag?.('event', 'post_opened', { post_url: post.fullUrl, subreddit: post.subreddit, keyword_searched: keyword });
              openRedditPopup(post.fullUrl);
            }}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            title="Open in popup"
          >
            <ExternalLink size={13} />
          </button>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-slate-800 leading-snug mb-2">{post.title}</p>

        {/* Body */}
        {post.body ? (
          <div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {expanded || !isLong ? post.body : `${post.body.slice(0, BODY_LIMIT)}…`}
            </p>
            {isLong && (
              <button onClick={() => setExpanded(v => !v)}
                className="mt-1 text-[11px] text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors">
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Link post — click to view</p>
        )}
      </div>

      {/* Action bar */}
      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 rounded-b-xl flex flex-wrap items-center gap-2">
        {/* View Post */}
        <button
          onClick={() => {
            window.gtag?.('event', 'post_opened', { post_url: post.fullUrl, subreddit: post.subreddit, keyword_searched: keyword });
            openRedditPopup(post.fullUrl);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-colors"
        >
          <ExternalLink size={11} /> View Post
        </button>

        {/* Draft Reply */}
        {!draftDone ? (
          <>
            <button
              onClick={() => { setShowDraft(v => !v); setShowTrack(false); }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                showDraft ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-400'
              }`}
            >
              <Sparkles size={11} /> Draft Reply
            </button>
            {showDraft && (
              <div className="w-full p-3 rounded-lg bg-white border border-slate-200 mt-1">
                <p className="text-xs text-slate-600 mb-1">Get AI reply drafts when we launch</p>
                <EmailCapture source="draft_reply" keyword={keyword} postUrl={post.fullUrl}
                  successMsg="You're on the list! Reply manually for now 👆"
                  onSuccess={() => { setDraftDone(true); setShowDraft(false); }} />
              </div>
            )}
          </>
        ) : (
          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-1.5">
            <Check size={11} /> On the list!
          </span>
        )}

        {/* Track Outreach */}
        {!trackDone ? (
          <>
            <button
              onClick={() => { setShowTrack(v => !v); setShowDraft(false); }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors ${
                showTrack ? 'bg-slate-900 text-white font-medium' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <MessageSquare size={11} /> Track
            </button>
            {showTrack && (
              <div className="w-full p-3 rounded-lg bg-white border border-slate-200 mt-1">
                <p className="text-xs text-slate-600 mb-1">Notify me when outreach tracking launches</p>
                <EmailCapture source="track_outreach" keyword={keyword} postUrl={post.fullUrl}
                  successMsg="We'll notify you when it launches!"
                  onSuccess={() => { setTrackDone(true); setShowTrack(false); }} />
              </div>
            )}
          </>
        ) : (
          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-1.5">
            <Check size={11} /> Notified!
          </span>
        )}
      </div>
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────
export default function IdeaValidationPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [keyword,    setKeyword]    = useState('');
  const [subreddit,  setSubreddit]  = useState('');
  const [dateRange,  setDateRange]  = useState<DateRange>('30d');
  const [sortBy,     setSortBy]     = useState<SortBy>('new');
  const [minUpvotes, setMinUpvotes] = useState<MinUpvotes>(0);

  const [searching,     setSearching]     = useState(false);
  const [searchResults, setSearchResults] = useState<RedditSearchPost[] | null>(null);
  const [searchError,   setSearchError]   = useState<string | null>(null);

  const keywordRef = useRef<HTMLInputElement>(null);

  const doSearch = useCallback(async (kw: string) => {
    const trimmed = kw.trim();
    if (!trimmed) return;
    console.log(`\n=== [reddit-search UI] SEARCH STARTED ===`);
    console.log(`[reddit-search UI] Keyword: "${trimmed}"`);
    console.log(`[reddit-search UI] Subreddit filter: "${subreddit}"`);
    console.log(`[reddit-search UI] Date range: "${dateRange}"`);
    console.log(`[reddit-search UI] Sort by: "${sortBy}"`);
    console.log(`[reddit-search UI] Min upvotes: ${minUpvotes}`);
    
    setSearching(true);
    setSearchError(null);
    setSearchResults(null);
    try {
      console.log(`[reddit-search UI] Dispatching POST request to /api/reddit-search...`);
      const res = await fetch('/api/reddit-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: trimmed,
          subreddit: subreddit.trim() || undefined,
          dateRange, sortBy, minUpvotes,
        }),
      });
      console.log(`[reddit-search UI] Received response with HTTP status: ${res.status}`);
      const json = await res.json();
      console.log(`[reddit-search UI] Parsed JSON response:`, json);
      
      if (!res.ok) {
        throw new Error(json?.error ?? `Search failed with status ${res.status}`);
      }
      
      const postsCount = json.posts?.length ?? 0;
      console.log(`[reddit-search UI] Success: Found ${postsCount} posts in response.`);
      setSearchResults(json.posts as RedditSearchPost[]);
      
      window.gtag?.('event', 'search_performed', {
        keyword: trimmed, subreddit: subreddit || 'all',
        date_range: dateRange, results_count: json.total,
      });
    } catch (err: unknown) {
      console.error(`[reddit-search UI] Search request failed:`, err);
      setSearchError(err instanceof Error ? err.message : 'Search failed. Please try again.');
    } finally {
      console.log(`[reddit-search UI] Search finished (loading set to false).`);
      console.log(`=== [reddit-search UI] SEARCH ENDED ===\n`);
      setSearching(false);
    }
  }, [subreddit, dateRange, sortBy, minUpvotes]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doSearch(keyword); };
  const handleChip   = (value: string) => { setKeyword(value); doSearch(value); };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── TOP BAR — sticky at the top ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">
              Reddit Outreach
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Find conversations where people need your product
            </p>
          </div>
          {/* Inline keyword search bar in top bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-lg hidden md:flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400 focus-within:bg-white transition-colors">
              <Search size={14} className="shrink-0 text-slate-400" />
              <input
                ref={keywordRef}
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder='e.g. "looking for a CRM" or "struggling with lead gen"'
                disabled={searching}
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none disabled:opacity-60"
              />
              {keyword && (
                <button type="button" onClick={() => setKeyword('')}
                  className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors">
                  <X size={13} />
                </button>
              )}
            </div>
            <button type="submit" disabled={searching || !keyword.trim()}
              className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5">
              {searching ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT — fills remaining viewport height ── */}
      <div className="max-w-screen-xl mx-auto flex" style={{ height: 'calc(100vh - 65px)' }}>

        {/* ═══ LEFT SIDEBAR — sticky, full height, its own scroll ═══ */}
        <aside className="w-72 shrink-0 border-r border-slate-200 bg-white sticky top-[65px] self-start h-[calc(100vh-65px)] flex flex-col overflow-hidden">
          <div className="p-5 overflow-y-auto flex-1">

            {/* Mobile keyword input (hidden on md+) */}
            <form onSubmit={handleSubmit} className="md:hidden mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Search
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-slate-400 focus-within:bg-white transition-colors">
                <Search size={13} className="shrink-0 text-slate-400" />
                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
                  placeholder="Keyword or pain point…" disabled={searching}
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none" />
              </div>
            </form>

            {/* Subreddit */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Subreddit <span className="text-slate-400 font-normal normal-case">(optional)</span>
              </label>
              <input type="text" value={subreddit} onChange={e => setSubreddit(e.target.value)}
                placeholder="e.g. SaaS, startups" disabled={searching}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-60" />
              <p className="text-[11px] text-slate-400 mt-1">Separate multiple with commas</p>
            </div>

            {/* Date range */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Posted within
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['24h','7d','30d','3m','6m'] as DateRange[]).map(d => (
                  <button key={d} onClick={() => setDateRange(d)} disabled={searching}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      dateRange === d
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                    }`}>
                    {d === '24h' ? '24 hours' : d === '7d' ? '7 days' : d === '30d' ? '30 days' : d === '3m' ? '3 months' : '6 months'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Sort by
              </label>
              <div className="flex flex-col gap-1.5">
                {([
                  { val: 'new', label: 'Most recent' },
                  { val: 'top', label: 'Most upvoted' },
                  { val: 'comments', label: 'Most discussed' },
                ] as { val: SortBy; label: string }[]).map(s => (
                  <button key={s.val} onClick={() => setSortBy(s.val)} disabled={searching}
                    className={`rounded-lg px-3 py-2 text-xs font-medium text-left transition-colors ${
                      sortBy === s.val
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Min upvotes */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Min upvotes
              </label>
              <div className="flex flex-wrap gap-1.5">
                {([0,5,10,25,50] as MinUpvotes[]).map(v => (
                  <button key={v} onClick={() => setMinUpvotes(v)} disabled={searching}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      minUpvotes === v
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                    }`}>
                    {v === 0 ? 'Any' : `${v}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick chips */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Quick searches
              </label>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map(chip => (
                  <button key={chip} onClick={() => handleChip(chip)} disabled={searching}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-500 hover:border-slate-400 hover:text-slate-700 disabled:opacity-50 transition-colors">
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={() => doSearch(keyword)}
              disabled={searching || !keyword.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {searching
                ? <><Loader2 size={14} className="animate-spin" /> Searching…</>
                : <><Search size={14} /> Find People →</>}
            </button>
          </div>
        </aside>

        {/* ═══ RIGHT PANEL — Results, independently scrollable ═══ */}
        <main className="flex-1 min-w-0 overflow-y-auto">

          {/* Sticky results count bar — always visible */}
          <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between">
            {searching && (
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <Loader2 size={12} className="animate-spin" /> Searching Reddit…
              </span>
            )}
            {!searching && searchResults && (
              <span className="text-xs font-semibold text-slate-700">
                {searchResults.length} conversation{searchResults.length !== 1 ? 's' : ''} found
                <span className="font-normal text-slate-400 ml-2">
                  {SORT_LABEL[sortBy]} · {DATE_RANGE_LABEL[dateRange]} · {subreddit ? `r/${subreddit}` : 'All Reddit'}
                </span>
              </span>
            )}
            {!searching && searchResults === null && !searchError && (
              <span className="text-xs text-slate-400">Search to find conversations</span>
            )}
            {!searching && searchError && (
              <span className="text-xs text-red-500">Search failed</span>
            )}
          </div>

          <div className="p-6">

            {/* Loading */}
            {searching && (
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <Loader2 size={14} className="animate-spin text-slate-400" />
                  <span className="text-sm text-slate-500">Searching Reddit…</span>
                </div>
                {[1,2,3,4,5].map(i => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Error */}
            {!searching && searchError && (
              <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <TriangleAlert size={16} className="shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-1">Couldn&apos;t reach Reddit</p>
                    <p className="text-xs text-red-600 mb-3 leading-relaxed">Please try again in a moment.</p>
                    <button onClick={() => doSearch(keyword)}
                      className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-800 transition-colors">
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {!searching && searchResults && searchResults.length > 0 && (
              <div className="max-w-3xl">
                <div className="space-y-3">
                  {searchResults.map(post => (
                    <RedditPostCard key={post.id} post={post} keyword={keyword} />
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!searching && searchResults && searchResults.length === 0 && (
              <div className="max-w-sm">
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                  <p className="text-sm font-semibold text-slate-700 mb-1">No conversations found</p>
                  <p className="text-xs text-slate-500 mb-4">Try adjusting your filters on the left</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setSubreddit(''); doSearch(keyword); }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:border-slate-400 transition-colors">
                      Remove subreddit filter
                    </button>
                    <button onClick={() => { setDateRange('6m'); doSearch(keyword); }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:border-slate-400 transition-colors">
                      Expand to 6 months
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Initial state */}
            {!searching && searchResults === null && !searchError && (
              <div className="max-w-2xl">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Popular right now
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {POPULAR_SEARCHES.map(s => (
                    <button key={s.fill} onClick={() => handleChip(s.fill)}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-slate-400 hover:shadow-sm transition-all group">
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 mb-2 transition-colors">
                        {s.icon}
                        <span className="text-[11px] font-medium uppercase tracking-wider">Try this</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 leading-snug transition-colors">
                        {s.label}
                      </p>
                    </button>
                  ))}
                </div>

                {/* How it works */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold text-slate-700 mb-3">How it works</p>
                  <div className="space-y-3">
                    {[
                      { n: '1', t: 'Type a keyword', d: 'Enter what your customers are searching for — a pain, a problem, or a need.' },
                      { n: '2', t: 'Filter by subreddit & date', d: 'Narrow results to specific communities and time ranges.' },
                      { n: '3', t: 'Find & reach out', d: 'Open the post and reply directly on Reddit before your competitors.' },
                    ].map(step => (
                      <div key={step.n} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {step.n}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{step.t}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.smartpost.co.in';

  // Static pages
  const staticPages = [
    '',
    '/reddit-marketing',
    '/reddit-marketing-tool',
    '/reddit-lead-generation',
    '/reddit-outreach-tool',
    '/find-customers-on-reddit',
    '/reddit-marketing-for-saas',
    '/reddit-marketing-for-shopify',
    '/reddit-marketing-for-agencies',
    '/reddit-marketing-for-startups',
    '/reddit-marketing-for-ai-tools',
    '/reddit-lead-generation-for-saas',
    '/reddit-lead-generation-for-shopify',
    '/reddit-lead-generation-for-agencies',
    '/reddit-lead-generation-for-startups',
    '/reddit-lead-generation-for-ai',
    '/gummysearch-alternative',
    '/f5bot-alternative',
    '/syften-alternative',
    '/free-reddit-keyword-generator',
    '/free-subreddit-finder',
  ];

  const sitemapEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In the future, you can fetch dynamic routes (e.g., from a CMS or DB) and append them to sitemapEntries

  return sitemapEntries;
}

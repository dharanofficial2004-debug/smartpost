import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";
import { pseoPages } from "@/lib/pseo-data";

import dynamic from 'next/dynamic';

const RedditOutreachTool = dynamic(
  () => import('@/components/RedditOutreachTool'),
  {
    loading: () => (
      <div className="w-full h-64 animate-pulse bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading Reddit search tool...</p>
      </div>
    )
  }
);


export const metadata = constructMetadata({
  title: "Reddit Marketing For Shopify | SmartPost",
  description: "Find customers automatically with our reddit marketing for shopify platform. SmartPost uses AI to find high-intent leads on Reddit.",
  canonicalUrl: "/reddit-marketing-for-shopify",
});

export default function Page() {
  const data = pseoPages.find(p => p.slug === "reddit-marketing-for-shopify");
  if (!data) throw new Error('PSEO data not found for reddit-marketing-for-shopify');
  const {
    headline,
    subheadline,
    ctaButton,
    ctaHeadline,
    benefits,
    faqs,
    relatedPages,
    subreddits,
    useCaseTitle,
    useCaseBody,
  } = data;
  const hero = { title: headline, subtitle: subheadline, buttonText: ctaButton };
  const seoContent = { title: useCaseTitle, content: useCaseBody };
  const finalCta = { title: ctaHeadline, subtitle: ctaButton };
  const schema = generateSoftwareApplicationSchema(
    headline,
    `${headline} - SmartPost AI platform`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PSEOPageTemplate
        redditTool={
          <RedditOutreachTool 
            defaultKeyword="shopify store help"
            pageContext="reddit-marketing-for-shopify"
          />
        }
        hero={hero}
        seoContent={seoContent}
        finalCta={finalCta}
        benefits={benefits ?? []}
        faqs={faqs ?? []}
        relatedPages={relatedPages ?? []}
        subreddits={subreddits ?? []}
      />
    </>
  );
}

import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";
import { pseoPages } from '@/lib/pseo-data';
import { Metadata } from 'next';

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


export const metadata: Metadata = constructMetadata({
  title: "Reddit Lead Generation | SmartPost",
  description: "Find customers automatically with our reddit lead generation platform. SmartPost uses AI to find high‑intent leads on Reddit.",
  canonicalUrl: "/reddit-lead-generation",
});

export default function Page() {
  const data = pseoPages.find(p => p.slug === "reddit-lead-generation");
  if (!data) throw new Error('PSEO data not found for reddit-lead-generation');
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
    "Reddit Lead Generation Tool",
    "SmartPost is an AI platform for reddit lead generation that automatically finds customers."
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
            defaultKeyword="lead generation tool reddit"
            pageContext="reddit-lead-generation"
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

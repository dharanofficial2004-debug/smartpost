import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { pseoPages } from '@/lib/pseo-data';
import { PSEOPageTemplate } from '@/components/layout/PSEOPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: "Reddit Marketing | SmartPost",
  description: "Find customers automatically with our reddit marketing platform. SmartPost uses AI to find high-intent leads on Reddit.",
  canonicalUrl: "/reddit-marketing",
});

export default function Page() {
  const data = pseoPages.find(p => p.slug === "reddit-marketing");
  if (!data) throw new Error('PSEO data not found for reddit-marketing');
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
    "Reddit Marketing Tool",
    "SmartPost is an AI platform for reddit marketing that automatically finds customers."
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PSEOPageTemplate
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

import { Metadata } from "next";
import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";
import { pseoPages } from "@/lib/pseo-data";

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const slug = `reddit-lead-generation/${industry}`;
  const data = pseoPages.find(p => p.slug === slug);
  
  if (!data) {
    return constructMetadata({
      title: "Reddit Lead Generation",
      description: "Find high-intent leads on Reddit.",
      canonicalUrl: `/reddit-lead-generation/${industry}`,
    });
  }
  
  return constructMetadata({
    title: `${data.metaTitle}`,
    description: `${data.metaDescription}`,
    canonicalUrl: `/reddit-lead-generation/${industry}`,
  });
}

export default async function Page({ params }: Props) {
  const { industry } = await params;
  const slug = `reddit-lead-generation/${industry}`;
  const data = pseoPages.find(p => p.slug === slug);
  
  if (!data) {
    throw new Error(`PSEO data not found for ${slug}`);
  }

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
}

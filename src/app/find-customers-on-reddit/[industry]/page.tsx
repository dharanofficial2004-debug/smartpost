import { Metadata } from "next";
import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const title = `Find ${industry.replace(/-/g, ' ')} Customers on Reddit`;
  return constructMetadata({
    title: `${title} | SmartPost`,
    description: `Learn how to find ${industry.replace(/-/g, ' ')} customers on Reddit. Find high-intent leads and grow your business with SmartPost.`,
    canonicalUrl: `/find-customers-on-reddit/${industry}`,
  });
}

export default async function Page({ params }: Props) {
  const { industry } = await params;
  const industryFormatted = industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const schema = generateSoftwareApplicationSchema(
    `Tool to Find ${industryFormatted} Customers on Reddit`,
    `SmartPost is an AI platform that helps you find ${industryFormatted} customers on Reddit.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PSEOPageTemplate
        hero={{
          title: `Find ${industryFormatted} Customers on Reddit`,
          subtitle: `Stop manually searching. Our AI platform automatically surfaces people looking for ${industryFormatted} products on Reddit.`,
          buttonText: "Start For Free",
        }}
        seoContent={{
          title: `How to find ${industryFormatted} customers?`,
          content: `Reddit is full of people looking for ${industryFormatted} solutions. SmartPost monitors conversations 24/7 and alerts you when someone needs what you offer.`
        }}
        finalCta={{
          title: `Ready to find more ${industryFormatted} customers?`,
          subtitle: "Join the AI-powered Reddit marketing revolution today."
        }}
      />
    </>
  );
}

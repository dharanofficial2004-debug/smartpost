import { Metadata } from "next";
import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";

type Props = {
  params: Promise<{ tool: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool } = await params;
  const toolName = tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `Best ${toolName} Alternative for Reddit Marketing`;
  
  return constructMetadata({
    title: `${title} | SmartPost`,
    description: `Looking for a ${toolName} alternative? SmartPost is the ultimate AI-powered Reddit marketing and lead generation platform.`,
    canonicalUrl: `/alternatives/${tool}`,
  });
}

export default async function Page({ params }: Props) {
  const { tool } = await params;
  const toolName = tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const schema = generateSoftwareApplicationSchema(
    `${toolName} Alternative`,
    `SmartPost is the best alternative to ${toolName} for Reddit marketing and lead generation.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PSEOPageTemplate
        hero={{
          title: `The Best ${toolName} Alternative`,
          subtitle: `Switch from ${toolName} to SmartPost. Our AI platform finds high-intent customers for your business directly from Reddit with better precision.`,
          buttonText: "Start For Free",
        }}
        seoContent={{
          title: `Why choose SmartPost over ${toolName}?`,
          content: `While ${toolName} provides basic functionality, SmartPost uses advanced AI to actually understand the context of Reddit conversations, surfacing only the highest intent leads without the noise.`
        }}
        finalCta={{
          title: `Ready to switch from ${toolName}?`,
          subtitle: "Join the AI-powered Reddit marketing revolution today."
        }}
      />
    </>
  );
}

import { Metadata } from "next";
import { constructMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import { PSEOPageTemplate } from "@/components/layout/PSEOPageTemplate";

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const title = `Marketing in r/${name} | SmartPost`;
  return constructMetadata({
    title,
    description: `Learn how to do marketing in r/${name}. Monitor conversations and find leads in the ${name} subreddit automatically.`,
    canonicalUrl: `/subreddits/${name}`,
  });
}

export default async function Page({ params }: Props) {
  const { name } = await params;
  
  const schema = generateSoftwareApplicationSchema(
    `r/${name} Monitoring Tool`,
    `SmartPost is an AI platform that monitors r/${name} for leads and brand mentions.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PSEOPageTemplate
        hero={{
          title: `Find Customers in r/${name}`,
          subtitle: `Monitor r/${name} 24/7. Our AI platform finds high-intent customers for your business directly from this subreddit.`,
          buttonText: "Start For Free",
        }}
        seoContent={{
          title: `Why Monitor r/${name}?`,
          content: `r/${name} is full of highly engaged users. SmartPost monitors this subreddit to find people asking about solutions like yours so you can reply first.`
        }}
        finalCta={{
          title: `Ready to master r/${name}?`,
          subtitle: "Join the AI-powered Reddit marketing revolution today."
        }}
      />
    </>
  );
}

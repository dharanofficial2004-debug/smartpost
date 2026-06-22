import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SEOContent } from "@/components/sections/SEOContent";
import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { ReactNode } from "react";

export interface PSEOPageProps {
  hero: {
    title: string;
    subtitle: string;
    buttonText?: string;
  };
  seoContent?: {
    title: string;
    content: string;
  };
  faqs?: { question: string; answer: string }[];
  finalCta?: {
    title: string;
    subtitle: string;
  };
  benefits?: { title: string; description: string }[];
  relatedPages?: { title: string; slug: string }[];
  subreddits?: string[];
  redditTool?: ReactNode;
}

export function PSEOPageTemplate({
  hero,
  seoContent,
  faqs,
  finalCta,
  benefits = [],
  relatedPages = [],
  subreddits = [],
  redditTool,
}: PSEOPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero title={hero.title} subtitle={hero.subtitle} buttonText={hero.buttonText} />
        {redditTool && (
          <div className="relative z-10 -mt-8 mb-12">
            {redditTool}
          </div>
        )}
        <HowItWorks />
        <FeaturesGrid />
        {seoContent && (
          <SEOContent title={seoContent.title} content={seoContent.content} />
        )}
        {!seoContent && <SEOContent />}
        <Benefits benefits={benefits ?? []} />
        <FAQ customFaqs={faqs} />
        <PricingPreview />
        <FinalCTA title={finalCta?.title} subtitle={finalCta?.subtitle} />
      </main>
      <Footer />
    </div>
  );
}

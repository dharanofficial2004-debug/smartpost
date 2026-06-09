import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
// import { Problem } from "@/components/sections/Problem"; // Removed old section
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { SEOContent } from "@/components/sections/SEOContent";
import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Reddit Marketing Tool | Find Customers on Reddit",
  description: "AI-powered Reddit marketing and lead generation platform. Discover subreddits, monitor conversations, find buying intent posts, and grow your business.",
  keywords: [
    "reddit marketing",
    "reddit marketing tool",
    "reddit lead generation",
    "b2b lead generation reddit",
    "lead generation reddit",
    "find customers on reddit",
    "marketing automation reddit",
    "ai marketing reddit",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* <Problem /> */}
        <HowItWorks />
        <FeaturesGrid />
        <SEOContent />
        <Benefits />
        <FAQ />
        <PricingPreview />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}


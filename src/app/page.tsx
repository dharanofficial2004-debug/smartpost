import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Workflow } from "@/components/sections/Workflow";
import { Comparison } from "@/components/sections/Comparison";
import { CTA } from "@/components/sections/CTA";
import { EarlyBeta } from "@/components/sections/EarlyBeta";
import { About } from "@/components/sections/About";
import { AutomationLogic } from "@/components/sections/AutomationLogic";
import { AgencyFeedback } from "@/components/sections/AgencyFeedback";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartPost | AI Automation For Digital Marketing Agencies",
  description:
    "We build custom AI agents for digital marketing agencies to save time and increase efficiency. WhatsApp qualifiers, social media automation, and more.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <AutomationLogic />
        <Solution />
        <CTA />
        <AgencyFeedback />
      </main>
      <Footer />
    </div>
  );
}

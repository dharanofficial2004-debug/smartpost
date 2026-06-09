// src/components/sections/FAQ.tsx
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is Reddit marketing?",
    answer: "Reddit marketing is the practice of promoting your product or service by engaging with relevant subreddits and conversations where your target audience already hangs out.",
  },
  {
    question: "How does AI find leads?",
    answer: "Our AI scans Reddit posts and comments, matches your product description to relevant subreddits, generates keywords, and detects buying‑intent signals in real‑time.",
  },
  {
    question: "Is Reddit automation safe?",
    answer: "We never post automatically. The platform only suggests replies; you manually publish them, keeping your account safe and compliant with Reddit policies.",
  },
  {
    question: "Does the tool post automatically?",
    answer: "No. After the AI suggests a reply, you click the opportunity and are redirected to the Reddit thread to post manually.",
  },
  {
    question: "Who is this for?",
    answer: "Businesses of any size looking to acquire B2B leads from Reddit, as well as agencies that manage client outreach.",
  },
  {
    question: "Can agencies use this?",
    answer: "Absolutely – agencies can manage multiple client accounts, monitor conversations, and generate leads for each client from a single dashboard.",
  },
];

export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqData.map((item, idx) => (
            <div key={idx} className="text-left bg-gray-50 p-6 rounded-lg">
              <h3 className="flex items-center text-xl font-semibold text-primary mb-2">
                <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                {item.question}
              </h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
        {/* JSON‑LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </section>
  );
}

// src/components/sections/HowItWorks.tsx
import { ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      title: "Describe Product",
      description: "User describes their product or service.",
    },
    {
      title: "AI Finds Subreddits",
      description: "AI recommends the best subreddits.",
    },
    {
      title: "AI Detects Opportunities",
      description: "AI generates relevant keywords and monitors conversations.",
    },
    {
      title: "Reply and Get Customers",
      description: "AI suggests a reply; user clicks and posts manually.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

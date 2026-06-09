// src/components/sections/FeaturesGrid.tsx
import { CheckCircle } from 'lucide-react';

const features = [
  "AI Subreddit Finder",
  "Reddit Keyword Generator",
  "Buying Intent Detection",
  "AI Reply Assistant",
  "Reddit Monitoring",
  "Lead Dashboard",
  "Smart Alerts",
  "Manual Safe Reply Workflow",
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Features
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-gray-800 font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

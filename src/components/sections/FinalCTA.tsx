"use client";

import { ArrowRight } from 'lucide-react';

export function FinalCTA({
  title = "Start Finding Customers on Reddit Today",
  subtitle = "Join the AI‑powered Reddit marketing revolution and let our platform surface high‑intent leads for you.",
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  return (
    <section id="final-cta" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {subtitle}
        </p>
        <button
          onClick={handleStartFree}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-red-600 text-white hover:bg-red-500 font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
        >
          Start Free <ArrowRight className="ml-1.5 w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

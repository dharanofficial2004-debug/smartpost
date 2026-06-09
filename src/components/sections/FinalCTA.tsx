"use client";

import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  return (
    <section id="final-cta" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Start Finding Customers on Reddit Today
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join the AI‑powered Reddit marketing revolution and let our platform surface high‑intent leads for you.
        </p>
        <button
          onClick={handleStartFree}
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white hover:bg-primary-600 font-medium rounded transition-colors cursor-pointer"
        >
          Start Free <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

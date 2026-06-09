"use client";

import { ArrowRight } from 'lucide-react';

export function Hero() {
  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-20 md:py-32 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
        {/* Reddit Logo SVG */}
        <div className="mb-6 flex items-center justify-center p-3 bg-red-50 rounded-2xl border border-red-100 shadow-sm animate-bounce duration-1000">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-12 h-12 text-[#ff4500]"
            fill="currentColor"
          >
            <g>
              <path d="M17.16 9.33a2.12 2.12 0 0 0-3.56-1.57 8.64 8.64 0 0 0-3.47-.73l.73-2.3 2.38.51a1.27 1.27 0 1 0 .12-.62l-2.62-.57a.32.32 0 0 0-.37.23l-.81 2.58a8.81 8.81 0 0 0-3.56.7l-1.4-1.4a2.12 2.12 0 1 0-2.8 3 4.23 4.23 0 0 0-.12.93c0 2.87 3.51 5.2 7.83 5.2s7.83-2.33 7.83-5.2a4.4 4.4 0 0 0-.12-.91 2.1 2.1 0 0 0 2.55-1.46zM5 10.7a.95.95 0 1 1 .95.95.95.95 0 0 1-.95-.95zm7.3 3.65c-1.12 1.12-3.25 1.12-4.37 0a.32.32 0 1 1 .45-.45c.87.87 2.6.87 3.47 0a.32.32 0 1 1 .45.45zm-.4-2.7a.95.95 0 1 1 .95-.95.95.95 0 0 1-.95.95z" />
            </g>
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight max-w-2xl leading-tight">
          AI Reddit Marketing That Finds Customers For You
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
          Describe your business and our AI finds the best subreddits, keywords, and conversations where people are already looking for your solution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 w-full sm:w-auto">
          <button
            onClick={handleStartFree}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-red-600 text-white hover:bg-red-500 font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
          >
            Start Free <ArrowRight className="ml-1.5 w-4 h-4" />
          </button>
          
          <button
            onClick={handleScrollToHowItWorks}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
          >
            See How It Works
          </button>
        </div>
      </div>
    </section>
  );
}

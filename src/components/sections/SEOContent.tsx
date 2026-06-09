// src/components/sections/SEOContent.tsx
export function SEOContent({
  title = "The Smart Way to Do Reddit Marketing",
  content = "Harness AI to discover high‑intent subreddits, generate razor‑sharp keywords, and monitor conversations in real time. Our platform surfaces buying intent posts so you can reply manually, converting curious browsers into loyal customers—without the hassle of manual search or risky automation.",
}: {
  title?: string;
  content?: string;
} = {}) {
  return (
    <section id="seo-content" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}

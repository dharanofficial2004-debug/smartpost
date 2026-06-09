// src/components/sections/Benefits.tsx
export function Benefits() {
  const benefits = [
    {
      title: "Get Leads Faster",
      description: "AI surfaces high‑intent conversations instantly, so you never miss a prospect.",
    },
    {
      title: "Find Hidden Opportunities",
      description: "Discover subreddits and posts your competitors overlook.",
    },
    {
      title: "Save Hours Every Week",
      description: "Automated subreddit and keyword discovery eliminates manual research.",
    },
    {
      title: "Grow Without Paid Ads",
      description: "Reach engaged communities organically, reducing ad spend.",
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Benefits
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-3">{b.title}</h3>
              <p className="text-gray-600">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

export function PricingPreview() {
  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  const plans = [
    {
      name: "Starter",
      price: "$0",
      features: [
        "AI Subreddit Finder",
        "Reddit Keyword Generator",
        "Basic Monitoring",
      ],
    },
    {
      name: "Growth",
      price: "$9/mo",
      features: [
        "Everything in Starter",
        "Buying Intent Detection",
        "AI Reply Assistant",
        "Lead Dashboard",
      ],
    },
    {
      name: "Agency",
      price: "$49/mo",
      features: [
        "Everything in Growth",
        "Smart Alerts",
        "Multi‑client Dashboard",
        "Priority Support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Pricing
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-gray-800 mb-6">
                {plan.price}
              </p>
              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((feat, i) => (
                  <li key={i} className="text-gray-600">
                    • {feat}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleStartFree}
                className="w-full inline-flex items-center justify-center px-8 py-3.5 bg-red-600 text-white hover:bg-red-500 font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
              >
                Start Free
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

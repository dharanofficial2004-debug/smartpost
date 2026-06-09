// src/components/sections/Benefits.tsx
export interface BenefitItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const defaultBenefits: BenefitItem[] = [
  {
    title: "Target the Right Communities",
    description: "Reach engaged Reddit audiences that actually care about your niche, avoiding spammy self‑promotion bans.",
  },
  {
    title: "Boost Credibility",
    description: "Organic Reddit discussions position your brand as an industry authority, driving trust and higher conversion rates.",
  },
  {
    title: "Cost‑Effective Growth",
    description: "Leverage free Reddit traffic to supplement paid campaigns, cutting acquisition costs dramatically.",
  },
  {
    title: "Real‑Time Insights",
    description: "Monitor Reddit conversations in real-time to discover market trends, customer pain points, and emerging opportunities.",
  },
];

export function Benefits({ benefits = [] }: { benefits: BenefitItem[] }) {
  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;
  const itemCount = displayBenefits.length;
  
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Benefits
        </h2>
        <div className={itemCount === 3 ? "grid gap-8 md:grid-cols-3" : "grid gap-8 md:grid-cols-2 lg:grid-cols-4"}>
          {displayBenefits.map((b, i) => (
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

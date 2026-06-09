import Link from 'next/link';

const footerLinks = {
  redditMarketing: {
    heading: 'Reddit Marketing',
    links: [
      { label: 'Reddit Marketing', href: '/reddit-marketing' },
      { label: 'Reddit Marketing Tool', href: '/reddit-marketing-tool' },
      { label: 'Marketing for SaaS', href: '/reddit-marketing-for-saas' },
      { label: 'Marketing for Shopify', href: '/reddit-marketing-for-shopify' },
      { label: 'Marketing for Agencies', href: '/reddit-marketing-for-agencies' },
      { label: 'Marketing for Startups', href: '/reddit-marketing-for-startups' },
      { label: 'Marketing for AI Tools', href: '/reddit-marketing-for-ai-tools' },
    ],
  },
  redditLeadGen: {
    heading: 'Lead Generation',
    links: [
      { label: 'Reddit Lead Generation', href: '/reddit-lead-generation' },
      { label: 'Reddit Outreach Tool', href: '/reddit-outreach-tool' },
      { label: 'Find Customers on Reddit', href: '/find-customers-on-reddit' },
      { label: 'Lead Gen for SaaS', href: '/reddit-lead-generation-for-saas' },
      { label: 'Lead Gen for Shopify', href: '/reddit-lead-generation-for-shopify' },
      { label: 'Lead Gen for Agencies', href: '/reddit-lead-generation-for-agencies' },
      { label: 'Lead Gen for Startups', href: '/reddit-lead-generation-for-startups' },
      { label: 'Lead Gen for AI', href: '/reddit-lead-generation-for-ai' },
    ],
  },
  tools: {
    heading: 'Free Tools',
    links: [
      { label: 'Free Reddit Keyword Generator', href: '/free-reddit-keyword-generator' },
      { label: 'Free Subreddit Finder', href: '/free-subreddit-finder' },
    ],
  },
  alternatives: {
    heading: 'Alternatives',
    links: [
      { label: 'GummySearch Alternative', href: '/gummysearch-alternative' },
      { label: 'F5Bot Alternative', href: '/f5bot-alternative' },
      { label: 'Syften Alternative', href: '/syften-alternative' },
    ],
  },
  company: {
    heading: 'Company',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
};

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Reddit Marketing */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.redditMarketing.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.redditMarketing.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Generation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.redditLeadGen.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.redditLeadGen.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.tools.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.tools.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-gray-900 mb-4 mt-8">
              {footerLinks.alternatives.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.alternatives.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.company.heading}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p>
                <a
                  href="mailto:founder@smartpost.co.in"
                  className="text-sm text-primary hover:underline"
                >
                  founder@smartpost.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/">
            <span className="font-extrabold tracking-tight text-sm text-[#111827]">
              Smart<span className="text-primary">Post</span>
            </span>
          </Link>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SmartPost. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

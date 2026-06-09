import { Metadata } from 'next';

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.smartpost.co.in';

export function constructMetadata({
  title = 'AI Reddit Marketing Tool | Find Customers on Reddit',
  description = 'AI-powered Reddit marketing and lead generation platform. Discover subreddits, monitor conversations, find buying intent posts, and grow your business.',
  image = '/og-image.jpg',
  icons = '/favicon.ico',
  noIndex = false,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      'reddit marketing',
      'reddit marketing tool',
      'reddit lead generation',
      'b2b lead generation reddit',
      'lead generation reddit',
      'find customers on reddit',
      'marketing automation reddit',
      'ai marketing reddit',
    ],
    metadataBase: new URL(defaultUrl),
    alternates: {
      canonical: canonicalUrl ? `${defaultUrl}${canonicalUrl}` : defaultUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl ? `${defaultUrl}${canonicalUrl}` : defaultUrl,
      siteName: 'SmartPost',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@smartpost', // Replace with actual handle if available
    },
    icons,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// JSON-LD Generators

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SmartPost',
    url: defaultUrl,
    logo: `${defaultUrl}/favicon.ico`,
    description: 'AI-powered Reddit marketing and lead generation platform.',
  };
}

export function generateSoftwareApplicationSchema(
  title: string = 'SmartPost',
  description: string = 'AI-powered Reddit marketing and lead generation platform.'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: defaultUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SmartPost',
    url: defaultUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${defaultUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

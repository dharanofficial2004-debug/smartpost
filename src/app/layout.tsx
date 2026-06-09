import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Reddit Marketing Tool | Find Customers on Reddit",
  description: "AI-powered Reddit marketing and lead generation platform. Discover subreddits, monitor conversations, find buying intent posts, and grow your business.",
  keywords: [
    "reddit marketing",
    "reddit marketing tool",
    "reddit lead generation",
    "b2b lead generation reddit",
    "lead generation reddit",
    "find customers on reddit",
    "marketing automation reddit",
    "ai marketing reddit",
  ],
  metadataBase: new URL("https://smartpost.co.in"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "SmartPost | Custom AI Solutions For Modern Agencies",
    description:
      "SmartPost builds custom AI agents for digital marketing agencies. Scale your agency with automated workflows.",
    url: "https://smartpost.co.in",
    siteName: "SmartPost",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartPost | Custom AI Solutions For Modern Agencies",
    description:
      "SmartPost builds custom AI agents for digital marketing agencies.",
    images: ["/og-image.jpg"],
  },
};

import { BottomNav } from "@/components/layout/BottomNav";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BP8LLT90YM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-BP8LLT90YM');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased pb-20 md:pb-0`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

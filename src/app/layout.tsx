import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | SmartPost",
    default: "SmartPost | Custom AI Solutions For Modern Agencies",
  },
  description:
    "SmartPost builds custom AI agents for digital marketing agencies to save time and increase efficiency. From WhatsApp lead qualifiers to automated social media posting and cold email outreach.",
  keywords: [
    "SmartPost",
    "AI Agent Agency",
    "Social media automation",
    "WhatsApp AI Agent",
    "Digital Marketing AI",
    "Efficiency Automation",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased pb-20 md:pb-0`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

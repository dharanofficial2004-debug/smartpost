"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Share2,
  Mail,
  Cpu,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { ContactDialog } from "@/components/ui/ContactDialog";
import Link from "next/link";

const services = [
  {
    icon: <MessageSquare className="w-5 h-5 text-green-600" />,
    title: "WhatsApp AI Chat Agent",
    description:
      "An intelligent lead qualifier that interacts with customers on WhatsApp and automatically stores lead data in Google Sheets.",
    bg: "bg-green-50",
    href: "/services/whatsapp-agent",
    hasViewMore: true,
  },
  {
    icon: <Share2 className="w-5 h-5 text-blue-600" />,
    title: "Social Media Auto Post",
    description:
      "Automated posting for Instagram and LinkedIn. Includes infographics and festival posters (Deepawali, Pillayar Sadhurthi, etc.).",
    bg: "bg-blue-50",
    href: "/services/social-media-post",
    hasViewMore: true,
  },
  {
    icon: <Mail className="w-5 h-5 text-purple-600" />,
    title: "Cold Outreach Automation Software",
    description:
      "High-conversion cold email outreach agent that automates your prospecting while maintaining a human touch.",
    bg: "bg-purple-50",
    href: "/services/gmail-cold-mail",
    hasViewMore: true,
  },
  {
    icon: <Cpu className="w-5 h-5 text-orange-600" />,
    title: "Custom AI Agents",
    description:
      "Bespoke AI solutions tailored specifically to your agency's unique business needs and workflows.",
    bg: "bg-orange-50",
    href: null,
    hasViewMore: false,
  },
];

export function Solution() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const phoneNumber = "8838235891";

  return (
    <section
      id="services"
      className="py-12 md:py-24 bg-slate-50/50 border-y border-border/50"
    >
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <div className="inline-block text-[10px] font-bold tracking-widest text-green-600 uppercase mb-4">
          Our Services
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-16">
          AI Solutions Designed For Growth
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white border-transparent shadow-sm hover:shadow-md transition-all group rounded-2xl flex flex-col h-full"
            >
              <CardContent className="p-8 space-y-4 flex flex-col h-full">
                <div
                  className={`w-10 h-10 ${service.bg} rounded-lg flex items-center justify-center mb-4`}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#111827]">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium flex-grow">
                  {service.description}
                </p>

                {/* Buttons */}
                <div
                  className={`mt-6 flex flex-col gap-2 ${service.hasViewMore ? "" : ""}`}
                >
                  {service.hasViewMore && service.href && (
                    <Link
                      href={service.href}
                      className="w-full inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-9 px-4 text-sm bg-[#111827] text-white hover:bg-slate-800"
                    >
                      View More
                      <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </Link>
                  )}
                  <Button
                    onClick={() => setIsContactOpen(true)}
                    variant="outline"
                    size="sm"
                    className="w-full !border-slate-200 hover:!bg-[#22c55e] hover:!text-white hover:!border-[#22c55e] transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        phoneNumber={phoneNumber}
      />
    </section>
  );
}

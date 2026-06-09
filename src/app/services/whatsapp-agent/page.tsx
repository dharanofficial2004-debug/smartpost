"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactDialog } from "@/components/ui/ContactDialog";
import {
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Phone,
  ShoppingCart,
  Users,
  Share2,
  CreditCard,
} from "lucide-react";

const features = [
  "Automatically qualifies leads 24/7 on WhatsApp",
  "Stores all lead data directly into Google Sheets in real-time",
  "Handles FAQs, follow-ups, and appointment bookings",
  "Customizable conversation flows for your business",
  "Instant notifications when a hot lead is identified",
  "Seamless handoff to human agents when needed",
];

export default function WhatsAppAgentPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const phoneNumber = "8838235891";

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white py-24 border-b border-slate-100">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="container mx-auto px-6 max-w-4xl text-center relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI Automation Service
            </div>
            <div className="mx-auto w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#111827] mb-6 leading-tight">
              WhatsApp AI <span className="text-[#22c55e]">Chat Agent</span>
            </h1>
            <div className="mx-auto w-14 h-1 rounded-full bg-[#22c55e] mb-8" />
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              An intelligent lead qualifier that interacts with customers on
              WhatsApp around the clock and automatically stores every lead into
              your Google Sheets — no manual follow-up needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="px-8 h-12 !bg-[#22c55e] hover:!bg-green-600 !text-white font-bold rounded-md"
                onClick={() => setIsContactOpen(true)}
              >
                <Phone className="w-4 h-4 mr-2" /> Book a Consultation
              </Button>
              <Button
                variant="outline"
                className="px-8 h-12 font-semibold rounded-md !border-green-400 !text-green-700 hover:!bg-green-50"
                onClick={() => setIsContactOpen(true)}
              >
                <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Us
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <p className="text-xs font-bold tracking-widest text-green-600 uppercase text-center mb-4">
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-14">
              Everything Your Agency Needs
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Agents */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-xs font-bold tracking-widest text-green-600 uppercase text-center mb-4">
              Tailored Solutions
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-14">
              We Build Custom AI Agents
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* E-commerce */}
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShoppingCart className="w-48 h-48" />
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                  <ShoppingCart className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4 relative z-10">
                  Specialized Agent for E‑commerce
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
                  We connect our WhatsApp agent directly to your existing store
                  on <strong>Shopify, WooCommerce, or Wix Studio</strong>. The
                  agent acts as a 24/7 sales representative—it can answer
                  product questions, recommend items, and even close sales
                  directly within the WhatsApp chat.
                </p>
                <ul className="space-y-3 relative z-10 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Sells
                    products directly inside chat
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Syncs
                    inventory to your platform
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Reduces
                    drop-offs & cart abandonment
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="h-10 px-6 !border-slate-300 hover:!bg-[#22c55e] hover:!text-white hover:!border-[#22c55e] transition-colors rounded-md text-sm font-semibold relative z-10"
                  onClick={() => setIsContactOpen(true)}
                >
                  Discuss Your Store <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* HR */}
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Users className="w-48 h-48" />
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                  <Users className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4 relative z-10">
                  Specialized Agent for HR
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
                  Running ads for hiring? Our WhatsApp HR agent takes over the
                  recruitment pipeline. Candidates click your ad, and the agent
                  asks screening questions, collects resumes, and instantly
                  updates your applicant tracking sheet.
                </p>
                <ul className="space-y-3 relative z-10 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                    Automates initial candidate screening
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Collects
                    resumes & specific candidate data
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Syncs
                    instantly to Google Sheets
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="h-10 px-6 !border-slate-300 hover:!bg-[#22c55e] hover:!text-white hover:!border-[#22c55e] transition-colors rounded-md text-sm font-semibold relative z-10"
                  onClick={() => setIsContactOpen(true)}
                >
                  Automate Hiring <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>


              {/* WhatsApp Payment AI Agent */}
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <CreditCard className="w-48 h-48" />
                </div>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                  <CreditCard className="w-7 h-7 text-emerald-700" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-4 relative z-10">
                  WhatsApp Payment AI{" "}
                  <span className="text-[#22c55e]">Agent</span>
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6 relative z-10">
                  Custom WhatsApp AI agent with integrated payment processing.
                  Browse products, process payments, and track orders—all within
                  the chat, tailored specifically to your business needs.
                </p>
                <ul className="space-y-3 relative z-10 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom
                    AI personality for your business
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Native
                    payment processing in WhatsApp
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Syncs
                    customer data to Google Sheets
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="h-10 px-6 !border-slate-300 hover:!bg-[#22c55e] hover:!text-white hover:!border-[#22c55e] transition-colors rounded-md text-sm font-semibold relative z-10"
                  onClick={() => setIsContactOpen(true)}
                >
                  Automate Payments <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="bg-[#111827] rounded-3xl p-12 md:p-16 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Automate Your WhatsApp Leads?
              </h2>
              <p className="text-slate-300 text-lg mb-8 font-medium">
                Get in touch and we&apos;ll have your WhatsApp AI agent running
                within days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="px-8 h-12 !bg-[#22c55e] hover:!bg-green-600 !text-white font-bold rounded-md"
                  onClick={() => setIsContactOpen(true)}
                >
                  <Phone className="w-4 h-4 mr-2" /> Book a Consultation
                </Button>
                <Button
                  variant="outline"
                  className="px-8 h-12 font-semibold rounded-md !border-white/30 !text-white hover:!bg-white/10"
                  onClick={() => setIsContactOpen(true)}
                >
                  WhatsApp Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Back to all services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        phoneNumber={phoneNumber}
      />
    </div>
  );
}

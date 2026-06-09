"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactDialog } from '@/components/ui/ContactDialog';
import { Mail, CheckCircle2, ArrowRight, Phone, MessageSquare } from 'lucide-react';

const features = [
    'Automated, personalized cold email sequences at scale',
    'Human-sounding copy crafted by AI for each prospect',
    'Automatic follow-up scheduling until response',
    'Gmail API integration — send directly from your domain',
    'Prospect list building and email verification',
    'Reply detection and auto-pause when a prospect responds',
    'Detailed analytics: open rates, click rates, reply rates',
    'CRM-ready data export for your sales pipeline',
];

export default function GmailColdMailPage() {
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
                        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 70%)' }}
                    />
                    <div className="container mx-auto px-6 max-w-4xl text-center relative">
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold text-purple-700 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            AI Automation Service
                        </div>
                        <div className="mx-auto w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                            <Mail className="w-7 h-7 text-purple-600" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#111827] mb-6 leading-tight">
                            Cold Outreach <span className="text-[#22c55e]">Automation Software</span>
                        </h1>
                        <div className="mx-auto w-14 h-1 rounded-full bg-[#22c55e] mb-8" />
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                            High-conversion cold email outreach that feels personal and human. Our AI agent handles your entire prospecting pipeline — from list building to follow-ups — so your team can focus on closing.
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
                                className="px-8 h-12 font-semibold rounded-md !border-purple-400 !text-purple-700 hover:!bg-purple-50"
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
                        <p className="text-xs font-bold tracking-widest text-purple-600 uppercase text-center mb-4">What You Get</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-14">
                            Close More Deals On Autopilot
                        </h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <h3 className="text-2xl font-extrabold text-[#111827] mb-10">How It Works</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { step: '01', title: 'We Build Your Prospect List', desc: 'AI finds and verifies emails of your ideal customers.' },
                                { step: '02', title: 'AI Writes & Sends', desc: 'Personalized emails sent from your Gmail domain at scale.' },
                                { step: '03', title: 'Leads Land in Your Inbox', desc: 'Interested replies are flagged and your team steps in to close.' },
                            ].map(item => (
                                <div key={item.step} className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                                    <p className="text-3xl font-extrabold text-purple-500 mb-3">{item.step}</p>
                                    <h4 className="font-bold text-[#111827] mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section id="cta" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <div className="bg-[#111827] rounded-3xl p-12 md:p-16 shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                                Start Filling Your Sales Pipeline Today
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 font-medium">
                                Let the AI do the prospecting. You do the closing.
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
                                    <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp Now <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← Back to all services</Link>
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

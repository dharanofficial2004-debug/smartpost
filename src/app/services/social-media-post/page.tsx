"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactDialog } from '@/components/ui/ContactDialog';
import { Share2, CheckCircle2, ArrowRight, Phone, MessageSquare } from 'lucide-react';

const features = [
    'Auto-post to all platforms (Instagram, LinkedIn, X, Facebook)',
    'Intelligent client approval workflow before any post goes live',
    'Real-time content logs and metrics synced directly to Google Sheets',
    'AI-generated infographics tailored to your brand voice',
    'Festival posters: Deepawali, Pillayar Sadhurthi, Pongal & more',
    'Captions and hashtags auto-generated for maximum reach',
    'Multi-client support — seamlessly manage multiple brand accounts',
    'Full content calendar integration via automated sheets',
];

export default function SocialMediaPostPage() {
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
                        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
                    />
                    <div className="container mx-auto px-6 max-w-4xl text-center relative">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            AI Automation Service
                        </div>
                        <div className="mx-auto w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <Share2 className="w-7 h-7 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#111827] mb-6 leading-tight">
                            Social Media <span className="text-[#22c55e]">Auto Post</span>
                        </h1>
                        <div className="mx-auto w-14 h-1 rounded-full bg-[#22c55e] mb-8" />
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                            Fully automated social media publishing for Instagram and LinkedIn. AI-crafted infographics, festival posters, and captions — posted on time, every time.
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
                                className="px-8 h-12 font-semibold rounded-md !border-blue-400 !text-blue-700 hover:!bg-blue-50"
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
                        <p className="text-xs font-bold tracking-widest text-blue-600 uppercase text-center mb-4">What You Get</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-14">
                            Full-Scale Social Automation
                        </h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workflow Highlight */}
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <p className="text-xs font-bold tracking-widest text-blue-600 uppercase text-center mb-4">Intelligent Workflows</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] text-center mb-14">
                            Social Media Agent with Client Approval
                        </h2>

                        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Share2 className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 flex-1">
                                <h3 className="text-2xl font-bold text-[#111827] mb-4">
                                    Full Control Before Publishing
                                </h3>
                                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                    Our AI generates high-quality content—including copy, hashtags, and images—but <strong>nothing gets posted without your approval.</strong>{' '}
                                    The agent sends the proposed posts to you or your client via WhatsApp or Slack for a quick review. Once approved, the agent automatically publishes the post across platforms and logs the data to your Google Sheet.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle2 className="w-4 h-4 text-blue-500" /> AI-generated multi-platform content</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Simple one-click client approval workflow</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-700 font-medium"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Instant posting exactly upon approval</li>
                                </ul>
                                <Button
                                    variant="outline"
                                    className="h-12 px-8 !border-slate-300 hover:!bg-[#22c55e] hover:!text-white hover:!border-[#22c55e] transition-colors rounded-md font-semibold text-[#111827] relative z-10"
                                    onClick={() => setIsContactOpen(true)}
                                >
                                    Build Your Workflow <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Festival Poster Highlight */}
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <h3 className="text-2xl font-extrabold text-[#111827] mb-4">Festival Poster Automation</h3>
                        <p className="text-slate-500 font-medium leading-relaxed mb-6">
                            Never miss a festival again. We auto-generate and post branded festival posters for every major Indian festival — Deepawali, Pillayar Sadhurthi, Pongal, Diwali, New Year, and more — keeping your brand visible and relevant all year round.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {['Deepawali', 'Pillayar Sadhurthi', 'Pongal', 'New Year', 'Republic Day', 'Independence Day', 'Diwali', 'Onam'].map(f => (
                                <span key={f} className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">{f}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section id="cta" className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                        <div className="bg-[#111827] rounded-3xl p-12 md:p-16 shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                                Let Us Handle Your Social Media
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 font-medium">
                                Your brand stays active 24/7 while you focus on growth.
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

"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ContactDialog } from '@/components/ui/ContactDialog';

export function Hero() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const phoneNumber = "8838235891";

    return (
        <section className="relative overflow-hidden bg-white min-h-[calc(100vh-72px)] flex items-center justify-center">
            {/* Subtle background pattern */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)',
                }}
            />

            <div className="relative container mx-auto px-6 py-12 md:py-24 text-center max-w-4xl">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 mb-10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Custom AI Solutions For Modern Agencies
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#111827] mb-6 leading-[1.08]">
                    Your life&apos;s work,<br />
                    powered by <span className="text-[#22c55e]">our life&apos;s work</span>
                </h1>

                {/* Decorative underline */}
                <div className="mx-auto w-16 h-1 rounded-full bg-[#22c55e] mb-8" />

                {/* Description */}
                <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                    A unique and powerful AI automation suite to transform the way you work. Designed for businesses of all sizes, built by a company that values your privacy.
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        className="px-10 h-14 !bg-[#22c55e] hover:!bg-green-600 !text-white font-bold text-base rounded-md shadow-lg hover:shadow-xl transition-all"
                        onClick={() => setIsContactOpen(true)}
                    >
                        GET STARTED &nbsp;<ArrowRight className="w-4 h-4 inline" />
                    </Button>
                    <Link
                        href="/#services"
                        className="inline-flex items-center justify-center rounded-full font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-10 h-14 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-[0.98]"
                    >
                        Our Services
                    </Link>
                </div>

                {/* Social proof / tagline */}
                <p className="mt-10 text-sm text-slate-400 font-medium tracking-wide">
                    Pioneering the future of agency automation · Join our early-access collaboration
                </p>

            </div>

            <ContactDialog
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                phoneNumber={phoneNumber}
            />
        </section>
    );
}

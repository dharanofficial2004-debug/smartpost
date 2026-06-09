"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/ui/ContactDialog';

export function Navbar() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const phoneNumber = "8838235891";

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-6 h-[72px] flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logo.ico"
                                alt="SmartPost Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center Nav Links */}
                    <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                        <Link href="/#about" className="text-sm font-medium text-slate-600 hover:text-[#22c55e] transition-colors">About</Link>
                        <Link href="/#services" className="text-sm font-medium text-slate-600 hover:text-[#22c55e] transition-colors">Services</Link>
                        <Link href="/#cta" className="text-sm font-medium text-slate-600 hover:text-[#22c55e] transition-colors">Contact</Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            className="px-6 !bg-[#22c55e] hover:!bg-green-600 !text-white rounded-md font-semibold"
                            onClick={() => setIsContactOpen(true)}
                        >
                            Get Started
                        </Button>
                    </div>

                </div>
            </header>

            <ContactDialog
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                phoneNumber={phoneNumber}
            />
        </>
    );
}

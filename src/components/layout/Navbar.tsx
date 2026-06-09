"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/ui/ContactDialog';

export function Navbar() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const phoneNumber = "8838235891";

    useEffect(() => {
        const handleOpen = () => setIsContactOpen(true);
        window.addEventListener('open-contact-modal', handleOpen);
        return () => window.removeEventListener('open-contact-modal', handleOpen);
    }, []);

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
            {/* Nav links removed for minimalist layout */}

                    {/* CTA Button */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="px-6 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 hover:text-red-700 rounded-md font-semibold transition-all shadow-sm cursor-pointer"
                            onClick={() => setIsContactOpen(true)}
                        >
                            Start Free
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

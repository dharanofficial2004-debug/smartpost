"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, Info, Layers, Phone } from 'lucide-react';
import { ContactDialog } from '@/components/ui/ContactDialog';

export function BottomNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const phoneNumber = "8838235891";

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'About', href: '/#about', icon: <Info className="w-5 h-5" /> },
        { name: 'Services', href: '/#services', icon: <Layers className="w-5 h-5" /> },
        { name: 'Contact', href: null, icon: <Phone className="w-5 h-5" />, isContact: true },
    ];

    return (
        <>
            {/* Mobile Bottom Bar - Slimmer & Clean */}
            <div className="md:hidden fixed bottom-4 left-0 right-0 z-[100] px-6">
                <div className="bg-white border border-slate-200 shadow-xl rounded-2xl h-14 flex items-center overflow-hidden">

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-full px-5 flex items-center justify-center bg-[#111827] text-white hover:bg-slate-800 transition-colors"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    {/* Central Identity */}
                    <div className="flex-1 px-4 flex items-center justify-center">
                        <Link
                            href="/"
                            className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#111827] flex items-center gap-1.5"
                            onClick={() => setIsOpen(false)}
                        >
                            SmartPost
                            <div className="w-1 h-1 rounded-full bg-green-500" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slide-up Menu Overlay - Compact */}
            <div
                className={`md:hidden fixed inset-0 z-[90] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-[#111827]/30 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />

                {/* Menu Content */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] p-6 pb-24 transition-transform duration-500 ease-out shadow-2xl ${isOpen ? 'translate-y-0' : 'translate-y-full'
                        }`}
                >
                    <div className="w-10 h-1 bg-slate-100 rounded-full mx-auto mb-6" />

                    {/* Links List */}
                    <div className="grid gap-2">
                        {navLinks.map((link) => (
                            link.isContact ? (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsContactOpen(true);
                                    }}
                                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-green-200 hover:bg-green-50 group transition-all w-full text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-green-600 transition-colors">
                                            {link.icon}
                                        </div>
                                        <span className="text-sm font-bold text-[#111827]">{link.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
                                </button>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href!}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-green-200 hover:bg-green-50 group transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 group-hover:text-green-600 transition-colors">
                                            {link.icon}
                                        </div>
                                        <span className="text-sm font-bold text-[#111827]">{link.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500 transition-colors" />
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>

            <ContactDialog
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                phoneNumber={phoneNumber}
            />
        </>
    );
}

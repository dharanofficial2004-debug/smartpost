"use client";

import React from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { Button } from './button';

interface ContactDialogProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
}

export function ContactDialog({ isOpen, onClose, phoneNumber }: ContactDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up">
                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                            <Phone className="w-8 h-8 text-green-600" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900">Contact Our Agency</h2>
                            <p className="text-slate-500">
                                Interested in building an AI agent? <br />
                                Give us a call or message on WhatsApp.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-sm font-medium text-slate-500 mb-1">PHONE NUMBER</p>
                            <p className="text-3xl font-extrabold text-[#111827] tracking-tight">
                                {phoneNumber}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <a href={`tel:+91${phoneNumber.replace(/\s+/g, '')}`} className="w-full">
                                <Button className="w-full !bg-green-600 hover:!bg-green-700 !text-white rounded-xl">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </Button>
                            </a>
                            <a href={`https://wa.me/91${phoneNumber.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button className="w-full !bg-[#111827] hover:!bg-slate-800 !text-white rounded-xl">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

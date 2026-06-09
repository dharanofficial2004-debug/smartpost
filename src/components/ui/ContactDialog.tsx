"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Button } from './button';

interface ContactDialogProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber?: string;
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setErrorMsg('Please fill out all fields.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMsg('');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit waitlist signup');
            }

            setStatus('success');
            setName('');
            setEmail('');
        } catch (err: any) {
            console.error('Waitlist submission error:', err);
            setErrorMsg(err.message || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Dialog Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-up border border-slate-100">
                <div className="p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {status === 'success' ? (
                        <div className="text-center space-y-6 py-6 animate-fade-up">
                            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-[#ff4500]" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900">You're added to the waitlist!</h2>
                                <p className="text-slate-500 max-w-xs mx-auto">
                                    We will mail you when we launch. Keep an eye on your inbox!
                                </p>
                            </div>

                            <Button 
                                onClick={onClose}
                                className="w-full bg-[#ff4500] hover:bg-[#e03d00] text-white rounded-xl py-3 font-semibold transition-all cursor-pointer"
                            >
                                Got it, thanks!
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#ff4500]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Join the Early Waitlist</h2>
                                    <p className="text-xs text-slate-500">Get early access when we launch</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-xs font-semibold text-slate-600 block">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff4500]/25 focus:border-[#ff4500] text-slate-800 text-sm transition-all bg-slate-50/50"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-xs font-semibold text-slate-600 block">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff4500]/25 focus:border-[#ff4500] text-slate-800 text-sm transition-all bg-slate-50/50"
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-xs text-red-500 font-medium">
                                        {errorMsg}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full bg-[#ff4500] hover:bg-[#e03d00] text-white rounded-xl py-3 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Adding you...
                                        </>
                                    ) : (
                                        'Join Waitlist'
                                    )}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

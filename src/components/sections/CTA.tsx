"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';

export function CTA() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setError('');
        setStatus('loading');

        try {
            const { submitEmailForm } = await import('@/app/actions/submit-email');
            const result = await submitEmailForm(email);

            if (result.success) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('idle');
                setError(result.error || 'Something went wrong.');
            }
        } catch (err) {
            setStatus('idle');
            setError('Server connection error.');
        }
    };

    return (
        <section id="cta" className="py-12 md:py-24 bg-white font-sans">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="bg-[#111827] rounded-[2rem] p-8 md:p-20 shadow-2xl mx-auto flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
                        Ready to Automate Your Agency&apos;s Growth?
                    </h2>
                    <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-10 font-medium text-center">
                        Empower your agency with custom AI agents. From WhatsApp lead qualification to automated social media posting — we build the tools that let you scale.
                    </p>

                    <div className="w-full max-w-md">
                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-6 space-y-4 animate-in fade-in zoom-in duration-300 bg-white/10 rounded-2xl border border-white/20 p-8 text-white">
                                <CheckCircle2 className="w-12 h-12 text-green-400" />
                                <h3 className="text-xl font-bold">You&apos;re on the list!</h3>
                                <p className="text-sm text-slate-300">We&apos;ll be in touch shortly.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4 bg-transparent text-white border-white/30 hover:bg-white/10 w-full"
                                    onClick={() => setStatus('idle')}
                                >
                                    Join with another email
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto bg-white p-3 sm:p-2 rounded-2xl sm:rounded-full shadow-lg">
                                <div className="flex-1 px-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your agency email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={error}
                                        disabled={status === 'loading'}
                                        className="bg-transparent border-none text-[#111827] h-12 w-full focus-visible:ring-0 shadow-none px-4 sm:px-6"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="h-12 px-8 whitespace-nowrap !bg-[#111827] !text-white hover:!bg-slate-800 font-bold rounded-xl sm:rounded-full"
                                >
                                    {status === 'loading' ? 'Securing...' : 'Get Beta Access'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

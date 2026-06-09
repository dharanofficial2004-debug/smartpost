"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContactDialog } from '@/components/ui/ContactDialog';

export function AgencyFeedback() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const phoneNumber = "8838235891";

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="container mx-auto px-4 max-w-5xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-6">
                    Let&apos;s Build Your Agency&apos;s AI Future
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                    We&apos;re collaborating with forward-thinking digital marketing agencies to develop the next generation of AI agents. Your specific use cases help us build agents that drive real business results.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left mb-16">
                    <Card className="bg-slate-50 border-transparent shadow-none hover:shadow-md transition-shadow rounded-2xl">
                        <CardContent className="p-8 space-y-4">
                            <h3 className="text-lg font-bold text-[#111827]">Custom Agent Consultation</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                Have a specific workflow that needs automation? Let&apos;s discuss how a custom-built AI agent can handle your most repetitive tasks.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-transparent shadow-none hover:shadow-md transition-shadow rounded-2xl">
                        <CardContent className="p-8 space-y-4">
                            <h3 className="text-lg font-bold text-[#111827]">Agent Use Case Partnership</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                Agencies often manage unique client needs. Partner with us to develop specialized agents for niche marketing requirements and industries.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-50 border-transparent shadow-none hover:shadow-md transition-shadow rounded-2xl">
                        <CardContent className="p-8 space-y-4">
                            <h3 className="text-lg font-bold text-[#111827]">Beta Program for Agencies</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                Join our beta program to get early access to our latest social media and communication agents before they go public.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        size="lg"
                        className="px-10 h-14 !bg-[#22c55e] hover:!bg-green-600 !text-white font-bold text-lg rounded-md shadow-lg transition-all"
                        onClick={() => setIsContactOpen(true)}
                    >
                        Book a Consultation
                    </Button>
                    <p className="text-sm text-slate-500 font-medium mt-6">
                        Or reach out directly at <span className="text-green-600 font-bold">hello@smartpost.co.in</span>
                    </p>
                </div>
            </div>

            <ContactDialog
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                phoneNumber={phoneNumber}
            />
        </section>
    );
}

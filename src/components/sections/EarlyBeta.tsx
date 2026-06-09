import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export function EarlyBeta() {
    return (
        <section className="py-24 bg-slate-50 border-t border-border/50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-6">
                    Questions Before Trying SmartPost?
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                    SmartPost is currently in early beta. If you're an agency managing Instagram accounts and want to understand how it works, pricing, or whether it fits your workflow, feel free to reach out directly.
                </p>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12 mx-auto max-w-2xl text-left">
                    <h3 className="text-2xl font-bold text-[#111827] mb-4 text-center">
                        Contact the Builder
                    </h3>
                    <p className="text-slate-600 mb-8 text-center leading-relaxed">
                        If you're managing multiple Instagram accounts for clients and want to test SmartPost early, feel free to reach out. I'm currently onboarding a small group of agencies to understand real workflows and improve the product.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center border border-slate-100">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Mail className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-[#111827]">Email:</span>
                            <a href="mailto:hello@smartpost.co.in" className="text-green-600 font-medium hover:underline">hello@smartpost.co.in</a>
                        </div>

                        <div className="text-sm text-slate-500 text-left max-w-xs mx-auto">
                            <p className="mb-2 font-medium text-slate-600">You can reach out to:</p>
                            <ul className="space-y-1">
                                <li>&bull; ask questions about the workflow</li>
                                <li>&bull; understand how SmartPost works with agencies</li>
                                <li>&bull; request early beta access</li>
                                <li>&bull; share how your team schedules posts today</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <a href="mailto:hello@smartpost.co.in?subject=Request Beta Access">
                            <Button className="px-8 h-14 whitespace-nowrap !bg-[#111827] hover:!bg-slate-800 !text-white font-semibold text-base rounded-full mb-3">
                                Request Beta Access
                            </Button>
                        </a>
                        <p className="text-xs text-slate-400 font-medium text-center">
                            Early testers help shape the product and get priority access to new features.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

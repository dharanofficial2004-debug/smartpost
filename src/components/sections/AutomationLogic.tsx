import React from 'react';
import { Cpu, Layout, Sheet, FileText, MousePointer2, Zap } from 'lucide-react';

export function AutomationLogic() {
    return (
        <section className="py-12 md:py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Simple Explanation */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Zap className="w-3 h-3" />
                                Pure Automation
                            </div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] mb-6 leading-tight">
                                AI That Works Inside Your <br />
                                <span className="text-green-500">Daily Tools</span>
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
                                "Most agencies talk about AI marketing, but they haven&apos;t explored true automation."
                            </p>
                            <p className="mt-4 text-lg text-slate-600 font-medium leading-relaxed">
                                True AI automation isn&apos;t a new app to learn. It&apos;s a smart system that lives inside the tools you already use every day—making your team faster and your agency more efficient without any extra effort.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                                    <Sheet className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#111827] mb-2">Google Sheets & Docs</h4>
                                    <p className="text-slate-500 font-medium italic">We automate your daily habitat tools.</p>
                                    <p className="text-slate-500 font-medium mt-1">Our AI agents read, write, and update your sheets and documents automatically, saving your team hours of manual entry.</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                                    <Layout className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-[#111827] mb-2">Canva & Design Assets</h4>
                                    <p className="text-slate-500 font-medium">Link your creative assets to your automation loop. AI helps manage your design flows, ensuring your content is always ready-to-post.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual Flow */}
                    <div className="relative">
                        <div className="bg-[#111827] rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 p-12 opacity-5">
                                <Cpu className="w-64 h-64 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold mb-10 relative z-10 flex items-center gap-3">
                                <MousePointer2 className="w-6 h-6 text-green-400" />
                                How It Simplifies Your Work
                            </h3>

                            <div className="space-y-8 relative z-10">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Step 1: Auto-Fetch</span>
                                        <FileText className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <p className="text-sm text-slate-300">Data is automatically pulled from your existing systems, emails, or Google Sheets.</p>
                                </div>

                                <div className="flex justify-center -my-4 relative z-20">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Step 2: AI Magic</span>
                                        <Cpu className="w-4 h-4 text-green-400" />
                                    </div>
                                    <p className="text-sm text-slate-200 font-semibold italic">The AI processes everything, organizes it, and prepares it for action—instantly.</p>
                                </div>

                                <div className="flex justify-center -my-4 relative z-20">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Step 3: Direct Update</span>
                                        <Sheet className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <p className="text-sm text-slate-300">Results are sent straight back to your Sheets, Canva projects, or client portals automatically.</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full bg-green-500/5 rounded-[2.5rem] -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}

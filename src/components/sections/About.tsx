import React from 'react';
import { Target, Users, Zap, ShieldCheck, Award } from 'lucide-react';

export function About() {
    return (
        <section id="about" className="py-16 md:py-32 bg-slate-50/50">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <div className="max-w-3xl mb-12 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider mb-6">
                        <Award className="w-3 h-3" />
                        Our Mission
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-[#111827] mb-8 leading-[1.1] tracking-tight">
                        Revolutionizing Agencies with <span className="text-green-500">Autonomous Systems</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium leading-relaxed">
                        SmartPost is a high-performance AI automation startup focused on a single goal: giving digital marketing agencies their time back. We engineer custom AI Agents that don't just "help"—they take full ownership of repetitive systems.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12 md:mb-20">

                    {/* Focus Point 1 */}
                    <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Zap className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#111827] mb-4">Extreme Efficiency</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            We architect workflows that reduce manual dependencies by up to 95%. Our agents work 24/7, ensuring your agency scales without increasing headcount.
                        </p>
                    </div>

                    {/* Focus Point 2 */}
                    <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Users className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#111827] mb-4">Empowered Teams</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            By offloading drudgery to AI, your employees are free to focus on strategy and creativity—the high-value work that clients actually pay for.
                        </p>
                    </div>

                    {/* Focus Point 3 */}
                    <div className="group bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <Target className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#111827] mb-4">Predictable Growth</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Automated lead qualification and delivery systems ensure your pipeline is always full and your operations remain resilient 365 days a year.
                        </p>
                    </div>

                </div>

                {/* Professional Footer Detail */}
                <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-6">
                    <div className="flex items-center gap-4 text-slate-400">
                        <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-semibold uppercase tracking-widest leading-relaxed text-left">Built for performance · Scaled with AI</span>
                    </div>
                    <div className="text-left">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-1">Founder & Visionary</p>
                        <p className="text-lg font-extrabold text-[#111827]">Dharanidharan <span className="text-slate-300 font-light mx-2">|</span> <span className="text-green-500 font-bold">Madurai</span></p>
                    </div>
                </div>

            </div>
        </section>
    );
}

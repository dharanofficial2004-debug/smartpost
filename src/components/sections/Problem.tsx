import React from 'react';
import { FileSpreadsheet, Copy, LayoutTemplate, CalendarClock, ArrowDown } from 'lucide-react';

export function Problem() {
    return (
        <section id="problem" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="inline-block text-[10px] font-bold tracking-widest text-[#22c55e] uppercase mb-4">
                    How Agencies Schedule Posts Today
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-8">
                    The Current Workflow Agencies Use
                </h2>

                {/* Visual Flow */}
                <div className="flex flex-col items-center justify-center space-y-4 mb-14 max-w-lg mx-auto">
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Google Sheets (planning)</span>
                        <FileSpreadsheet className="text-green-500 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-slate-300 w-5 h-5" />
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Copy captions + images</span>
                        <Copy className="text-slate-400 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-slate-300 w-5 h-5" />
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Open Buffer / Hootsuite / Login to clients accounts</span>
                        <LayoutTemplate className="text-slate-400 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-slate-300 w-5 h-5" />
                    <div className="bg-white border border-red-200 bg-red-50/50 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-bold text-red-600">Schedule again</span>
                        <CalendarClock className="text-red-500 w-5 h-5" />
                    </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                    <p>
                        Most agencies already plan content in Google Sheets because clients understand it easily.
                        But the final step still requires copying every post into scheduling tools like Buffer or Hootsuite.
                    </p>
                    <p className="text-[#111827] font-bold">
                        That extra step is where teams lose hours every week.
                    </p>
                </div>
            </div>
        </section>
    );
}

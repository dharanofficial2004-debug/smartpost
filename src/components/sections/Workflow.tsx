import React from 'react';
import { FileSpreadsheet, CheckCircle2, Clock, UploadCloud, ArrowDown } from 'lucide-react';

export function Workflow() {
    return (
        <section id="workflow" className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <div className="inline-block text-[10px] font-bold tracking-widest text-[#22c55e] uppercase mb-4">
                    Our Workflow
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-8">
                    From Concept to Custom AI Agent
                </h2>

                {/* Visual Flow */}
                <div className="flex flex-col items-center justify-center space-y-4 mb-14 max-w-lg mx-auto">
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">1. Discovery & Needs Analysis</span>
                        <FileSpreadsheet className="text-green-500 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-slate-300 w-5 h-5" />
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">2. Custom Agent Development</span>
                        <CheckCircle2 className="text-blue-500 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-slate-300 w-5 h-5" />
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full flex items-center justify-between">
                        <span className="font-semibold text-slate-700">3. Integration & Testing</span>
                        <Clock className="text-orange-400 w-5 h-5" />
                    </div>
                    <ArrowDown className="text-green-300 w-5 h-5" />
                    <div className="bg-green-500 border border-green-600 px-6 py-4 rounded-xl shadow-md w-full flex items-center justify-between">
                        <span className="font-bold text-white">4. Scaling & Optimization</span>
                        <UploadCloud className="text-white w-5 h-5" />
                    </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-4 text-lg text-slate-600 font-medium leading-relaxed">
                    <p>
                        We don't just build agents; we architect end-to-end automated solutions that integrate seamlessly into your agency's existing digital marketing workflows.
                    </p>
                    <p className="text-[#111827] font-bold text-xl pt-4">
                        Custom built. Fully automated. Scalable results.
                    </p>
                </div>
            </div>
        </section>
    );
}

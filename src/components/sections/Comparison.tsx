import React from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Comparison() {
  return (
    <section id="comparison" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <div className="inline-block text-[10px] font-bold tracking-widest text-[#22c55e] uppercase mb-4">
          Comparison
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-12">
          Sheets + SmartPost vs Traditional Scheduling Tools
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 font-semibold text-slate-700 w-1/3">
                    Feature
                  </th>
                  <th className="p-6 font-bold text-[#111827] text-lg w-1/3 bg-green-50/50 border-x border-slate-100">
                    SmartPost
                  </th>
                  <th className="p-6 font-semibold text-slate-500 w-1/3">
                    Buffer / Hootsuite
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium bg-white">
                <tr>
                  <td className="p-6 text-slate-700 border-b border-slate-100">
                    Plan content in Google Sheets
                  </td>
                  <td className="p-6 bg-green-50/50 border border-slate-100 font-bold text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Native
                    </div>
                  </td>
                  <td className="p-6 text-slate-500 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-slate-300" /> Export /
                      Import
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700 border-b border-slate-100">
                    Publish automatically
                  </td>
                  <td className="p-6 bg-green-50/50 border border-slate-100 font-bold text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> using
                      Meta API
                    </div>
                  </td>
                  <td className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-slate-300" /> using Meta
                      API
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700 border-b border-slate-100">
                    Copy posts between tools
                  </td>
                  <td className="p-6 bg-green-50/50 border border-slate-100 font-bold text-green-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" /> Not
                      needed
                    </div>
                  </td>
                  <td className="p-6 text-amber-600 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Required
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700 border-b border-slate-100">
                    Multi-client workflows
                  </td>
                  <td className="p-6 bg-green-50/50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </td>
                  <td className="p-6 border-b border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-slate-300" />
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700">Monthly pricing</td>
                  <td className="p-6 bg-green-50/50 border-x border-slate-100 font-bold text-green-600">
                    Lower
                  </td>
                  <td className="p-6 text-slate-500">Higher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 text-lg text-slate-600 font-medium leading-relaxed">
          <p>
            Most social media tools charge $15–$39 per month depending on
            features.
          </p>
          <p>
            SmartPost focuses on one thing: turning your Google Sheet into the
            scheduler, which makes it significantly simpler for teams that
            already use spreadsheets to plan content.
          </p>
        </div>

        {/* Why WhatsApp Agent Section */}
        <div className="mt-24 pt-24 border-t border-slate-200">
          <div className="inline-block text-[10px] font-bold tracking-widest text-[#22c55e] uppercase mb-4">
            Why Choose WhatsApp Agent
          </div>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-4">
            The Advantage Over Traditional Social Media
          </h3>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-16">
            While social media reaches audiences in public feeds, WhatsApp operates in a private, one-to-one channel where engagement converts to real business results.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Personal Connection */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h4 className="text-xl font-bold text-[#111827] mb-4">
                Personal, Not Public
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Social media posts disappear in crowded feeds. WhatsApp conversations are personal, direct, and persistent—your message stays with the client in their chat.
              </p>
            </div>

            {/* Easy Retargeting */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h4 className="text-xl font-bold text-[#111827] mb-4">
                Effortless Retargeting
              </h4>
              <p className="text-slate-600 leading-relaxed">
                No need for expensive retargeting campaigns across multiple platforms. Reach existing leads with a single message on WhatsApp—your AI agent handles follow-ups automatically.
              </p>
            </div>

            {/* Faster Results */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-purple-700">3</span>
              </div>
              <h4 className="text-xl font-bold text-[#111827] mb-4">
                Faster Conversion
              </h4>
              <p className="text-slate-600 leading-relaxed">
                WhatsApp has a 98% open rate. Clients see your message instantly and respond faster—no algorithm delays, no feed competition. Results come 3-5x quicker than social media.
              </p>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-gradient-to-r from-[#111827] to-slate-800 rounded-2xl p-10 max-w-3xl mx-auto text-white">
            <h4 className="text-2xl font-bold mb-6">The Bottom Line</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span><strong>Higher engagement rates:</strong> 1-on-1 messaging drives more action than broadcast posts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span><strong>Lower customer acquisition cost:</strong> Reach warm leads via WhatsApp instead of cold ad spend</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <span><strong>Measurable ROI:</strong> Every interaction is tracked and logged to Google Sheets for full transparency</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

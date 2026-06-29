import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bank Statement to Excel Converter — New Tool by SmartPost Founder',
    description: 'I built a free bank statement converter alongside SmartPost. Convert any bank PDF to Excel with live editable preview.',
};

export default function BankStatementConverterBlogPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 py-12 md:py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <article className="prose prose-slate prose-lg max-w-none text-slate-600">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 leading-tight">
                            I Built a Second Tool: Free Bank Statement to Excel Converter
                        </h1>
                        
                        <div className="mb-10 text-sm text-slate-500">
                            Published by SmartPost Founder
                        </div>

                        <div className="space-y-6 text-lg">
                            <p>
                                While building and growing SmartPost, I noticed a recurring pain point for many small business owners and freelancers: dealing with bank statements in PDF format.
                            </p>
                            
                            <p>
                                Whether it's for tax season, accounting, or just keeping track of expenses, manually copying transaction data from a PDF into a spreadsheet is a massive waste of time. I wanted a simple, reliable way to turn those PDFs into structured data.
                            </p>
                            
                            <p>
                                So, I built a solution. You can check it out here: {' '}
                                <a 
                                    href="https://bankstatementtoexcelconverter.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary font-medium hover:underline"
                                >
                                    bankstatementtoexcelconverter.com
                                </a>
                            </p>

                            <h2 className="text-2xl font-bold text-[#111827] mt-8 mb-4">
                                Convert any bank PDF to Excel with a live editable preview
                            </h2>

                            <p>
                                The tool uses AI to accurately extract transactions, dates, descriptions, and amounts from almost any bank statement PDF. Before you even export the data, you get a live, editable spreadsheet right in your browser. This means you can clean up the data, fix any OCR quirks, and organize everything exactly how you need it.
                            </p>

                            <p>
                                Just like with SmartPost, the goal is to save you time on tedious tasks so you can focus on growing your business. Give it a try the next time you need to digitize your financial statements!
                            </p>
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | SmartPost',
    description: 'Terms and Conditions for using the SmartPost automation platform.',
};

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-bold text-[#111827] mb-2">Terms & Conditions</h1>
                    <p className="text-slate-500 mb-8">Last Updated: February 3, 2026</p>

                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Acceptance of Terms</h2>
                            <p className="mb-4">
                                Welcome to SmartPost. By accessing or using our platform (“Services”), you agree to be bound by these Terms and Conditions (“Terms”). If you do not agree, do not use the Services.
                            </p>
                            <p>
                                SmartPost may update these Terms at any time. Continued use indicates acceptance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. Service Description</h2>
                            <p className="mb-4">SmartPost is a web-based Instagram publishing tool that allows users to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Connect their Instagram Professional (Business) account</li>
                                <li>Create and publish Instagram feed posts</li>
                                <li>Schedule posts for future times</li>
                                <li>Manage posting workflows through a simple dashboard</li>
                            </ul>
                            <p>
                                All services are provided “as is” and may be modified or discontinued at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Account Registration and Eligibility</h2>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">3.1 Eligibility</h3>
                            <p className="mb-4">To use SmartPost, you must:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Be at least 18 years old</li>
                                <li>Have legal capacity to enter into agreements</li>
                                <li>Be authorized to connect the Instagram account you link</li>
                            </ul>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">3.2 Account Security</h3>
                            <p>
                                You are responsible for keeping your login credentials secure and notifying us of any unauthorized access.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Instagram Account Connection</h2>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">4.1 Authorization</h3>
                            <p className="mb-4">By connecting an Instagram Professional account, you confirm that:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>You own or are authorized to manage the account</li>
                                <li>You agree to grant SmartPost the permissions requested through Instagram Business Login OAuth</li>
                            </ul>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">4.2 Instagram Permissions</h3>
                            <p className="mb-4">SmartPost uses only the minimum required Instagram permissions:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li><strong className="text-slate-700">instagram_business_basic</strong> – to retrieve Instagram Business Account ID, username, and profile picture</li>
                                <li><strong className="text-slate-700">instagram_business_content_publish</strong> – to create and publish posts to your Instagram Business account</li>
                            </ul>
                            <p>
                                You may revoke access at any time through your Instagram settings or your SmartPost dashboard.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">5. User Responsibilities & Acceptable Use</h2>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">5.1 Content Responsibility</h3>
                            <p className="mb-4">You are solely responsible for the content you upload and publish. Your content must:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Follow Instagram’s Community Guidelines</li>
                                <li>Not violate any laws</li>
                                <li>Not violate intellectual property rights</li>
                            </ul>

                            <h3 className="text-xl font-bold text-[#111827] mb-2 mt-6">5.2 Prohibited Activities</h3>
                            <p className="mb-4">You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use SmartPost for any unlawful activity</li>
                                <li>Attempt unauthorized access</li>
                                <li>Upload harmful or abusive content</li>
                                <li>Violate Instagram’s or Meta’s API terms</li>
                                <li>Interfere with platform security or operation</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">6. Instagram API Usage & Limitations</h2>
                            <p className="mb-4">SmartPost operates according to Meta’s Platform Policies. You acknowledge that:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Instagram may enforce rate limits</li>
                                <li>API changes may affect functionality</li>
                                <li>SmartPost cannot guarantee uninterrupted API access</li>
                            </ul>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

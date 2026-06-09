import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | SmartPost',
    description: 'Privacy Policy for SmartPost automation services.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 py-10">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-4xl font-bold text-[#111827] mb-8">Privacy Policy</h1>

                    <div className="prose prose-slate max-w-none text-slate-600 space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">1. Information We Collect</h2>
                            <p className="mb-4">We collect information that you provide directly to us when using SmartPost, including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Account information (email address, agency name).</li>
                                <li>Authentication data required to securely connect your Google Sheets and Instagram accounts.</li>
                                <li>Content data (captions, images, video links) necessary for scheduling and publishing your posts.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected information exclusively to provide and maintain the SmartPost service:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To authenticate your identity and secure your connections.</li>
                                <li>To read your designated Google Sheets for scheduling purposes.</li>
                                <li>To automatically publish approved content to your connected Instagram accounts via official APIs.</li>
                                <li>To communicate with you regarding account status, beta access, and critical service updates.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">3. Data Security and Third-Party APIs</h2>
                            <p className="mb-4">
                                SmartPost acts entirely as a conduit between Google Sheets and Instagram. We do not permanently store your client's media or content. Once a post is successfully published to Instagram, the post data is flushed from our active memory cache. We utilize official OAuth flows for both Google and Meta (Instagram) APIs, meaning we never store your actual passwords.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">4. Information Sharing</h2>
                            <p className="mb-4">
                                We do not sell, rent, or trade your personal information or your clients' data to any third parties for marketing purposes. Data is only shared with essential infrastructure providers (like hosting and email delivery services) strictly for the purpose of operating SmartPost.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#111827] mb-4">5. Contact Us</h2>
                            <p>
                                If you have any questions or concerns regarding this Privacy Policy or your data, please contact us at: <a href="mailto:hello@smartpost.co.in" className="text-green-600 font-medium hover:underline">hello@smartpost.co.in</a>.
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

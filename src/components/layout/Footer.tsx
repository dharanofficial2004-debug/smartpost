import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full bg-white py-10 border-t border-border">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
                <div className="flex items-center gap-1">
                    <Link href="/">
                        <span className="font-extrabold tracking-tight text-sm text-[#111827]">Smart<span className="text-primary">Post</span></span>
                    </Link>
                </div>

                <p className="text-slate-400">
                    &copy; {new Date().getFullYear()} SmartPost. All rights reserved.
                </p>

                <div className="flex items-center gap-6 text-slate-400">
                    <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</a>
                    <a href="/terms" className="hover:text-slate-600 transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}

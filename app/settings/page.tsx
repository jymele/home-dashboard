import SettingsForm from '@/app/settings/form';
import FluentHeader from '@/components/custom/FluentHeader';
import Link from 'next/link';
import { Suspense } from 'react';

export default function SettingsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
            <Suspense fallback={<div className="h-12 sm:h-14 bg-primary" />}>
                <FluentHeader />
            </Suspense>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-700 bg-white hover:bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-2xs transition-all"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                {/* Page Title & Intro */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Dashboard Settings
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Configure your home hub title, location coordinates, and display options.
                    </p>
                </div>

                <Suspense
                    fallback={
                        <div className="bg-white rounded-xl border border-slate-200/90 p-8 text-center text-slate-400 animate-pulse text-sm">
                            Loading configuration settings...
                        </div>
                    }
                >
                    <SettingsForm />
                </Suspense>
            </main>
        </div>
    );
}

import Link from 'next/link';
import { getSettings } from '@/lib/settings';

export default async function FluentHeader() {
    const settings = await getSettings();
    const title = settings.dashboardTitle || 'Home Dashboard';
    const locationName = [settings.city_name, settings.country_code].filter(Boolean).join(', ');

    return (
        <header className="sticky top-0 z-30 w-full bg-primary text-white shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
                {/* Left: App Launcher & Title */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="p-1.5 rounded-md hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                        title="App Launcher"
                        aria-label="App Launcher"
                    >
                        <svg className="w-5 h-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="4" cy="4" r="1.75" />
                            <circle cx="10" cy="4" r="1.75" />
                            <circle cx="16" cy="4" r="1.75" />
                            <circle cx="4" cy="10" r="1.75" />
                            <circle cx="10" cy="10" r="1.75" />
                            <circle cx="16" cy="10" r="1.75" />
                            <circle cx="4" cy="16" r="1.75" />
                            <circle cx="10" cy="16" r="1.75" />
                            <circle cx="16" cy="16" r="1.75" />
                        </svg>
                    </button>

                    <div className="h-5 w-px bg-white/20 hidden sm:block" />

                    <div className="flex items-center gap-2.5">
                        <Link href="/" className="font-semibold text-sm sm:text-base tracking-tight text-white hover:text-white/90 transition-colors">
                            {title}
                        </Link>
                        <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent text-white shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Live Hub
                        </span>
                    </div>
                </div>

                {/* Right: Location & Settings Link */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {locationName && (
                        <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-2.5 py-1 rounded-md">
                            <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{locationName}</span>
                        </div>
                    )}

                    <Link
                        href="/settings"
                        className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-white/90 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors text-xs font-medium inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-white/40"
                        title="Dashboard Settings"
                        aria-label="Dashboard Settings"
                    >
                        <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span className="hidden sm:inline">Settings</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

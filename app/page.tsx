import WeeklyWeather from "@/components/custom/WeeklyWeather";
import MainDayWeather from "@/components/custom/MainDayWeather";
import FluentHeader from "@/components/custom/FluentHeader";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      <Suspense fallback={<div className="h-12 sm:h-14 bg-primary" />}>
        <FluentHeader />
      </Suspense>

      {/* Floating Settings FAB in top right */}
      <Link
        href="/settings"
        title="Settings"
        aria-label="Settings"
        className="fixed top-16 sm:top-20 right-4 sm:right-6 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-primary hover:text-white hover:bg-primary border border-slate-200/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Link>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        <Suspense
          fallback={
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-12 flex items-center justify-center text-slate-400 gap-3 text-sm animate-pulse">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading current conditions...
            </div>
          }
        >
          <MainDayWeather />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-12 mt-6 flex items-center justify-center text-slate-400 gap-3 text-sm animate-pulse">
              <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading 7-day forecast...
            </div>
          }
        >
          <WeeklyWeather />
        </Suspense>
      </main>
    </div>
  );
}

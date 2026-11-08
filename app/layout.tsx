import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Dashboard",
  description: "Personal Dashboard for Home Information - Microsoft 365 Design",
};

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f6f8] text-slate-900">{children}</body>
    </html>
  );
}

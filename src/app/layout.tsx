import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan & Play",
  description: "Organize your study plans and schedules with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical routes */}
        <link rel="preload" href="/matakuliah" as="fetch" />
        <link rel="preload" href="/jadwal" as="fetch" />
        <link rel="preload" href="/daftar-tugas" as="fetch" />
        <link rel="preload" href="/rencana" as="fetch" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 overflow-hidden`}
      >
        <div className="flex h-[calc(100vh-2rem)] gap-6 rounded-3xl bg-white/70 backdrop-blur-sm p-6 shadow-2xl border border-white/20 overflow-hidden">
          <div className="w-[350px]">
            <Navbar />
          </div>
          <main className="flex-1 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 shadow-xl border border-white/30 overflow-y-auto backdrop-blur-sm">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                  </div>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
        </div>
      </body>
    </html>
  );
}

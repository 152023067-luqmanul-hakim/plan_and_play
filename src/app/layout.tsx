import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden`} >
        <div className="flex h-[calc(100vh-2rem)] gap-4 rounded-2xl bg-white/50 p-4 overflow-hidden">
          <div className="w-[350px]">
            <Navbar />
          </div>
          <main className="flex-1 bg-white rounded-2xl p-8 shadow-sm overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

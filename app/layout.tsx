"use client";

import React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import FactsTicker from "@/components/Ticker";
import FarcasterReady from "@/components/FarcasterReady";

export const metadata: Metadata = {
  title: "BetrFacts",
  description: "Facts about the betrmint rounds provided by the community",
  openGraph: {
    title: "BetrFacts",
    description: "Facts about the betrmint rounds provided by the community",
    images: ["https://betrfacts.vercel.app/image.png"],
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "1",
      imageUrl: "https://betrfacts.vercel.app/image.png",
      button: {
        title: "BetrFacts",
        action: {
          type: "launch_frame",
          name: "BetrFacts",
          url: "https://betrfacts.vercel.app",
          splashImageUrl: "https://betrfacts.vercel.app/splash.png",
          splashBackgroundColor: "#000000",
        },
      },
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FarcasterReady />
        <div id="app-root" className="bg-black shadow-2xl">
          <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#00f3ff]/10">
            <FactsTicker />
            <div className="flex justify-center items-center py-4 px-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#e6007e] flex items-center justify-center font-black text-[#e6007e] text-xs">B</div>
                <h1 className="text-lg font-black tracking-tighter uppercase italic">
                  Betr <span className="text-[#e6007e]">Facts</span>
                </h1>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 pb-24">
            {children}
          </main>

          {/* Bottom Navigation (Mockup for Mini App feel) */}
          <nav className="fixed bottom-0 w-full max-w-[450px] bg-black border-t border-[#00f3ff]/10 py-4 px-8 flex justify-between items-center z-50">
            <div className="text-[#00f3ff] text-[10px] font-bold uppercase">Wiki</div>
            <div className="text-white/40 text-[10px] font-bold uppercase hover:text-[#e6007e] cursor-pointer">Airdrop</div>
            <div className="text-white/40 text-[10px] font-bold uppercase hover:text-[#e6007e] cursor-pointer">Profile</div>
          </nav>
        </div>
      </body>
    </html>
  );
}
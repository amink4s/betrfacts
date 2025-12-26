import React from "react";
import Link from "next/link";

export default function RoundCard({ round }: { round: any }) {
  // Toggle between Pink and Cyan borders like the Betrmint UI
  const isPink = round.round_number % 2 !== 0;
  const borderColor = isPink ? "border-[#e6007e]" : "border-[#00f3ff]";
  const footerBg = isPink ? "bg-[#e6007e]/90" : "bg-[#00f3ff]/90";

  return (
    <Link href={`/rounds/${round.round_number}`} className="block transition-transform active:scale-95">
      <div className={`relative aspect-[4/5] rounded-[1.5rem] overflow-hidden border-[1.5px] ${borderColor} bg-black`}>
        {/* GIF support is automatic with img tags */}
        <img 
          src={round.image_url} 
          alt={`Round ${round.round_number}`}
          className="w-full h-full object-cover"
        />
        
        {/* Semi-transparent footer bar */}
        <div className={`absolute bottom-0 w-full ${footerBg} py-1.5 px-2 text-center`}>
          <div className="text-[9px] text-black font-black uppercase leading-none truncate">
            Round {round.round_number}
          </div>
          <div className="text-[8px] text-black/70 font-bold truncate">
            @{round.artist_username}
          </div>
        </div>
      </div>
    </Link>
  );
}
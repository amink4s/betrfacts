import React from "react";
import Link from "next/link";

export default function RoundCard({ round }: { round: any }) {
  // Use unique colors for different rounds to match the variety in the screenshots
  const isCyan = round.round_number % 2 === 0;
  const borderColor = isCyan ? "border-[#00f3ff]" : "border-[#e6007e]";
  const barColor = isCyan ? "bg-[#00f3ff]/20" : "bg-[#e6007e]/20";
  const textColor = isCyan ? "text-[#00f3ff]" : "text-[#e6007e]";

  return (
    <Link href={`/rounds/${round.round_number}`} className="snap-start block">
      <div className={`w-[180px] h-[210px] relative rounded-[2rem] overflow-hidden border-2 ${borderColor} bg-black shadow-lg transition-transform active:scale-95`}>
        {/* Supporting GIFs as identified in your inspection */}
        <img 
          src={round.image_url} 
          alt={`Round ${round.round_number}`}
          className="w-full h-[155px] object-cover"
        />
        
        {/* Footer info bar matching Betrmint's UI */}
        <div className={`absolute bottom-0 w-full ${barColor} backdrop-blur-md px-3 py-2 h-[55px] flex flex-col justify-center items-center text-center`}>
          <div className="text-[10px] text-white font-bold truncate w-full">
            BETR Round {round.round_number}
          </div>
          <div className={`text-[9px] ${textColor} font-bold truncate w-full`}>
            @{round.artist_username}
          </div>
        </div>
      </div>
    </Link>
  );
}
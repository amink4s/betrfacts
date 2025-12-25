import React from "react";

export default function FactsTicker() {
  const text = "$FACTS TOKEN LIVE • DOCUMENTING THE BETRMINT ECOSYSTEM • CONTRIBUTE TO EARN • ";
  
  return (
    <div className="w-full bg-[#e6007e] py-1 overflow-hidden whitespace-nowrap">
      <div className="flex w-max">
        <div className="animate-marquee inline-block text-[9px] font-black text-white uppercase tracking-tighter">
          {text} {text} {text} {text}
        </div>
      </div>
    </div>
  );
}
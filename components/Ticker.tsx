import React from "react";

export default function FactsTicker() {
  const text = "$FACTS TOKEN LIVE • DOCUMENTING THE BETRMINT ECOSYSTEM • CONTRIBUTE TO EARN • ";
  return (
    <div
      className="w-full bg-[#e6007e] overflow-hidden flex items-center h-7"
      style={{ height: "28px" }}
    >
      <div
        className="animate-marquee flex items-center"
        style={{ minWidth: "200%" }}
      >
        <span
          className="text-[11px] font-black text-white uppercase tracking-tighter whitespace-nowrap"
          style={{ lineHeight: "28px" }}
        >
          {text.repeat(10)}
        </span>
      </div>
    </div>
  );
}
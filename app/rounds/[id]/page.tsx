"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RoundDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [round, setRound] = useState<any>(null);

  useEffect(() => {
    // Fetch single round data from your API
    fetch(`/api/rounds/detail?id=${id}`)
      .then(res => res.json())
      .then(data => setRound(data));
  }, [id]);

  if (!round) return <div className="text-center py-20 text-white/40">Loading...</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => router.back()} className="text-[#00f3ff] text-xs font-bold uppercase">← Back</button>
      
      <div className="rounded-[2.5rem] overflow-hidden border-2 border-[#e6007e] shadow-2xl">
        <img src={round.image_url} className="w-full object-cover" />
      </div>

      <div className="betr-card p-6 space-y-4">
        <h1 className="text-2xl font-black italic uppercase text-white">Round #{round.round_number}</h1>
        
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] text-white/40 uppercase font-bold">Artist</p>
            {/* Redirects to Farcaster Profile */}
            <a 
              href={`https://warpcast.com/~/profiles/${round.artist_fid}`} 
              target="_blank" 
              className="text-[#00f3ff] font-bold text-lg hover:underline"
            >
              @{round.artist_username}
            </a>
          </div>
          <a href={round.nft_link} target="_blank" className="betr-button-pink py-2">Collect NFT</a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <p className="text-[9px] text-white/40 uppercase">Supporting</p>
            <p className="text-white font-bold">{round.token_symbol}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <p className="text-[9px] text-white/40 uppercase">Network</p>
            <p className="text-white font-bold">Base</p>
          </div>
        </div>
      </div>
    </div>
  );
}
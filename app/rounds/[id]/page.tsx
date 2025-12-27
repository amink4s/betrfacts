"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RoundDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [round, setRound] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/rounds/detail?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRound(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-[#00f3ff] animate-pulse">LOADING_DETAILS...</div>;
  if (!round) return <div className="text-center py-20 text-white">Round not found.</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Navigation */}
      <button 
        onClick={() => router.back()}
        className="text-[#00f3ff] text-[10px] font-bold uppercase tracking-widest hover:opacity-70"
      >
        ← Return to Archive
      </button>

      {/* Hero Image/GIF */}
      <div className="relative rounded-[2rem] overflow-hidden border-2 border-[#e6007e] shadow-[0_0_20px_rgba(230,0,126,0.3)]">
        <img 
          src={round.image_url} 
          alt={`Round ${round.round_number}`} 
          className="w-full object-cover aspect-square"
        />
        <div className="absolute top-4 left-4 bg-[#e6007e] text-black px-4 py-1 rounded-full font-black text-xs italic">
          ROUND #{round.round_number}
        </div>
      </div>

      {/* Info Card - Pink Header Style */}
      <div className="rounded-[1.5rem] border border-[#00f3ff]/30 overflow-hidden bg-[#0a0a0a]">
        <div className="bg-[#e6007e] py-3 text-center">
          <h2 className="text-black font-black uppercase text-sm tracking-tighter">Round Metadata</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Artist Section */}
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Created By</p>
              <Link 
                href={`https://warpcast.com/~/profiles/${round.artist_fid}`}
                className="text-[#00f3ff] text-xl font-black hover:underline"
              >
                @{round.artist_username}
              </Link>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 uppercase font-bold mb-1">FID</p>
              <p className="text-white font-mono text-xs">{round.artist_fid}</p>
            </div>
          </div>

          {/* Economics Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Support Token</p>
              <p className="text-[#e6007e] font-black text-lg">{round.token_symbol}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[9px] text-white/40 uppercase font-bold mb-1">Network</p>
              <p className="text-white font-black text-lg uppercase">Base</p>
            </div>
          </div>

          {/* Action Button */}
          <a 
            href={round.nft_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#e6007e] to-[#ff0055] text-white py-4 rounded-2xl text-center font-black uppercase tracking-tighter shadow-lg active:scale-95 transition-transform"
          >
            Collect NFT on Zora
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="text-center text-[8px] text-white/20 uppercase tracking-[0.5em] pt-4">
        BetrFacts Community Registry
      </p>
    </div>
  );
}
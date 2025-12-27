"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddRound() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roundNumber: "",
    artistUsername: "",
    artistFid: "",
    imageUrl: "",
    nftLink: "",
    tokenSymbol: "$BETR",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/rounds/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        alert("Error submitting data. Check all fields.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Link href="/" className="text-[#00f3ff] text-[10px] font-bold uppercase tracking-widest">
        ← Cancel
      </Link>

      <div className="rounded-[1.5rem] border border-[#e6007e]/30 overflow-hidden bg-[#0a0a0a] shadow-[0_0_15px_rgba(230,0,126,0.1)]">
        <div className="bg-[#e6007e] py-4 text-center">
          <h2 className="text-black font-black uppercase text-sm tracking-tighter italic">Contribute_Round_Data</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] text-white/40 uppercase font-bold ml-1">Round #</label>
              <input 
                required
                type="number"
                placeholder="271"
                className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff] transition-all"
                onChange={(e) => setFormData({...formData, roundNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-white/40 uppercase font-bold ml-1">Support Token</label>
              <input 
                required
                type="text"
                placeholder="$BETR"
                className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff]"
                onChange={(e) => setFormData({...formData, tokenSymbol: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/40 uppercase font-bold ml-1">Artist @Username</label>
            <input 
              required
              type="text"
              placeholder="vince.eth"
              className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff]"
              onChange={(e) => setFormData({...formData, artistUsername: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/40 uppercase font-bold ml-1">Artist FID (for Farcaster link)</label>
            <input 
              required
              type="number"
              placeholder="1234"
              className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff]"
              onChange={(e) => setFormData({...formData, artistFid: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/40 uppercase font-bold ml-1">GIF / Image URL</label>
            <input 
              required
              type="url"
              placeholder="https://betrmint.fun/images/..."
              className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff]"
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-white/40 uppercase font-bold ml-1">Zora / NFT Link</label>
            <input 
              required
              type="url"
              placeholder="https://zora.co/..."
              className="w-full bg-black border border-[#00f3ff]/30 rounded-xl p-3 text-sm text-white outline-none focus:border-[#00f3ff]"
              onChange={(e) => setFormData({...formData, nftLink: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#e6007e] text-white font-black py-4 rounded-2xl uppercase tracking-tighter mt-4 shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "TRANSMITTING..." : "PUBLISH TO ARCHIVE"}
          </button>
        </form>
      </div>
    </div>
  );
}
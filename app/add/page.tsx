"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import sdk from "@farcaster/frame-sdk";

export default function AddRound() {
  const [userFid, setUserFid] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roundNumber: "",
    artistUsername: "",
    imageUrl: "",
    nftLink: "",
    tokenSymbol: "",
  });

  useEffect(() => {
    const init = async () => {
      const context = await sdk.context;
      if (context?.user) setUserFid(context.user.fid);
    };
    init();
  }, []);

  const handleSubmit = async () => {
    if (!formData.roundNumber || !formData.imageUrl) return alert("Fill required fields");
    setLoading(true);
    
    try {
      const res = await fetch("/api/rounds", {
        method: "POST",
        body: JSON.stringify({ ...formData, proposerFid: userFid || 0 }),
      });
      if (res.ok) {
        alert("Submitted for review!");
        window.location.href = "/";
      }
    } catch (e) {
      alert("Error submitting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="border-l-2 border-betr-red pl-4">
        <h2 className="text-2xl font-black italic uppercase text-white">Contribute_Data</h2>
        <p className="text-xs text-white/50">Submit a missing round to earn points.</p>
      </div>

      {/* Preview Section */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-betr-blue uppercase">Live Preview:</span>
        <div className="w-48 mx-auto border border-betr-blue shadow-neon-blue bg-black overflow-hidden">
          <div className="aspect-square bg-white/5 relative">
            {formData.imageUrl ? (
              <img src={formData.imageUrl} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20">IMAGE_URL_REQUIRED</div>
            )}
            <div className="absolute top-2 left-2 bg-betr-red text-white text-[10px] px-2 font-bold">
              #{formData.roundNumber || "???"}
            </div>
          </div>
          <div className="p-2 text-xs">
            <div className="text-betr-blue font-bold">@{formData.artistUsername || "artist"}</div>
            <div className="text-[9px] text-white/40 uppercase font-mono">{formData.tokenSymbol || "TOKEN"} Support</div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-4 bg-white/5 p-6 border border-white/10 shadow-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/60">Round #</label>
            <input 
              type="number" 
              className="w-full bg-black border border-white/20 p-2 text-sm text-betr-blue focus:border-betr-blue outline-none transition-all"
              placeholder="270"
              onChange={(e) => setFormData({...formData, roundNumber: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-white/60">Artist @</label>
            <input 
              type="text" 
              className="w-full bg-black border border-white/20 p-2 text-sm text-betr-blue focus:border-betr-blue outline-none"
              placeholder="username"
              onChange={(e) => setFormData({...formData, artistUsername: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-white/60">Direct Image URL</label>
          <input 
            type="text" 
            className="w-full bg-black border border-white/20 p-2 text-sm text-betr-blue focus:border-betr-blue outline-none"
            placeholder="https://i.imgur.com/..."
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-white/60">Supporting Token (e.g. $BETR)</label>
          <input 
            type="text" 
            className="w-full bg-black border border-white/20 p-2 text-sm text-betr-blue focus:border-betr-blue outline-none"
            placeholder="$FACTS"
            onChange={(e) => setFormData({...formData, tokenSymbol: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-white/60">NFT / Zora Link</label>
          <input 
            type="text" 
            className="w-full bg-black border border-white/20 p-2 text-sm text-betr-blue focus:border-betr-blue outline-none"
            placeholder="https://zora.co/..."
            onChange={(e) => setFormData({...formData, nftLink: e.target.value})}
          />
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-betr-red text-white font-black py-4 uppercase italic tracking-widest hover:shadow-neon-red transition-all mt-4 disabled:opacity-50"
        >
          {loading ? "TRANSMITTING..." : "Submit for Review"}
        </button>
      </div>

      <Link href="/" className="block text-center text-[10px] text-white/40 uppercase hover:text-white tracking-widest">
        ← Abort & Return
      </Link>
    </div>
  );
}
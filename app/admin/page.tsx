"use client";
import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { ADMIN_FIDS } from "@/lib/constants";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      const context = await sdk.context;
      if (context?.user && ADMIN_FIDS.includes(context.user.fid)) {
        setIsAdmin(true);
        fetchPending();
      }
    };
    checkAdmin();
  }, []);

  const fetchPending = async () => {
    const res = await fetch("/api/admin/pending");
    const data = await res.json();
    setPending(data);
  };

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    await fetch("/api/admin/review", {
      method: "POST",
      body: JSON.stringify({ id, action }),
    });
    fetchPending();
  };

  if (!isAdmin) return <div className="text-center py-20 text-betr-red font-mono">ACCESS_DENIED: ADMIN_ONLY</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black italic text-betr-blue underline decoration-betr-red">Review_Queue</h2>
      {pending.length === 0 && <p className="text-white/40 text-sm">Queue is empty.</p>}
      
      <div className="space-y-4">
        {pending.map((item: any) => (
          <div key={item.id} className="border border-white/20 p-4 bg-black/50">
            <div className="flex gap-4">
              <img src={item.image_url} className="w-20 h-20 object-cover border border-betr-blue" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-betr-red">Round #{item.round_number}</p>
                <p>Artist: @{item.artist_username}</p>
                <p>Token: {item.token_symbol}</p>
                <p className="text-[10px] text-white/40">From FID: {item.proposer_fid}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => handleAction(item.id, 'approve')}
                className="flex-1 bg-green-600 text-white font-bold py-1 text-xs uppercase"
              >
                Approve
              </button>
              <button 
                onClick={() => handleAction(item.id, 'reject')}
                className="flex-1 bg-betr-red text-white font-bold py-1 text-xs uppercase"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
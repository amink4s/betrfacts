"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RoundCard from "@/components/RoundCard";

export default function Home() {
  const [rounds, setRounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rounds/list")
      .then((res) => res.json())
      .then((data) => setRounds(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black px-2 pt-4 pb-24 max-w-[450px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-black text-[#00f3ff] tracking-tight italic drop-shadow-neon">Betrmint Rounds</h1>
        <Link href="/add">
          <button className="bg-[#e6007e] hover:bg-[#00f3ff] text-white font-black px-6 py-2 rounded-2xl shadow-lg uppercase tracking-tighter transition-all text-sm">
            + Add Facts
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center text-white/60 py-12">Loading rounds...</div>
      ) : rounds.length === 0 ? (
        <div className="text-center text-white/60 py-12">No rounds found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {rounds.map((round) => (
            <RoundCard key={round.round_number} round={round} />
          ))}
        </div>
      )}
    </div>
  );
}
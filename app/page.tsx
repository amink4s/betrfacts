"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RoundCard from "@/components/RoundCard";

export default function Home() {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const res = await fetch("/api/rounds/list");
        const data = await res.json();
        // The API should return them sorted backward (latest first)
        setRounds(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRounds();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white font-bold text-lg tracking-tight">RECENT ROUNDS</h2>
        <Link href="/add" className="text-[#e6007e] text-xs font-bold uppercase hover:underline">
          Submit +
        </Link>
      </div>

      {loading ? (
        <div className="h-[420px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00f3ff]"></div>
        </div>
      ) : (
        /* The 2-Row Horizontal Scroll Container */
        <div className="flex overflow-x-auto pb-8 snap-x scrollbar-hide">
          <div className="grid grid-flow-col grid-rows-2 gap-4 auto-cols-max">
            {rounds.map((round: any) => (
              <RoundCard key={round.id} round={round} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
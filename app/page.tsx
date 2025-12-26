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
        setRounds(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRounds();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-white font-bold text-lg tracking-tight uppercase">Archive</h2>
        <Link href="/add" className="betr-button-pink !py-1 !px-4 !rounded-full text-[10px]">
          + Add Round
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 animate-pulse text-[#00f3ff] font-mono text-xs">
          FETCHING_GIF_DATA...
        </div>
      ) : (
        /* Two-Column Grid */
        <div className="grid grid-cols-2 gap-3 px-1">
          {rounds.map((round: any) => (
            <RoundCard key={round.id} round={round} />
          ))}
        </div>
      )}
    </div>
  );
}
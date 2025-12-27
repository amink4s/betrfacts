import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { roundNumber, artistUsername, artistFid, imageUrl, nftLink, tokenSymbol } = await request.json();

    await sql`
      INSERT INTO rounds (round_number, artist_username, artist_fid, image_url, nft_link, token_symbol)
      VALUES (
        ${parseInt(roundNumber)}, 
        ${artistUsername.replace('@', '')}, 
        ${parseInt(artistFid)}, 
        ${imageUrl}, 
        ${nftLink}, 
        ${tokenSymbol}
      )
      ON CONFLICT (round_number) DO UPDATE SET
        artist_username = EXCLUDED.artist_username,
        image_url = EXCLUDED.image_url,
        nft_link = EXCLUDED.nft_link
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to add round" }, { status: 500 });
  }
}
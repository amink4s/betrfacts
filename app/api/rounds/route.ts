import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roundNumber, artistUsername, imageUrl, nftLink, tokenSymbol, proposerFid } = body;

    // Insert into pending_edits table for admin review
    await sql`
      INSERT INTO pending_edits (
        round_number, 
        artist_username, 
        image_url, 
        nft_link, 
        token_symbol, 
        proposer_fid,
        status
      ) VALUES (
        ${roundNumber}, 
        ${artistUsername}, 
        ${imageUrl}, 
        ${nftLink}, 
        ${tokenSymbol}, 
        ${proposerFid},
        'pending'
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, action } = await request.json();

  if (action === 'approve') {
    // 1. Get the data from pending_edits
    const [edit] = await sql`SELECT * FROM pending_edits WHERE id = ${id}`;

    // 2. Insert into the live rounds table
    await sql`
      INSERT INTO rounds (round_number, artist_username, artist_fid, image_url, nft_link, token_symbol)
      VALUES (${edit.round_number}, ${edit.artist_username}, ${edit.artist_fid}, ${edit.image_url}, ${edit.nft_link}, ${edit.token_symbol})
      ON CONFLICT (round_number) DO UPDATE SET
        artist_username = EXCLUDED.artist_username,
        image_url = EXCLUDED.image_url,
        nft_link = EXCLUDED.nft_link;
    `;

    // 3. Award points to the proposer (10 points per approval)
    await sql`
      UPDATE users SET points = points + 10 WHERE fid = ${edit.proposer_fid}
    `;
  }

  // Update status to approved/rejected
  await sql`UPDATE pending_edits SET status = ${action} WHERE id = ${id}`;

  return NextResponse.json({ success: true });
}
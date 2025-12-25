import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fid, username, pfp } = await request.json();

    if (!fid) return NextResponse.json({ error: "No FID" }, { status: 400 });

    // Insert user or update info. wallet_address is left unchanged if already exists.
    await sql`
      INSERT INTO users (fid, username, pfp_url)
      VALUES (${fid}, ${username}, ${pfp})
      ON CONFLICT (fid) DO UPDATE SET
        username = EXCLUDED.username,
        pfp_url = EXCLUDED.pfp_url
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
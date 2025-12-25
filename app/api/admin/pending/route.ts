import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pending = await sql`
      SELECT * FROM pending_edits 
      WHERE status = 'pending' 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(pending);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
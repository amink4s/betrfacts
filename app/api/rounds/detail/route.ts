import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roundNumber = searchParams.get("id");

  if (!roundNumber) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const data = await sql`
      SELECT * FROM rounds WHERE round_number = ${roundNumber} LIMIT 1
    `;
    return NextResponse.json(data[0] || null);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
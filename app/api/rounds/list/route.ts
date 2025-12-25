import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM rounds ORDER BY round_number DESC`;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([]);
  }
}
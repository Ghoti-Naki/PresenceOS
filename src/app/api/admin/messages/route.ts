import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

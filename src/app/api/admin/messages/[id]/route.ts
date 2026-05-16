import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.delete(messages).where(eq(messages.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

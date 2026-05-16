import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { isNotNull, asc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(projects)
      .where(isNotNull(projects.publishedAt))
      .orderBy(asc(projects.sortOrder));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

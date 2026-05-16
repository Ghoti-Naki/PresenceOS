import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc, desc } from "drizzle-orm";
import { projectSchema } from "@/lib/validations/project";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { isPublished, ...data } = parsed.data;
    const publishedAt = isPublished ? new Date() : null;

    const [created] = await db
      .insert(projects)
      .values({
        ...data,
        imageUrl: data.imageUrl || null,
        githubUrl: data.githubUrl || null,
        liveUrl: data.liveUrl || null,
        publishedAt,
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

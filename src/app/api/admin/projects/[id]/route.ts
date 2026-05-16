import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { updateProjectSchema } from "@/lib/validations/project";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as unknown;
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { isPublished, ...data } = parsed.data;

    // Fetch existing to preserve original publishedAt if already published
    const [existing] = await db.select().from(projects).where(eq(projects.id, id));
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const publishedAt =
      isPublished === undefined
        ? existing.publishedAt
        : isPublished
        ? (existing.publishedAt ?? new Date())
        : null;

    const [updated] = await db
      .update(projects)
      .set({
        ...data,
        imageUrl: data.imageUrl ?? existing.imageUrl,
        githubUrl: data.githubUrl ?? existing.githubUrl,
        liveUrl: data.liveUrl ?? existing.liveUrl,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.delete(projects).where(eq(projects.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.id, id));

  if (!project) notFound();

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft size={15} />
        Back to Projects
      </Link>
      <h1 className="font-heading text-2xl font-semibold mb-6">Edit Project</h1>
      <ProjectForm
        mode="edit"
        projectId={project.id}
        initialValues={{
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content ?? "",
          imageUrl: project.imageUrl ?? "",
          githubUrl: project.githubUrl ?? "",
          liveUrl: project.liveUrl ?? "",
          tags: project.tags.join(", "),
          isFeatured: project.isFeatured,
          sortOrder: project.sortOrder.toString(),
          isPublished: project.publishedAt !== null,
        }}
      />
    </div>
  );
}

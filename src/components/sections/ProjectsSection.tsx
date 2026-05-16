import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { isNotNull, asc } from "drizzle-orm";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectGrid from "@/components/project/ProjectGrid";

export default async function ProjectsSection() {
  const rows = await db
    .select()
    .from(projects)
    .where(isNotNull(projects.publishedAt))
    .orderBy(asc(projects.sortOrder));

  const displayProjects = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    tags: p.tags,
    isFeatured: p.isFeatured,
  }));

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="A selection of things I've built."
        />
        <ProjectGrid projects={displayProjects} />
      </div>
    </section>
  );
}

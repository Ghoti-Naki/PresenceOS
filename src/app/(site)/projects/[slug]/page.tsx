import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq, isNotNull } from "drizzle-orm";
import { siteConfig } from "@/config/site";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TagBadge from "@/components/shared/TagBadge";
import ReactMarkdown from "react-markdown";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(isNotNull(projects.publishedAt));
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [row] = await db
    .select({ title: projects.title, description: projects.description })
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  if (!row) return {};
  return {
    title: row.title,
    description: row.description,
    openGraph: {
      title: row.title,
      description: row.description,
      url: `${siteConfig.url}/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  if (!project || !project.publishedAt) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to projects
      </Link>

      {project.imageUrl && (
        <div className="w-full h-64 rounded-xl overflow-hidden border border-border mb-8 bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-foreground mb-3">{project.title}</h1>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <p className="text-base text-muted-foreground leading-relaxed mb-8">
        {project.description}
      </p>

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex gap-4 mb-10">
          {project.githubUrl && project.githubUrl !== "#" && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub size={15} />
              View Code
            </Link>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={15} />
              Live Demo
            </Link>
          )}
        </div>
      )}

      {project.content && (
        <div className="text-foreground/90 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}

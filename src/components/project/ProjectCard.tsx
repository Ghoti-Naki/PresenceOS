import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TagBadge from "@/components/shared/TagBadge";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  isFeatured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="h-44 bg-muted border-b border-border flex items-center justify-center text-xs text-muted-foreground">
        {project.imageUrl ?? project.title}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-base text-foreground mb-2">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:underline underline-offset-2"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex gap-4 mt-auto items-center">
          {project.githubUrl && project.githubUrl !== "#" ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub size={15} />
              Code
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground/50 cursor-not-allowed">
              <FaGithub size={15} />
              Code
            </span>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={15} />
              Live
            </Link>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}

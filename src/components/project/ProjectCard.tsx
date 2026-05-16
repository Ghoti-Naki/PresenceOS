import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import TagBadge from "@/components/shared/TagBadge";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  tags: string[];
  is_featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="h-44 bg-muted border-b border-border flex items-center justify-center text-xs text-muted-foreground">
        {project.image_url ?? project.title}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-base text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.github_url && project.github_url !== "#" ? (
            <Link
              href={project.github_url}
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
          {project.live_url && project.live_url !== "#" && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={15} />
              Live
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

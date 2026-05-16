"use client";

import { motion } from "framer-motion";
import ProjectCard, { type Project } from "@/components/project/ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p className="mt-12 text-sm text-muted-foreground">No projects yet.</p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}

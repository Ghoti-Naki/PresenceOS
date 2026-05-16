import SectionHeading from "@/components/shared/SectionHeading";
import ProjectGrid from "@/components/project/ProjectGrid";
import type { Project } from "@/components/project/ProjectCard";

const HARDCODED_PROJECTS: Project[] = [
  {
    id: 1,
    title: "PresenceOS",
    description:
      "A full-stack portfolio CMS built with Next.js 15, PostgreSQL, and Drizzle ORM. Features an admin panel for managing projects and contact messages without redeployment.",
    image_url: null,
    github_url: "#",
    live_url: null,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    is_featured: true,
  },
  {
    id: 2,
    title: "SecureVault",
    description:
      "A CLI-based password manager featuring AES-256 encryption and master-password authentication. Built for secure offline credential storage and management.",
    image_url: null,
    github_url: "#",
    live_url: null,
    tags: ["Python", "Cryptography", "Security", "CLI"],
    is_featured: true,
  },
  {
    id: 3,
    title: "NetScan",
    description:
      "A network port scanner and service fingerprinting tool built for security auditing and CTF challenges. Supports concurrent scanning with JSON output.",
    image_url: null,
    github_url: "#",
    live_url: null,
    tags: ["Python", "Networking", "Security", "CTF"],
    is_featured: false,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="A selection of things I've built. Replace these with your real projects via the admin panel."
        />
        <ProjectGrid projects={HARDCODED_PROJECTS} />
      </div>
    </section>
  );
}

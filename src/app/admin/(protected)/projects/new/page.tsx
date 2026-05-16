import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "New Project" };

export default function NewProjectPage() {
  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft size={15} />
        Back to Projects
      </Link>
      <h1 className="font-heading text-2xl font-semibold mb-6">New Project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}

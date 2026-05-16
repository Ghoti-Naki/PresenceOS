import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc, desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">Projects</h1>
        <Button render={<Link href="/admin/projects/new" />} size="sm">
          <Plus size={15} className="mr-1.5" />
          New Project
        </Button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Featured</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Order</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((project) => (
                <tr key={project.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.publishedAt
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {project.publishedAt ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {project.isFeatured ? "Yes" : "—"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {project.sortOrder}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" render={<Link href={`/admin/projects/${project.id}/edit`} />}>
                        <Pencil size={14} />
                      </Button>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

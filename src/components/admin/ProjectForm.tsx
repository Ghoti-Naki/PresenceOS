"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSlug } from "@/lib/utils";

interface ProjectFormState {
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  tags: string;
  isFeatured: boolean;
  sortOrder: string;
  isPublished: boolean;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initialValues?: Partial<ProjectFormState>;
}

const defaultValues: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  content: "",
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  tags: "",
  isFeatured: false,
  sortOrder: "0",
  isPublished: false,
};

export default function ProjectForm({ mode, projectId, initialValues }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormState>({ ...defaultValues, ...initialValues });
  const [loading, setLoading] = useState(false);
  const slugTouched = useRef(mode === "edit");

  function set(field: keyof ProjectFormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      ...(!slugTouched.current ? { slug: generateSlug(title) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        content: form.content || null,
        imageUrl: form.imageUrl || null,
        githubUrl: form.githubUrl || null,
        liveUrl: form.liveUrl || null,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        isFeatured: form.isFeatured,
        sortOrder: parseInt(form.sortOrder) || 0,
        isPublished: form.isPublished,
      };

      const url =
        mode === "edit"
          ? `/api/admin/projects/${projectId}`
          : "/api/admin/projects";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? "Failed to save project");
      }

      toast.success(mode === "edit" ? "Project updated!" : "Project created!");
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="title">Title *</label>
          <Input
            id="title"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="My Project"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="slug">Slug *</label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => { slugTouched.current = true; set("slug", e.target.value); }}
            placeholder="my-project"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="description">Description *</label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="A short summary of the project..."
          className="min-h-20"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="content">Content</label>
        <Textarea
          id="content"
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="Longer write-up, markdown supported..."
          className="min-h-32"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="imageUrl">Image URL</label>
          <Input
            id="imageUrl"
            value={form.imageUrl}
            onChange={(e) => set("imageUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="githubUrl">GitHub URL</label>
          <Input
            id="githubUrl"
            value={form.githubUrl}
            onChange={(e) => set("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="liveUrl">Live URL</label>
          <Input
            id="liveUrl"
            value={form.liveUrl}
            onChange={(e) => set("liveUrl", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="tags">
            Tags <span className="text-muted-foreground">(comma-separated)</span>
          </label>
          <Input
            id="tags"
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="Next.js, TypeScript, PostgreSQL"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="sortOrder">Sort Order</label>
          <Input
            id="sortOrder"
            type="number"
            min="0"
            value={form.sortOrder}
            onChange={(e) => set("sortOrder", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="rounded border-border"
          />
          Featured project
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
            className="rounded border-border"
          />
          Published
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : mode === "edit" ? "Update Project" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

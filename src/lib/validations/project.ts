import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(1, "Description is required").max(1000),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(false),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export const updateProjectSchema = projectSchema.partial();
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { isNotNull } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedProjects = await db
    .select({ slug: projects.slug, updatedAt: projects.updatedAt })
    .from(projects)
    .where(isNotNull(projects.publishedAt));

  const projectEntries: MetadataRoute.Sitemap = publishedProjects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}

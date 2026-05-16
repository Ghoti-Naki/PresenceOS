import { db } from "@/lib/db";
import { projects, messages } from "@/lib/db/schema";
import { isNotNull, eq, count } from "drizzle-orm";
import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [projectCount] = await db
    .select({ count: count() })
    .from(projects)
    .where(isNotNull(projects.publishedAt));

  const [unreadCount] = await db
    .select({ count: count() })
    .from(messages)
    .where(eq(messages.isRead, false));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-foreground mb-8">
        Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Published Projects</p>
          <p className="text-3xl font-semibold">{projectCount.count}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Unread Messages</p>
          <p className="text-3xl font-semibold">{unreadCount.count}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/admin/projects"
          className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          Manage Projects
        </Link>
        <Link
          href="/admin/messages"
          className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          View Messages
        </Link>
      </div>
    </div>
  );
}

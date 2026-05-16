import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import MessageActions from "@/components/admin/MessageActions";

export const metadata = { title: "Messages" };

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMessagesPage() {
  const rows = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-6">Messages</h1>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border p-5 transition-colors ${
                msg.isRead
                  ? "border-border bg-card"
                  : "border-border bg-card ring-1 ring-foreground/10"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {!msg.isRead && (
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                    <p className="font-medium text-sm">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {msg.email}
                    </a>
                  </div>
                  <p className="text-sm font-medium text-foreground mt-0.5">{msg.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(msg.createdAt)}</p>
                </div>
                <MessageActions id={msg.id} isRead={msg.isRead} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {msg.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

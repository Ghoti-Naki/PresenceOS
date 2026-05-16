"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCheck, Trash2 } from "lucide-react";

export default function MessageActions({ id, isRead }: { id: string; isRead: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function markRead() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}/read`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Marked as read.");
      router.refresh();
    } catch {
      toast.error("Failed to update message.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage() {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Message deleted.");
      router.refresh();
    } catch {
      toast.error("Failed to delete message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      {!isRead && (
        <Button variant="outline" size="sm" onClick={markRead} disabled={loading}>
          <CheckCheck size={14} className="mr-1.5" />
          Mark Read
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={deleteMessage}
        disabled={loading}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}

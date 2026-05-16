"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

function isActive(href: string, pathname: string) {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
}

/** Desktop sidebar — hidden on mobile */
export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-52 flex-shrink-0 border-r border-border flex-col py-4 px-2 min-h-[calc(100vh-3.5rem)]">
      <nav className="space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
              isActive(href, pathname)
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

/** Mobile horizontal nav — visible only on small screens */
export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden flex items-center gap-1 border-b border-border bg-background px-3 py-2 overflow-x-auto"
      aria-label="Admin navigation"
    >
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
            isActive(href, pathname)
              ? "bg-muted text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <Icon size={14} />
          {label}
        </Link>
      ))}
    </nav>
  );
}

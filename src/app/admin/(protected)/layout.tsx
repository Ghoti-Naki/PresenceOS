import type { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminMobileNav } from "@/components/admin/AdminSidebar";

export default function AdminProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <AdminMobileNav />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 px-4 sm:px-6 py-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

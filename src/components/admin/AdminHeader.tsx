import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth/jwt";
import LogoutButton from "./LogoutButton";

export default async function AdminHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  let username = "Admin";

  if (token) {
    try {
      const payload = await verifyToken(token);
      username = payload.username;
    } catch {}
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight">Admin Panel</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{username}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

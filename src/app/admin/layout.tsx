import type { ReactNode } from "react";

export const metadata = {
  title: { template: "%s — Admin", default: "Admin" },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

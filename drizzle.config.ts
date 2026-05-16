import type { Config } from "drizzle-kit";

// drizzle-kit reads .env but not .env.local — load it explicitly on Node 20.12+
if (typeof (process as { loadEnvFile?: unknown }).loadEnvFile === "function") {
  try {
    (process as { loadEnvFile: (p: string) => void }).loadEnvFile(".env.local");
  } catch {}
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

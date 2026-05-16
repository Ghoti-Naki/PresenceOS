// Usage: npm run hash-password -- <your-password>
// Generates a scrypt hash to set as ADMIN_PASSWORD_HASH in .env.local

if (typeof (process as { loadEnvFile?: unknown }).loadEnvFile === "function") {
  try {
    (process as { loadEnvFile: (p: string) => void }).loadEnvFile(".env.local");
  } catch {}
}

async function main() {
  const { hashPassword } = await import("../lib/auth/jwt");

  const password = process.argv[2];
  if (!password) {
    console.error("Usage: npm run hash-password -- <your-password>");
    process.exit(1);
  }

  const hash = await hashPassword(password);
  console.log("\nAdd this line to your .env.local:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

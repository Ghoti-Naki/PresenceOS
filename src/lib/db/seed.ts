// Must run before any module that reads process.env (static imports are hoisted)
if (typeof (process as { loadEnvFile?: unknown }).loadEnvFile === "function") {
  try {
    (process as { loadEnvFile: (p: string) => void }).loadEnvFile(".env.local");
  } catch {}
}

const seedProjects = [
  {
    title: "PresenceOS",
    slug: "presenceos",
    description:
      "A full-stack personal portfolio with a built-in CMS admin panel. Built with Next.js 15, PostgreSQL, Drizzle ORM, and JWT authentication.",
    content: null,
    imageUrl: null,
    githubUrl: "#",
    liveUrl: "#",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    isFeatured: true,
    sortOrder: 1,
    publishedAt: new Date(),
  },
  {
    title: "SecureVault",
    slug: "securevault",
    description:
      "A locally-encrypted password manager with AES-256 encryption, master password hashing, and a CLI interface for secure credential storage.",
    content: null,
    imageUrl: null,
    githubUrl: "#",
    liveUrl: null,
    tags: ["Python", "Cryptography", "CLI", "AES-256"],
    isFeatured: true,
    sortOrder: 2,
    publishedAt: new Date(),
  },
  {
    title: "NetScan",
    slug: "netscan",
    description:
      "An OSINT and network reconnaissance tool that automates port scanning, banner grabbing, and service fingerprinting for authorized penetration testing.",
    content: null,
    imageUrl: null,
    githubUrl: "#",
    liveUrl: null,
    tags: ["Python", "Networking", "OSINT", "Penetration Testing", "Kali Linux"],
    isFeatured: false,
    sortOrder: 3,
    publishedAt: new Date(),
  },
];

async function seed() {
  // Dynamic imports run after env is loaded above — static imports are hoisted
  const { db } = await import("./index");
  const { projects } = await import("./schema");

  console.log("Seeding projects...");
  await db.delete(projects);
  await db.insert(projects).values(seedProjects);
  console.log(`Inserted ${seedProjects.length} projects.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

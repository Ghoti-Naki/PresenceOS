export interface Skill {
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { name: "Python", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Bash", category: "Languages" },
  { name: "C/C++", category: "Languages" },

  { name: "Next.js", category: "Web Development" },
  { name: "React", category: "Web Development" },
  { name: "Node.js", category: "Web Development" },
  { name: "Tailwind CSS", category: "Web Development" },
  { name: "PostgreSQL", category: "Web Development" },
  { name: "REST APIs", category: "Web Development" },

  { name: "Penetration Testing", category: "Cybersecurity" },
  { name: "Network Security", category: "Cybersecurity" },
  { name: "OSINT", category: "Cybersecurity" },
  { name: "CTF", category: "Cybersecurity" },
  { name: "Vulnerability Assessment", category: "Cybersecurity" },

  { name: "Linux", category: "Tools & DevOps" },
  { name: "Docker", category: "Tools & DevOps" },
  { name: "Git", category: "Tools & DevOps" },
  { name: "Wireshark", category: "Tools & DevOps" },
  { name: "Burp Suite", category: "Tools & DevOps" },
  { name: "Kali Linux", category: "Tools & DevOps" },
];

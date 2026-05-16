"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteConfig } from "@/config/site";
import { skills } from "@/config/skills";

const categories = [...new Set(skills.map((s) => s.category))];

const inView = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div {...inView}>
          <SectionHeading title="About Me" />
        </motion.div>

        <div className="grid md:grid-cols-[220px_1fr] gap-12 mt-12">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-2xl bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground">
              Photo
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              {siteConfig.bio}
            </p>

            <div className="space-y-7">
              {categories.map((category, i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                >
                  <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-widest">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((s) => s.category === category)
                      .map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs px-3 py-1 rounded-full border border-border bg-card text-muted-foreground"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

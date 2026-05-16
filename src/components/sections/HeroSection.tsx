"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full py-20">
        <motion.p
          className="text-xs text-muted-foreground mb-5 tracking-widest uppercase"
          {...fadeUp(0)}
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl leading-tight text-foreground mb-5"
          {...fadeUp(0.1)}
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg"
          {...fadeUp(0.2)}
        >
          {siteConfig.title}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.3)}>
          <Button render={<Link href="#projects" />} size="lg">
            See My Work
          </Button>
          <Button variant="outline" size="lg" render={<Link href="#contact" />}>
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

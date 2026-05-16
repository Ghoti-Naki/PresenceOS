"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-muted/30">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to connect? Send me a message."
        />

        <div className="max-w-xl mt-12">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="subject">
                Subject
              </label>
              <Input id="subject" placeholder="What's this about?" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="message">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-32"
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

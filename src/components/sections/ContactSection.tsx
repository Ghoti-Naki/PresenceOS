"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const emptyForm = { name: "", email: "", subject: "", body: "" };

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm(emptyForm);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="subject">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="body">
                Message
              </label>
              <Textarea
                id="body"
                name="body"
                placeholder="Your message..."
                className="min-h-32"
                value={form.body}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

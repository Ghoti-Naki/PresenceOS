"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <nav
        className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-foreground"
          aria-label={`${siteConfig.name} — home`}
        >
          Dhika<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-background px-4 py-4"
        >
          <ul className="flex flex-col gap-4 mb-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}

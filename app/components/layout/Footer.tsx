"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const quickLinks = [
  { name: "Expertise", href: "#build" },
  { name: "Case Study", href: "#flagship" },
  { name: "Projects", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-x-hidden bg-background pb-10 pt-16 text-foreground transition-colors duration-300 safe-bottom sm:pb-12 sm:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cta/[0.04] via-transparent to-transparent"
        aria-hidden
      />
      <div className="page-container relative">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <p className="font-editorial text-balance text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.45] tracking-tight text-foreground">
            Keep going. There are still so many{" "}
            <span className="gradient-text">good moments</span>{" "}
            you haven&apos;t met yet.
          </p>
          <p className="mt-5 text-sm text-meta sm:mt-6">Thanks for stopping by :)</p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta text-white">
                <span className="font-heading text-sm font-bold">RM</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{SITE.name}</h3>
                <p className="text-sm text-muted-foreground">{SITE.title}</p>
              </div>
            </div>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building intelligent systems from idea to production.
            </p>
            <div className="flex gap-3">
              {[
                { href: SITE.github, Icon: Github, label: "GitHub" },
                { href: SITE.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${SITE.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-muted/30 text-muted-foreground transition hover:border-cta/30 hover:text-cta dark:bg-white/[0.04]"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 lg:space-y-2 lg:gap-0">
              {quickLinks.map((link, i) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="signal-underline inline-flex min-h-[40px] items-center gap-2 text-sm text-muted-foreground transition hover:text-cta"
                  >
                    <span className="font-mono-stamp text-[10px] text-meta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all transition hover:text-cta">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="text-meta transition hover:text-cta">
                  {SITE.phone}
                </a>
              </li>
              <li className="text-secondary">{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center text-xs text-meta">
          © {new Date().getFullYear()} {SITE.name} · Crafted with code, curiosity, and care.
        </div>
      </div>
    </footer>
  );
}

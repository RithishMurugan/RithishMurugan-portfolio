"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { SITE } from "@/lib/data/site";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const quickLinks = [
  { name: "What I Build", href: "#build" },
  { name: "Flagship", href: "#flagship" },
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-x-hidden bg-background pb-10 pt-16 text-foreground transition-colors duration-300 safe-bottom sm:pb-12 sm:pt-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.85, ease: easeOutExpo }}
        >
          <p className="font-heading text-balance text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.45] tracking-tight text-foreground">
            Keep going. There are still so many{" "}
            <span className="bg-gradient-to-r from-cta via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
              good moments
            </span>{" "}
            you haven&apos;t met yet.
          </p>
          <p className="footer-text-muted mt-5 text-sm sm:mt-6">
            Thanks for stopping by :)
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cta to-cyan-500 text-white">
                <span className="font-heading text-sm font-bold">RM</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{SITE.name}</h3>
                <p className="footer-text-muted text-sm">{SITE.title}</p>
              </div>
            </div>
            <p className="footer-text-muted mb-5 max-w-sm text-sm leading-relaxed">
              AI Full Stack Software Engineer — production AI platforms at Abridge, cloud data engineering at Virtualan, enterprise Java at Hexaware. M.S. CS, IIT.
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
                  className="footer-border footer-text-muted flex h-10 w-10 items-center justify-center rounded-lg border bg-black/5 transition hover:border-cta/40 hover:text-cta dark:bg-white/5 dark:hover:text-cta"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-text-subtle mb-4 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-text-muted text-sm transition hover:text-cta">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-text-subtle mb-4 text-sm font-bold uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all transition hover:text-cta">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="transition hover:text-cta">
                  {SITE.phone}
                </a>
              </li>
              <li className="footer-text-muted">{SITE.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-border border-t pt-8 text-center text-xs footer-text-subtle">
          © {new Date().getFullYear()} {SITE.name} · Crafted with code, curiosity, and care.
        </div>
      </div>
    </footer>
  );
}

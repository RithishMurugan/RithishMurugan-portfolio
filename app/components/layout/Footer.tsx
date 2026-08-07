"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { SITE } from "@/lib/data/site";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="footer-surface relative overflow-hidden py-10 transition-colors duration-300 safe-bottom sm:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-blue-500/20 blur-[80px] dark:bg-blue-600/30" />
        <motion.div
          className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-cyan-500/15 blur-[90px] dark:bg-cyan-500/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <span className="text-lg font-bold">&lt;/&gt;</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{SITE.name}</h3>
                <p className="footer-text-muted text-sm">{SITE.title}</p>
              </div>
            </div>
            <p className="footer-text-muted mb-5 max-w-sm text-sm leading-relaxed">
              AI Full Stack Software Engineer — healthcare AI platforms at Abridge, cloud data engineering at Virtualan, enterprise Java at Hexaware. M.S. CS, IIT.
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

        <div className="footer-border border-t pt-8 text-center text-sm footer-text-muted">
          © {new Date().getFullYear()} {SITE.name} —{" "}
          <a href={SITE.resumePath} download className="footer-link underline-offset-2 hover:underline">
            resume
          </a>{" "}
          ·{" "}
          <a href="#contact" className="footer-link underline-offset-2 hover:underline">
            contact
          </a>
        </div>
      </div>
    </footer>
  );
}

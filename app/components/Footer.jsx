"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const RESUME_PATH = "/Rithish_Murugan_Resume.pdf";
const EMAIL = "rithishmurugan52@gmail.com";

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
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#070f1f] via-[#0d1b3d] to-[#162d5c] text-white py-12 sm:py-14">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-blue-600/30 blur-[80px]" />
        <motion.div
          className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-cyan-500/20 blur-[90px]"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <span className="text-lg font-bold">&lt;/&gt;</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Rithish Murugan</h3>
                <p className="text-slate-400 text-sm">Software Engineer</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-5 leading-relaxed max-w-sm">
              Healthcare &amp; supply chain backend engineer — Abridge, Hexaware, IIT. Open to backend,
              platform, and AI engineering roles in the U.S.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://github.com/RithishMurugan", Icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/rithishmurugan", Icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${EMAIL}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/40 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:text-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-300 hover:text-cyan-300 transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:text-center md:text-right">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="text-slate-200 hover:text-cyan-300 transition break-all">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href="tel:+17739302475" className="text-slate-200 hover:text-cyan-300 transition">
                  +1 (773) 930-2475
                </a>
              </li>
              <li className="text-slate-400">USA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Rithish Murugan —{" "}
          <a
            href={RESUME_PATH}
            download
            className="text-cyan-400/90 hover:text-cyan-300 underline-offset-2 hover:underline"
          >
            resume
          </a>{" "}
          ·{" "}
          <a href="#contact" className="text-cyan-400/90 hover:text-cyan-300 underline-offset-2 hover:underline">
            contact
          </a>
        </div>
      </motion.div>
    </footer>
  );
}

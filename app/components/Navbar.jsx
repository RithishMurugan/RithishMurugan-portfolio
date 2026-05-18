"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FolderOpen,
  Brain,
  GraduationCap,
  Mail,
  User,
  FileText,
} from "lucide-react";
import { springSnappy } from "../lib/motion";

const RESUME_PATH = "/Rithish_Murugan_Resume.pdf";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { name: "About", icon: User, href: "#about" },
    { name: "Experience", icon: Briefcase, href: "#experience" },
    { name: "Skills", icon: Brain, href: "#skills" },
    { name: "Projects", icon: FolderOpen, href: "#projects" },
    { name: "Education", icon: GraduationCap, href: "#education" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.72);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = scrolled
    ? "text-ink-muted hover:text-cta"
    : "text-white/90 hover:text-white";

  return (
    <>
      <motion.nav
        layout
        aria-label="Main navigation"
        transition={springSnappy}
        className={`fixed z-50 flex items-center justify-between ${
          scrolled
            ? "top-3 left-3 right-3 mx-auto max-w-6xl rounded-2xl border border-zinc-200/90 bg-white/95 px-4 py-3 shadow-card backdrop-blur-md sm:left-6 sm:right-6"
            : "top-0 left-0 right-0 w-full bg-transparent px-4 py-3 sm:px-6 sm:py-3.5"
        }`}
        style={{
          paddingLeft: scrolled ? undefined : "max(1rem, calc(1rem + env(safe-area-inset-left)))",
          paddingRight: scrolled ? undefined : "max(1rem, calc(1rem + env(safe-area-inset-right)))",
        }}
      >
        <motion.a
          href="#home"
          className="interactive flex min-h-[44px] items-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            layout
            className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${
              scrolled ? "bg-gradient-to-r from-cta to-blue-600" : "bg-blue-500/90"
            }`}
          >
            <span className="text-lg font-bold text-white sm:text-xl">&lt;/&gt;</span>
          </motion.div>
          <div className="text-left">
            <p
              className={`text-base font-bold leading-tight transition-colors sm:text-lg ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              Rithish Murugan
            </p>
            <p
              className={`hidden text-[11px] font-medium uppercase tracking-wide sm:block ${
                scrolled ? "text-ink-muted" : "text-blue-200/90"
              }`}
            >
              Software Engineer
            </p>
          </div>
        </motion.a>

        <div className="hidden items-center gap-1 md:flex xl:gap-2">
          <ul className="flex items-center gap-1 text-sm font-medium xl:gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className={`interactive flex min-h-[44px] items-center gap-1.5 rounded-lg px-2.5 py-2 ${navLinkClass}`}
                    whileHover={{ y: -1 }}
                    transition={springSnappy}
                  >
                    <Icon size={17} aria-hidden />
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
          <motion.a
            href={RESUME_PATH}
            download
            className="btn-primary ml-2 gap-2 px-3.5 py-2 text-sm shadow-md"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={springSnappy}
          >
            <FileText size={17} aria-hidden />
            Resume
          </motion.a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <motion.a
            href={RESUME_PATH}
            download
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold ${
              scrolled
                ? "bg-cta text-white"
                : "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={16} aria-hidden />
            <span>Resume</span>
          </motion.a>
          <motion.button
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-2xl leading-none ${
              scrolled ? "text-ink" : "text-white"
            }`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            type="button"
            whileTap={{ scale: 0.92 }}
          >
            {open ? "\u2715" : "\u2630"}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute left-0 right-0 top-0 border-b border-zinc-200 bg-white shadow-xl"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={springSnappy}
            >
              <ul className="max-h-[min(70vh,520px)] overflow-y-auto px-3 py-2">
                {links.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, ...springSnappy }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="interactive flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 font-medium text-ink hover:bg-blue-50"
                      >
                        <Icon size={20} aria-hidden />
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
                <li className="px-3 pb-3 pt-2">
                  <a
                    href={RESUME_PATH}
                    download
                    onClick={() => setOpen(false)}
                    className="btn-primary flex min-h-[48px] w-full items-center justify-center gap-2"
                  >
                    <FileText size={18} aria-hidden />
                    Download resume
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

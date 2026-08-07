"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FolderOpen, Brain, GraduationCap, Mail, User, FileText } from "lucide-react";
import { springSnappy } from "@/lib/motion";
import { SITE } from "@/lib/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", icon: User, href: "#about", id: "about" },
  { name: "Experience", icon: Briefcase, href: "#experience", id: "experience" },
  { name: "Skills", icon: Brain, href: "#skills", id: "skills" },
  { name: "Projects", icon: FolderOpen, href: "#projects", id: "projects" },
  { name: "Education", icon: GraduationCap, href: "#education", id: "education" },
  { name: "Contact", icon: Mail, href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...links.map((l) => l.id)];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onHero = !scrolled;

  const navLinkClass = (id: string) =>
    cn(
      "interactive flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 py-2 text-sm transition-colors xl:px-2.5",
      onHero
        ? activeSection === id
          ? "font-semibold text-foreground dark:text-white"
          : "text-muted-foreground hover:text-cta dark:text-white/80 dark:hover:text-white"
        : activeSection === id
          ? "font-semibold text-cta"
          : "text-muted-foreground hover:text-cta"
    );

  return (
    <>
      <motion.nav
        layout
        aria-label="Main navigation"
        transition={springSnappy}
        className={cn(
          "fixed z-50 flex items-center justify-between gap-2 transition-shadow duration-300 safe-top",
          scrolled
            ? "top-2 left-2 right-2 mx-auto max-w-6xl rounded-2xl border border-border bg-card/95 px-3 py-2.5 shadow-card shadow-cta/5 backdrop-blur-md sm:left-4 sm:right-4 sm:px-4 sm:py-3"
            : "top-0 left-0 right-0 w-full bg-transparent px-3 py-2.5 sm:px-5 sm:py-3"
        )}
      >
        <motion.a href="#home" className="interactive flex min-h-[44px] min-w-0 flex-1 items-center gap-2 sm:gap-3" whileTap={{ scale: 0.98 }}>
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10", scrolled ? "bg-gradient-to-r from-cta to-blue-600" : "bg-blue-500/90")}>
            <span className="text-base font-bold text-white sm:text-xl">&lt;/&gt;</span>
          </div>
          <div className="min-w-0 text-left">
            <p className={cn("truncate text-sm font-bold leading-tight sm:text-lg", onHero ? "text-foreground dark:text-white" : "text-foreground")}>
              {SITE.name}
            </p>
            <p className={cn("hidden truncate text-[11px] font-medium uppercase tracking-wide lg:block", onHero ? "text-muted-foreground dark:text-blue-200/90" : "text-muted-foreground")}>
              {SITE.title}
            </p>
          </div>
        </motion.a>

        <div className="hidden shrink-0 items-center gap-0.5 lg:flex xl:gap-1">
          <ul className="flex items-center gap-0.5 text-sm font-medium xl:gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <motion.a href={link.href} className={navLinkClass(link.id)} whileHover={{ y: -1 }}>
                    <Icon size={16} aria-hidden className="hidden xl:block" />
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle scrolled={scrolled} onHero={onHero} className="ml-1" />
          <motion.a
            href={SITE.resumePath}
            download
            className="btn-primary ml-1 gap-2 px-3 py-2 text-sm shadow-md xl:ml-2"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={17} aria-hidden />
            <span className="hidden xl:inline">Resume</span>
            <span className="xl:hidden">CV</span>
          </motion.a>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <ThemeToggle scrolled={scrolled} onHero={onHero} />
          <motion.a
            href={SITE.resumePath}
            download
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold sm:px-3",
              onHero ? "bg-cta text-white" : "bg-cta text-white"
            )}
            whileTap={{ scale: 0.97 }}
            aria-label="Download resume"
          >
            <FileText size={16} aria-hidden />
            <span className="hidden xs:inline">Resume</span>
          </motion.a>
          <motion.button
            type="button"
            className={cn("touch-target flex items-center justify-center rounded-lg text-2xl", onHero ? "text-foreground dark:text-white" : "text-foreground")}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.92 }}
          >
            {open ? "\u2715" : "\u2630"}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-border bg-card shadow-xl safe-top"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={springSnappy}
            >
              <ul className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(4.25rem+env(safe-area-inset-top))]">
                {links.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.li key={link.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="interactive flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-muted active:bg-muted"
                      >
                        <Icon size={20} aria-hidden />
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

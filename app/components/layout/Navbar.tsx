"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { springSnappy } from "@/lib/motion";
import { SITE } from "@/lib/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { name: "Expertise", href: "#build", id: "build" },
  { name: "Flagship", href: "#flagship", id: "flagship" },
  { name: "Work", href: "#work", id: "work" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "About", href: "#about", id: "about" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
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
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 safe-top transition-all duration-500",
          scrolled
            ? "border-b border-border/30 bg-background/80 shadow-sm shadow-black/[0.03] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0f1219]/85"
            : "border-b border-border/0 bg-background/30 backdrop-blur-md dark:bg-[#0f1219]/25"
        )}
      >
        {/* Subtle full-width bottom accent line */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-cyan-400/15"
          aria-hidden
        />

        {scrolled && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cta/70 via-cyan-400/50 to-transparent"
            style={{ scaleX: scrollProgress }}
            aria-hidden
          />
        )}

        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[3.75rem] sm:px-6"
        >
          {/* Brand */}
          <motion.a
            href="#home"
            className="interactive relative z-10 flex min-h-[44px] min-w-0 shrink-0 items-center gap-2.5"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cta to-blue-600 sm:h-9 sm:w-9 sm:rounded-xl">
              <span className="font-heading text-xs font-bold text-white sm:text-sm">RM</span>
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-bold leading-tight text-foreground">
                {SITE.name.split(" ")[0]}
              </p>
              <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                AI FULL STACK
              </p>
            </div>
          </motion.a>

          {/* Center navigation — desktop */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex xl:gap-1">
            {links.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                className={cn(
                  "interactive relative whitespace-nowrap px-2.5 py-2 text-sm font-medium transition-colors xl:px-3",
                  activeSection === link.id ? "text-cta" : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ y: -1 }}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-cta to-cyan-400"
                    transition={springSnappy}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Right controls */}
          <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-1.5">
            <ThemeToggle scrolled={scrolled} onHero={onHero} />
            <motion.a
              href={SITE.resumePath}
              download
              className="hidden h-9 items-center gap-1.5 rounded-lg bg-cta px-3 text-xs font-semibold text-white shadow-sm shadow-cta/20 transition-shadow hover:shadow-md hover:shadow-cta/25 sm:inline-flex sm:text-sm"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={15} />
              Resume
            </motion.a>
            <motion.button
              type="button"
              className="touch-target flex items-center justify-center rounded-lg p-2 text-xl text-foreground lg:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.92 }}
            >
              {open ? "\u2715" : "\u2630"}
            </motion.button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.nav
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-border/40 bg-background/95 backdrop-blur-xl safe-top dark:bg-[#0f1219]/95"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={springSnappy}
              aria-label="Mobile navigation"
            >
              <ul className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))]">
                {links.map((link, i) => (
                  <motion.li key={link.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex min-h-[48px] items-center border-b border-border/40 text-base font-medium",
                        activeSection === link.id ? "text-cta" : "text-foreground"
                      )}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

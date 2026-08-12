"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { springSnappy } from "@/lib/motion";
import { SITE } from "@/lib/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { name: "Expertise", href: "#build", id: "build", index: "01" },
  { name: "Case Study", href: "#flagship", id: "flagship", index: "02" },
  { name: "Projects", href: "#work", id: "work", index: "03" },
  { name: "Experience", href: "#experience", id: "experience", index: "04" },
  { name: "Skills", href: "#skills", id: "skills", index: "05" },
  { name: "About", href: "#about", id: "about", index: "06" },
  { name: "Contact", href: "#contact", id: "contact", index: "07" },
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
            ? "border-b border-border/30 bg-background/85 shadow-sm shadow-black/[0.03] backdrop-blur-xl dark:border-white/[0.06] dark:bg-background/90"
            : "border-b border-border/0 bg-background/40 backdrop-blur-md dark:bg-background/50"
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-cta/15"
          aria-hidden
        />

        {scrolled && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cta/70 via-cta/40 to-transparent"
            style={{ scaleX: scrollProgress }}
            aria-hidden
          />
        )}

        <nav
          aria-label="Main navigation"
          className="page-container relative flex h-14 items-center justify-between gap-3 sm:h-[3.75rem]"
        >
          <motion.a
            href="#home"
            className="interactive relative z-10 flex min-h-[44px] min-w-0 shrink-0 items-center gap-2.5"
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(false)}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta sm:h-9 sm:w-9 sm:rounded-xl">
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
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-cta"
                    transition={springSnappy}
                  />
                )}
              </motion.a>
            ))}
          </div>

          <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-1.5">
            <ThemeToggle scrolled={scrolled} onHero={onHero} />
            <motion.a
              href={SITE.resumePath}
              download
              className="hidden h-9 items-center gap-1.5 rounded-lg bg-cta px-3 text-xs font-medium text-white transition hover:bg-cta-hover sm:inline-flex sm:text-sm"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={15} />
              Resume
            </motion.a>
            <motion.button
              type="button"
              className="touch-target relative flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.92 }}
            >
              <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
                <span
                  className={cn(
                    "h-px w-5 bg-current transition-transform duration-300",
                    open && "translate-y-[6px] rotate-45"
                  )}
                />
                <span className={cn("h-px w-5 bg-current transition-opacity duration-200", open && "opacity-0")} />
                <span
                  className={cn(
                    "h-px w-5 bg-current transition-transform duration-300",
                    open && "-translate-y-[6px] -rotate-45"
                  )}
                />
              </span>
            </motion.button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden />
            <motion.nav
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto border-b border-border/50 bg-background/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl safe-top"
              initial={{ y: "-8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-6%", opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile navigation"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cta/40 to-transparent" />

              <ul className="page-container pb-4 pt-[calc(4.75rem+env(safe-area-inset-top))]">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.035, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex min-h-[52px] items-center gap-4 border-b border-border/35 py-1",
                        activeSection === link.id ? "text-cta" : "text-foreground"
                      )}
                    >
                      <span className="font-mono-stamp w-7 shrink-0 text-[11px] text-meta transition group-hover:text-cta">
                        {link.index}
                      </span>
                      <span className="font-heading text-lg font-semibold tracking-tight sm:text-xl">{link.name}</span>
                      <span
                        className={cn(
                          "ml-auto h-1.5 w-1.5 rounded-full bg-cta transition-opacity",
                          activeSection === link.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="page-container pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
              >
                <a
                  href={SITE.resumePath}
                  download
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cta px-4 text-sm font-medium text-white transition hover:bg-cta-hover"
                >
                  <FileText size={16} />
                  Download resume
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

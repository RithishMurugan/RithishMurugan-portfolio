"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, MapPin, Phone, Github, ChevronDown, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer, staggerFast, pillPop } from "@/lib/motion";
import { SITE, HERO_KEYWORDS } from "@/lib/data/site";
import HeroBackground from "./HeroBackground";
import TerminalWidget from "./TerminalWidget";
import { ButtonLink } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const nameText = SITE.name;
  const titleText = SITE.title;
  const [displayedName, setDisplayedName] = useState(prefersReducedMotion ? nameText : "");
  const [nameIndex, setNameIndex] = useState(prefersReducedMotion ? nameText.length : 0);
  const [displayedTitle, setDisplayedTitle] = useState(prefersReducedMotion ? titleText : "");
  const [titleIndex, setTitleIndex] = useState(prefersReducedMotion ? titleText.length : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedName(nameText);
      setDisplayedTitle(titleText);
      return;
    }
    if (nameIndex < nameText.length) {
      const timer = setTimeout(() => {
        setDisplayedName(nameText.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, nameText, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (nameIndex >= nameText.length && titleIndex < titleText.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 75);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, titleIndex, titleText, nameText.length, prefersReducedMotion]);

  return (
    <section
      id="home"
      className="hero-text relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden safe-top transition-colors duration-300"
      aria-label="Introduction"
    >
      <HeroBackground />

      <motion.div
        className="relative z-10 grid w-full max-w-6xl items-center gap-8 px-4 pb-24 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:gap-10 sm:px-6 sm:pb-28 sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:text-left"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="min-w-0 text-center lg:text-left">
          <motion.div variants={fadeUp} custom={0} className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
            <span className="status-pulse text-[11px] sm:text-xs">Open to opportunities</span>
            <span className="hero-pill inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] backdrop-blur-sm sm:px-3 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-cta" />
              <span className="truncate">Healthcare AI · GenAI · Full-Stack</span>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} custom={0} className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-cta sm:text-base">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} custom={1} className="font-heading mb-3 text-balance text-[clamp(1.75rem,6vw+0.5rem,4.5rem)] font-extrabold leading-[1.1] tracking-tight">
            <span className="hero-name-gradient animate-gradient-text">
              {displayedName}
              {!prefersReducedMotion && nameIndex < nameText.length && (
                <motion.span className="inline-block text-cta" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                  |
                </motion.span>
              )}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="hero-text-muted mb-5 text-balance text-[clamp(1.125rem,3vw+0.5rem,1.875rem)] font-semibold leading-snug">
            {displayedTitle}
            {!prefersReducedMotion && titleIndex < titleText.length && (
              <motion.span className="text-cta" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>
                |
              </motion.span>
            )}
          </motion.p>

          <motion.p variants={fadeUp} custom={3} className="hero-text-subtle mx-auto mb-7 max-w-2xl text-sm leading-relaxed sm:text-base lg:mx-0">
            {SITE.summary}
          </motion.p>

          <motion.div variants={staggerFast} className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
            {HERO_KEYWORDS.map((pill) => (
              <motion.span
                key={pill}
                variants={pillPop}
                whileHover={{ scale: 1.06, y: -2 }}
                className="hero-pill cursor-default rounded-full px-3.5 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:text-xs"
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="hero-text-subtle mb-6 flex flex-col flex-wrap items-center justify-center gap-3 text-xs xs:flex-row xs:gap-5 sm:text-sm lg:items-start lg:justify-start">
            <span className="inline-flex max-w-full items-center gap-2">
              <MapPin size={16} className="shrink-0 text-cta" aria-hidden />
              {SITE.location}
            </span>
            <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="inline-flex max-w-full items-center gap-2 break-all hover:text-cta">
              <Phone size={16} className="shrink-0 text-cta" aria-hidden />
              {SITE.phone}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="mb-8 flex flex-col justify-center gap-3 xs:flex-row xs:flex-wrap lg:justify-start">
            <Magnetic className="w-full xs:w-auto">
              <ButtonLink href="#projects" variant="primary" size="md" className="w-full xs:w-auto">
                View Projects
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.2} className="w-full xs:w-auto">
              <ButtonLink href="#contact" variant="secondary" size="md" className="w-full min-h-[44px] xs:w-auto">
                Contact Me
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.15} className="w-full xs:w-auto">
              <ButtonLink href={SITE.resumePath} download variant="ghost" size="md" className="w-full min-h-[44px] border border-border xs:w-auto">
                Download Resume
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div variants={fadeUp} custom={6} className="flex items-center justify-center gap-4 lg:justify-start">
            {[
              { href: SITE.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: SITE.github, Icon: Github, label: "GitHub" },
              { href: `mailto:${SITE.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hero-social-btn interactive flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition hover:border-cta/50 hover:bg-cta/10 hover:text-cta"
                aria-label={label}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={2} className="hidden justify-center lg:flex">
          <div className="gradient-border rounded-2xl">
            <TerminalWidget />
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeUp} custom={3} className="relative z-10 mb-6 w-full max-w-md px-4 safe-bottom sm:mb-8 lg:hidden">
        <div className="gradient-border w-full rounded-2xl">
          <TerminalWidget />
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-text-subtle interactive absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 hover:text-cta"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={28} aria-hidden />
        </motion.div>
      </motion.a>
    </section>
  );
}

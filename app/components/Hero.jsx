"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, MapPin, Phone, Github, ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer, heroBlobTransition } from "../lib/motion";

const RESUME_PATH = "/Rithish_Murugan_Resume.pdf";
const EMAIL = "rithishmurugan52@gmail.com";

const keywordPills = [
  "Healthcare & FHIR",
  "Python & FastAPI",
  "LLM & RAG",
  "Kafka & Spark",
  "AWS & Kubernetes",
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const nameText = "Rithish Murugan";
  const [displayedName, setDisplayedName] = useState(prefersReducedMotion ? nameText : "");
  const [nameIndex, setNameIndex] = useState(prefersReducedMotion ? nameText.length : 0);

  const titleText = "Software Engineer";
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
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, nameText, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (nameIndex >= nameText.length && titleIndex < titleText.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 85);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, titleIndex, titleText, nameText.length, prefersReducedMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-hero-from via-hero-via to-hero-to text-center text-white"
      aria-label="Introduction"
    >
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-cta/15 blur-[100px]"
              animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
              transition={heroBlobTransition}
            />
            <motion.div
              className="absolute top-1/3 right-[5%] h-80 w-80 rounded-full bg-blue-400/10 blur-[110px]"
              animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
              transition={{ ...heroBlobTransition, duration: 16 }}
            />
          </>
        )}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 pb-28 pt-24 sm:px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} custom={0} className="mb-3 text-sm font-medium tracking-wide text-zinc-300 sm:text-base">
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-heading mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-white">
            {displayedName}
            {!prefersReducedMotion && nameIndex < nameText.length && (
              <span className="text-blue-300 motion-safe:animate-pulse">|</span>
            )}
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} custom={2} className="mb-5 text-xl font-semibold text-zinc-200 sm:text-2xl md:text-3xl">
          {displayedTitle}
          {!prefersReducedMotion && titleIndex < titleText.length && (
            <span className="text-blue-300 motion-safe:animate-pulse">|</span>
          )}
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mx-auto mb-7 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base"
        >
          Software Engineer with 4+ years building scalable backend platforms across healthcare and supply chain —
          from EHR integrations and clinical AI copilots to inventory, forecasting, and logistics automation.
        </motion.p>

        <motion.div variants={fadeUp} custom={4} className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {keywordPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-zinc-600/50 bg-zinc-800/40 px-3.5 py-1.5 text-[11px] font-medium text-zinc-200 backdrop-blur-sm sm:text-xs"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={5}
          className="mb-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 sm:gap-6 sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" aria-hidden />
            USA
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={16} className="text-blue-400" aria-hidden />
            +1 (773) 930-2475
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={6}
          className="mb-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <a href={RESUME_PATH} download className="btn-primary bg-white text-ink hover:bg-zinc-100">
            Download resume
          </a>
          <a
            href="#experience"
            className="interactive min-h-[44px] inline-flex items-center justify-center rounded-xl border-2 border-zinc-500/60 bg-zinc-800/30 px-7 py-3.5 font-semibold text-white backdrop-blur-sm duration-200 hover:border-zinc-400 hover:bg-zinc-800/50"
          >
            View experience
          </a>
          <a
            href="#contact"
            className="interactive min-h-[44px] inline-flex items-center justify-center rounded-xl border border-blue-500/50 px-7 py-3.5 font-medium text-blue-200 duration-200 hover:bg-blue-600/20"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div variants={fadeUp} custom={7} className="flex items-center justify-center gap-5">
          {[
            { href: "https://linkedin.com/in/rithishmurugan", Icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/RithishMurugan", Icon: Github, label: "GitHub" },
            { href: `mailto:${EMAIL}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="interactive flex h-12 w-12 items-center justify-center rounded-full border border-zinc-600/50 bg-zinc-800/30 text-zinc-300 duration-200 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-white"
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <a
        href="#about"
        className="interactive absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 duration-200 hover:text-blue-300 focus-visible:outline-offset-4"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="motion-safe:animate-bounce" size={28} aria-hidden />
      </a>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, MapPin, Phone, Github, ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer, staggerFast, pillPop, buttonMotion } from "../lib/motion";
import HeroBackground from "./HeroBackground";

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
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden text-center text-white"
      aria-label="Introduction"
    >
      <HeroBackground />

      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 pb-28 pt-24 sm:px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-blue-300/90 sm:text-base"
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-heading mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-br from-white via-zinc-100 to-blue-200 bg-clip-text text-transparent">
            {displayedName}
            {!prefersReducedMotion && nameIndex < nameText.length && (
              <motion.span
                className="inline-block text-blue-400"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mb-5 text-xl font-semibold text-zinc-200 sm:text-2xl md:text-3xl"
        >
          {displayedTitle}
          {!prefersReducedMotion && titleIndex < titleText.length && (
            <motion.span
              className="text-blue-400"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            >
              |
            </motion.span>
          )}
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mx-auto mb-7 max-w-2xl text-sm leading-relaxed text-zinc-300/95 sm:text-base"
        >
          Software Engineer with 4+ years building scalable backend platforms across healthcare and supply chain —
          from EHR integrations and clinical AI copilots to inventory, forecasting, and logistics automation.
        </motion.p>

        <motion.div
          variants={staggerFast}
          className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {keywordPills.map((pill) => (
            <motion.span
              key={pill}
              variants={pillPop}
              whileHover={{ scale: 1.05, borderColor: "rgba(96, 165, 250, 0.5)" }}
              className="glass-pill cursor-default rounded-full px-3.5 py-1.5 text-[11px] font-medium text-zinc-100 sm:text-xs"
            >
              {pill}
            </motion.span>
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
          <motion.a
            href={RESUME_PATH}
            download
            className="btn-primary bg-white text-ink shadow-lg shadow-black/20 hover:bg-zinc-50"
            {...buttonMotion}
          >
            Download resume
          </motion.a>
          <motion.a
            href="#experience"
            className="glass-btn interactive min-h-[44px] inline-flex items-center justify-center px-7 py-3.5 font-semibold text-white"
            {...buttonMotion}
          >
            View experience
          </motion.a>
          <motion.a
            href="#contact"
            className="interactive min-h-[44px] inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-blue-600/10 px-7 py-3.5 font-medium text-blue-100 backdrop-blur-sm hover:bg-blue-600/25"
            {...buttonMotion}
          >
            Get in touch
          </motion.a>
        </motion.div>

        <motion.div variants={fadeUp} custom={7} className="flex items-center justify-center gap-4">
          {[
            { href: "https://linkedin.com/in/rithishmurugan", Icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/RithishMurugan", Icon: Github, label: "GitHub" },
            { href: `mailto:${EMAIL}`, Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="interactive flex h-12 w-12 items-center justify-center rounded-full border border-zinc-600/50 bg-zinc-800/40 text-zinc-300 backdrop-blur-sm hover:border-blue-500/60 hover:bg-blue-600/25 hover:text-white"
              aria-label={label}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="interactive absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-zinc-400 hover:text-blue-300"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} aria-hidden />
        </motion.div>
      </motion.a>
    </section>
  );
}

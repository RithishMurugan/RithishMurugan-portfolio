"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Phone, Github, ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "../lib/motion";

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
  const nameText = "Rithish Murugan";
  const [displayedName, setDisplayedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);

  const titleText = "Software Engineer";
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (nameIndex < nameText.length) {
      const timer = setTimeout(() => {
        setDisplayedName(nameText.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, nameText]);

  useEffect(() => {
    if (nameIndex >= nameText.length && titleIndex < titleText.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(titleText.slice(0, titleIndex + 1));
        setTitleIndex(titleIndex + 1);
      }, 85);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, titleIndex, titleText, nameText.length]);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-[#070f1f] via-[#0d1b3d] to-[#162d5c] text-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-[5%] h-80 w-80 rounded-full bg-cyan-500/15 blur-[110px]"
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl px-4 sm:px-6 pt-24 pb-28"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} custom={0} className="text-sm sm:text-base font-medium text-cyan-300/90 mb-3 tracking-wide">
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {displayedName}
            {nameIndex < nameText.length && <span className="animate-pulse">|</span>}
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} custom={2} className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5">
          <span className="text-blue-100/95">
            {displayedTitle}
            {titleIndex < titleText.length && <span className="animate-pulse">|</span>}
          </span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100/90 leading-relaxed mb-7"
        >
          Software Engineer with 4+ years building scalable backend platforms across healthcare and supply chain —
          from EHR integrations and clinical AI copilots to inventory, forecasting, and logistics automation.
        </motion.p>

        <motion.div variants={fadeUp} custom={4} className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-8">
          {keywordPills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-cyan-100 backdrop-blur-sm"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={5}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-blue-200/90 text-xs sm:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-cyan-400" />
            USA
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone size={16} className="text-cyan-400" />
            +1 (773) 930-2475
          </span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={6}
          className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
        >
          <a
            href={RESUME_PATH}
            download
            className="min-h-[48px] inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-xl shadow-black/25 transition hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.99]"
          >
            Download resume
          </a>
          <a
            href="#experience"
            className="min-h-[48px] inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/50"
          >
            View experience
          </a>
          <a
            href="#contact"
            className="min-h-[48px] inline-flex items-center justify-center rounded-xl border border-cyan-400/40 px-7 py-3.5 font-medium text-cyan-100 transition hover:bg-cyan-500/10"
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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-blue-200 transition hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-white"
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-300/70 hover:text-cyan-300 transition"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        aria-label="Scroll to about"
      >
        <ChevronDown className="animate-bounce" size={28} />
      </motion.a>
    </section>
  );
}

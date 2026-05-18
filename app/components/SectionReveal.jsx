"use client";

import { motion } from "framer-motion";
import { fadeUp, badgeReveal, lineExpand, staggerFast, viewportOnce } from "../lib/motion";

export function SectionReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ badge, title, titleAccent, subtitle, className = "" }) {
  return (
    <motion.div
      className={`mb-8 px-4 text-center sm:mb-10 md:mb-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerFast}
    >
      {badge && (
        <motion.span variants={badgeReveal} className="section-badge mb-3 inline-block sm:mb-4">
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-heading mb-2 text-3xl font-extrabold tracking-tight text-ink sm:mb-3 sm:text-4xl md:text-5xl"
      >
        <span>{title}</span>
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </motion.h2>
      <motion.div
        variants={lineExpand}
        className="mx-auto mb-3 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-cta via-blue-500 to-cyan-500 sm:w-32"
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../lib/motion";

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
    <SectionReveal className={`text-center mb-8 sm:mb-10 md:mb-12 px-4 ${className}`}>
      {badge && (
        <span className="section-badge mb-3 sm:mb-4 inline-block">{badge}</span>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 tracking-tight text-ink">
        <span>{title}</span>
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </h2>
      <motion.div
        className="mx-auto mb-3 h-1 w-24 rounded-full bg-cta sm:w-32"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
      {subtitle && (
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </SectionReveal>
  );
}

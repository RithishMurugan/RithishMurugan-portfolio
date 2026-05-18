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
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 tracking-tight">
        <span className="text-slate-900">{title}</span>
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </h2>
      <motion.div
        className="h-1 w-24 sm:w-32 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, delay: 0.15 }}
      />
      {subtitle && (
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </SectionReveal>
  );
}

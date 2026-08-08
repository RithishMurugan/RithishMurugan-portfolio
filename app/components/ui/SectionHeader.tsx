"use client";

import { motion } from "framer-motion";
import { fadeUp, badgeReveal, lineExpand, staggerFast, viewportOnce } from "@/lib/motion";
import { SectionBadge } from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  titleAccent,
  subtitle,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "left" ? "text-left" : "text-center";
  const lineClass = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <motion.div
      className={`mb-8 sm:mb-10 md:mb-12 ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerFast}
    >
      {badge && (
        <motion.div variants={badgeReveal} className="mb-3 sm:mb-4">
          <SectionBadge>{badge}</SectionBadge>
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0}
        className="font-heading mb-2 overflow-visible text-balance text-[clamp(1.75rem,4vw+1rem,3rem)] font-extrabold tracking-tight text-foreground sm:mb-3"
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </motion.h2>
      <motion.div
        variants={lineExpand}
        className={`mb-3 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-cta via-blue-500 to-cyan-500 sm:w-32 ${lineClass}`}
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={1}
          className={`max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

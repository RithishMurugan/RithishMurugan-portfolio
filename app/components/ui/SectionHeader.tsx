"use client";

import { motion } from "framer-motion";
import { fadeUp, badgeReveal, lineExpand, staggerFast, viewportOnce } from "@/lib/motion";
import { SectionBadge } from "./Badge";
import TextReveal from "./TextReveal";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ badge, title, titleAccent, subtitle, className = "" }: SectionHeaderProps) {
  const fullTitle = titleAccent ? `${title} ${titleAccent}` : title;

  return (
    <motion.div
      className={`mb-8 text-center sm:mb-10 md:mb-12 ${className}`}
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
        className="font-heading mb-2 text-balance text-[clamp(1.75rem,4vw+1rem,3rem)] font-extrabold tracking-tight text-foreground sm:mb-3"
      >
        <TextReveal text={title} className="justify-center" />
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">
              <TextReveal text={titleAccent} className="justify-center" delay={0.15} />
            </span>
          </>
        )}
      </motion.h2>
      <span className="sr-only">{fullTitle}</span>
      <motion.div
        variants={lineExpand}
        className="mx-auto mb-3 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-cta via-blue-500 to-cyan-500 sm:w-32"
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
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

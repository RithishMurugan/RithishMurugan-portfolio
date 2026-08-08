"use client";

import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const REVEAL_DURATION = 0.85;

interface HeroNameProps {
  firstName: string;
  lastName: string;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

function MaskedLine({
  children,
  className,
  delay = 0,
  reducedMotion,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <span className={cn("block", className)}>{children}</span>;
  }

  return (
    <span className="block overflow-hidden pb-[0.05em]">
      <motion.span
        className={cn("block", className)}
        initial={{ y: "110%", opacity: 0.35 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: REVEAL_DURATION, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroName({ firstName, lastName, parallaxX, parallaxY }: HeroNameProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sweepDelay = reducedMotion ? 0 : 0.12 + REVEAL_DURATION + 0.22;

  return (
    <motion.h1
      className="font-heading relative mb-5 text-balance text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
      style={parallaxX && parallaxY ? { x: parallaxX, y: parallaxY } : undefined}
    >
      <MaskedLine className="text-foreground" delay={0.1} reducedMotion={reducedMotion}>
        {firstName}
      </MaskedLine>
      <MaskedLine className="text-foreground" delay={0.34} reducedMotion={reducedMotion}>
        {lastName}
      </MaskedLine>

      {!reducedMotion && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[45%] opacity-0 mix-blend-soft-light dark:mix-blend-screen"
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "320%", opacity: [0, 0.7, 0] }}
          transition={{
            delay: sweepDelay,
            duration: 1.05,
            ease,
            times: [0, 0.45, 1],
          }}
          style={{
            background:
              "linear-gradient(100deg, transparent 20%, rgba(56, 189, 248, 0.28) 48%, rgba(37, 99, 235, 0.22) 52%, transparent 78%)",
          }}
        />
      )}
    </motion.h1>
  );
}

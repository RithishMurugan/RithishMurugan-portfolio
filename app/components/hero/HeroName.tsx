"use client";

import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const REVEAL_DURATION = 0.45;

interface HeroNameProps {
  firstName: string;
  lastName: string;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

function SoftLine({
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

  // No overflow mask — tight leading + clip was cutting descenders ("g" in Murugan)
  return (
    <motion.span
      className={cn("block", className)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: REVEAL_DURATION, delay, ease }}
    >
      {children}
    </motion.span>
  );
}

export default function HeroName({ firstName, lastName, parallaxX, parallaxY }: HeroNameProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sweepDelay = reducedMotion ? 0 : 0.08 + REVEAL_DURATION + 0.1;

  return (
    <motion.h1
      className="font-heading relative mb-5 text-balance text-[clamp(2.25rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.04em]"
      style={parallaxX && parallaxY ? { x: parallaxX, y: parallaxY } : undefined}
    >
      <SoftLine className="text-foreground" delay={0.1} reducedMotion={reducedMotion}>
        {firstName}
      </SoftLine>
      <SoftLine className="text-foreground" delay={0.22} reducedMotion={reducedMotion}>
        {lastName}
      </SoftLine>

      {!reducedMotion && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[40%] opacity-0 mix-blend-soft-light dark:mix-blend-screen"
          initial={{ x: "-130%", opacity: 0 }}
          animate={{ x: "320%", opacity: [0, 0.4, 0] }}
          transition={{
            delay: sweepDelay,
            duration: 0.75,
            ease,
            times: [0, 0.45, 1],
          }}
          style={{
            background:
              "linear-gradient(100deg, transparent 20%, rgba(108, 99, 255, 0.2) 48%, rgba(158, 165, 255, 0.1) 52%, transparent 78%)",
          }}
        />
      )}
    </motion.h1>
  );
}

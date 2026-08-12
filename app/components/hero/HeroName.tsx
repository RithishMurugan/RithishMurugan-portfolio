"use client";

import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface HeroNameProps {
  firstName: string;
  lastName: string;
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

/**
 * Hero name — General Sans 600.
 * Signal-trace reveal is owned by the Hero GSAP timeline.
 */
export default function HeroName({ firstName, lastName, parallaxX, parallaxY }: HeroNameProps) {
  return (
    <motion.h1
      data-hero-name
      className="font-heading relative mb-5 text-balance text-[clamp(2.25rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-foreground"
      style={parallaxX && parallaxY ? { x: parallaxX, y: parallaxY } : undefined}
    >
      <span data-name-line="first" className="relative block">
        <span
          data-name-word="first"
          className="hero-name-word relative z-[1] block"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          {firstName}
        </span>
      </span>

      <span data-name-line="last" className="relative mt-[0.02em] block">
        <span
          data-name-word="last"
          className="hero-name-word relative z-[1] block"
          style={{ clipPath: "inset(0 0 0 0)" }}
        >
          {lastName}
        </span>
      </span>

      {/* Signal tracer — line + leading node; positioned by GSAP */}
      <span
        data-name-signal
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[2] opacity-0"
      >
        <span
          data-signal-beam
          className="absolute right-0 top-1/2 h-px w-7 -translate-y-1/2 bg-gradient-to-r from-transparent to-cta"
        />
        <span
          data-signal-node
          className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-cta shadow-[0_0_6px_color-mix(in_srgb,var(--color-cta)_55%,transparent)]"
        />
      </span>
    </motion.h1>
  );
}

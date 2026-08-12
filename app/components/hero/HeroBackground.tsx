"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroBlobTransition } from "@/lib/motion";

const networkPaths = [
  "M0 420 Q 220 380 440 400 T 880 360",
  "M0 520 Q 280 480 520 500 T 960 460",
  "M0 180 L 320 220 L 520 160 L 880 200",
];

const nodes = [
  { cx: "12%", cy: "38%", delay: 0 },
  { cx: "44%", cy: "41%", delay: 0.15 },
  { cx: "72%", cy: "36%", delay: 0.3 },
  { cx: "50%", cy: "72%", delay: 0.45 },
];

const HeroMesh = dynamic(() => import("./HeroMesh"), { ssr: false });

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden transition-colors duration-300" aria-hidden="true">
      <div className="hero-bg-base absolute inset-0 transition-[background] duration-300" />

      <Suspense fallback={null}>
        <div className="hidden dark:block">
          <HeroMesh />
        </div>
      </Suspense>

      <motion.div
        className="hero-bg-overlay absolute inset-0 transition-[background] duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {!prefersReducedMotion && (
        <div className="hidden dark:contents">
          <motion.div
            className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-cta/[0.08] blur-[110px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={heroBlobTransition}
          />
          <motion.div
            className="absolute -right-24 bottom-1/4 h-64 w-64 rounded-full opacity-50 blur-[100px]"
            style={{ background: "color-mix(in srgb, var(--color-mist) 14%, transparent)" }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ ...heroBlobTransition, delay: 2 }}
          />
        </div>
      )}

      <svg className="absolute inset-0 h-full w-full opacity-25 dark:opacity-30" preserveAspectRatio="none">
        {networkPaths.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--hero-network-stroke)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
          />
        ))}
        {nodes.map((node) =>
          prefersReducedMotion ? (
            <circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="var(--hero-network-node)"
              className="hidden dark:block"
            />
          ) : (
            <motion.circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="var(--hero-network-node)"
              className="hidden dark:block"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
            />
          )
        )}
      </svg>

      <div className="hero-bg-bottom-fade absolute inset-0 transition-[background] duration-300" />
    </div>
  );
}

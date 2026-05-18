"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroBlobTransition } from "../lib/motion";

const networkPaths = [
  "M0 420 Q 220 380 440 400 T 880 360",
  "M0 520 Q 280 480 520 500 T 960 460",
  "M0 180 L 320 220 L 520 160 L 880 200",
];

const nodes = [
  { cx: "12%", cy: "38%", r: 2.5, delay: 0 },
  { cx: "44%", cy: "41%", r: 2.5, delay: 0.15 },
  { cx: "72%", cy: "36%", r: 2.5, delay: 0.3 },
  { cx: "50%", cy: "72%", r: 2.5, delay: 0.45 },
];

export default function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, #070b12 0%, #0d1522 38%, #111827 62%, #0a0f18 100%)`,
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -5%, rgba(37, 99, 235, 0.24) 0%, transparent 55%),
            radial-gradient(ellipse 45% 35% at 92% 18%, rgba(56, 189, 248, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 8% 72%, rgba(37, 99, 235, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 100%, rgba(15, 23, 42, 0.9) 0%, transparent 70%)
          `,
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full text-blue-400/25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.65" fill="currentColor" opacity="0.35" />
          </pattern>
          <linearGradient id="hero-line-fade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(96, 165, 250)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(96, 165, 250)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
        <g fill="none" stroke="url(#hero-line-fade)" strokeWidth="0.85" strokeLinecap="round">
          {networkPaths.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{
                pathLength: { duration: 2.2, delay: 0.4 + i * 0.25, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.8, delay: 0.4 + i * 0.25 },
              }}
            />
          ))}
        </g>
        <g fill="rgb(96, 165, 250)">
          {nodes.map((node) => (
            <motion.circle
              key={`${node.cx}-${node.cy}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 0.35, scale: 1 }
                  : { opacity: [0.2, 0.5, 0.2], scale: [1, 1.4, 1] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.3, delay: node.delay }
                  : { duration: 3, delay: node.delay, repeat: Infinity, ease: "easeInOut" }
              }
            />
          ))}
        </g>
      </svg>

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 42%, black 15%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 42%, black 15%, transparent 72%)",
        }}
      />

      {!prefersReducedMotion ? (
        <>
          <motion.div
            className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-blue-600/14 blur-[100px]"
            animate={{ x: [0, 24, 0], y: [0, 14, 0], scale: [1, 1.05, 1] }}
            transition={heroBlobTransition}
          />
          <motion.div
            className="absolute -right-[5%] top-[22%] h-[380px] w-[380px] rounded-full bg-sky-500/12 blur-[110px]"
            animate={{ x: [0, -18, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
            transition={{ ...heroBlobTransition, duration: 20 }}
          />
          <motion.div
            className="absolute left-1/2 top-[55%] h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[90px]"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <div className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute -right-[5%] top-[22%] h-[380px] w-[380px] rounded-full bg-sky-500/8 blur-[110px]" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-transparent to-[#fafafa]/10" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/85 to-transparent" />
    </div>
  );
}

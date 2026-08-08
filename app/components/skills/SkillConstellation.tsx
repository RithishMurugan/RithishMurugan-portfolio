"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import {
  skillOrbitClusters,
  FEATURED_QUICK_SCAN,
  getClusterChips,
  type SkillCluster,
} from "@/lib/data/skill-clusters";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const CLUSTER_COUNT = skillOrbitClusters.length;
const ORBIT_RADIUS = 42;

function getOrbitPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    angle,
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = { x: cx + r * Math.cos(startAngle), y: cy + r * Math.sin(startAngle) };
  const end = { x: cx + r * Math.cos(endAngle), y: cy + r * Math.sin(endAngle) };
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export default function SkillConstellation() {
  const [activeId, setActiveId] = useState(skillOrbitClusters[0]?.id ?? "");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const active = skillOrbitClusters.find((c) => c.id === activeId) ?? skillOrbitClusters[0];
  const focusId = hoverId ?? activeId;
  const selectedIndex = skillOrbitClusters.findIndex((c) => c.id === activeId);
  const focusIndex = skillOrbitClusters.findIndex((c) => c.id === focusId);

  useEffect(() => {
    if (reducedMotion) return;

    let frame: number;
    const tick = () => {
      setPulse((p) => (p + 0.018) % (Math.PI * 2));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  const selectedAngle = getOrbitPosition(selectedIndex, CLUSTER_COUNT, ORBIT_RADIUS).angle;
  const pulseTravel = selectedAngle + pulse * 0.35;
  const pulseX = 50 + Math.cos(pulseTravel) * ORBIT_RADIUS;
  const pulseY = 50 + Math.sin(pulseTravel) * ORBIT_RADIUS;

  const activeArcStart = selectedAngle - 0.42;
  const activeArcEnd = selectedAngle + 0.42;

  return (
    <section id="skills" className="section-shell relative">
      <SectionHeader
        badge="Engineering universe"
        title="Technical"
        titleAccent="ecosystem"
        subtitle="Explore core engineering areas — select a cluster to see the technologies behind each domain."
      />

      <motion.div
        className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} custom={0} className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px]">
            {/* Center atmosphere */}
            <div
              className="pointer-events-none absolute inset-[18%] rounded-full blur-3xl transition-all duration-700"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-cta) 22%, transparent) 0%, transparent 68%)",
                opacity: focusId === activeId ? 1 : 0.75,
              }}
              aria-hidden
            />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
              <defs>
                <linearGradient id="orbit-active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* Base orbit */}
              <circle
                cx="50"
                cy="50"
                r={ORBIT_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.12"
                className="text-cta/12"
              />

              {/* Inner subtle geometry */}
              <circle
                cx="50"
                cy="50"
                r={ORBIT_RADIUS * 0.55}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.08"
                strokeDasharray="1.5 3"
                className="text-cta/8"
                style={{ transform: `rotate(${pulse * 8}deg)`, transformOrigin: "50px 50px" }}
              />

              {/* Full orbit tick marks at node positions */}
              {skillOrbitClusters.map((cat, i) => {
                const pos = getOrbitPosition(i, CLUSTER_COUNT, ORBIT_RADIUS);
                const isSelected = activeId === cat.id;
                return (
                  <circle
                    key={`tick-${cat.id}`}
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 0.55 : 0.35}
                    fill="currentColor"
                    className={cn(
                      "transition-all duration-500",
                      isSelected ? "text-cta/90" : "text-cta/20"
                    )}
                  />
                );
              })}

              {/* Active arc segment with gradient */}
              <path
                d={describeArc(50, 50, ORBIT_RADIUS, activeArcStart, activeArcEnd)}
                fill="none"
                stroke="url(#orbit-active-gradient)"
                strokeWidth="0.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Focus preview arc on hover */}
              {hoverId && hoverId !== activeId && (
                <path
                  d={describeArc(
                    50,
                    50,
                    ORBIT_RADIUS,
                    getOrbitPosition(focusIndex, CLUSTER_COUNT, ORBIT_RADIUS).angle - 0.28,
                    getOrbitPosition(focusIndex, CLUSTER_COUNT, ORBIT_RADIUS).angle + 0.28
                  )}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-cta/30"
                />
              )}

              {/* Spokes */}
              {skillOrbitClusters.map((cat, i) => {
                const pos = getOrbitPosition(i, CLUSTER_COUNT, ORBIT_RADIUS);
                const isSelected = activeId === cat.id;
                const isFocused = focusId === cat.id;
                return (
                  <line
                    key={`spoke-${cat.id}`}
                    x1="50"
                    y1="50"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="currentColor"
                    strokeWidth={isSelected ? 0.22 : isFocused ? 0.16 : 0.08}
                    className={cn(
                      "transition-all duration-400",
                      isSelected ? "text-cta/50" : isFocused ? "text-cta/28" : "text-cta/8"
                    )}
                  />
                );
              })}

              {/* Traveling signal pulse */}
              <circle cx={pulseX} cy={pulseY} r="0.7" fill="rgb(59, 130, 246)" opacity={reducedMotion ? 0.5 : 0.85}>
                {!reducedMotion && (
                  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
                )}
              </circle>

              {/* Ambient signal particles */}
              {[0, 1, 2].map((pi) => {
                const angle = pulse * 0.5 + (pi * Math.PI * 2) / 3;
                const px = 50 + Math.cos(angle) * (ORBIT_RADIUS + 2);
                const py = 50 + Math.sin(angle) * (ORBIT_RADIUS + 2);
                return (
                  <circle
                    key={`particle-${pi}`}
                    cx={px}
                    cy={py}
                    r="0.25"
                    fill="currentColor"
                    className="text-cta/35"
                  />
                );
              })}
            </svg>

            {/* Category nodes */}
            {skillOrbitClusters.map((cat, i) => {
              const pos = getOrbitPosition(i, CLUSTER_COUNT, ORBIT_RADIUS);
              const isActive = activeId === cat.id;
              const isHovered = hoverId === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  onMouseEnter={() => setHoverId(cat.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(cat.id)}
                  onBlur={() => setHoverId(null)}
                  className={cn(
                    "interactive group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl px-2 py-1.5 backdrop-blur-sm transition-all duration-300 sm:px-2.5 sm:py-2",
                    isActive
                      ? "scale-105 border border-cta/35 bg-cta/12 shadow-[0_0_28px_rgba(37,99,235,0.22)]"
                      : isHovered
                        ? "-translate-y-[calc(50%+2px)] border border-cta/25 bg-cta/10 shadow-[0_0_18px_rgba(59,130,246,0.15)]"
                        : "border border-border/25 bg-card/25 hover:border-cta/20 hover:bg-card/40"
                  )}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  aria-pressed={isActive}
                  aria-label={cat.title}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? "h-2.5 w-2.5 bg-cta shadow-[0_0_10px_rgba(37,99,235,0.55)]"
                        : isHovered
                          ? "h-2 w-2 bg-cta/70"
                          : "h-2 w-2 bg-cta/45 group-hover:bg-cta/65"
                    )}
                  />
                  <span
                    className={cn(
                      "max-w-[76px] text-center text-[9px] font-semibold leading-tight transition-colors duration-300 sm:max-w-[88px] sm:text-[10px]",
                      isActive
                        ? "text-blue-400 dark:text-blue-300"
                        : isHovered
                          ? "text-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    {cat.shortLabel}
                  </span>
                </motion.button>
              );
            })}

            {/* Center label */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[48%] -translate-x-1/2 -translate-y-1/2 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.id}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-heading text-sm font-bold text-foreground sm:text-base">{active?.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {getClusterChips(active).length} technologies
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="lg:col-span-7">
          <SkillPanel cluster={active} />
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-10 rounded-2xl bg-muted/10 px-4 py-5 ring-1 ring-inset ring-cta/5 sm:px-6"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          High-signal stack
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {FEATURED_QUICK_SCAN.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-border/50 bg-cta/5 px-2.5 py-1 text-xs font-medium text-foreground/85 transition-all duration-200 hover:-translate-y-px hover:border-cta/25 hover:bg-cta/10 hover:text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SkillChip({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.28 }}
      className="inline-flex rounded-lg border border-border/50 bg-cta/[0.06] px-3 py-1.5 text-sm font-medium text-foreground/90 backdrop-blur-[2px] transition-all duration-200 hover:-translate-y-0.5 hover:border-cta/30 hover:bg-cta/10 hover:text-foreground hover:shadow-[0_4px_14px_rgba(37,99,235,0.12)] dark:border-cta/12 dark:bg-cta/[0.06] dark:hover:border-cta/35"
    >
      {skill}
    </motion.span>
  );
}

function SkillPanel({ cluster }: { cluster: SkillCluster | undefined }) {
  if (!cluster) return null;
  const Icon = cluster.icon;
  let chipIndex = 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cluster.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/25 via-card/50 to-muted/15 p-6 shadow-[0_12px_48px_rgba(15,23,42,0.08)] ring-1 ring-inset ring-cta/8 sm:p-8 dark:from-slate-900/40 dark:via-slate-800/30 dark:to-slate-900/20 dark:shadow-[0_12px_48px_rgba(0,0,0,0.25)] dark:ring-cta/12"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-cta) 16%, transparent) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 0% 0%, color-mix(in srgb, var(--color-cta) 6%, transparent) 0%, transparent 55%)",
          }}
          aria-hidden
        />

        <div className="relative mb-6 flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cta/20 bg-cta/10 text-cta shadow-[0_0_20px_rgba(37,99,235,0.12)]">
            <Icon size={21} aria-hidden />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{cluster.title}</h3>
            <p className="mt-0.5 text-sm text-muted-foreground">Production technologies & capabilities</p>
          </div>
        </div>

        <div className="relative space-y-4">
          {cluster.chipGroups.map((group, gi) => (
            <div key={`${cluster.id}-group-${gi}`} className="flex flex-wrap gap-2">
              {group.chips.map((skill) => {
                const idx = chipIndex++;
                return <SkillChip key={skill} skill={skill} index={idx} />;
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

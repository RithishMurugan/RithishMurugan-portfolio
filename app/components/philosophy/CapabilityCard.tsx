"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import type { CapabilityPillar } from "@/lib/data/narrative";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { cn } from "@/lib/utils";

function CardAtmosphere({ variant }: { variant: string }) {
  if (variant === "systems") {
    return (
      <svg className="absolute inset-0 h-full w-full opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.14]" aria-hidden>
        <defs>
          <pattern id="network-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.8" fill="currentColor" className="text-cta" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-grid)" />
        <line x1="10%" y1="70%" x2="90%" y2="30%" stroke="currentColor" strokeWidth="0.5" className="text-cta/35" />
        <line x1="20%" y1="40%" x2="75%" y2="65%" stroke="currentColor" strokeWidth="0.5" className="text-cta/30" />
        <line x1="60%" y1="15%" x2="40%" y2="85%" stroke="currentColor" strokeWidth="0.5" className="text-cta/25" />
      </svg>
    );
  }

  if (variant === "intelligence") {
    return (
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.16]" aria-hidden>
        <path
          d="M 0 60 Q 40 40, 80 55 T 160 50 T 240 45 T 320 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-cta/40"
        />
        <path
          d="M 0 75 Q 50 55, 100 70 T 200 62 T 300 68"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          className="text-cta/35"
        />
        <circle cx="75%" cy="35%" r="3" fill="currentColor" className="text-cta/35" />
        <circle cx="45%" cy="55%" r="2" fill="currentColor" className="text-cta/25" />
      </svg>
    );
  }

  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.13]" aria-hidden>
      <rect x="12%" y="68%" width="76%" height="6%" rx="2" fill="currentColor" className="text-cta/25" />
      <rect x="18%" y="52%" width="64%" height="6%" rx="2" fill="currentColor" className="text-cta/20" />
      <rect x="24%" y="36%" width="52%" height="6%" rx="2" fill="currentColor" className="text-cta/22" />
      <line x1="50%" y1="36%" x2="50%" y2="74%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" className="text-cta/20" />
    </svg>
  );
}

interface CapabilityCardProps {
  pillar: CapabilityPillar;
  index?: number;
}

export default function CapabilityCard({ pillar }: CapabilityCardProps) {
  const Icon = pillar.icon;
  const cardRef = useRef<HTMLElement>(null);
  const coarse = useCoarsePointer();
  const [active, setActive] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 });
  const rotateX = useSpring(0, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 });

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current || coarse) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x: px, y: py });
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -5);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 5);
  };

  const handleLeave = () => {
    setSpotlight({ x: 50, y: 30 });
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => setActive((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActive((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      style={{
        rotateX: coarse ? 0 : rotateX,
        rotateY: coarse ? 0 : rotateY,
        transformPerspective: 1000,
        backgroundImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, color-mix(in srgb, var(--color-cta) 14%, transparent) 0%, transparent 58%)`,
      }}
      whileHover={{ y: -3, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.995 }}
      className={cn(
        "group relative cursor-default overflow-hidden rounded-3xl p-6 outline-none transition-shadow duration-500 sm:p-8",
        "bg-gradient-to-br from-card/70 via-muted/20 to-card/50",
        "ring-1 ring-inset ring-[color-mix(in_srgb,var(--color-foreground)_8%,transparent)] hover:shadow-[0_16px_40px_rgba(108,99,255,0.12)] dark:shadow-none",
        "hover:ring-cta/20 focus-visible:ring-2 focus-visible:ring-cta",
        active && "ring-cta/25 shadow-[0_16px_40px_rgba(108,99,255,0.14)]"
      )}
    >
      <CardAtmosphere variant={pillar.id} />

      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cta/5 blur-3xl transition-all duration-500 group-hover:bg-cta/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, color-mix(in srgb, var(--color-cta) 8%, transparent), transparent 45%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cta/15 bg-cta/10 text-cta transition-all duration-400",
            "group-hover:border-cta/30 group-hover:bg-cta/15 group-hover:shadow-[0_0_18px_rgba(108,99,255,0.14)]",
            active && "border-cta/35 bg-cta/18"
          )}
        >
          <Icon size={22} aria-hidden />
        </div>

        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cta/90 transition-colors group-hover:text-cta">
          {pillar.subtitle}
        </p>
        <h3 className="font-heading mb-3 text-xl font-semibold text-foreground transition-colors group-hover:text-foreground sm:text-2xl">
          {pillar.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-secondary transition-colors sm:text-base">
          {pillar.description}
        </p>
        <p className="mb-5 text-xs font-medium text-cta/75">{pillar.footnote}</p>

        <div className="flex flex-wrap gap-2">
          {pillar.nodes.map((node) => (
            <span
              key={node}
              className={cn(
                "rounded-full border border-cta/10 bg-cta/[0.05] px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all duration-300",
                "group-hover:border-cta/20 group-hover:bg-cta/[0.08] group-hover:text-foreground",
                active && "border-cta/25 bg-cta/10 text-foreground"
              )}
            >
              {node}
            </span>
          ))}
        </div>

      </div>
    </motion.article>
  );
}

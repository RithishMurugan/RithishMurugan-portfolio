"use client";

import { MARQUEE_TECH } from "@/lib/data/stats";

export default function TechMarquee() {
  const items = [...MARQUEE_TECH, ...MARQUEE_TECH];

  return (
    <div className="relative overflow-hidden border-b border-border bg-muted/40 py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track flex w-max gap-8">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cta/60" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

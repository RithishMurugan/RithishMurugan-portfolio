"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "grid";
}

export default function SectionBackground({ children, className, variant = "default" }: SectionBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {variant === "grid" && (
        <div className="pointer-events-none absolute inset-0 section-grid opacity-[0.4] dark:opacity-[0.15]" aria-hidden />
      )}
      {variant === "muted" && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-cta/5 blur-[100px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full blur-[90px]"
            style={{ background: "color-mix(in srgb, var(--color-mist) 6%, transparent)" }}
            animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

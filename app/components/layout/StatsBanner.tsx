"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/data/stats";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function StatsBanner() {
  return (
    <section aria-label="Impact metrics" className="relative border-y border-border bg-card/50 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 shimmer-line opacity-30" aria-hidden />
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 md:grid-cols-4 md:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {STATS.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
            <p className="font-heading text-[clamp(1.5rem,4vw+0.5rem,2.25rem)] font-extrabold text-foreground">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={"decimals" in stat ? stat.decimals : 0}
              />
            </p>
            <p className="mt-1.5 text-[10px] font-medium uppercase leading-tight tracking-wider text-muted-foreground xs:text-xs sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

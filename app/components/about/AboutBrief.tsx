"use client";

import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/Badge";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SITE } from "@/lib/data/site";

const expertiseTags = ["AI & GenAI", "Distributed Systems", "Full-Stack", "Cloud Infrastructure"] as const;

export default function AboutBrief() {
  return (
    <section id="about" className="section-shell">
      <div className="relative grid items-start gap-8 md:gap-10 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-16">
        <div
          className="pointer-events-none absolute bottom-6 top-6 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border/35 to-transparent lg:left-1/2 lg:block dark:via-white/[0.08]"
          aria-hidden
        />

        <motion.div
          className="lg:pr-4 xl:pr-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionBadge>About</SectionBadge>

          <h2 className="mt-4 font-heading text-balance text-[clamp(1.85rem,3.4vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-foreground sm:mt-5">
            Engineer who ships.
          </h2>

          <p className="mt-3 max-w-md text-[clamp(0.95rem,1.5vw,1.1rem)] font-medium leading-[1.5] text-muted-foreground sm:mt-4">
            Building systems where{" "}
            <span className="gradient-text">intelligence meets production.</span>
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 lg:pl-4 xl:pl-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          custom={1}
        >
          <p className="max-w-prose text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base">
            I enjoy problems where backend architecture, applied AI, and product delivery have to work
            together — not as separate phases, but as one coherent system.
          </p>

          <p className="max-w-prose text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base">
            Based in the {SITE.location}, I lean toward end-to-end ownership: clear contracts, reliable
            pipelines, and interfaces people can actually use.
          </p>

          <p className="max-w-prose pt-0.5 text-xs font-medium tracking-wide text-muted-foreground/75 sm:text-[0.8125rem]">
            4+ years · AI · Backend · Distributed Systems
          </p>

          <div className="flex max-w-prose flex-wrap gap-2 pt-1">
            {expertiseTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-8 items-center rounded-full border border-border/60 bg-muted/35 px-3 text-xs font-medium text-foreground/90 transition-colors duration-200 hover:border-cta/25 hover:bg-muted/55 hover:text-foreground dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-cta/20 dark:hover:bg-white/[0.07]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

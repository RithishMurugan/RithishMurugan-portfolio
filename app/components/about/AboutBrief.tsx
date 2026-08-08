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

          <h2 className="mt-4 font-heading text-balance text-[clamp(1.65rem,3vw,2.25rem)] font-semibold leading-[1.28] tracking-tight text-foreground sm:mt-5">
            Building systems where{" "}
            <span className="gradient-text">intelligence meets production.</span>
          </h2>

          <p className="mt-3 max-w-md text-base font-medium leading-snug text-muted-foreground sm:mt-4 sm:text-lg">
            Engineer who ships
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
          <p className="max-w-[32rem] text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base">
            AI Full Stack Software Engineer with 4+ years building production AI platforms, backend services, and
            distributed systems — from enterprise Java at Hexaware and data engineering at Virtualan to GenAI and
            cloud-native delivery at Abridge.
          </p>

          <p className="max-w-[32rem] text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base">
            Based in the {SITE.location}, I work where backend engineering, applied AI, and distributed systems meet —
            shipping software that scales in production.
          </p>

          <p className="max-w-[32rem] pt-0.5 text-xs font-medium tracking-wide text-muted-foreground/75 sm:text-[0.8125rem]">
            4+ years · AI · Backend · Distributed Systems
          </p>

          <div className="flex max-w-[32rem] flex-wrap gap-2 pt-1">
            {expertiseTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-8 items-center rounded-full border border-border/60 bg-muted/35 px-3 text-xs font-medium text-foreground/90 transition-colors duration-200 hover:border-cta/25 hover:bg-muted/55 hover:text-foreground dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-cyan-400/20 dark:hover:bg-white/[0.07]"
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

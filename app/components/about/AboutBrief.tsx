"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { SITE } from "@/lib/data/site";

export default function AboutBrief() {
  return (
    <section id="about" className="section-shell">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <SectionHeader
            badge="About"
            title="Engineer who"
            titleAccent="ships"
            subtitle=""
            className="!mb-0 text-left"
          />
          <p className="font-heading text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-foreground">
            Building systems where <span className="gradient-text">intelligence meets production.</span>
          </p>
        </motion.div>

        <motion.div
          className="space-y-5 lg:col-span-7"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          custom={1}
        >
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {SITE.summary}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Based in the {SITE.location}, I work at the intersection of backend engineering, applied AI, and distributed systems — shipping software that scales in production.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["AI & GenAI", "Distributed Systems", "Full-Stack", "Cloud Infrastructure"].map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

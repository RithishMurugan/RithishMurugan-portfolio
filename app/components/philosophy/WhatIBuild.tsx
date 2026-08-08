"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CapabilityCard from "@/components/philosophy/CapabilityCard";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { CAPABILITY_PILLARS, PHILOSOPHY_STATEMENTS } from "@/lib/data/narrative";
import { cn } from "@/lib/utils";

export default function WhatIBuild() {
  return (
    <section id="build" className="section-shell relative">
      <SectionHeader
        badge="Expertise"
        title="Intelligent"
        titleAccent="systems"
        subtitle="Three interconnected layers — distributed infrastructure, applied AI, and full-stack delivery — that power production software at scale."
        className="text-left md:text-center"
      />

      <motion.div
        className="mb-16 grid gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {CAPABILITY_PILLARS.map((pillar, i) => (
          <CapabilityCard key={pillar.id} pillar={pillar} index={i} />
        ))}
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {PHILOSOPHY_STATEMENTS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} variants={fadeUp} custom={i} className="relative pl-6">
              <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-cta/60 via-cta/20 to-transparent" />
              <div className="mb-3 flex items-center gap-2 text-cta">
                <Icon size={18} aria-hidden />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wide">{item.title}</h4>
              </div>
              <p className={cn("text-sm leading-relaxed text-muted-foreground sm:text-base")}>{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

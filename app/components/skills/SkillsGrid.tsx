"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillCategories } from "@/lib/data/skills";
import { fadeUp, staggerContainer, viewportOnce, cardHover } from "@/lib/motion";

export default function SkillsGrid() {
  return (
    <div className="w-full bg-muted/30">
      <section id="skills" className="section-shell">
      <SectionHeader
        badge="Skills & Technologies"
        title="Technical"
        titleAccent="Expertise"
        subtitle="Technologies and tools I use across frontend, backend, AI, and cloud platforms."
      />

      <motion.div
        className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              variants={{
                hidden: fadeUp.hidden,
                visible: fadeUp.visible,
                rest: cardHover.rest,
                hover: cardHover.hover,
              }}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]`} />
              <div className="relative mb-4 flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-foreground sm:text-lg">{cat.title}</h3>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {cat.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      </section>
    </div>
  );
}

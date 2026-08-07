"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, MapPin, ChevronDown, GraduationCap, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { timeline } from "@/lib/data/experience";
import { fadeUp, staggerContainer, viewportOnce, springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function ExperienceTimeline() {
  const [expanded, setExpanded] = useState<string | null>("abridge-timeline");

  return (
    <section id="experience" className="section-shell">
      <SectionHeader
        badge="Experience"
        title="Professional"
        titleAccent="Journey"
        subtitle="Interactive timeline — expand each node for achievements, metrics, and tech stacks."
      />

      <motion.div
        className="relative w-full"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <div className="absolute left-4 top-0 bottom-0 w-px overflow-hidden sm:left-6" aria-hidden>
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-cta via-blue-400/50 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="space-y-6">
          {timeline.map((item, i) => {
            const isOpen = expanded === item.id;
            const exp = item.experience;

            return (
              <motion.div key={item.id} variants={fadeUp} custom={i} className="relative pl-10 sm:pl-14">
                <motion.div
                  className={cn(
                    "absolute left-2.5 top-5 h-3 w-3 rounded-full border-2 sm:left-4.5",
                    isOpen ? "border-cta bg-cta shadow-lg shadow-cta/40" : "border-border bg-card"
                  )}
                  animate={isOpen ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                />

                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                  className="interactive w-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:border-cta/30 hover:shadow-card-hover sm:p-6"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-cta">{item.period}</p>

                      {item.type === "education" && item.education ? (
                        <>
                          <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl">{item.education.degree}</h3>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <GraduationCap className="h-4 w-4 shrink-0" />
                            {item.education.school}
                          </p>
                        </>
                      ) : exp ? (
                        <>
                          <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl">{exp.title}</h3>
                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                            <Building2 className="h-4 w-4 shrink-0 text-cta" />
                            {exp.company}
                          </p>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                            <span className="inline-flex items-center gap-1.5">
                              <Briefcase className="h-3.5 w-3.5" />
                              {exp.employmentType}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {exp.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {exp.location}
                            </span>
                          </p>
                        </>
                      ) : (
                        <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl">{item.heading}</h3>
                      )}
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springSnappy} className="shrink-0 pt-1">
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
                        {item.type === "education" && item.education && (
                          <>
                            <div className="mb-4 border-b border-border pb-4">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Degree</p>
                              <p className="text-base font-bold text-foreground">{item.education.degree}</p>
                            </div>
                            <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {item.education.date}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                {item.education.location}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {item.education.highlights.map((h) => (
                                <li key={h} className="flex gap-2 text-sm text-foreground">
                                  <span className="text-cta">•</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}

                        {exp && (
                          <>
                            <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-border pb-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Role</p>
                                <p className="text-base font-bold text-foreground">{exp.title}</p>
                              </div>
                              <span className={cn("rounded-lg px-3 py-1 text-xs font-semibold text-white", exp.employmentTypeColor)}>
                                {exp.employmentType}
                              </span>
                            </div>

                            <div className="mb-4 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-4">
                              {exp.impactHighlights.map((h) => (
                                <div key={h.label} className="metric-chip">
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-cta/80">{h.label}</p>
                                  <p className="mt-0.5 text-sm font-bold text-foreground">{h.value}</p>
                                </div>
                              ))}
                            </div>

                            <ul className="mb-4 space-y-2">
                              {exp.details.map((d) => (
                                <li key={d} className="flex gap-2 text-sm text-foreground">
                                  <span className="text-cta">›</span>
                                  {d}
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((s) => (
                                <span key={s} className="rounded-lg bg-card px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-border">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

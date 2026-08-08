"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce, springSnappy } from "@/lib/motion";
import { timeline } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

export default function CareerNetwork() {
  const [activeId, setActiveId] = useState(timeline[timeline.length - 1]?.id ?? "");

  return (
    <section id="experience" className="section-shell relative">
      <SectionHeader
        badge="Career path"
        title="Engineering"
        titleAccent="evolution"
        subtitle="Java Developer → Software Engineer → AI Full Stack Software Engineer — a progression through production systems, data platforms, and intelligent applications."
      />

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-cta/40 to-transparent md:left-1/2 md:block md:-translate-x-px" />

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {timeline.map((item, i) => {
            const isActive = activeId === item.id;
            const isWork = item.type === "work";
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                custom={i}
                className={cn("relative md:grid md:grid-cols-2 md:gap-8")}
              >
                <div className={cn("md:col-start-1", !isLeft && "md:col-start-2")}>
                  <button
                    type="button"
                    onClick={() => setActiveId(isActive ? "" : item.id)}
                    className={cn(
                      "interactive w-full rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6",
                      isActive
                        ? "border-cta/40 bg-card shadow-lg shadow-cta/5"
                        : "border-border bg-card/50 hover:border-cta/20"
                    )}
                    aria-expanded={isActive}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", isWork ? "bg-cta/10 text-cta" : "bg-emerald-500/10 text-emerald-500")}>
                        {isWork ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-cta">{item.period}</p>
                        <h3 className="font-heading text-lg font-bold text-foreground">{item.heading}</h3>
                        {isWork && item.experience && (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.experience.company} · {item.experience.date}
                          </p>
                        )}
                        {!isWork && item.education && (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.education.school} · {item.education.date}
                          </p>
                        )}
                      </div>
                      <ChevronDown
                        size={18}
                        className={cn("ml-auto text-muted-foreground transition-transform", isActive && "rotate-180")}
                      />
                    </div>

                    {isWork && item.experience && (
                      <div className="flex flex-wrap gap-2">
                        {item.experience.impactHighlights.map((h) => (
                          <span key={h.label} className="metric-chip text-xs">
                            <span className="font-bold text-foreground">{h.value}</span>{" "}
                            <span className="text-muted-foreground">{h.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </div>

                <div className={cn("hidden md:block", isLeft ? "md:col-start-2" : "md:col-start-1")} />

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={springSnappy}
                      className="col-span-full overflow-hidden"
                    >
                      <div className="mt-2 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6 md:ml-auto md:max-w-2xl">
                        {item.type === "work" && item.experience && (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {item.experience.company} · {item.experience.location} · {item.experience.date}
                            </p>
                            <ul className="space-y-3">
                              {item.experience.details.map((detail) => (
                                <li key={detail.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed text-foreground">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cta" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {item.experience.skills.map((skill) => (
                                <span key={skill} className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {item.type === "education" && item.education && (
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                              {item.education.school} · {item.education.location} · {item.education.date}
                            </p>
                            <p className="font-heading text-lg font-semibold text-foreground">{item.education.degree}</p>
                            <ul className="space-y-2">
                              {item.education.highlights.map((h) => (
                                <li key={h} className="text-sm leading-relaxed text-muted-foreground">
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute left-4 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-cta bg-background md:left-1/2 md:block" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

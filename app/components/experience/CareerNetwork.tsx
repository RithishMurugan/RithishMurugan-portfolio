"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce, springSnappy } from "@/lib/motion";
import { timeline } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

const PREVIEW_BULLET_COUNT = 3;

export default function CareerNetwork() {
  const [activeId, setActiveId] = useState(timeline[timeline.length - 1]?.id ?? "");
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const toggleActive = (id: string) => {
    setActiveId((current) => {
      if (current === id) {
        setExpandedDetails((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        return "";
      }
      return id;
    });
  };

  const toggleDetails = (id: string) => {
    setExpandedDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="section-shell relative">
      <SectionHeader
        badge="Career path"
        title="Engineering"
        titleAccent="evolution"
        subtitle="From enterprise Java and cloud data platforms to production AI — a progression through systems that ship."
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
            const showAllDetails = expandedDetails[item.id] ?? false;

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
                    onClick={() => toggleActive(item.id)}
                    className={cn(
                      "interactive w-full rounded-2xl p-5 text-left transition-all duration-300 sm:p-6",
                      "ring-1 ring-inset ring-border/50 bg-card/60 hover:ring-cta/15",
                      isActive && "ring-cta/25 bg-card shadow-[0_12px_40px_rgba(37,99,235,0.08)]"
                    )}
                    aria-expanded={isActive}
                  >
                    <div className="mb-3 flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          isWork ? "bg-cta/10 text-cta" : "bg-emerald-500/10 text-emerald-500"
                        )}
                      >
                        {isWork ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        {isWork && item.experience ? (
                          <>
                            <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
                              {item.experience.title}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-foreground/90">{item.experience.company}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.experience.date}</p>
                          </>
                        ) : item.education ? (
                          <>
                            <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
                              {item.education.degree}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-foreground/90">{item.education.school}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{item.education.date}</p>
                          </>
                        ) : (
                          <h3 className="font-heading text-lg font-bold text-foreground">{item.heading}</h3>
                        )}
                      </div>
                      <ChevronDown
                        size={18}
                        className={cn("ml-auto shrink-0 text-muted-foreground transition-transform", isActive && "rotate-180")}
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
                      <div className="mt-2 rounded-2xl bg-muted/25 p-5 ring-1 ring-inset ring-border/40 sm:p-6 md:ml-auto md:max-w-2xl">
                        {item.type === "work" && item.experience && (
                          <div className="space-y-4">
                            <ul className="space-y-3">
                              {(showAllDetails
                                ? item.experience.details
                                : item.experience.details.slice(0, PREVIEW_BULLET_COUNT)
                              ).map((detail) => (
                                <li key={detail.slice(0, 48)} className="flex gap-3 text-sm leading-relaxed text-foreground">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cta" />
                                  {detail}
                                </li>
                              ))}
                            </ul>

                            {item.experience.details.length > PREVIEW_BULLET_COUNT && (
                              <button
                                type="button"
                                onClick={() => toggleDetails(item.id)}
                                className="text-sm font-medium text-cta transition hover:text-cta-hover"
                              >
                                {showAllDetails ? "Show fewer details" : "View role details"}
                              </button>
                            )}

                            {showAllDetails && (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap gap-2 border-t border-border/40 pt-4"
                              >
                                {item.experience.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        )}
                        {item.type === "education" && item.education && (
                          <div className="space-y-3">
                            <ul className="space-y-2">
                              {item.education.highlights.map((h) => (
                                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cta" />
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

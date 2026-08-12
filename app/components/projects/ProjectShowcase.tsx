"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewportOnce, springSnappy } from "@/lib/motion";
import { selectedBuilds } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

function ProjectPanel({ project, index, isActive }: { project: Project; index: number; isActive: boolean }) {
  const layout = index % 3;

  return (
    <article
      data-project-index={index}
      className={cn(
        "project-card relative flex h-full min-h-[min(70svh,420px)] w-[calc(100vw-2rem)] shrink-0 snap-center flex-col overflow-hidden rounded-3xl transition-all duration-500 sm:min-h-[480px] sm:w-[min(72vw,640px)] lg:min-h-[520px] lg:w-[640px]",
        "ring-1 ring-inset ring-border/50 bg-card/80 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.2)]",
        isActive ? "ring-cta/25 scale-100 shadow-[0_16px_48px_rgba(108,99,255,0.1)]" : "scale-[0.98] opacity-75"
      )}
      aria-labelledby={`project-${project.id}`}
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r", project.gradient)} />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {project.tier === "featured" ? "Featured" : "Lab"} · {project.date}
            </p>
            <h3 id={`project-${project.id}`} className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <span className="font-heading text-4xl font-bold text-muted/80 sm:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>

        <div className="mb-6 space-y-4">
          {layout !== 2 && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cta">
                {layout === 1 ? "Challenge" : "Problem"}
              </p>
              <p className="text-sm text-foreground">{project.problem}</p>
            </div>
          )}
          {layout !== 1 && (
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cta">
                {layout === 2 ? "Approach" : "Architecture"}
              </p>
              <p className="text-sm text-muted-foreground">{project.approach}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cta">
            {layout === 1 ? "What shipped" : "Impact"}
          </p>
          <ul className="space-y-2">
          {project.impact.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cta" />
              {item}
            </li>
          ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.slice(0, 8).map((t) => (
            <span key={t} className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", project.techColor)}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-cta hover:text-cta"
            >
              <Github size={16} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-cta hover:text-cta"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(`[data-project-index="${index}"]`) as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-project-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = Number((entry.target as HTMLElement).dataset.projectIndex);
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: el, threshold: [0.55, 0.75], rootMargin: "0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="relative overflow-hidden py-14 sm:py-20 md:py-24">
      <div className="section-shell !pb-0">
        <SectionHeader
          index="03"
          badge="Projects"
          title="Beyond"
          titleAccent="the main story"
          subtitle="Additional systems across AI workflows, full-stack apps, and data platforms."
          className="text-left md:text-center"
        />
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={fadeUp}>
        <div
          ref={scrollRef}
          className="project-scroll-track flex gap-4 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-2 scroll-smooth sm:gap-6 sm:px-[max(1rem,calc((100vw-640px)/2))]"
          role="list"
          aria-label="Project case studies"
        >
          {selectedBuilds.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} isActive={activeIndex === i} />
          ))}
        </div>

        <div className="page-container mx-auto flex items-center justify-between gap-4 pb-8 pt-2">
          <motion.button
            type="button"
            onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            className="interactive flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground hover:border-cta hover:text-cta disabled:opacity-30"
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex flex-1 justify-center gap-2">
            {selectedBuilds.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i ? "w-8 bg-cta" : "w-2 bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Go to project ${i + 1}`}
                aria-current={activeIndex === i ? "true" : undefined}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => scrollTo(Math.min(activeIndex + 1, selectedBuilds.length - 1))}
            disabled={activeIndex === selectedBuilds.length - 1}
            className="interactive flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground hover:border-cta hover:text-cta disabled:opacity-30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
            aria-label="Next project"
          >
            <ArrowUpRight size={18} className="sm:hidden" />
            <ChevronRight size={18} className="hidden sm:block" />
          </motion.button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">
          Swipe to explore · {activeIndex + 1} / {selectedBuilds.length}
        </p>
      </motion.div>
    </section>
  );
}

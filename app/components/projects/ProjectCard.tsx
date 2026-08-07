"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { cardReveal, springSnappy } from "@/lib/motion";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const coarse = useCoarsePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), springSnappy);
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), springSnappy);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (coarse) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardReveal}
      custom={index}
      style={coarse ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <SpotlightCard
        className={cn(
          "border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover",
          project.featured && "ring-2 ring-cta/25"
        )}
      >
        <article className="group relative overflow-hidden rounded-2xl">
          <motion.div
            className={cn("h-1.5 bg-gradient-to-r", project.gradient)}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            style={{ transformOrigin: "left" }}
          />
          {project.featured && <div className="pointer-events-none absolute inset-0 shimmer-line opacity-20" aria-hidden />}

          <div className="p-5 sm:p-6">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                {project.featured && (
                  <motion.span
                    className="mb-2 inline-block rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Current focus
                  </motion.span>
                )}
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-cta sm:text-xl">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.date}</p>
              </div>
              <motion.button
                type="button"
                onClick={() => onOpen(project)}
                className="interactive touch-target flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground sm:h-9 sm:w-9"
                aria-label={`View details for ${project.title}`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>
            </div>

            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 5).map((t) => (
                <span key={t} className={cn("rounded-lg px-2 py-0.5 text-[11px] font-medium ring-1 transition-transform hover:scale-105", project.techColor)}>
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="rounded-lg px-2 py-0.5 text-[11px] text-muted-foreground">+{project.tech.length - 5}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={() => onOpen(project)}
                className="interactive inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Quick view
              </motion.button>
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted sm:w-auto"
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </motion.a>
              )}
            </div>
          </div>
        </article>
      </SpotlightCard>
    </motion.div>
  );
}

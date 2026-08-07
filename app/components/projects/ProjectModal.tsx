"use client";

import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal open={!!project} onClose={onClose} title={project.title}>
      <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
      <p className="mb-2 text-sm text-muted-foreground">{project.date}</p>
      <p className="mb-5 text-sm leading-relaxed text-foreground sm:text-base">{project.longDescription}</p>

      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">Core features</h3>
      <ul className="mb-5 space-y-2">
        {project.features.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-foreground">
            <span className="text-cta">›</span>
            {f}
          </li>
        ))}
      </ul>

      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">Tech stack</h3>
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className={cn("rounded-lg px-2.5 py-1 text-xs font-medium ring-1", project.techColor)}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            Live demo
            <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
        )}
      </div>
    </Modal>
  );
}

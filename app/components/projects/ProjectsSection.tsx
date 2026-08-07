"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-shell">
      <SectionHeader
        badge="Projects"
        title="Featured"
        titleAccent="Projects"
        subtitle="Selected work across full-stack engineering, AI systems, and data platforms."
      />

      <motion.div
        className="grid gap-5 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {projects.map((project, i) => (
          <motion.div key={project.id} variants={fadeUp} custom={i}>
            <ProjectCard project={project} index={i} onOpen={setSelected} />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

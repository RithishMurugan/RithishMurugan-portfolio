"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const coursework = ["Machine Learning", "Deep Learning", "Data Structures", "Algorithms", "AI Ethics", "Software Engineering"];

const academicHighlights = [
  { icon: GraduationCap, title: "Master of Science in Computer Science", desc: "Illinois Institute of Technology, Chicago, IL — Aug 2023 to May 2025" },
  { icon: BookOpen, title: "Technical depth", desc: "Coursework spanning ML, distributed systems, and software engineering practice" },
  { icon: Award, title: "Career bridge", desc: "Graduate studies paired with full-time healthcare AI and enterprise engineering experience" },
];

export default function Education() {
  return (
    <section id="education" className="section-shell bg-muted/30">
      <SectionHeader
        badge="Education"
        title="Academic"
        titleAccent="Background"
        subtitle="Master of Science in Computer Science — Illinois Institute of Technology, Chicago, IL (Aug 2023 – May 2025)."
      />

      <motion.div className="grid gap-6 lg:grid-cols-2" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
        <motion.div variants={fadeUp} className="card card-hover p-6 sm:p-7">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">Master of Science in Computer Science</h3>
            <span className="self-start rounded-full bg-gradient-to-r from-cta to-cyan-600 px-3 py-1 text-xs font-semibold text-white">Master&apos;s</span>
          </div>
          <div className="mb-5 space-y-3 text-sm">
            <p className="flex items-center gap-2 font-medium text-cta">
              <GraduationCap className="h-4 w-4" />
              Illinois Institute of Technology
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Aug 2023 – May 2025
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Chicago, IL
            </p>
          </div>
          <h4 className="mb-3 font-bold text-foreground">Key Coursework</h4>
          <div className="mb-5 flex flex-wrap gap-2">
            {coursework.map((course) => (
              <span key={course} className="rounded-full bg-cta px-3 py-1 text-xs font-medium text-white">
                {course}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Graduate studies emphasizing artificial intelligence, machine learning, and building reliable, scalable software systems.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="card card-hover p-6 sm:p-7">
          <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Academic Highlights</h3>
          <div className="space-y-4">
            {academicHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <motion.div key={highlight.title} whileHover={{ x: 4 }} className="flex items-start gap-4 rounded-xl border border-border bg-muted/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cta">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-foreground">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

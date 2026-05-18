"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const coursework = [
  "Machine Learning",
  "Deep Learning",
  "Data Structures",
  "Algorithms",
  "AI Ethics",
  "Software Engineering",
];

const academicHighlights = [
  {
    icon: GraduationCap,
    title: "Master of Science in Computer Science",
    desc: "Illinois Institute of Technology, Chicago, IL — Aug 2023 to May 2025",
  },
  {
    icon: BookOpen,
    title: "Technical depth",
    desc: "Coursework spanning ML, distributed systems, and software engineering practice",
  },
  {
    icon: Award,
    title: "Career bridge",
    desc: "Graduate studies paired with full-time healthcare and supply chain engineering experience",
  },
];

export default function Education() {
  return (
    <section id="education" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto bg-slate-50/80 scroll-mt-24">
      <SectionHeader
        badge="Education"
        title="Academic"
        titleAccent="Background"
        subtitle="Master's in Computer Science (Aug 2023 – May 2025) — complements production experience in healthcare and distributed systems."
      />

      <motion.div
        className="grid lg:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="card card-hover p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Master of Science in Computer Science
            </h3>
            <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-xs font-semibold text-white self-start">
              Master&apos;s
            </span>
          </div>

          <motion.div className="space-y-3 mb-5 text-sm">
            <p className="flex items-center gap-2 text-blue-600 font-medium">
              <GraduationCap className="w-4 h-4" />
              Illinois Institute of Technology
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4" />
              Aug 2023 – May 2025
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4" />
              Chicago, IL
            </p>
          </motion.div>

          <h4 className="font-bold text-slate-900 mb-3">Key Coursework</h4>
          <div className="flex flex-wrap gap-2 mb-5">
            {coursework.map((course) => (
              <span
                key={course}
                className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white"
              >
                {course}
              </span>
            ))}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            Graduate studies emphasizing artificial intelligence, machine learning, and building reliable,
            scalable software systems.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="card card-hover p-6 sm:p-7">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Academic Highlights</h3>
          <div className="space-y-4">
            {academicHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-xl bg-gradient-to-r from-blue-50/80 to-white p-4 border border-blue-100/60"
                >
                  <motion.div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                    <Icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{highlight.title}</h4>
                    <p className="text-slate-600 text-sm">{highlight.desc}</p>
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

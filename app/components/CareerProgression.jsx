"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const stages = [
  {
    title: "2021 – 2023",
    heading: "Supply Chain & Logistics — Hexaware",
    points: [
      "Architected inventory, forecasting, and route optimization systems across 10+ warehouses.",
      "Built event-driven platforms with Kafka and AWS — $100K annual savings and 40% faster logistics visibility.",
    ],
  },
  {
    title: "2023 – 2025",
    heading: "Graduate Studies — Illinois Institute of Technology",
    points: [
      "M.S. in Computer Science while strengthening distributed systems, ML, and scalable engineering.",
      "Internship at Virtualan: ETL pipelines and REST APIs on AWS (10K+ daily records).",
    ],
  },
  {
    title: "2025 – Present",
    heading: "Healthcare Platforms — Abridge",
    points: [
      "Integrating EHR, lab, imaging, and pharmacy systems — 400K+ patient records centralized.",
      "Building clinical AI copilots, RAG pipelines, and HIPAA-compliant infrastructure at 99.99% uptime.",
    ],
  },
];

export default function CareerProgression() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeader
        badge="Timeline"
        title="Career"
        titleAccent="Progression"
        subtitle="From supply chain modernization to healthcare AI — a clear arc of backend ownership and impact."
      />

      <motion.div
        className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {stages.map((s, i) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            custom={i * 0.1}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm card-hover"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
            <p className="text-2xl sm:text-3xl font-bold gradient-text mb-2">{s.title}</p>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{s.heading}</h3>
            <ul className="space-y-3">
              {s.points.map((point) => (
                <li key={point} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                  <span className="text-cyan-600 font-bold shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

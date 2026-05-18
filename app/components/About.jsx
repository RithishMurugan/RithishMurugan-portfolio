"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Code, HeartPulse } from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const summaryCards = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "M.S. in Computer Science, Illinois Institute of Technology (Aug 2023 – May 2025)",
  },
  {
    icon: Briefcase,
    title: "Experience",
    desc: "4+ years across healthcare tech, supply chain logistics, and cloud data platforms",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    desc: "EHR/FHIR integrations, clinical AI copilots, HIPAA-compliant distributed systems",
  },
  {
    icon: Award,
    title: "Impact",
    desc: "Owning complex systems end-to-end — latency, cost, compliance, and cross-functional delivery",
  },
];

export default function About() {
  return (
    <section id="about" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeader
        badge="Profile"
        title="How I work &"
        titleAccent="what I bring"
        subtitle={
          <>
            A quick snapshot for hiring managers — details in{" "}
            <a href="#experience" className="font-semibold text-blue-600 hover:underline">
              experience
            </a>{" "}
            and{" "}
            <a href="#skills" className="font-semibold text-blue-600 hover:underline">
              skills
            </a>
            .
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <motion.div
          className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp}>
            I&apos;m a <span className="font-bold text-blue-600">Software Engineer</span> with 4+ years of experience
            building scalable backend platforms across supply chain logistics and healthcare technology.
          </motion.p>
          <motion.p variants={fadeUp}>
            I began my career modernizing inventory, forecasting, routing, and warehouse systems — automating operations
            across <span className="font-bold text-indigo-600">10+ warehouses</span> and reducing logistics costs while
            improving fulfillment efficiency.
          </motion.p>
          <motion.p variants={fadeUp}>
            I progressed into healthcare engineering at{" "}
            <span className="font-bold text-cyan-700">Abridge</span>, building distributed platforms that centralize
            patient records and AI copilots that reduce physician documentation workload.
          </motion.p>
          <motion.p variants={fadeUp}>
            I&apos;m known for owning complex systems, partnering cross-functionally, and delivering{" "}
            <span className="font-bold text-blue-600">measurable impact</span> on reliability, latency, and cost.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 p-8 shadow-xl shadow-blue-900/5"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-600/30">
                <Code className="h-10 w-10 text-white" strokeWidth={2} />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Software Engineer</h3>
              <p className="text-slate-600">Healthcare · Supply Chain · AI</p>
              <p className="mt-2 text-sm text-blue-600 font-medium">Illinois Institute of Technology</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={fadeUp} className="card card-hover p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

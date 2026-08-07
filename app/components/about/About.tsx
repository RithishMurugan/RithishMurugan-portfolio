"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Code, HeartPulse } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SITE } from "@/lib/data/site";

const summaryCards = [
  { icon: GraduationCap, title: "Education", desc: "M.S. in Computer Science, Illinois Institute of Technology — Chicago, IL (Aug 2023 – May 2025)" },
  { icon: Briefcase, title: "Experience", desc: "4+ years across enterprise Java, cloud data engineering, and healthcare AI full-stack platforms" },
  { icon: HeartPulse, title: "Healthcare AI", desc: "Clinician-facing copilots, RAG, LangGraph, citation review, HITL, and FHIR/HL7 clinical integrations" },
  { icon: Award, title: "Impact", desc: "Strong ownership, structured problem solving, and cross-functional delivery of secure production systems" },
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        badge="Profile"
        title="How I work &"
        titleAccent="what I bring"
        subtitle={
          <>
            A quick snapshot for hiring managers — details in{" "}
            <a href="#experience" className="font-semibold text-cta hover:underline">experience</a> and{" "}
            <a href="#skills" className="font-semibold text-cta hover:underline">skills</a>.
          </>
        }
      />

      <div className="mb-12 grid gap-8 md:grid-cols-2 md:gap-12 lg:items-start">
        <motion.div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
          {[
            <>I&apos;m an <span className="font-bold text-cta">AI Full Stack Software Engineer</span> with 4+ years building healthcare AI platforms, backend services, and distributed enterprise systems.</>,
            <>I progressed from <span className="font-bold text-indigo-500">Java, Spring Boot, and supply-chain microservices</span> at Hexaware Technologies, through Python, ETL, SQL, and REST API development at Virtualan Software LLC.</>,
            <>Today at <span className="font-bold text-cyan-600">Abridge</span>, I build clinician-facing GenAI, RAG, <span className="font-bold text-cyan-600">React</span>, FastAPI, and cloud-native healthcare integrations — centralizing <span className="font-bold text-cyan-600">400K+ patient records</span>.</>,
            <>I bring strong ownership, structured problem solving, and cross-functional collaboration while delivering <span className="font-bold text-cta">secure, reliable production systems</span>.</>,
          ].map((text, i) => (
            <motion.p key={i} variants={fadeUp} className="border-l-2 border-cta/20 pl-4 transition-colors hover:border-cta/50">
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div className="flex items-center justify-center" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportOnce} transition={{ duration: 0.55 }}>
          <SpotlightCard className="gradient-border w-full max-w-sm">
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cta to-cyan-600 shadow-lg shadow-cta/30"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code className="h-10 w-10 text-white" strokeWidth={2} />
                </motion.div>
                <h3 className="mb-1 text-2xl font-bold text-foreground">{SITE.title}</h3>
                <p className="text-muted-foreground">Healthcare AI · Full-Stack · GenAI</p>
                <p className="mt-2 text-sm font-medium text-cta">Illinois Institute of Technology</p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      <motion.div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer}>
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={fadeUp}>
              <SpotlightCard className="card card-hover h-full p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cta/10 transition-colors group-hover:bg-cta/20">
                  <Icon className="h-5 w-5 text-cta" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

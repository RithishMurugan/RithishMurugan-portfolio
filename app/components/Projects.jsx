"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { staggerContainer, viewportOnce, springSnappy } from "../lib/motion";
import AnimatedCard from "./AnimatedCard";

const projects = [
  {
    title: "Healthcare AI Copilot & Clinical Data Platform",
    date: "2025 – Present",
    desc:
      "Production healthcare platform integrating EHR, lab, imaging, and pharmacy systems with FHIR/HL7. FastAPI microservices, Kafka event pipelines, Snowflake analytics, and LLM copilots (GPT-4o, Claude, RAG + Pinecone) for physician documentation — deployed on AWS EKS with HIPAA-compliant infrastructure.",
    tech: [
      "Python",
      "FastAPI",
      "FHIR",
      "LangChain",
      "LangGraph",
      "Kafka",
      "PostgreSQL",
      "Snowflake",
      "AWS EKS",
      "Kubernetes",
    ],
    gradient: "from-cyan-600 to-blue-600",
    techColor: "bg-cyan-50 text-cyan-900 ring-cyan-100",
    featured: true,
  },
  {
    title: "Call Center Analytics Dashboard",
    date: "Nov 2025",
    desc:
      "Full-stack AI dashboard analyzing 451 call center interactions with TypeScript, Express, React, and Gemini 2.5 — surfacing LLM insights, funnels, and revenue modeling for coaching and pattern detection.",
    tech: ["React", "TypeScript", "Express.js", "Gemini 2.5", "Tailwind", "Recharts", "Node.js"],
    gradient: "from-orange-500 to-red-500",
    techColor: "bg-orange-50 text-orange-800 ring-orange-100",
    githubUrl: "https://github.com/RithishMurugan/plaibook-call-center-dashboard.git",
  },
  {
    title: "RAG-Based Chatbot with AgentCore",
    date: "Oct 2025",
    desc:
      "Custom RAG chatbot on AWS Bedrock and AgentCore for domain-specific Q&A over PDFs and text files — embedding pipelines, retrieval logic, and a Python interface for real-time agent invocation.",
    tech: ["Python", "AWS Bedrock", "AgentCore", "Embeddings", "Retrieval Pipelines"],
    gradient: "from-indigo-500 to-purple-500",
    techColor: "bg-indigo-50 text-indigo-800 ring-indigo-100",
    githubUrl: "https://github.com/RithishMurugan/RAG-Based-Chatbot-with-AgentCore.git",
  },
  {
    title: "AI Guest Concierge Agent",
    date: "Jul 2025",
    desc:
      "AI concierge answering guest questions and automating workflows with a RAG pipeline on Pinecone + Supabase, reducing manual support load via REST API integrations.",
    tech: ["Python", "RAG", "Pinecone", "Supabase", "n8n", "REST APIs"],
    gradient: "from-green-500 to-teal-500",
    techColor: "bg-green-50 text-green-800 ring-green-100",
    githubUrl: "https://github.com/RithishMurugan/AI-Guest-Concierge-Agent.git",
  },
  {
    title: "Real-Time Hand Sign Detection System",
    date: "Jan 2025",
    desc:
      "Real-time gesture recognition detecting 36 hand signs at 90%+ accuracy using MediaPipe landmarks and a TensorFlow classifier — modular pipeline for retraining and deployment.",
    tech: ["Python", "TensorFlow", "MediaPipe", "OpenCV"],
    gradient: "from-blue-500 to-purple-600",
    techColor: "bg-blue-50 text-blue-800 ring-blue-100",
    githubUrl: "https://github.com/RithishMurugan/Real-Time-Hand-Sign-Detection-System.git",
  },
  {
    title: "Traffic Management System (CLI Analytics Tool)",
    date: "Mar 2024",
    desc:
      "Python + SQL CLI analytics tool for traffic incident, vehicle, road, and signal datasets — normalized schemas and query-driven workflows for violation density and route throughput analysis.",
    tech: ["Python", "SQL", "Data Modeling"],
    gradient: "from-purple-500 to-pink-500",
    techColor: "bg-purple-50 text-purple-800 ring-purple-100",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeader
        badge="Projects"
        title="Featured"
        titleAccent="Projects"
        subtitle="Production-style healthcare work at the top; open-source and academic projects below — each lists stack for fast screening."
      />

      <motion.div
        className="space-y-5 sm:space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {projects.map((p, i) => (
          <AnimatedCard
            key={p.title}
            index={i}
            className={`card overflow-hidden ${
              p.featured ? "border-cta/30 ring-2 ring-blue-100" : ""
            }`}
          >
            <motion.div
              className={`h-1.5 bg-gradient-to-r ${p.gradient}`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ transformOrigin: "left" }}
            />
            <div className="p-5 sm:p-6 md:p-7">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  {p.featured && (
                    <span className="mb-2 inline-block rounded-full bg-cyan-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-800">
                      Current focus
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{p.date}</p>
                </div>
                <span className="text-xs text-slate-500 sm:text-right">{p.tech.length} technologies</span>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-5">{p.desc}</p>

              <motion.div className="mb-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium ring-1 ${p.techColor}`}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              {p.githubUrl && (
                <motion.a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springSnappy}
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </motion.a>
              )}
            </div>
          </AnimatedCard>
        ))}
      </motion.div>
    </section>
  );
}

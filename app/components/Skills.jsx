"use client";

import { motion } from "framer-motion";
import {
  Code,
  Brain,
  Cloud,
  Plug,
  Database,
  HeartPulse,
  Truck,
  Settings,
} from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, staggerContainer, viewportOnce, springSnappy, cardHover } from "../lib/motion";

const categories = [
  {
    icon: Code,
    title: "Programming Languages",
    chips: ["Java", "Python", "SQL", "JavaScript", "TypeScript", "Go"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Plug,
    title: "Backend Engineering",
    chips: [
      "Spring Boot",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Asynchronous Processing",
      "System Design",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    chips: [
      "OpenAI GPT-4o",
      "Anthropic Claude",
      "Llama 3",
      "LangChain",
      "LangGraph",
      "RAG",
      "Pinecone",
      "XGBoost",
      "TensorFlow",
      "Scikit-learn",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Database,
    title: "Data Engineering",
    chips: ["Apache Spark", "ETL", "PostgreSQL", "Snowflake", "Redis", "Data Pipelines"],
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    chips: ["AWS", "EKS", "Amazon S3", "Docker", "Kubernetes", "Terraform", "CI/CD", "CloudWatch"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Technologies",
    chips: ["FHIR", "HL7", "EHR", "EMR", "HIPAA", "Audit Logging", "Encryption"],
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    chips: [
      "Inventory Management",
      "Demand Forecasting",
      "Route Optimization",
      "Geospatial APIs",
      "Warehouse Automation",
    ],
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    icon: Settings,
    title: "Streaming & Engineering",
    chips: ["Apache Kafka", "RabbitMQ", "Agile", "Performance Optimization", "Scalability"],
    gradient: "from-slate-600 to-slate-800",
  },
];

function SkillCard({ title, chips, icon: Icon, gradient }) {
  return (
    <motion.div
      variants={{
        hidden: fadeUp.hidden,
        visible: fadeUp.visible,
        rest: cardHover.rest,
        hover: cardHover.hover,
      }}
      whileHover="hover"
      className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]`}
      />
      <div className="relative mb-4 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
      </div>
      <motion.div className="relative flex flex-wrap gap-2">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-100 transition hover:bg-blue-50 hover:text-blue-800 hover:ring-blue-100"
          >
            {c}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto bg-slate-50/80 scroll-mt-24 rounded-none">
      <SectionHeader
        badge="Skills & Technologies"
        title="Technical"
        titleAccent="Expertise"
        subtitle="Keyword-aligned for ATS and recruiter search — maps directly to the stacks in my experience."
      />

      <motion.div
        className="grid gap-4 sm:gap-5 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {categories.map((c) => (
          <SkillCard key={c.title} {...c} />
        ))}
      </motion.div>
    </section>
  );
}

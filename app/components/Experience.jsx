"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionReveal";
import { fadeUp, staggerContainer, viewportOnce } from "../lib/motion";

const experiences = [
  {
    title: "Software Engineer",
    company: "Abridge",
    location: "Remote, USA",
    date: "Jan 2025 – Present",
    employmentType: "Full-time",
    employmentTypeColor: "bg-emerald-600",
    impactHighlights: [
      { label: "Patient records", value: "400K+" },
      { label: "Clinical events / day", value: "300K+" },
      { label: "Monthly interactions", value: "50K+" },
      { label: "Uptime", value: "99.99%" },
    ],
    details: [
      "Architect scalable microservices and backend platforms integrating fragmented EHR, lab, imaging, pharmacy, and insurance systems using Python, FastAPI, Apache Spark, SQL, FHIR, and HL7, centralizing 400K+ patient records.",
      "Engineer high-throughput distributed systems using Amazon S3, PostgreSQL, Snowflake, Redis, Apache Kafka, and ETL frameworks to process 300K+ clinical events daily, reducing retrieval latency and eliminating manual workflows.",
      "Build low-latency REST APIs and AI healthcare copilots using OpenAI GPT-4o, Anthropic Claude, Llama 3, LangChain, RAG, and Pinecone, reducing physician documentation workload while accelerating treatment recommendations.",
      "Develop event-driven backend systems using LangGraph, function calling, asynchronous workflows, caching layers, and distributed orchestration frameworks to automate patient summaries across 50K+ monthly clinical interactions.",
      "Partner with physicians, product leaders, and compliance teams to deploy predictive healthcare models using XGBoost, TensorFlow, and Scikit-learn, improving diagnosis speed and increasing hospital throughput.",
      "Lead cloud infrastructure scalability using AWS EKS, Docker, Kubernetes, Terraform, CI/CD, CloudWatch, encryption, audit logging, and HIPAA compliance, maintaining 99.99% uptime while reducing infrastructure costs 25%.",
    ],
    skills: [
      "Python",
      "FastAPI",
      "FHIR",
      "HL7",
      "LangChain",
      "LangGraph",
      "OpenAI GPT-4o",
      "Kafka",
      "PostgreSQL",
      "Snowflake",
      "AWS EKS",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    title: "Software Engineer",
    company: "Virtualan Software LLC",
    location: "Chicago, IL",
    date: "May 2024 – Aug 2024",
    employmentType: "Internship",
    employmentTypeColor: "bg-blue-600",
    impactHighlights: [
      { label: "Daily records", value: "10K+" },
      { label: "Test coverage", value: "+35%" },
      { label: "Stack", value: "ETL + APIs" },
      { label: "Cloud", value: "AWS S3" },
    ],
    details: [
      "Engineered scalable backend ETL pipelines using Python, SQL, AWS S3, and Redshift, processing 10K+ daily records, optimizing cloud data workflows, and reducing reporting latency across critical analytics systems.",
      "Built and optimized RESTful APIs using Python, SQL, Postman, and Swagger, improving API reliability, increasing test coverage by 35%, and accelerating backend integrations across cross-functional engineering teams.",
      "Implemented secure backend systems through RBAC, data validation, code reviews, and Agile deployment workflows, reducing production defects while accelerating feature releases across production environments.",
    ],
    skills: ["Python", "SQL", "AWS S3", "Redshift", "REST APIs", "Postman", "Swagger", "RBAC", "Agile"],
  },
  {
    title: "Software Engineer",
    company: "Hexaware Technologies",
    location: "Chennai, India",
    date: "Mar 2021 – Jul 2023",
    employmentType: "Full-time",
    employmentTypeColor: "bg-green-600",
    impactHighlights: [
      { label: "Warehouses", value: "10+" },
      { label: "Inventory visibility", value: "+60%" },
      { label: "Shipment events", value: "50K+/yr" },
      { label: "Annual savings", value: "$100K" },
    ],
    details: [
      "Architected scalable inventory management microservices using Java, Spring Boot, REST APIs, and PostgreSQL across 10+ warehouses, replacing manual planning workflows and improving inventory visibility by 60%.",
      "Engineered demand forecasting pipelines using Python, Apache Spark, SQL, and statistical models to analyze 150K+ historical orders, reducing stockouts while improving inventory utilization.",
      "Built event-driven distributed systems using Java, Spring Boot, Apache Kafka, Redis, and AWS to process 50K+ annual shipment events, reducing logistics visibility delays by 40%.",
      "Designed real-time route optimization services using Python, optimization algorithms, SQL, and geospatial APIs to automate delivery planning, reducing transportation costs and improving delivery efficiency.",
      "Led warehouse modernization initiatives using Docker, Kubernetes, RabbitMQ, and AWS automation workflows, streamlining fulfillment operations and improving scalability during demand spikes.",
      "Partnered with operations, logistics, and supply chain leadership to modernize manual fulfillment workflows through cloud automation platforms, reducing delivery delays and saving $100K annually.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Python",
      "Apache Spark",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeader
        badge="Experience"
        title="Professional"
        titleAccent="Journey"
        subtitle="Full-time and internship roles — impact metrics up front so recruiters can skim in under a minute."
      />

      <motion.div
        className="relative mx-auto max-w-5xl space-y-8 sm:space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            variants={fadeUp}
            custom={i * 0.1}
            className="card card-hover group overflow-hidden border-l-4 border-l-cta bg-gradient-to-br from-white to-zinc-50/80 p-5 ring-1 ring-zinc-100 sm:p-6 md:p-7"
          >
            <motion.div whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400 }}>
              <motion.div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="font-semibold">{exp.company}</span>
                  </div>
                </motion.div>
                <span
                  className={`${exp.employmentTypeColor} text-white px-3 py-1 rounded-lg text-xs font-semibold self-start`}
                >
                  {exp.employmentType}
                </span>
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 mb-5 text-slate-600 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {exp.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {exp.location}
                </span>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {exp.impactHighlights.map((h) => (
                  <div key={h.label} className="metric-chip">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-blue-800/80">
                      {h.label}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{h.value}</p>
                  </div>
                ))}
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Highlights &amp; scope
              </p>

              <ul className="ml-1 space-y-2 mb-5 text-slate-700 text-sm">
                {exp.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="mt-1 text-cyan-600 font-bold shrink-0">›</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 transition group-hover:bg-blue-50 group-hover:text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

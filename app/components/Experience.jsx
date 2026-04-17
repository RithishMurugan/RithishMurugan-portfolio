"use client";

import { Calendar, Building2, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "AI Software Engineer",
      company: "Rubrik",
      location: "Remote, USA",
      date: "Jan 2025 – Present",
      employmentType: "Full-time",
      employmentTypeColor: "bg-green-500",
      impactHighlights: [
        { label: "PR turnaround", value: "18h → 2.5h" },
        { label: "Engineers on reviews", value: "200" },
        { label: "Review cost / PR", value: "$50 → $0.40" },
        { label: "Pipeline reliability", value: "99.8%" },
      ],
      details: [
        "Lead development of an autonomous code review agent using LangChain Agents and OpenAI GPT-4o on FastAPI, orchestrating parallel security and performance scans that reduce PR turnaround from 18 h to 2.5 h.",
        "Engineer event-driven webhook pipeline in Node.js and Express within a microservices architecture, processing GitHub PR events and dispatching payloads to the Python agent service via REST APIs, enabling real-time reviews for 200 engineers.",
        "Implement RAG-based codebase search using a vector database and LangChain retrieval chains integrated with the GitHub REST API, providing contextual diff analysis that identifies 34 critical security vulnerabilities missed during manual review cycles.",
        "Develop confidence-scored suggestion engine with automated test generation using LangChain structured outputs, mentoring 3 juniors on evaluation patterns while persisting audit trails in PostgreSQL with SQL analytics achieving 67% acceptance rate.",
        "Build admin analytics dashboard in React and Next.js with product and engineering leadership to define acceptance-rate, false-positive, and cost-per-PR metrics, reducing review cost from $50 to $0.40 per PR.",
        "Containerize microservices with Docker and deploy to AWS ECS, Lambda, and Kubernetes (EKS), integrating Slack REST API notifications with risk scoring that improves developer satisfaction from 3.2 to 4.6 out of 5.0.",
        "Orchestrate end-to-end CI/CD pipelines using GitHub Actions with automated integration tests and agent quality gates, deploying across AWS infrastructure in Agile sprints with 99.8% pipeline reliability processing 600+ monthly PRs.",
      ],
      skills: [
        "Python",
        "FastAPI",
        "LangChain",
        "OpenAI GPT-4o",
        "Node.js",
        "Express",
        "React",
        "Next.js",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
      ],
    },
    {
      title: "Software Engineer",
      company: "Razorpay",
      location: "India",
      date: "May 2021 – Jul 2023",
      employmentType: "Full-time",
      employmentTypeColor: "bg-green-500",
      impactHighlights: [
        { label: "Daily transactions", value: "500K+" },
        { label: "Payment failures", value: "12% → 4%" },
        { label: "Annual recovery", value: "$2.1M" },
        { label: "Reconciliation", value: "48h → 2h" },
      ],
      details: [
        "Led a 4-engineer squad to architect payment processing core in Java, Spring Boot, and Hibernate, implementing intelligent retry and multi-gateway routing across UPI rails reducing failure rates from 12% to 4%, recovering $2.1M annually.",
        "Drove system design of event-driven microservices using Apache Kafka, streaming payment events, settlement triggers, and refund workflows across 6 consumer services processing 500K+ daily transactions with guaranteed ordering.",
        "Built settlement reconciliation engine in Python and FastAPI, consuming Kafka events and automating bank file matching against PostgreSQL and MySQL ledgers with optimized indexing, reducing reconciliation turnaround from 48 h to 2 h.",
        "Developed merchant transaction dashboard in React and TypeScript with real-time payment tracking, settlement summaries, and GMV analytics via REST APIs, collaborating with product and design to serve 25K+ merchants.",
        "Engineered refund orchestration and webhook services in Node.js and Express, managing state machines with idempotency keys and Redis-backed rate limiting via REST APIs, reducing refund processing from 7 days to under 24 h.",
        "Established comprehensive JUnit test suites achieving 90%+ coverage across Spring Boot payment-critical services, containerized with Docker, and deployed to AWS ECS via Jenkins and GitHub Actions CI/CD pipelines in Agile sprints.",
        "Streamed transaction lifecycle events from Kafka into DynamoDB audit trails with TTL retention, enforced Git review gates with mandatory approvals for payment-critical paths, enabling PCI-DSS compliance across 500K+ daily transactions.",
      ],
      skills: [
        "Java",
        "Spring Boot",
        "Hibernate",
        "Python",
        "FastAPI",
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "Kafka",
        "PostgreSQL",
        "MySQL",
        "DynamoDB",
        "Redis",
        "AWS ECS",
        "Docker",
        "Jenkins",
      ],
    },
  ];

  return (
    <section id="experience" className="section-fade-in px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-white scroll-mt-20 overflow-hidden">
      {/* Title section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
        {/* Experience tag */}
        <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-3 py-1 mb-3 sm:mb-4">
          <span className="text-blue-700 font-medium text-xs sm:text-sm">Experience</span>
        </div>
        {/* Main title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3">
          <span className="text-slate-900">Professional</span>{" "}
          <span className="text-blue-600">Journey</span>
        </h2>
        {/* Blue underline */}
        <div className="h-1 w-20 sm:w-24 mx-auto mb-2 sm:mb-3 bg-blue-600 rounded-full"></div>
        {/* Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4 max-w-2xl mx-auto leading-relaxed">
          Full-time roles only — each card starts with impact metrics recruiters can skim in under a minute.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {experiences.map((exp, i) => {
            return (
              <div key={i} className="relative">
                {/* Experience card */}
                <div>
                  <div className="overflow-hidden rounded-xl border border-slate-200/90 border-l-4 border-l-blue-600 bg-gradient-to-br from-slate-50/90 to-white p-4 sm:p-5 md:p-6 shadow-sm ring-1 ring-slate-100">
                    {/* Header row with title and employment type */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{exp.title}</h3>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium text-sm sm:text-base">{exp.company}</span>
                        </div>
                      </div>
                      <div className={`${exp.employmentTypeColor} text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs font-semibold whitespace-nowrap sm:ml-4 self-start`}>
                        {exp.employmentType}
                      </div>
                    </div>

                    {/* Date and location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-slate-600 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {exp.impactHighlights && (
                      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {exp.impactHighlights.map((h) => (
                          <div
                            key={h.label}
                            className="rounded-lg border border-blue-100 bg-blue-50/60 px-2.5 py-2 sm:px-3 sm:py-2.5"
                          >
                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-blue-800/80">
                              {h.label}
                            </p>
                            <p className="mt-0.5 text-sm font-bold text-slate-900">{h.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Highlights &amp; scope</p>

                    {/* Responsibilities with blue angle brackets */}
                    <ul className="ml-3 sm:ml-5 text-slate-700 text-xs sm:text-sm space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed flex items-start gap-2 break-words">
                          <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">&gt;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills tags - light gray */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="bg-slate-200 text-slate-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

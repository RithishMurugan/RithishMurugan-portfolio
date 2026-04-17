"use client";

import { GraduationCap, Briefcase, Award, Code, Brain } from "lucide-react";

export default function About() {
  const summaryCards = [
    {
      icon: GraduationCap,
      title: "Education",
      desc: "M.S. in Computer Science, Illinois Institute of Technology (Aug 2023 – May 2025)",
    },
    {
      icon: Briefcase,
      title: "Experience",
      desc: "3+ years building distributed systems and AI-powered developer tooling",
    },
    {
      icon: Award,
      title: "Expertise",
      desc: "Microservices, event-driven systems, Java, Python, Node.js, Kafka, LangChain, and RAG",
    },
    {
      icon: Code,
      title: "Focus",
      desc: "Measurable impact—performance, cost, and helping teams ship faster with confidence",
    },
  ];

  return (
    <section id="about" className="section-fade-in px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 overflow-hidden">
      <div className="text-center mb-6 sm:mb-8 px-4">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
          Profile
        </div>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-center text-slate-900 px-4">
        How I work &amp; what I bring
      </h2>
      <p className="text-center text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 leading-relaxed">
        A quick snapshot for hiring managers — details in{" "}
        <a href="#experience" className="font-semibold text-blue-600 hover:underline">
          experience
        </a>{" "}
        and{" "}
        <a href="#skills" className="font-semibold text-blue-600 hover:underline">
          skills
        </a>
        .
      </p>
      <div className="h-1 w-24 sm:w-32 mx-auto mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
        {/* Left Section - Main Description */}
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            I&apos;m a <span className="font-bold text-blue-600">Software Engineer</span> with 3+ years of experience building distributed systems and AI-powered developer tooling—growing from backend engineering to AI-driven platforms.
          </p>
          <p>
            I build <span className="font-bold text-purple-600">LLM-powered applications</span>, working across product, infrastructure, and security to deliver reliable and scalable systems—from payment pipelines to autonomous code review agents.
          </p>
          <p>
            My core strengths are{" "}
            <span className="font-bold text-blue-600">microservices, event-driven systems, and automation</span>, with hands-on experience in Java, Python, Node.js, Kafka, and modern AI stacks like LangChain and RAG.
          </p>
          <p>
            I focus on <span className="font-bold text-purple-600">measurable impact</span>—improving system performance, reducing costs, and enabling teams to ship faster with confidence.
          </p>
        </div>

        {/* Right Section - Software Engineer Icon Card */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 shadow-lg overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>

            {/* Icon and text */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Software Engineer</h3>
              <p className="text-sm sm:text-base text-slate-600">Illinois Institute of Technology</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards - Horizontal Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {summaryCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="card p-5 transition-all duration-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5"
            >
              <Icon className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

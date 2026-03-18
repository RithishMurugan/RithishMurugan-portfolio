"use client";

import { GraduationCap, Briefcase, Award, Code, Brain } from "lucide-react";

export default function About() {
  const summaryCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      desc: "Master's in Computer Science from Illinois Institute of Technology"
    },
    {
      icon: Briefcase,
      title: 'Experience',
      desc: '3+ years in software engineering and AI development'
    },
    {
      icon: Award,
      title: 'Expertise',
      desc: 'Agentic AI systems, RAG pipelines, backend engineering, and cloud-based automation'
    },
    {
      icon: Code,
      title: 'Specialization',
      desc: 'Python development, REST API design, data orchestration, and intelligent workflow integrations'
    }
  ];

  return (
    <section id="about" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto scroll-mt-20 overflow-hidden">
      {/* Title with gradient underline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 sm:mb-10 md:mb-12 text-center text-purple-600 px-4">
        Who I am
        <div className="h-1 w-24 sm:w-32 mx-auto mt-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </h2>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
        {/* Left Section - Main Description */}
        <div className="space-y-3 text-slate-700 leading-relaxed">
          <p>
            I'm a <span className="font-bold text-blue-600">Software Engineer</span> who likes turning messy, human problems into reliable software — from overloaded support teams to high-stakes financial systems.
          </p>
          <p>
            Recently I've focused on <span className="font-bold text-purple-600">AI-first platforms and automation</span>, designing Agentic AI agents and RAG workflows on top of Python, FastAPI, AWS Bedrock, Pinecone, and Supabase.
          </p>
          <p>
            I enjoy the full stack of backend work: <span className="font-bold text-blue-600">clean APIs, resilient microservices, and data pipelines</span> that move through Kafka, PostgreSQL, MongoDB, and Redis without becoming a black box for the teams that depend on them.
          </p>
          <p>
            What matters most to me is impact — <span className="font-bold text-purple-600">shipping systems people trust in production</span> that quietly cut manual work, reduce operational risk, and free teams to focus on more meaningful work.
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
            <div key={i} className="card p-5 hover:shadow-md transition-shadow">
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


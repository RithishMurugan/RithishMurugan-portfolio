"use client";

import { Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: 'Call Center Analytics Dashboard',
      date: 'Nov 2025',
      desc:
        'A full-stack AI-powered dashboard analyzing 451 call center interactions using TypeScript, Express, React, and Gemini 2.5. Includes heuristic analysis, LLM insights, revenue modeling, pattern mining, funnels, and automated coaching recommendations. Completely built using Cursor for efficient development and AI-assisted coding.',
      tech: ['React', 'TypeScript', 'Express.js', 'Gemini 2.5', 'Tailwind', 'Recharts', 'Node.js'],
      gradient: 'from-orange-500 to-red-500',
      titleColor: 'text-slate-900',
      techColor: 'bg-orange-100 text-orange-700',
      githubUrl: 'https://github.com/RithishMurugan/plaibook-call-center-dashboard.git',
    },
    {
      title: 'RAG-Based Chatbot with AgentCore',
      date: 'Oct 2025',
      desc:
        'Developed a custom RAG chatbot using AWS Bedrock and AgentCore, enabling domain-specific Q&A over ingested PDFs and text files. Built document-embedding pipelines and retrieval logic to deliver accurate, context-aware responses based on the knowledge base. Integrated the chatbot with a Python interface to support real-time agent invocation and scalable reasoning workflows.',
      tech: ['Python', 'AWS Bedrock', 'AgentCore', 'Embeddings', 'Retrieval Pipelines'],
      gradient: 'from-indigo-500 to-purple-500',
      titleColor: 'text-slate-900',
      techColor: 'bg-indigo-100 text-indigo-700',
      githubUrl: 'https://github.com/RithishMurugan/RAG-Based-Chatbot-with-AgentCore.git',
    },
    {
      title: 'AI Guest Concierge Agent',
      date: 'Jul 2025',
      desc:
        'Built an AI concierge agent that answers guest queries, retrieves event/vendor information, and automates end-to-end workflows. Implemented a RAG pipeline using Pinecone + Supabase to improve context accuracy and reduce manual support load. Integrated frontend components with backend APIs to enable seamless real-time interaction and task automation.',
      tech: ['Python', 'RAG', 'Pinecone', 'Supabase', 'n8n', 'REST APIs'],
      gradient: 'from-green-500 to-blue-500',
      titleColor: 'text-slate-900',
      techColor: 'bg-green-100 text-green-700',
      githubUrl: 'https://github.com/RithishMurugan/AI-Guest-Concierge-Agent.git',
    },
    {
      title: 'Real-Time Hand Sign Detection System',
      date: 'Jan 2025',
      desc:
        'Developed a real-time gesture recognition system capable of detecting 36 hand signs with over 90% accuracy. Combined MediaPipe hand landmark extraction with a TensorFlow classifier for fast and reliable inference. Designed a modular, optimized pipeline supporting efficient retraining, tuning, and deployment.',
      tech: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV'],
      gradient: 'from-blue-500 to-purple-600',
      titleColor: 'text-blue-600',
      techColor: 'bg-blue-100 text-blue-700',
      githubUrl: 'https://github.com/RithishMurugan/Real-Time-Hand-Sign-Detection-System.git',
    },
    {
      title: 'Traffic Management System (CLI Analytics Tool)',
      date: 'Mar 2024',
      desc:
        'Built a Python + SQL CLI analytics tool to generate insights from traffic incident, vehicle, road, and signal datasets. Designed normalized relational schemas and modular, query-driven workflows to analyze violation density, coverage gaps, and route-level throughput. Delivered a scalable analytics framework for efficient trend detection and data-driven insights.',
      tech: ['Python', 'SQL', 'Data Modeling', 'Software Development'],
      gradient: 'from-purple-500 to-pink-500',
      titleColor: 'text-slate-900',
      techColor: 'bg-purple-100 text-purple-700',
    },
  ];

  return (
    <section id="projects" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-white scroll-mt-20">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
        {/* Projects tag */}
        <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-3 py-1 mb-3 sm:mb-4">
          <span className="text-blue-700 font-medium text-xs sm:text-sm">Projects</span>
        </div>
        {/* Main title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3">
          <span className="text-slate-900">Featured</span>{" "}
          <span className="text-blue-600">Projects</span>
        </h2>
        {/* Gradient underline */}
        <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        {projects.map((p, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            {/* Gradient border at top */}
            <div className={`h-1 bg-gradient-to-r ${p.gradient}`}></div>
            
            <div className="p-4 sm:p-5 md:p-6">
              {/* Header with title, date, and tech count */}
              <div className="mb-3 sm:mb-4">
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${p.titleColor}`}>{p.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1">
                    <span>&lt;&gt;</span>
                    <span>{p.tech.length} Technologies</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {p.desc}
              </p>

              {/* Technologies Used */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${p.techColor}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              {p.githubUrl && (
                <div className="pt-2 sm:pt-3 border-t border-slate-200">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


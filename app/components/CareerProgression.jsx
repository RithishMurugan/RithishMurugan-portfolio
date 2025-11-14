"use client";

export default function CareerProgression() {
  const stages = [
    { 
      title: '2022-2023', 
      subtitle: 'Foundation', 
      desc: 'Python Developer Intern at Madras Networking Company. Built automation scripts, SQL databases, and dashboard prototypes. Gained foundational skills in Python, SQL, and data management.',
      company: 'Madras Networking Company'
    },
    { 
      title: '2023-2024', 
      subtitle: 'Growth', 
      desc: 'Junior Software Engineer at ZoomRx Healthcare. Processed 1M+ survey records, optimized workflows by 40%, and designed Tableau dashboards. Expanded expertise in data pipelines and healthcare tech.',
      company: 'ZoomRx Healthcare'
    },
    { 
      title: '2024-2025', 
      subtitle: 'Specialization', 
      desc: 'Software Engineer at Virtualan Software & Research Assistant at IIT. Integrated AWS services, REST APIs, and contributed to UX research. Master\'s in Computer Science from Illinois Institute of Technology.',
      company: 'Virtualan Software & IIT'
    },
    { 
      title: '2025+', 
      subtitle: 'Innovation', 
      desc: 'Software Engineer at eAlliance Corporation. Engineering Agentic AI agents with RAG pipelines, building intelligent workflow automation systems, and leading AI-driven solutions development.',
      company: 'eAlliance Corporation'
    },
  ];

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50">
      <h3 className="mb-8 sm:mb-10 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 px-4">Career Progression</h3>
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => (
          <div key={s.title} className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{s.title}</div>
            <div className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">{s.subtitle}</div>
            <div className="text-xs sm:text-sm text-slate-500 leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

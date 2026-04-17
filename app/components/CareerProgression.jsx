"use client";

export default function CareerProgression() {
  const stages = [
    {
      title: "2021 – 2023",
      heading: "Payments at Scale — Razorpay",
      points: [
        "Built and scaled backend systems for payments handling 500K+ daily transactions using microservices and event-driven architecture.",
        "Improved reliability and enabled real-time workflows across payments, refunds, and reconciliation systems.",
      ],
    },
    {
      title: "2023 – 2025",
      heading: "Graduate Studies — Illinois Institute of Technology",
      points: [
        "Strengthened expertise in distributed systems, machine learning, and scalable engineering.",
        "Transitioned focus from backend development to AI-driven product engineering.",
      ],
    },
    {
      title: "2025+",
      heading: "AI & Developer Tooling — Rubrik",
      points: [
        "Building LLM-powered agents and RAG systems to automate code reviews and enhance developer productivity.",
        "Designing scalable systems with modern cloud and microservices architecture, driving efficiency and quality at scale.",
      ],
    },
  ];

  return (
    <section className="section-fade-in px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50 overflow-hidden">
      <div className="text-center mb-6 px-4">
        <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Timeline
        </span>
      </div>
      <h3 className="mb-2 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 px-4">
        Career Progression
      </h3>
      <p className="mb-8 sm:mb-10 md:mb-12 text-center text-sm sm:text-base text-slate-600 max-w-3xl mx-auto px-4 leading-relaxed">
        From scalable backend systems to AI-powered developer tooling.
      </p>
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s) => (
          <div
            key={s.title}
            className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md"
          >
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {s.title}
            </div>
            <div className="text-base sm:text-lg font-semibold text-slate-800 mb-3">{s.heading}</div>
            <div className="space-y-2.5">
              {s.points.map((point) => (
                <p key={point} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

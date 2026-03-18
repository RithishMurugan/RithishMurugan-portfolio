"use client";

export default function CareerProgression() {
  const stages = [
    { 
      title: '2021-2023', 
      subtitle: 'Foundation', 
      desc: 'Software Developer at Hexaware Technologies (Chennai). Built Java Spring Boot microservices for a Fortune 500 US banking client, ML-powered fraud detection, Kafka event pipelines, and Docker/Kubernetes deployments.',
      company: 'Hexaware Technologies'
    },
    { 
      title: '2024', 
      subtitle: 'Growth', 
      desc: 'Software Engineer at Virtualan Software LLC (Chicago). Automated data pipelines with Python and SQL, designed RESTful APIs with Postman/Swagger, and integrated AWS S3 and Redshift with backend workflows.',
      company: 'Virtualan Software LLC'
    },
    { 
      title: '2025', 
      subtitle: 'Specialization', 
      desc: 'Research Assistant at Illinois Institute of Technology. Graded UX assignments, led recitation sessions, and supported human-centered design. Master\'s in Computer Science from IIT.',
      company: 'Illinois Institute of Technology'
    },
    { 
      title: '2025+', 
      subtitle: 'Innovation', 
      desc: 'Software Engineer at eAlliance Corporation. Building end-to-end AI automation with FastAPI, AWS Bedrock, RAG pipelines, Pinecone, and Supabase—reducing operational support time and powering internal dashboards.',
      company: 'eAlliance Corporation'
    },
  ];

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50 overflow-hidden">
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

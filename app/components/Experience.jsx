"use client";

import { Briefcase, Calendar, Building2, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'eAlliance Corporation',
      location: 'Remote, USA',
      date: 'Jul 2025 – Present',
      employmentType: 'Full-time',
      employmentTypeColor: 'bg-green-500',
      details: [
        'Designed an AI automation platform with Python, FastAPI, and AWS Bedrock that handles 500+ support requests per day',
        'Shipped a production RAG pipeline on Bedrock + Pinecone for semantic search and document classification',
        'Built autonomous AI agents with multi-step reasoning and RBAC to remove manual vendor-matching decisions',
        'Owned RESTful APIs on AWS Lambda and S3, cutting latency across internal AI inference pipelines',
        'Shipped real-time dashboards with JavaScript and Supabase, halving manual lookup time for operations teams',
        'Maintained production services across environments with CI/CD, model evaluation, and automated workflows'
      ],
      skills: ['Python', 'FastAPI', 'AWS Bedrock', 'Pinecone', 'Supabase', 'LLMs', 'RAG', 'CI/CD']
    },
    {
      title: 'Research Assistant',
      company: 'Illinois Institute of Technology',
      location: 'Chicago, IL, USA',
      date: 'Jan 2025 - May 2025',
      employmentType: 'Research',
      employmentTypeColor: 'bg-purple-500',
      details: [
        'Graded assignments and provided constructive feedback on user experience (UX) principles and design methodologies',
        'Led recitation sessions to reinforce key concepts and foster engaging discussions among students',
        'Supported students in applying human-centered design principles to real-world projects, enhancing their practical skills'
      ],
      skills: ['UX Design', 'Teaching', 'Human-Centered Design', 'Education']
    },
    {
      title: 'Software Engineer',
      company: 'Virtualan Software LLC',
      location: 'Chicago, IL, USA',
      date: 'May 2024 – Aug 2024',
      employmentType: 'Internship',
      employmentTypeColor: 'bg-blue-500',
      details: [
        'Automated backend data pipelines with Python and SQL, cutting processing time for high-volume reporting data',
        'Designed and validated RESTful APIs with Postman and Swagger, raising reliability and test coverage',
        'Integrated AWS S3 and Redshift into core workflows to improve data scalability and query performance',
        'Worked with QA teams to enforce RBAC and validate pipelines before production rollout',
        'Contributed to sprint planning, architecture discussions, and code reviews for backend feature releases'
      ],
      skills: ['Python', 'SQL', 'REST APIs', 'AWS S3', 'AWS Redshift', 'RBAC', 'Agile']
    },
    {
      title: 'Software Developer',
      company: 'Hexaware Technologies',
      location: 'Chennai, India',
      date: 'Mar 2021 – Jul 2023',
      employmentType: 'Full-time',
      employmentTypeColor: 'bg-green-500',
      details: [
        'Engineered Java Spring Boot microservices for a Fortune 500 US bank, securing 1M+ daily transactions',
        'Co-built an ML fraud risk engine with OpenAI, LangChain, and Transformers to improve detection accuracy',
        'Implemented Kafka event streams processing 500K+ transactions per hour with sub-second latency',
        'Containerized services with Docker and deployed to AWS EKS via Jenkins CI/CD for 99.9% uptime',
        'Tuned PostgreSQL and MongoDB queries and added Redis caching, cutting database load and improving performance',
        'Supported a React.js fraud analyst dashboard with reliable backend APIs and strong test coverage'
      ],
      skills: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'Jenkins']
    }
  ];

  return (
    <section id="experience" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-white scroll-mt-20 overflow-hidden">
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
        <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4">Building innovative AI solutions across diverse industries and research environments</p>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {experiences.map((exp, i) => {
            return (
              <div key={i} className="relative">
                {/* Experience card */}
                <div>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200">
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-5 text-slate-600 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

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


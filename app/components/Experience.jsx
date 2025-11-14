"use client";

import { Briefcase, Calendar, Building2, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'eAlliance Corporation',
      location: 'IL, USA (Remote)',
      date: 'Jul 2025 - Present',
      employmentType: 'Full-time',
      employmentTypeColor: 'bg-green-500',
      details: [
        'Engineered Agentic AI agents with RAG pipelines for automated reasoning and business workflows',
        'Built a guest concierge AI agent, integrating frontend apps, n8n workflows, and backend databases',
        'Built a vendor-matching agent simulating Q2C workflows, applying distributed ETL and data integrity checks',
        'Automated data flows and integrations across APIs and cloud systems, ensuring fault-tolerance and scalability',
        'Applied access control principles and data validation to ensure secure and accurate reporting pipelines',
        'Debugged and optimized Python scripts across workflows, reducing execution errors by 20%',
        'Explored LLM APIs (OpenAI, Hugging Face) by testing simple Python-based integrations for internal learning'
      ],
      skills: ['Python', 'RAG', 'AI Agents', 'n8n', 'Supabase', 'Pinecone', 'AWS']
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
      location: 'IL, USA',
      date: 'May 2024 - Aug 2024',
      employmentType: 'Internship',
      employmentTypeColor: 'bg-blue-500',
      details: [
        'Automated backend pipelines using Python + SQL to consolidate and validate large datasets',
        'Configured and tested REST APIs with Postman & Swagger, ensuring reliable system integrations',
        'Integrated AWS (S3, Redshift) with backend workflows, increasing scalability of reporting systems',
        'Worked with QA teams to implement data integrity checks and access controls',
        'Participated in Agile sprints, contributing to design discussions on workflow configuration and integrations',
        'Assisted with Tableau dashboards for system performance and telemetry-driven insights'
      ],
      skills: ['Python', 'SQL', 'REST APIs', 'AWS', 'Tableau', 'Agile']
    },
    {
      title: 'Junior Software Engineer',
      company: 'ZoomRx Healthcare Technology Solutions',
      location: 'India',
      date: 'Jan 2023 - Jul 2023',
      employmentType: 'Full-time',
      employmentTypeColor: 'bg-green-500',
      details: [
        'Developed Python pipelines to process 1M+ survey records, improving data accuracy and reliability',
        'Optimized backend workflows, reducing update cycles by 40% and delivering insights faster to stakeholders',
        'Designed Tableau dashboards visualizing provider engagement, survey outcomes, and participation trends',
        'Conducted participation trend analysis across surveys, uncovering patterns that guided data driven strategies'
      ],
      skills: ['Python', 'Data Pipelines', 'Tableau', 'Healthcare Tech']
    },
    {
      title: 'Python Developer Intern',
      company: 'Madras Networking Company',
      location: 'India',
      date: 'Jan 2022 – Jan 2023',
      employmentType: 'Internship',
      employmentTypeColor: 'bg-orange-500',
      details: [
        'Built Python scripts to automate reporting and validation, reducing manual work by 30%',
        'Designed a basic employee tracking system (Python + SQL) managing 200+ records with accuracy',
        'Developed a lightweight dashboard prototype (HTML + Python + SQL) for weekly reporting',
        'Boosted DB performance by 60% via SQL optimization and team collaboration'
      ],
      skills: ['Python', 'SQL', 'Automation', 'Dashboard Development']
    }
  ];

  return (
    <section id="experience" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-white scroll-mt-20">
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
                        <li key={idx} className="leading-relaxed flex items-start gap-2">
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


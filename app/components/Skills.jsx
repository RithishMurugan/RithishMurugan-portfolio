"use client";

import { Code, Brain, Cloud, Plug, Settings, BarChart3, Layers, FolderGit2 } from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Programming Languages",
    chips: ["Java", "Python", "JavaScript (Node.js)", "TypeScript", "SQL"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Plug,
    title: "Backend & API Development",
    chips: ["Spring Boot", "Hibernate", "FastAPI", "Express.js", "REST APIs", "Microservices Architecture"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Layers,
    title: "Frontend Development",
    chips: ["React.js", "Next.js", "HTML5", "CSS3"],
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Brain,
    title: "AI/ML & LLM Engineering",
    chips: ["LangChain", "OpenAI GPT-4o", "RAG", "LLM Agents", "Prompt Engineering"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Cloud,
    title: "Databases & Event-Driven Systems",
    chips: [
      "PostgreSQL",
      "MySQL",
      "DynamoDB",
      "Redis",
      "Vector Databases",
      "Apache Kafka",
      "Event-Driven Architecture",
      "Webhooks",
    ],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    icon: Settings,
    title: "Cloud & DevOps",
    chips: [
      "AWS (ECS, EKS, Lambda)",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Jenkins",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Testing, Quality & Observability",
    chips: [
      "JUnit",
      "Integration Testing",
      "Test Automation",
      "Code Quality Gates",
      "System Metrics",
      "Cost Optimization",
      "Performance Tuning",
      "Logging & Observability",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: FolderGit2,
    title: "Tools & Collaboration",
    chips: ["Git", "GitHub", "Agile/Scrum", "Slack API Integrations"],
    gradient: "from-teal-500 to-cyan-500",
  },
];

function Card({ title, chips, icon: Icon, gradient }) {
  return (
    <div className="group relative bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Gradient background effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>

      <div className="relative mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex-1 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 relative">
        {chips.map((c) => (
          <span
            key={c}
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:border hover:border-blue-200 transition-all duration-200 cursor-default"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-fade-in px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-6xl mx-auto bg-slate-50 scroll-mt-20 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
        {/* Skills & Technologies tag */}
        <div className="inline-block bg-blue-100 border border-blue-300 rounded-lg px-3 py-1 mb-3 sm:mb-4">
          <span className="text-blue-700 font-medium text-xs sm:text-sm">Skills & Technologies</span>
        </div>
        {/* Main title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3">
          <span className="text-slate-900">Technical</span>{" "}
          <span className="text-blue-600">Expertise</span>
        </h2>
        {/* Blue underline */}
        <div className="h-1 w-24 sm:w-32 mx-auto mb-2 sm:mb-3 bg-blue-600 rounded-full"></div>
        {/* Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Keyword-aligned for ATS and recruiter search — maps directly to the stacks in my{" "}
          <a href="#experience" className="font-semibold text-blue-600 hover:underline">
            experience
          </a>
          .
        </p>
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2">
        {categories.map((c) => (
          <Card key={c.title} title={c.title} chips={c.chips} icon={c.icon} gradient={c.gradient} />
        ))}
      </div>
    </section>
  );
}

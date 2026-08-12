export type ProjectCategory = "all" | "ai-ml" | "agentic" | "full-stack" | "backend" | "web";

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  longDescription: string;
  problem: string;
  approach: string;
  impact: string[];
  features: string[];
  tech: string[];
  categories: Exclude<ProjectCategory, "all">[];
  gradient: string;
  techColor: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  tier: "flagship" | "featured" | "lab";
}

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI/ML" },
  { id: "agentic", label: "Agentic Systems" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "backend", label: "Backend" },
  { id: "web", label: "Web Apps" },
];

export const projects: Project[] = [
  {
    id: "healthcare-copilot",
    title: "Healthcare AI Copilot & Clinical Data Platform",
    date: "2025 – Present",
    description:
      "Clinician-facing AI copilot platform at Abridge — FastAPI backends, React/TypeScript review interfaces, LangChain RAG, and FHIR/HL7 clinical integrations.",
    longDescription:
      "Full-stack healthcare AI platform integrating five clinical domains with Python, FastAPI, FHIR, HL7, and PostgreSQL — centralizing 400K+ patient records. Built clinician-facing copilot APIs and React/TypeScript review interfaces with LangChain, RAG, GPT-4o, Claude, and Llama 3. Event-driven pipelines on Kafka, Redis, S3, and Snowflake with LangGraph workflows, HITL review, and PII safeguards across 50K+ monthly interactions on AWS EKS.",
    problem:
      "Clinical teams needed a unified platform to surface AI-generated insights from fragmented EHR data — with citation review, compliance controls, and production-grade reliability.",
    approach:
      "Microservices architecture with FHIR/HL7 ingestion → Kafka event pipelines → LangGraph RAG workflows → React clinician review interfaces, deployed on AWS EKS with Terraform and full observability.",
    impact: [
      "400K+ patient records centralized across five clinical domains",
      "50K+ monthly AI interactions with HITL validation",
      "99.99% uptime with 25% infrastructure cost reduction",
    ],
    tier: "flagship",
    features: [
      "Clinician-facing AI copilot APIs with citation review and feedback capture",
      "React + TypeScript review interfaces with secure approval workflows",
      "LangGraph orchestration with HITL, groundedness, and PII validation",
      "99.99% uptime on AWS EKS with Terraform, CI/CD, and audit logging",
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "FHIR", "LangChain", "LangGraph", "RAG", "Kafka", "PostgreSQL", "Snowflake", "AWS EKS"],
    categories: ["ai-ml", "agentic", "backend"],
    gradient: "from-indigo-600 to-violet-500",
    techColor: "bg-indigo-50 text-indigo-900 ring-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-200 dark:ring-indigo-800",
    featured: true,
  },
  {
    id: "call-center-dashboard",
    title: "Call Center Analytics Dashboard",
    date: "Nov 2025",
    description:
      "Full-stack AI dashboard analyzing 451 call center interactions with Gemini 2.5 — LLM insights, funnels, and revenue modeling.",
    longDescription:
      "Built a full-stack AI analytics dashboard that processes 451 call center interactions using TypeScript, Express, React, and Gemini 2.5. Surfaces LLM-driven insights, conversion funnels, and revenue modeling to support coaching and pattern detection.",
    problem: "Call center managers lacked actionable insight from hundreds of daily conversations.",
    approach: "Express API + Gemini 2.5 extraction pipeline feeding React dashboards with funnel and revenue models.",
    impact: ["451 interactions analyzed with LLM-driven pattern detection"],
    tier: "featured",
    features: [
      "LLM-powered insight extraction from call transcripts",
      "Interactive funnels and revenue modeling dashboards",
      "REST API layer with Express and React frontend",
    ],
    tech: ["React", "TypeScript", "Express.js", "Gemini 2.5", "Tailwind", "Recharts", "Node.js"],
    categories: ["ai-ml", "full-stack", "web"],
    gradient: "from-amber-700 to-stone-600",
    techColor: "bg-amber-50 text-amber-900 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900",
    githubUrl: "https://github.com/RithishMurugan/plaibook-call-center-dashboard.git",
  },
  {
    id: "rag-agentcore",
    title: "RAG-Based Chatbot with AgentCore",
    date: "Oct 2025",
    description:
      "Custom RAG chatbot on AWS Bedrock and AgentCore for domain-specific Q&A over PDFs and text files.",
    longDescription:
      "Developed a custom RAG chatbot on AWS Bedrock and AgentCore for domain-specific Q&A over PDFs and text files. Includes embedding pipelines, retrieval logic, and a Python interface for real-time agent invocation.",
    problem: "Domain-specific document Q&A required a managed retrieval pipeline without building from scratch.",
    approach: "AWS Bedrock + AgentCore orchestration with custom embedding and retrieval over PDF corpora.",
    impact: ["Real-time agent invocation over custom document sets"],
    tier: "lab",
    features: [
      "AWS Bedrock + AgentCore agent orchestration",
      "Embedding and retrieval pipeline over documents",
      "Real-time Python invocation interface",
    ],
    tech: ["Python", "AWS Bedrock", "AgentCore", "Embeddings", "Retrieval Pipelines"],
    categories: ["ai-ml", "agentic", "backend"],
    gradient: "from-violet-700 to-indigo-500",
    techColor: "bg-slate-50 text-slate-800 ring-slate-100 dark:bg-slate-950/50 dark:text-slate-200 dark:ring-slate-800",
    githubUrl: "https://github.com/RithishMurugan/RAG-Based-Chatbot-with-AgentCore.git",
  },
  {
    id: "guest-concierge",
    title: "AI Guest Concierge Agent",
    date: "Jul 2025",
    description:
      "AI concierge with RAG pipeline on Pinecone + Supabase, automating guest workflows via REST APIs.",
    longDescription:
      "Built an AI concierge that answers guest questions and automates workflows with a RAG pipeline on Pinecone and Supabase, reducing manual support load through REST API integrations and n8n automation.",
    problem: "Guest support workflows were manual and repetitive across property management.",
    approach: "RAG on Pinecone + Supabase with n8n workflow automation and REST API integrations.",
    impact: ["Automated guest Q&A reducing manual support load"],
    tier: "lab",
    features: [
      "RAG pipeline with Pinecone vector search",
      "Supabase backend and n8n workflow automation",
      "REST API integrations for guest services",
    ],
    tech: ["Python", "RAG", "Pinecone", "Supabase", "n8n", "REST APIs"],
    categories: ["ai-ml", "agentic", "backend"],
    gradient: "from-slate-700 to-indigo-600",
    techColor: "bg-slate-50 text-slate-800 ring-slate-100 dark:bg-slate-950/50 dark:text-slate-200 dark:ring-slate-800",
    githubUrl: "https://github.com/RithishMurugan/AI-Guest-Concierge-Agent.git",
  },
  {
    id: "hand-sign-detection",
    title: "Real-Time Hand Sign Detection System",
    date: "Jan 2025",
    description:
      "Real-time gesture recognition detecting 36 hand signs at 90%+ accuracy with MediaPipe and TensorFlow.",
    longDescription:
      "Real-time gesture recognition system detecting 36 hand signs at 90%+ accuracy using MediaPipe landmarks and a TensorFlow classifier — modular pipeline designed for retraining and deployment.",
    problem: "Real-time gesture classification needed a modular, retrainable computer vision pipeline.",
    approach: "MediaPipe landmark extraction → TensorFlow classifier with modular training pipeline.",
    impact: ["36 hand signs at 90%+ accuracy in real time"],
    tier: "lab",
    features: [
      "36-class hand sign classification at 90%+ accuracy",
      "MediaPipe landmark extraction pipeline",
      "Modular TensorFlow classifier for retraining",
    ],
    tech: ["Python", "TensorFlow", "MediaPipe", "OpenCV"],
    categories: ["ai-ml", "backend"],
    gradient: "from-slate-600 to-indigo-600",
    techColor: "bg-stone-50 text-stone-800 ring-stone-100 dark:bg-stone-950/50 dark:text-stone-200 dark:ring-stone-800",
    githubUrl: "https://github.com/RithishMurugan/Real-Time-Hand-Sign-Detection-System.git",
  },
  {
    id: "traffic-cli",
    title: "Traffic Management System (CLI Analytics Tool)",
    date: "Mar 2024",
    description:
      "Python + SQL CLI analytics tool for traffic incident, vehicle, road, and signal datasets.",
    longDescription:
      "Python and SQL CLI analytics tool for traffic incident, vehicle, road, and signal datasets. Normalized schemas and query-driven workflows for violation density and route throughput analysis.",
    problem: "Multi-dataset traffic analysis required normalized schemas and repeatable query workflows.",
    approach: "Python + SQL CLI with normalized relational schemas for cross-dataset analytics.",
    impact: ["Violation density and route throughput reporting from unified schemas"],
    tier: "lab",
    features: [
      "Normalized SQL schemas for multi-dataset analysis",
      "CLI-driven query workflows",
      "Violation density and route throughput reports",
    ],
    tech: ["Python", "SQL", "Data Modeling"],
    categories: ["backend"],
    gradient: "from-stone-700 to-zinc-600",
    techColor: "bg-zinc-50 text-zinc-800 ring-zinc-100 dark:bg-zinc-950/50 dark:text-zinc-200 dark:ring-zinc-800",
  },
];

export function filterProjects(
  category: ProjectCategory,
  skill: string | null
): Project[] {
  return projects.filter((p) => {
    const categoryMatch =
      category === "all" || p.categories.includes(category as Exclude<ProjectCategory, "all">);
    const skillMatch =
      !skill || p.tech.some((t) => t.toLowerCase().includes(skill.toLowerCase()));
    return categoryMatch && skillMatch;
  });
}

/** Flagship work — shown in pinned case study section */
export const flagshipProjects = projects.filter((p) => p.tier === "flagship");

/** Additional projects — horizontal showcase */
export const selectedBuilds = projects.filter((p) => p.tier !== "flagship");

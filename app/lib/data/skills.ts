import type { LucideIcon } from "lucide-react";
import {
  Code,
  Brain,
  Cloud,
  Plug,
  Database,
  HeartPulse,
  Settings,
  Radio,
  Layout,
  Shield,
  FlaskConical,
  TestTube,
} from "lucide-react";

export interface SkillCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  chips: string[];
  gradient: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    icon: Code,
    title: "Programming Languages",
    chips: ["Python", "Java", "SQL", "TypeScript"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "genai",
    icon: Brain,
    title: "Gen AI & Agents",
    chips: ["LLMs", "GPT-4o", "Claude", "Llama 3", "LangChain", "LangGraph", "RAG", "Agentic AI", "Function Calling", "Pinecone"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "backend",
    icon: Plug,
    title: "Backend Engineering & APIs",
    chips: ["FastAPI", "Spring Boot", "REST APIs", "Microservices", "Event-Driven Architecture", "Asynchronous Processing", "Hibernate", "JPA", "Swagger/OpenAPI", "Performance Optimization"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "frontend",
    icon: Layout,
    title: "Frontend Development",
    chips: ["React", "AI Copilot Interfaces", "Citation Review Interfaces", "Feedback Capture Workflows"],
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "ai-safety",
    icon: Shield,
    title: "AI Evaluation & Safety",
    chips: ["Retrieval Evaluation", "Groundedness", "Citation Validation", "HITL", "PII Safeguards", "AI Governance"],
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "data",
    icon: Database,
    title: "Data, Databases & Streaming",
    chips: ["PostgreSQL", "Snowflake", "Amazon Redshift", "Amazon S3", "Apache Kafka", "Redis", "ETL", "Incremental Loading", "Dead-Letter Queues", "Distributed Caching", "Data Validation"],
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud, DevOps & Observability",
    chips: ["AWS", "EKS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "CloudWatch", "Git", "Automated Builds", "Centralized Logging", "Health Checks"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: "testing",
    icon: TestTube,
    title: "Testing & Software Quality",
    chips: ["JUnit", "Mockito", "Integration Testing", "Automated Testing", "Postman", "API Validation", "Request Validation", "Exception Handling", "Code Reviews", "Security Checks"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "ml",
    icon: FlaskConical,
    title: "Machine Learning",
    chips: ["XGBoost", "Scikit-learn", "Predictive Modeling", "Risk Prioritization"],
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & Security",
    chips: ["EHR", "FHIR", "HL7", "RBAC", "Clinical Data Integration", "Audit Logging", "Healthcare Compliance"],
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "architecture",
    icon: Settings,
    title: "Architecture & Delivery",
    chips: ["System Design", "LLD", "API Contracts", "Service Boundaries", "Factory Pattern", "Requirements Analysis", "Agile", "Release Management", "Production Support"],
    gradient: "from-slate-600 to-slate-800",
  },
];

export const allSkills = skillCategories.flatMap((c) => c.chips);

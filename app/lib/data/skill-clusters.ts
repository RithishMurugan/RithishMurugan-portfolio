import type { LucideIcon } from "lucide-react";
import { Brain, Cloud, Database, FlaskConical, Layout, Plug, Settings } from "lucide-react";

/** Visual groupings within a cluster detail panel */
export interface SkillChipGroup {
  chips: string[];
}

/** High-level clusters shown on the skills orbit (6–7 max). */
export interface SkillCluster {
  id: string;
  icon: LucideIcon;
  title: string;
  shortLabel: string;
  /** Grouped chips for visual spacing in the detail panel */
  chipGroups: SkillChipGroup[];
}

export const skillOrbitClusters: SkillCluster[] = [
  {
    id: "ai-agents",
    icon: Brain,
    title: "AI & Agents",
    shortLabel: "AI & Agents",
    chipGroups: [
      { chips: ["LLMs", "GPT-4o", "Claude", "Llama 3"] },
      { chips: ["LangChain", "LangGraph", "RAG", "Agentic AI", "Pinecone"] },
      { chips: ["Retrieval Evaluation", "Groundedness", "HITL"] },
    ],
  },
  {
    id: "backend",
    icon: Plug,
    title: "Backend & APIs",
    shortLabel: "Backend",
    chipGroups: [
      { chips: ["Python", "Java"] },
      { chips: ["FastAPI", "Spring Boot", "REST APIs", "Microservices"] },
      { chips: ["Event-Driven Architecture", "Hibernate", "JPA"] },
    ],
  },
  {
    id: "frontend",
    icon: Layout,
    title: "Frontend",
    shortLabel: "Frontend",
    chipGroups: [{ chips: ["React", "TypeScript"] }],
  },
  {
    id: "data",
    icon: Database,
    title: "Data & Streaming",
    shortLabel: "Data",
    chipGroups: [
      { chips: ["SQL", "PostgreSQL", "Snowflake", "Amazon Redshift"] },
      { chips: ["Apache Kafka", "Redis"] },
      { chips: ["ETL"] },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    shortLabel: "Cloud",
    chipGroups: [
      { chips: ["AWS", "EKS", "Docker", "Kubernetes"] },
      { chips: ["Terraform", "Jenkins", "CI/CD", "CloudWatch"] },
    ],
  },
  {
    id: "ml",
    icon: FlaskConical,
    title: "Machine Learning",
    shortLabel: "ML",
    chipGroups: [{ chips: ["XGBoost", "Scikit-learn", "Predictive Modeling"] }],
  },
  {
    id: "architecture",
    icon: Settings,
    title: "Architecture & Quality",
    shortLabel: "Architecture",
    chipGroups: [
      { chips: ["System Design", "LLD", "API Contracts"] },
      { chips: ["JUnit", "Mockito", "Postman", "Integration Testing"] },
    ],
  },
];

/** Flat chip list helper */
export function getClusterChips(cluster: SkillCluster): string[] {
  return cluster.chipGroups.flatMap((g) => g.chips);
}

/** High-signal skills for the quick-scan row */
export const FEATURED_QUICK_SCAN = [
  "Python",
  "Java",
  "React",
  "TypeScript",
  "FastAPI",
  "Spring Boot",
  "AWS",
  "Kubernetes",
  "Kafka",
  "RAG",
  "LangChain",
  "LangGraph",
  "FHIR",
  "HL7",
  "EHR",
] as const;

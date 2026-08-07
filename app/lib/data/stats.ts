export const STATS = [
  { value: 400, suffix: "K+", label: "Patient Records Centralized" },
  { value: 50, suffix: "K+", label: "Monthly Clinical Interactions" },
  { value: 99.99, suffix: "%", label: "Platform Uptime", decimals: 2 },
  { value: 4, suffix: "+", label: "Years Experience" },
] as const;

export const MARQUEE_TECH = [
  "Python", "FastAPI", "React", "TypeScript", "Java", "Spring Boot",
  "LangChain", "LangGraph", "GPT-4o", "RAG", "FHIR", "HL7",
  "Kafka", "PostgreSQL", "Snowflake", "AWS EKS", "Kubernetes", "Terraform",
] as const;

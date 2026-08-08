export interface ImpactHighlight {
  label: string;
  value: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  period: string;
  employmentType: string;
  employmentTypeColor: string;
  impactHighlights: ImpactHighlight[];
  details: string[];
  skills: string[];
}

export interface TimelineItem {
  id: string;
  period: string;
  heading: string;
  type: "work" | "education";
  experience?: Experience;
  education?: {
    degree: string;
    school: string;
    location: string;
    date: string;
    highlights: string[];
  };
}

export const experiences: Experience[] = [
  {
    id: "abridge",
    title: "AI Full Stack Software Engineer",
    company: "Abridge",
    location: "Remote, USA",
    date: "Jan 2025 – Present",
    period: "2025 – Present",
    employmentType: "Full-time",
    employmentTypeColor: "bg-emerald-600",
    impactHighlights: [
      { label: "Patient records", value: "400K+" },
      { label: "Monthly interactions", value: "50K+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Cost reduction", value: "25%" },
    ],
    details: [
      "Architect scalable healthcare microservices integrating five clinical domains through Python, FastAPI, FHIR, HL7, and PostgreSQL, centralizing 400K+ patient records while documenting APIs, security requirements, and compliance standards.",
      "Orchestrate event-driven clinical data services with Apache Kafka, Redis, Amazon S3, and Snowflake, implementing retries, dead-letter handling, caching, and validation to improve reliability and data consistency.",
      "Deliver clinician-facing AI copilot APIs and review interfaces using FastAPI, React, TypeScript, LangChain, RAG, GPT-4o, Claude, and Llama 3, enabling citation review, feedback capture, and secure approval.",
      "Operationalize LangGraph workflows with function calling, asynchronous orchestration, and human review, validating retrieval quality, groundedness, citations, and PII safeguards across 50K+ monthly clinical interactions.",
      "Coordinate with physicians, product leaders, and compliance teams to validate XGBoost and Scikit-learn risk-prioritization models, defining performance thresholds, clinician-review criteria, deployment controls, and production decision boundaries.",
      "Optimize cloud-native delivery with AWS EKS, Docker, Kubernetes, Terraform, CI/CD, and CloudWatch, establishing health checks, audit logging, and controls while sustaining 99.99% uptime and reducing costs 25%.",
    ],
    skills: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "FHIR",
      "HL7",
      "LangChain",
      "LangGraph",
      "RAG",
      "GPT-4o",
      "Kafka",
      "PostgreSQL",
      "Snowflake",
      "AWS EKS",
      "Kubernetes",
      "Terraform",
    ],
  },
  {
    id: "virtualan",
    title: "Software Engineer",
    company: "Virtualan Software LLC",
    location: "Chicago, IL",
    date: "May 2024 – Aug 2024",
    period: "2024",
    employmentType: "Internship",
    employmentTypeColor: "bg-blue-600",
    impactHighlights: [
      { label: "Daily records", value: "10K+" },
      { label: "Test coverage", value: "+35%" },
      { label: "Stack", value: "ETL + APIs" },
      { label: "Cloud", value: "AWS S3" },
    ],
    details: [
      "Developed scalable backend ETL pipelines using Python, SQL, AWS S3, and Amazon Redshift, transforming 10K+ daily records with data validation and incremental loading to reduce reporting delays for analytics stakeholders reliably.",
      "Built and documented REST APIs using Python, SQL, Postman, and Swagger/OpenAPI, adding request validation and automated testing that increased coverage by 35% and streamlined cross-functional backend integrations for product teams.",
      "Implemented backend controls RBAC, data validation, and peer code reviews while coordinating Agile delivery and release workflows, reducing preventable defects and supporting stable releases throughout the four-month engagement.",
    ],
    skills: ["Python", "SQL", "AWS S3", "Amazon Redshift", "REST APIs", "Swagger/OpenAPI", "Postman", "RBAC", "Agile"],
  },
  {
    id: "hexaware",
    title: "Java Developer",
    company: "Hexaware Technologies",
    location: "Chennai, India",
    date: "Mar 2021 – Jul 2023",
    period: "2021 – 2023",
    employmentType: "Full-time",
    employmentTypeColor: "bg-green-600",
    impactHighlights: [
      { label: "Warehouses", value: "8" },
      { label: "Response time", value: "-18%" },
      { label: "Test coverage", value: "62→78%" },
      { label: "Stack", value: "Java + Kafka" },
    ],
    details: [
      "Analyzed inventory, order, and shipment requirements with product owners and operations stakeholders, translating user stories into API contracts and delivery plans that reduced development rework.",
      "Designed low-level architecture for Java microservices using Spring Boot, Hibernate, PostgreSQL, and Factory patterns, defining service boundaries and database schemas supporting eight regional warehouses.",
      "Developed secure REST APIs and event-driven business logic with Java, Spring Boot, Kafka, Redis, JPA, and PostgreSQL for inventory updates, improving average service response time by 18%.",
      "Strengthened code quality through JUnit, Mockito, integration testing, API validation, and structured exception handling, increasing critical-service test coverage from 62% to 78% before releases.",
      "Reviewed peer code through Git, enforced Java coding standards, and integrated Jenkins CI/CD pipelines with automated builds, tests, and security checks, improving release consistency across shared services.",
      "Containerized Spring Boot services with Docker, deployed them through Kubernetes on AWS, and monitored logs with CloudWatch, resolving production issues while maintaining reliable warehouse operations.",
    ],
    skills: ["Java", "Spring Boot", "Hibernate", "JPA", "Kafka", "Redis", "PostgreSQL", "JUnit", "Mockito", "Docker", "Kubernetes", "AWS", "Jenkins"],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "hexaware-timeline",
    period: "2021 – 2023",
    heading: "Java Developer",
    type: "work",
    experience: experiences[2],
  },
  {
    id: "iit-timeline",
    period: "2023 – 2025",
    heading: "Graduate Studies",
    type: "education",
    education: {
      degree: "Master of Science in Computer Science",
      school: "Illinois Institute of Technology",
      location: "Chicago, IL",
      date: "Aug 2023 – May 2025",
      highlights: [
        "M.S. in Computer Science strengthening distributed systems, ML, and full-stack engineering practice.",
        "Internship at Virtualan: Python ETL pipelines, REST APIs, and AWS data workflows (10K+ daily records).",
      ],
    },
  },
  {
    id: "virtualan-timeline",
    period: "2024",
    heading: "Software Engineer",
    type: "work",
    experience: experiences[1],
  },
  {
    id: "abridge-timeline",
    period: "2025 – Present",
    heading: "AI Full Stack Software Engineer",
    type: "work",
    experience: experiences[0],
  },
];

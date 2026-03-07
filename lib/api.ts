/**
 * Typed API helpers that always filter is_active: true.
 * 
 * These are server-side helpers (called in Next.js Server Components).
 * Each function wraps the Amplify Data client list() with the active filter baked in,
 * sorted by sort_order ascending.
 * 
 * Usage:
 *   const experiences = await getExperiences();
 * 
 * NOTE: These helpers use static data from the seed. Once you run
 *   `npx ampx sandbox` and seed the DB, replace these mock fallbacks
 *   with the real Amplify client calls below (commented out).
 */

// ---------- Types for static fallback / seed typing ----------
export type TProfile = {
  id: string;
  name: string;
  title: string;
  tagline?: string | null;
  summary: string;
  email: string;
  github?: string | null;
  linkedin?: string | null;
  location?: string | null;
  /**
   * Your profile photo. Options:
   *  - Drop a file into /public/profile.jpg → set this to "/profile.jpg"
   *  - Any public URL (LinkedIn, S3, Cloudinary, etc.)
   *  - Leave null to hide the photo column in the Hero
   */
  photo_url?: string | null;
  is_active: boolean;
};

export type TExperience = {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  location?: string | null;
  bullets?: string[] | null;
  sort_order: number;
  is_active: boolean;
};

export type TProject = {
  id: string;
  name: string;
  description: string;
  tech_stack?: string[] | null;
  github_url?: string | null;
  demo_url?: string | null;
  sort_order: number;
  is_active: boolean;
};

export type TSkillSubcategory = {
  name: string;
  items?: string[] | null;
};

export type TSkill = {
  id: string;
  category: string;
  /** Flat skill pills — used when there are no sub-groups */
  items?: string[] | null;
  /** Named sub-groups, each with their own pills (e.g. Azure / AWS / GCP) */
  subcategories?: TSkillSubcategory[] | null;
  sort_order: number;
  is_active: boolean;
};

export type TEducation = {
  id: string;
  institution: string;
  degree?: string | null;
  field?: string | null;
  grade?: string | null;
  start_year?: string | null;
  end_year?: string | null;
  sort_order: number;
  is_active: boolean;
};

export type TCertification = {
  id: string;
  name: string;
  issuer: string;
  year?: string | null;
  /** S3 public URL of the individual certification badge image. Null until uploaded. */
  logo_url?: string | null;
  sort_order: number;
  is_active: boolean;
};

export type TInternship = {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  bullets?: string[] | null;
  sort_order: number;
  is_active: boolean;
};

// ---------- Static seed data (used until Amplify sandbox is live) ----------
// Once `amplify_outputs.json` exists, swap these with real Amplify client calls.

export const PROFILE: TProfile = {
  id: "1",
  name: "Harshith Shetty",
  title: "Software Engineer",
  tagline: "Building scalable backends & cloud-native systems",
  summary:
    "Software Engineer with 2.5+ years delivering client-facing FinTech applications and production-grade features across web UIs, backend services, and cloud workflows. Experience building backend systems in Python and .NET Core/C#, leveraging SQL optimization and Angular for investor-facing platforms. Shipped REST APIs, event-driven pipelines, and real-time updates on Azure, with strong focus on reliability, maintainability, and cross-functional delivery.",
  email: "harshithdshetty@gmail.com",
  github: "https://github.com/harshith-shetty",
  linkedin: "https://linkedin.com/in/harshithdshetty",
  location: "Mumbai, India",
  photo_url: "https://i.ibb.co/Qfcp3Ry/IMG-20230223-223204-727.jpg",
  is_active: true,
};

export const EXPERIENCES: TExperience[] = [
  {
    id: "exp-1",
    company: "Indus Valley Partners",
    role: "Software Engineer",
    start_date: "July 2023",
    end_date: null,
    location: "Mumbai, India",
    bullets: [
      "Engineered a scalable portfolio management platform using .NET Core, C#, RESTful backend services, SQL (query optimization), and Angular UI — tracking $35B AUM across 6,000+ issuers and 35,000 assets.",
      "Designed investment/portfolio workflows for 500+ portfolio companies and 100K+ positions, including a Day-0 ingestion workflow that cut manual effort by 80%+ and shortened operational cycles from days to minutes.",
      "Built cross-system data exchange workflows distributing balance-sheet and financial datasets across internal platforms, improving interoperability and ensuring consistent data delivery for downstream analytics.",
      "Implemented Azure-based ingestion/processing (App Services, Data Factory, Service Bus, Blob Storage, Azure Functions) with automated ETL-style workflows including retries and production-grade reliability.",
      "Built real-time WebSocket updates (SignalR) and Redis-backed caching layer for low-latency API responsiveness; designed an event-driven async order-processing workflow using Blob Storage + Service Bus + Azure Functions.",
      "Delivered real-time portfolio dashboards collaborating with Product/QA; enforced code review standards; supported deployments via Azure DevOps CI/CD pipelines.",
    ],
    sort_order: 1,
    is_active: true,
  },
];

export const INTERNSHIPS: TInternship[] = [
  {
    id: "int-1",
    company: "Virtual Testing Foundation",
    role: "Cybersecurity Intern",
    start_date: "May 2022",
    end_date: "July 2022",
    bullets: [
      "Implemented cybersecurity policies, conducted security assessments, worked with OWASP Top 10 vulnerabilities, and collaborated on resolving cybersecurity incidents.",
      "Improved knowledge of cryptography, authentication, authorization, and network-based threat modelling.",
    ],
    sort_order: 1,
    is_active: true,
  },
  {
    id: "int-2",
    company: "Virtual Testing Foundation",
    role: "Penetration Testing Intern",
    start_date: "October 2021",
    end_date: "December 2021",
    bullets: [
      "Conducted comprehensive penetration testing on web applications, identified and exploited vulnerabilities, and created custom automation tools.",
      "Performed social engineering attacks, network sniffing, and physical security assessments to strengthen cybersecurity posture.",
    ],
    sort_order: 2,
    is_active: true,
  },
  {
    id: "int-3",
    company: "MedTourEasy",
    role: "Cloud Computing Trainee",
    start_date: "January 2022",
    end_date: "February 2022",
    bullets: [
      "Worked on GCP services including Compute Engine, Cloud Storage, IAM, Google Kubernetes Engine, and App Engine.",
      "Developed expertise in container orchestration using Kubernetes to deploy, scale, and manage applications.",
    ],
    sort_order: 3,
    is_active: true,
  },
];

export const PROJECTS: TProject[] = [
  {
    id: "proj-1",
    name: "FinSight AI – Financial Analysis & RAG Intelligence Engine",
    description:
      "High-concurrency async backend exposing REST endpoints for financial Q&A and document analysis, featuring JWT auth, Redis caching, Hybrid RAG retrieval (dense + BM25), and a model-agnostic LLM layer (Groq Llama-3 / Ollama). Containerised with Docker Compose; streaming Next.js chat UI.",
    tech_stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Qdrant", "Docker", "Next.js"],
    github_url: "https://github.com/harshith-shetty/finsight-ai",
    demo_url: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "proj-2",
    name: "Event-Driven Data Pipeline – Music Streaming Analytics",
    description:
      "Python event simulator producing high-volume JSON streaming events to Apache Kafka; real-time Spark Structured Streaming pipeline writing to BigQuery (Bronze layer). Orchestrated with Airflow DAGs; full stack containerised with Docker Compose.",
    tech_stack: ["Python", "Apache Kafka", "PySpark", "Apache Airflow", "BigQuery", "Docker"],
    github_url: "https://github.com/harshith-shetty/music-streaming-pipeline",
    demo_url: null,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "proj-3",
    name: "Real-Time Stock Reporting & Analysis System",
    description:
      "AWS Kinesis Firehose streams stock data to S3; Azure Data Factory orchestrates ETL into Databricks (PySpark + Delta Lake). Advanced metrics (VWAP, price trends) via window functions; interactive Power BI dashboards for daily/monthly/quarterly analysis.",
    tech_stack: ["AWS Kinesis", "Azure Data Factory", "PySpark", "Databricks", "Delta Lake", "Power BI"],
    github_url: null,
    demo_url: null,
    sort_order: 3,
    is_active: true,
  },
  {
    id: "proj-4",
    name: "Automated Security Testing CI/CD Pipeline",
    description:
      "CI/CD pipeline triggered on PRs — builds & pushes images to ECR, runs Dockerfile linting, secrets scanning, and vulnerability scanning with AWS Security Hub integration. Feedback loops via CloudWatch Events + Lambda.",
    tech_stack: ["AWS", "Docker", "AWS CodePipeline", "ECR", "Lambda", "CloudWatch", "Python"],
    github_url: null,
    demo_url: null,
    sort_order: 4,
    is_active: true,
  },
  {
    id: "proj-5",
    name: "Vulnerability Testing & Analysis – Serverless Computing",
    description:
      "React + DynamoDB web app enabling users to run vulnerability tests on their servers. Amazon API Gateway + Lambda (Python) executes tests server-side; results returned via REST API.",
    tech_stack: ["React", "AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    github_url: null,
    demo_url: null,
    sort_order: 5,
    is_active: true,
  },
  {
    id: "proj-6",
    name: "QuantaCrypt – Breaking RSA with Quantum Computing",
    description:
      "Web application that breaks RSA-encrypted text using IBM Quantum Computer via Shor's Algorithm to factorize the public key — demonstrating quantum decryption without a private key.",
    tech_stack: ["IBM Quantum", "Qiskit", "Python", "React"],
    github_url: null,
    demo_url: null,
    sort_order: 6,
    is_active: true,
  },
  {
    id: "proj-7",
    name: "Sarvakaraum – Regional Language Compiler",
    description:
      "System enabling users to write C/C++ code in Indian regional languages (Hindi, Marathi). Hosted on AWS Amplify; compiler deployed on EC2; documentation/ebooks stored on S3.",
    tech_stack: ["AWS Amplify", "EC2", "S3", "C", "C++"],
    github_url: null,
    demo_url: null,
    sort_order: 7,
    is_active: true,
  },
];

export const SKILLS: TSkill[] = [
  {
    id: "skill-1",
    category: "Languages",
    items: ["Python", "SQL", "C#", "JavaScript", "TypeScript"],
    sort_order: 1,
    is_active: true,
  },
  {
    id: "skill-2",
    category: "Backend & APIs",
    items: ["FastAPI", "Flask", ".NET Core", "ASP.NET Core Web API", "REST APIs", "Microservices", "SignalR (WebSockets)", "JWT Auth", "Redis"],
    sort_order: 2,
    is_active: true,
  },
  {
    id: "skill-3",
    category: "Cloud",
    items: null, // no flat items — all skills live in subcategories
    subcategories: [
      {
        name: "Azure",
        items: [
          "Data Factory",
          "Functions",
          "App Services",
          "Service Bus",
          "Blob Storage",
          "Key Vaults",
          "DevOps (CI/CD)",
        ],
      },
      {
        name: "AWS",
        items: [
          "S3",
          "Lambda",
          "Kinesis Firehose",
          "ECR",
          "CodePipeline",
          "DynamoDB",
          "API Gateway",
          "CloudWatch",
          "Amplify",
        ],
      },
      {
        name: "GCP",
        items: ["BigQuery", "Google Kubernetes Engine", "Compute Engine", "Cloud Storage", "App Engine"],
      },
    ],
    sort_order: 4,
    is_active: true,
  },
  {
    id: "skill-4",
    category: "Databases",
    items: ["SQL Server", "PostgreSQL", "DynamoDB", "BigQuery"],
    sort_order: 3,
    is_active: true,
  },
  {
    id: "skill-5",
    category: "Data Engineering",
    items: ["Apache Kafka", "PySpark", "Apache Airflow", "Delta Lake", "Apache Spark Structured Streaming"],
    sort_order: 5,
    is_active: true,
  },
  {
    id: "skill-6",
    category: "Frameworks & Tools",
    items: ["Angular", "Next.js", "Docker", "Git", "GitHub", "Databricks", "Celery", "Qdrant"],
    sort_order: 6,
    is_active: true,
  },
  {
    id: "skill-7",
    category: "Core CS",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks"],
    sort_order: 7,
    is_active: true,
  },
];

export const EDUCATIONS: TEducation[] = [
  {
    id: "edu-1",
    institution: "Shah and Anchor Kutchhi Engineering College, University of Mumbai",
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    grade: "CGPA: 8.9",
    start_year: "2019",
    end_year: "2023",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "edu-2",
    institution: "R.K.T College of Arts, Commerce & Science",
    degree: "HSC",
    field: "PCM with Information Technology",
    grade: "76.46%",
    start_year: "2017",
    end_year: "2019",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "edu-3",
    institution: "Carmel Convent High School",
    degree: "SSC",
    field: null,
    grade: "87.0%",
    start_year: "2015",
    end_year: "2017",
    sort_order: 3,
    is_active: true,
  },
];

export const CERTIFICATIONS: TCertification[] = [
  { id: "cert-1", name: "AWS Solutions Architect Associate", issuer: "Amazon Web Services", year: "2021", logo_url: null, sort_order: 1, is_active: true },
  { id: "cert-2", name: "Microsoft Azure Administrator Associate", issuer: "Microsoft", year: "2023", logo_url: null, sort_order: 2, is_active: true },
  { id: "cert-3", name: "Microsoft Azure Data Scientist Associate", issuer: "Microsoft", year: "2023", logo_url: null, sort_order: 3, is_active: true },
  { id: "cert-4", name: "Microsoft Fabric Data Engineer Associate", issuer: "Microsoft", year: "2024", logo_url: null, sort_order: 4, is_active: true },
  { id: "cert-5", name: "Google Cloud Generative AI Leader", issuer: "Google Cloud", year: "2024", logo_url: null, sort_order: 5, is_active: true },
  { id: "cert-6", name: "Oracle Cloud Certified Generative AI Professional", issuer: "Oracle", year: "2024", logo_url: null, sort_order: 6, is_active: true },
];

// ---------- Amplify Data client (server-side) ----------
// getServerClient() returns null when amplify_outputs.json has PLACEHOLDER values.
// In that case every getter returns null/empty — the site shows nothing rather than
// serving stale hardcoded data.

import { getServerClient } from "@/lib/amplify-client";

export async function getProfile(): Promise<TProfile | null> {
  const client = getServerClient();
  if (!client) return null;
  const { data } = await client.models.Profile.list({ filter: { is_active: { eq: true } } });
  return (data[0] as TProfile) ?? null;
}

export async function getExperiences(): Promise<TExperience[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Experience.list({ filter: { is_active: { eq: true } } });
  return (data as TExperience[]).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getInternships(): Promise<TInternship[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Internship.list({ filter: { is_active: { eq: true } } });
  return (data as TInternship[]).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getProjects(): Promise<TProject[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Project.list({ filter: { is_active: { eq: true } } });
  return (data as TProject[]).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getSkills(): Promise<TSkill[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Skill.list({ filter: { is_active: { eq: true } } });
  return (data as TSkill[]).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getEducations(): Promise<TEducation[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Education.list({ filter: { is_active: { eq: true } } });
  return (data as TEducation[]).sort((a, b) => a.sort_order - b.sort_order);
}

export async function getCertifications(): Promise<TCertification[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data } = await client.models.Certification.list({ filter: { is_active: { eq: true } } });
  return (data as TCertification[]).sort((a, b) => a.sort_order - b.sort_order);
}


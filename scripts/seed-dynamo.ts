// @ts-nocheck
/**
 * DynamoDB-direct seed script.
 * Uses @aws-sdk/lib-dynamodb with local AWS credentials — bypasses AppSync auth entirely.
 *
 * Run after `npx ampx sandbox` finishes:
 *   npx ts-node --project tsconfig.seed.json scripts/seed-dynamo.ts
 *
 * Table name suffix: -4zoufaemjfattimhyf3b6myxtq-NONE
 * (Update SUFFIX below if you recreate the sandbox)
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const REGION = "us-east-1";
const SUFFIX = "-4zoufaemjfattimhyf3b6myxtq-NONE";
const now = new Date().toISOString();

const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION }),
  { marshallOptions: { removeUndefinedValues: true } }
);

function table(name: string) {
  return `${name}${SUFFIX}`;
}

async function put(tableName: string, item: Record<string, unknown>) {
  await dynamo.send(new PutCommand({ TableName: table(tableName), Item: { id: randomUUID(), __typename: tableName, createdAt: now, updatedAt: now, _version: 1, _lastChangedAt: Date.now(), ...item } }));
}

// ── Profile ───────────────────────────────────────────────────────────────────
async function seedProfile() {
  await put("Profile", {
    name: "Harshith Shetty",
    title: "Software Engineer",
    tagline: "Building scalable backends & cloud-native systems",
    summary: "Software Engineer with 2.5+ years delivering client-facing FinTech applications and production-grade features across web UIs, backend services, and cloud workflows. Experience building backend systems in Python and .NET Core/C#, leveraging SQL optimization and Angular for investor-facing platforms. Shipped REST APIs, event-driven pipelines, and real-time updates on Azure, with strong focus on reliability, maintainability, and cross-functional delivery.",
    email: "harshithdshetty@gmail.com",
    github: "https://github.com/harshith-shetty",
    linkedin: "https://linkedin.com/in/harshithdshetty",
    location: "Mumbai, India",
    photo_url: "https://i.ibb.co/Qfcp3Ry/IMG-20230223-223204-727.jpg",
    is_active: true,
  });
  console.log("✅ Profile seeded");
}

// ── Experience ─────────────────────────────────────────────────────────────────
async function seedExperiences() {
  await put("Experience", {
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
  });
  console.log("✅ Experience seeded");
}

// ── Internships ────────────────────────────────────────────────────────────────
async function seedInternships() {
  const items = [
    { company: "Virtual Testing Foundation", role: "Cybersecurity Intern", start_date: "May 2022", end_date: "July 2022", bullets: ["Implemented cybersecurity policies, conducted security assessments, worked with OWASP Top 10 vulnerabilities, and collaborated on resolving cybersecurity incidents.", "Improved knowledge of cryptography, authentication, authorization, and network-based threat modelling."], sort_order: 1, is_active: true },
    { company: "Virtual Testing Foundation", role: "Penetration Testing Intern", start_date: "October 2021", end_date: "December 2021", bullets: ["Conducted comprehensive penetration testing on web applications, identified and exploited vulnerabilities, and created custom automation tools.", "Performed social engineering attacks, network sniffing, and physical security assessments to strengthen cybersecurity posture."], sort_order: 2, is_active: true },
    { company: "MedTourEasy", role: "Cloud Computing Trainee", start_date: "January 2022", end_date: "February 2022", bullets: ["Worked on GCP services including Compute Engine, Cloud Storage, IAM, Google Kubernetes Engine, and App Engine.", "Developed expertise in container orchestration using Kubernetes to deploy, scale, and manage applications."], sort_order: 3, is_active: true },
  ];
  for (const i of items) await put("Internship", i);
  console.log("✅ Internships seeded");
}

// ── Projects ───────────────────────────────────────────────────────────────────
async function seedProjects() {
  const items = [
    { name: "FinSight AI – Financial Analysis & RAG Intelligence Engine", description: "High-concurrency async backend exposing REST endpoints for financial Q&A and document analysis, featuring JWT auth, Redis caching, Hybrid RAG retrieval (dense + BM25), and a model-agnostic LLM layer (Groq Llama-3 / Ollama). Containerised with Docker Compose; streaming Next.js chat UI.", tech_stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Qdrant", "Docker", "Next.js"], github_url: "https://github.com/harshith-shetty/finsight-ai", demo_url: null, sort_order: 1, is_active: true },
    { name: "Event-Driven Data Pipeline – Music Streaming Analytics", description: "Python event simulator producing high-volume JSON streaming events to Apache Kafka; real-time Spark Structured Streaming pipeline writing to BigQuery (Bronze layer). Orchestrated with Airflow DAGs; full stack containerised with Docker Compose.", tech_stack: ["Python", "Apache Kafka", "PySpark", "Apache Airflow", "BigQuery", "Docker"], github_url: "https://github.com/harshith-shetty/music-streaming-pipeline", demo_url: null, sort_order: 2, is_active: true },
    { name: "Real-Time Stock Reporting & Analysis System", description: "AWS Kinesis Firehose streams stock data to S3; Azure Data Factory orchestrates ETL into Databricks (PySpark + Delta Lake). Advanced metrics (VWAP, price trends) via window functions; interactive Power BI dashboards.", tech_stack: ["AWS Kinesis", "Azure Data Factory", "PySpark", "Databricks", "Delta Lake", "Power BI"], github_url: null, demo_url: null, sort_order: 3, is_active: true },
    { name: "Automated Security Testing CI/CD Pipeline", description: "CI/CD pipeline triggered on PRs — builds & pushes images to ECR, runs Dockerfile linting, secrets scanning, and vulnerability scanning with AWS Security Hub integration.", tech_stack: ["AWS", "Docker", "AWS CodePipeline", "ECR", "Lambda", "CloudWatch", "Python"], github_url: null, demo_url: null, sort_order: 4, is_active: true },
    { name: "Vulnerability Testing & Analysis – Serverless Computing", description: "React + DynamoDB web app enabling users to run vulnerability tests on their servers. Amazon API Gateway + Lambda (Python) executes tests server-side; results returned via REST API.", tech_stack: ["React", "AWS Lambda", "API Gateway", "DynamoDB", "Python"], github_url: null, demo_url: null, sort_order: 5, is_active: true },
    { name: "QuantaCrypt – Breaking RSA with Quantum Computing", description: "Web application that breaks RSA-encrypted text using IBM Quantum Computer via Shor's Algorithm to factorize the public key — demonstrating quantum decryption without a private key.", tech_stack: ["IBM Quantum", "Qiskit", "Python", "React"], github_url: null, demo_url: null, sort_order: 6, is_active: true },
    { name: "Sarvakaraum – Regional Language Compiler", description: "System enabling users to write C/C++ code in Indian regional languages (Hindi, Marathi). Hosted on AWS Amplify; compiler deployed on EC2; documentation/ebooks stored on S3.", tech_stack: ["AWS Amplify", "EC2", "S3", "C", "C++"], github_url: null, demo_url: null, sort_order: 7, is_active: true },
  ];
  for (const p of items) await put("Project", p);
  console.log("✅ Projects seeded");
}

// ── Skills ─────────────────────────────────────────────────────────────────────
async function seedSkills() {
  const items = [
    { category: "Languages", items: ["Python", "SQL", "C#", "JavaScript", "TypeScript"], subcategories: null, sort_order: 1, is_active: true },
    { category: "Backend & APIs", items: ["FastAPI", "Flask", ".NET Core", "ASP.NET Core Web API", "REST APIs", "Microservices", "SignalR (WebSockets)", "JWT Auth", "Redis"], subcategories: null, sort_order: 2, is_active: true },
    { category: "Cloud", items: null, subcategories: [{ name: "Azure", items: ["Data Factory", "Functions", "App Services", "Service Bus", "Blob Storage", "Key Vaults", "DevOps (CI/CD)"] }, { name: "AWS", items: ["S3", "Lambda", "Kinesis Firehose", "ECR", "CodePipeline", "DynamoDB", "API Gateway", "CloudWatch", "Amplify"] }, { name: "GCP", items: ["BigQuery", "Google Kubernetes Engine", "Compute Engine", "Cloud Storage", "App Engine"] }], sort_order: 4, is_active: true },
    { category: "Databases", items: ["SQL Server", "PostgreSQL", "DynamoDB", "BigQuery"], subcategories: null, sort_order: 3, is_active: true },
    { category: "Data Engineering", items: ["Apache Kafka", "PySpark", "Apache Airflow", "Delta Lake", "Apache Spark Structured Streaming"], subcategories: null, sort_order: 5, is_active: true },
    { category: "Frameworks & Tools", items: ["Angular", "Next.js", "Docker", "Git", "GitHub", "Databricks", "Celery", "Qdrant"], subcategories: null, sort_order: 6, is_active: true },
    { category: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks"], subcategories: null, sort_order: 7, is_active: true },
  ];
  for (const s of items) await put("Skill", s);
  console.log("✅ Skills seeded");
}

// ── Educations ─────────────────────────────────────────────────────────────────
async function seedEducations() {
  const items = [
    { institution: "Shah and Anchor Kutchhi Engineering College, University of Mumbai", degree: "Bachelor of Engineering", field: "Computer Engineering", grade: "CGPA: 8.9", start_year: "2019", end_year: "2023", sort_order: 1, is_active: true },
    { institution: "R.K.T College of Arts, Commerce & Science", degree: "HSC", field: "PCM with Information Technology", grade: "76.46%", start_year: "2017", end_year: "2019", sort_order: 2, is_active: true },
    { institution: "Carmel Convent High School", degree: "SSC", field: null, grade: "87.0%", start_year: "2015", end_year: "2017", sort_order: 3, is_active: true },
  ];
  for (const e of items) await put("Education", e);
  console.log("✅ Educations seeded");
}

// ── Certifications ─────────────────────────────────────────────────────────────
async function seedCertifications() {
  const items = [
    { name: "AWS Solutions Architect Associate", issuer: "Amazon Web Services", year: "2021", logo_url: null, sort_order: 1, is_active: true },
    { name: "Microsoft Azure Administrator Associate", issuer: "Microsoft", year: "2023", logo_url: null, sort_order: 2, is_active: true },
    { name: "Microsoft Azure Data Scientist Associate", issuer: "Microsoft", year: "2023", logo_url: null, sort_order: 3, is_active: true },
    { name: "Microsoft Fabric Data Engineer Associate", issuer: "Microsoft", year: "2024", logo_url: null, sort_order: 4, is_active: true },
    { name: "Google Cloud Generative AI Leader", issuer: "Google Cloud", year: "2024", logo_url: null, sort_order: 5, is_active: true },
    { name: "Oracle Cloud Certified Generative AI Professional", issuer: "Oracle", year: "2024", logo_url: null, sort_order: 6, is_active: true },
  ];
  for (const c of items) await put("Certification", c);
  console.log("✅ Certifications seeded");
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱 Seeding DynamoDB tables directly...\n");
  await seedProfile();
  await seedExperiences();
  await seedInternships();
  await seedProjects();
  await seedSkills();
  await seedEducations();
  await seedCertifications();
  console.log("\n🎉 All tables seeded successfully!");
}

main().catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); });

import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Experience
  app.get(api.experiences.list.path, async (req, res) => {
    const data = await storage.getExperiences();
    res.json(data);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const data = await storage.getSkills();
    res.json(data);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    console.log("Seeding database with resume data...");
    
    // Skills
    const skillList = [
      { name: "Python", category: "Languages" },
      { name: "C#", category: "Languages" },
      { name: "Angular", category: "Frameworks" },
      { name: ".Net Core", category: "Frameworks" },
      { name: "Apache Kafka", category: "Data Engineering" },
      { name: "Apache Spark", category: "Data Engineering" },
      { name: "Delta Lake", category: "Data Engineering" },
      { name: "PySpark", category: "Data Engineering" },
      { name: "Apache Airflow", category: "Data Engineering" },
      { name: "BigQuery", category: "Data Engineering" },
      { name: "Git", category: "Tools" },
      { name: "GitHub", category: "Tools" },
    ];
    for (const skill of skillList) {
      await storage.createSkill(skill);
    }

    // Experiences
    await storage.createExperience({
      title: "Software Engineer",
      company: "Indus Valley Partners",
      period: "September 2025 - Present",
      description: "Engineered and supported scalable FinTech applications using .NET Core, C, SQL, and Angular, enabling 32B Euro AUM tracking across 6,000+ issuers and 15,000 assets with improved system efficiency."
    });
    
    await storage.createExperience({
      title: "Associate Software Engineer",
      company: "Indus Valley Partners",
      period: "July 2023 - September 2025",
      description: "Designed investment data tools and automated workflows for 500+ portfolio companies. Implemented Azure-based data solutions using WebApps, Data Factories, Service Bus, Blob Storage, and Azure Functions. Created data pipelines and interactive AG Grid dashboards."
    });

    // Projects
    await storage.createProject({
      title: "Event-Driven Data Pipeline for Music Streaming Analytics",
      description: "Designed and engineered a real-time music streaming data pipeline using Apache Kafka, Spark Streaming, and Google Cloud Platform. Automated data transformation using dbt to build dimensional models in BigQuery.",
      technologies: ["Kafka", "Spark", "dbt", "BigQuery", "Airflow", "Terraform", "Docker"],
      link: "https://github.com/Harshith-Shetty"
    });

    await storage.createProject({
      title: "Real-Time Stock Reporting and Analysis System",
      description: "Built a real-time data ingestion system using AWS Kinesis and Databricks Structured Streaming. Designed a Medallion Architecture (Bronze–Silver–Gold) using Delta Lake with ACID guarantees.",
      technologies: ["AWS Kinesis", "Databricks", "PySpark", "Azure Data Factory", "Delta Lake", "Power BI"],
      link: "https://github.com/Harshith-Shetty"
    });
    
    console.log("Seeding complete.");
  }
}

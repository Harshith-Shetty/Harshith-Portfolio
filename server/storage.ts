import { db } from "./db";
import {
  experiences, projects, skills, messages,
  type Experience, type InsertExperience,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type InsertMessage, type Message
} from "@shared/schema";

export interface IStorage {
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Seed methods
  createExperience(exp: InsertExperience): Promise<Experience>;
  createProject(proj: InsertProject): Promise<Project>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class DatabaseStorage implements IStorage {
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.id); // Simple ordering
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async createExperience(exp: InsertExperience): Promise<Experience> {
    const [newExp] = await db.insert(experiences).values(exp).returning();
    return newExp;
  }

  async createProject(proj: InsertProject): Promise<Project> {
    const [newProj] = await db.insert(projects).values(proj).returning();
    return newProj;
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }
}

export const storage = new DatabaseStorage();

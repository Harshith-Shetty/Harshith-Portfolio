import { z } from "zod";

// === SHARED DATA SHAPES ===

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  link: z.string().url().optional().nullable(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
});

export const messageSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  createdAt: z.string().optional(),
});

// === INPUT SCHEMAS ===

export const insertExperienceSchema = experienceSchema.omit({ id: true });
export const insertProjectSchema = projectSchema.omit({ id: true });
export const insertSkillSchema = skillSchema.omit({ id: true });
export const insertMessageSchema = messageSchema.omit({ id: true, createdAt: true });

// === TYPES ===

export type Experience = z.infer<typeof experienceSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Skill = z.infer<typeof skillSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Message = z.infer<typeof messageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

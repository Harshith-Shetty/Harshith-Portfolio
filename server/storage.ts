import { z } from "zod";
import { amplifyGraphQLRequest } from "./amplify";
import {
  experienceSchema,
  projectSchema,
  skillSchema,
  messageSchema,
  type Experience,
  type InsertExperience,
  type Project,
  type InsertProject,
  type Skill,
  type InsertSkill,
  type InsertMessage,
  type Message,
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

const LIST_EXPERIENCES = `
  query ListExperiences {
    listExperiences {
      items {
        id
        title
        company
        period
        description
      }
    }
  }
`;

const LIST_PROJECTS = `
  query ListProjects {
    listProjects {
      items {
        id
        title
        description
        technologies
        link
      }
    }
  }
`;

const LIST_SKILLS = `
  query ListSkills {
    listSkills {
      items {
        id
        name
        category
      }
    }
  }
`;

const CREATE_MESSAGE = `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      name
      email
      message
      createdAt
    }
  }
`;

const CREATE_EXPERIENCE = `
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      id
      title
      company
      period
      description
    }
  }
`;

const CREATE_PROJECT = `
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      technologies
      link
    }
  }
`;

const CREATE_SKILL = `
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      id
      name
      category
    }
  }
`;

type ItemsResponse<T> = { items?: T[] | null };

function parseList<T>(
  schema: z.ZodType<T>,
  items?: unknown[] | null,
): T[] {
  return z.array(schema).parse(items ?? []);
}

export class AmplifyDataStorage implements IStorage {
  async getExperiences(): Promise<Experience[]> {
    const data = await amplifyGraphQLRequest<{
      listExperiences?: ItemsResponse<unknown>;
    }>(LIST_EXPERIENCES);

    return parseList(experienceSchema, data.listExperiences?.items);
  }

  async getProjects(): Promise<Project[]> {
    const data = await amplifyGraphQLRequest<{
      listProjects?: ItemsResponse<unknown>;
    }>(LIST_PROJECTS);

    return parseList(projectSchema, data.listProjects?.items);
  }

  async getSkills(): Promise<Skill[]> {
    const data = await amplifyGraphQLRequest<{
      listSkills?: ItemsResponse<unknown>;
    }>(LIST_SKILLS);

    return parseList(skillSchema, data.listSkills?.items);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const data = await amplifyGraphQLRequest<{
      createMessage: unknown;
    }>(CREATE_MESSAGE, { input: message });

    return messageSchema.parse(data.createMessage);
  }

  async createExperience(exp: InsertExperience): Promise<Experience> {
    const data = await amplifyGraphQLRequest<{
      createExperience: unknown;
    }>(CREATE_EXPERIENCE, { input: exp });

    return experienceSchema.parse(data.createExperience);
  }

  async createProject(proj: InsertProject): Promise<Project> {
    const data = await amplifyGraphQLRequest<{
      createProject: unknown;
    }>(CREATE_PROJECT, { input: proj });

    return projectSchema.parse(data.createProject);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const data = await amplifyGraphQLRequest<{
      createSkill: unknown;
    }>(CREATE_SKILL, { input: skill });

    return skillSchema.parse(data.createSkill);
  }
}

export const storage = new AmplifyDataStorage();

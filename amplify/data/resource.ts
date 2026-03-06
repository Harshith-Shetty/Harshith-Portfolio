import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  /**
   * Singleton profile record — name, title, summary, social links.
   */
  Profile: a
    .model({
      name: a.string().required(),
      title: a.string().required(),
      tagline: a.string(),
      summary: a.string().required(),
      email: a.string().required(),
      github: a.string(),
      linkedin: a.string(),
      location: a.string(),
      /** S3 public URL or /public path to the profile photo */
      photo_url: a.string(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),

  /**
   * Work experience entries — shown in reverse-chronological order via sort_order.
   */
  Experience: a
    .model({
      company: a.string().required(),
      role: a.string().required(),
      start_date: a.string().required(),
      end_date: a.string(), // null = "Present"
      location: a.string(),
      bullets: a.string().array(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),

  /**
   * Personal + professional projects with tech stack badges and links.
   */
  Project: a
    .model({
      name: a.string().required(),
      description: a.string().required(),
      tech_stack: a.string().array(),
      github_url: a.string(),
      demo_url: a.string(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),

  /**
   * A named sub-group within a skill category.
   * E.g. within "Cloud": { name: "Azure", items: ["Data Factory", ...] }
   */
  SkillSubcategory: a.customType({
    name: a.string().required(),
    items: a.string().array(),
  }),

  /**
   * Skills grouped by category (Languages, Backend, Cloud, etc.).
   *
   * - `items`          → flat skill pills shown directly under the category header.
   *                       Leave null/empty if the category only uses subcategories.
   * - `subcategories`  → named sub-groups each with their own items list.
   *                       Leave null/empty if the category has no sub-groups.
   *
   * Example — flat:
   *   { category: "Languages", items: ["Python", "TypeScript", ...] }
   *
   * Example — subcategorised only:
   *   { category: "Cloud", subcategories: [
   *       { name: "Azure", items: ["Data Factory", "Service Bus", ...] },
   *       { name: "AWS",   items: ["Lambda", "S3", "Kinesis", ...] },
   *       { name: "GCP",   items: ["BigQuery", "GKE", ...] },
   *     ]}
   *
   * Example — mixed (top-level items + subcategories):
   *   { category: "Frameworks", items: ["Docker"],
   *     subcategories: [{ name: "Frontend", items: ["Angular", "Next.js"] }] }
   */
  Skill: a
    .model({
      category: a.string().required(),
      items: a.string().array(),
      subcategories: a.ref("SkillSubcategory").array(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),


  /**
   * Education history.
   */
  Education: a
    .model({
      institution: a.string().required(),
      degree: a.string(),
      field: a.string(),
      grade: a.string(),
      start_year: a.string(),
      end_year: a.string(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),

  /**
   * Professional certifications.
   */
  Certification: a
    .model({
      name: a.string().required(),
      issuer: a.string().required(),
      year: a.string(),
      /**
       * S3 public URL of the certification badge image.
       * Upload via: Amplify Console → Storage → public/logos/<cert-name>.png
       * Leave null to show a styled placeholder until the image is uploaded.
       */
      logo_url: a.string(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),

  /**
   * Internship entries (separate from full-time experience).
   */
  Internship: a
    .model({
      company: a.string().required(),
      role: a.string().required(),
      start_date: a.string().required(),
      end_date: a.string(),
      bullets: a.string().array(),
      sort_order: a.integer().required(),
      is_active: a.boolean().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});

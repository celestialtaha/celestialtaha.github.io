import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    rtl: z.boolean(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

const research = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    articleNumber: z.string().optional(),
    arxiv: z.string().optional(),
    publicationDate: z.coerce.date(),
    kind: z.enum(["journal", "conference", "preprint"]),
    status: z.enum(["published", "preprint"]),
    summary: z.string(),
    doi: z.string().optional(),
    featured: z.number().optional(),
    revised: z.string().optional(),
    verifiedAt: z.string(),
    versions: z
      .array(
        z.object({
          title: z.string(),
          year: z.number(),
          url: z.string().url(),
        }),
      )
      .default([]),
    authors: z.array(z.string()),
    link: z.string().url(),
    pdf: z.string().url().optional(),
    openAccess: z.string().url().optional(),
    code: z.string().optional(),
    demo: z.string().optional(),
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    logo: z.string().optional(),
    skills: z.array(z.string()).optional(),
    website: z.string().optional(),
  }),
});

export const collections = { blog, projects, research, work };

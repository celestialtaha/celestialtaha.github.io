import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
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
    journal: z.string(),
    publicationDate: z.union([z.coerce.date(), z.string()]),
    authors: z.array(z.string()),
    link: z.string(),
    paperId: z.string().optional(),
    pdf: z.string().optional(),
    code: z.string().optional(),
    demo: z.string().optional(),
    Content: z.string().optional(),
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

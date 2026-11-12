import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    project: z.string().regex(/^[a-z0-9-]+$/),
    locale: z.enum(['es', 'en']),
    title: z.string().min(2),
    summary: z.string().min(40),
    role: z.string().min(2),
    period: z.string().min(4),
    status: z.string().min(2),
    order: z.number().int().positive(),
    featured: z.boolean().default(false),
    stack: z.array(z.string().min(1)).min(1),
    highlights: z.array(z.string().min(8)).min(2).max(6),
    links: z
      .array(
        z.object({
          label: z.string().min(2),
          href: z.url(),
          kind: z.enum(['live', 'source']),
        }),
      )
      .default([]),
  }),
})

export const collections = { projects }

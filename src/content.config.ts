import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string().min(1).max(90),
    // Required, and length-bounded: a missing or throwaway description
    // produces a bad search result and a bad RSS entry, and neither failure
    // is visible from inside the site.
    description: z.string().min(20).max(200),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays };

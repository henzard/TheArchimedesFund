import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1).max(90),
        // Required, and length-bounded: a missing or throwaway description
        // produces a bad search result and a bad RSS entry, and neither failure
        // is visible from inside the site.
        description: z.string().min(20).max(200),
        date: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        // Hero image is optional so essays without one keep building.
        // The image() helper routes it through Astro's build optimiser
        // (resizing, modern formats) rather than serving it raw.
        hero: image().optional(),
        heroAlt: z.string().min(10).max(160).optional(),
        heroCredit: z.string().min(5).max(120).optional(),
      })
      .superRefine((data, ctx) => {
        // A hero image without alt text or attribution is an accessibility
        // and licensing defect, not a style nit — fail the build on it.
        if (data.hero && !data.heroAlt) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'heroAlt is required when hero is set',
            path: ['heroAlt'],
          });
        }
        if (data.hero && !data.heroCredit) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'heroCredit is required when hero is set',
            path: ['heroCredit'],
          });
        }
      }),
});

export const collections = { essays };

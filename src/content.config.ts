import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { projectSchema, postSchema } from './lib/schema';

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  devlog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
    schema: postSchema,
  }),
  about: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/about' }),
    schema: z.object({ title: z.string(), heading: z.string() }).strict(),
  }),
};

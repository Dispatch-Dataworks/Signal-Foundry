import { z } from 'zod';

export const statuses = [
  'Concept',
  'Prototype',
  'Playable Demo',
  'Early Access',
  'Released',
  'Archived',
] as const;
export const developmentStates = [
  'Active Development',
  'On Hold',
  'Maintenance',
  'Inactive',
] as const;
const text = z.string().trim().min(1);
const slug = text.regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'Use a lowercase URL slug',
);
const externalUrl = z
  .string()
  .url()
  .refine(
    (value) => ['https:', 'http:'].includes(new URL(value).protocol),
    'Actions must use an HTTP(S) URL',
  );
const localPath = text.regex(
  /^\/assets\/[a-zA-Z0-9/_-]+\.(?:svg|png|jpe?g|webp|avif)$/,
  'Use a local /assets/ image path',
);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, 'Invalid calendar date');
const image = z.object({ src: localPath, alt: text }).strict();
const seo = z
  .object({
    title: text.optional(),
    description: text.optional(),
    image: localPath.optional(),
  })
  .strict()
  .optional();
const requirements = z
  .object({
    os: text.optional(),
    cpu: text.optional(),
    ram: text.optional(),
    gpu: text.optional(),
    storage: text.optional(),
    input: text.optional(),
    network: text.optional(),
    notes: text.optional(),
  })
  .strict()
  .refine(
    (value) => Object.keys(value).length > 0,
    'Supply at least one requirement',
  );
const strings = z.array(text).default([]);

export const projectSchema = z
  .object({
    title: text,
    slug,
    excerpt: text.max(300),
    collection: z.enum(['games', 'workshop']),
    status: z.enum(statuses),
    developmentState: z.enum(developmentStates).optional(),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false),
    order: z.number().int().nonnegative().optional(),
    bench: z.boolean().default(true),
    tags: strings,
    genres: strings,
    platforms: strings,
    audience: text.optional(),
    contentGuidance: text.optional(),
    hero: image.optional(),
    card: image.optional(),
    displayDate: text.optional(),
    sortDate: date.optional(),
    updated: date.optional(),
    version: text.optional(),
    developer: text.optional(),
    engine: text.optional(),
    technologies: strings,
    actions: z
      .array(
        z
          .object({
            label: text,
            url: externalUrl,
            kind: z
              .enum(['play', 'demo', 'website', 'store', 'github'])
              .default('website'),
            priority: z.number().int().nonnegative().default(10),
          })
          .strict(),
      )
      .default([]),
    gallery: z
      .array(
        z
          .object({
            src: localPath,
            alt: text,
            caption: text.optional(),
            type: z
              .enum(['screenshot', 'concept', 'artwork'])
              .default('screenshot'),
            order: z.number().int().nonnegative().default(0),
          })
          .strict(),
      )
      .default([]),
    youtube: z
      .object({
        id: text.regex(
          /^[a-zA-Z0-9_-]{11}$/,
          'Use an 11-character YouTube video ID',
        ),
        title: text,
        poster: image,
      })
      .strict()
      .optional(),
    requirements: z
      .object({
        minimum: requirements.optional(),
        recommended: requirements.optional(),
      })
      .strict()
      .refine((value) => Object.keys(value).length > 0)
      .optional(),
    milestones: z
      .array(
        z
          .object({
            category: z.enum([
              'Completed',
              'Current',
              'Planned',
              'Someday / Exploring',
            ]),
            title: text,
            description: text.optional(),
            date: text.optional(),
          })
          .strict(),
      )
      .default([]),
    relatedProjects: z.array(slug).default([]),
    seo,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.collection === 'games' &&
      ['Concept', 'Prototype'].includes(value.status)
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['collection'],
        message: 'Unplayable concepts/prototypes belong in workshop',
      });
    }
  });

export const postSchema = z
  .object({
    title: text,
    slug,
    published: date,
    updated: date.optional(),
    draft: z.boolean().default(false),
    excerpt: text.max(300),
    hero: image.optional(),
    projects: z.array(slug).default([]),
    tags: strings,
    seo,
  })
  .strict();

export type Project = z.infer<typeof projectSchema>;
export type Post = z.infer<typeof postSchema>;
export type Entry<T> = { id: string; data: T; body?: string };

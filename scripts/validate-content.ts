import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { projectSchema, postSchema } from '../src/lib/schema.ts';
import type { Entry, Project, Post } from '../src/lib/schema.ts';
import { validateReferences } from '../src/lib/content.ts';
import { site } from '../src/config.ts';

const errors: string[] = [];
async function load<T>(
  folder: string,
  schema: { parse: (value: unknown) => T },
): Promise<Entry<T>[]> {
  const directory = path.resolve(`src/content/${folder}`);
  const entries: Entry<T>[] = [];
  for (const filename of await readdir(directory)) {
    if (!filename.endsWith('.md')) continue;
    try {
      const source = await readFile(path.join(directory, filename), 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      if (!match) throw new Error('Missing YAML frontmatter');
      entries.push({
        id: filename.slice(0, -3),
        data: schema.parse(parse(match[1])),
      });
    } catch (error) {
      errors.push(`${folder}/${filename}: ${String(error)}`);
    }
  }
  return entries;
}
const projects = await load<Project>('projects', projectSchema);
const posts = await load<Post>('devlog', postSchema);
errors.push(...validateReferences(projects, posts));
for (const slug of site.featuredProjects) {
  if (!projects.some((entry) => entry.data.slug === slug))
    errors.push(`config: unknown featured project "${slug}"`);
}
const assets = new Set<string>([site.defaultSocialImage]);
for (const { data } of [...projects, ...posts]) {
  for (const image of [data.hero, data.seo?.image]) {
    if (image) assets.add(typeof image === 'string' ? image : image.src);
  }
  if ('gallery' in data) {
    if (data.card) assets.add(data.card.src);
    data.gallery.forEach((image) => assets.add(image.src));
    if (data.youtube) assets.add(data.youtube.poster.src);
  }
}
for (const asset of assets) {
  try {
    await access(path.resolve(`public${asset}`));
  } catch {
    errors.push(`Missing local media: ${asset}`);
  }
}
if (
  site.analytics.measurementId &&
  !/^G-[A-Z0-9]{4,20}$/.test(site.analytics.measurementId)
) {
  errors.push('config: invalid GA4 measurement ID');
}
if (errors.length) {
  console.error(`Content validation failed:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else
  console.log(
    `Validated ${projects.length} projects, ${posts.length} posts, references, configuration and local assets.`,
  );

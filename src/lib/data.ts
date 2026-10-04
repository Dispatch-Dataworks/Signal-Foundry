import { getCollection } from 'astro:content';
import { sortPosts, sortProjects, validateReferences } from './content';
import { site } from '../config';

export async function getSiteContent() {
  const projects = await getCollection('projects');
  const allPosts = await getCollection('devlog');
  const errors = validateReferences(projects, allPosts);
  for (const slug of site.featuredProjects) {
    if (!projects.some((entry) => entry.data.slug === slug))
      errors.push(`Unknown featured project "${slug}"`);
  }
  if (errors.length)
    throw new Error(`Content validation failed:\n${errors.join('\n')}`);
  return { projects: sortProjects(projects), posts: sortPosts(allPosts) };
}

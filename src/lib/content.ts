import type { Entry, Project, Post } from './schema.ts';

export function isPublished(post: Post, now = new Date()) {
  return !post.draft && new Date(`${post.published}T00:00:00Z`) <= now;
}

export function sortProjects<T extends Entry<Project>>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const editorial =
      Number(b.data.pinned || b.data.featured) -
      Number(a.data.pinned || a.data.featured);
    return (
      editorial ||
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      (b.data.updated ?? b.data.sortDate ?? '').localeCompare(
        a.data.updated ?? a.data.sortDate ?? '',
      ) ||
      a.data.title.localeCompare(b.data.title)
    );
  });
}

export function sortPosts<T extends Entry<Post>>(
  entries: T[],
  now = new Date(),
): T[] {
  return entries
    .filter((entry) => isPublished(entry.data, now))
    .sort(
      (a, b) =>
        b.data.published.localeCompare(a.data.published) ||
        a.data.title.localeCompare(b.data.title),
    );
}

export function benchEligible(project: Project) {
  return (
    project.bench &&
    project.status !== 'Archived' &&
    project.developmentState === 'Active Development'
  );
}

export function relatedProjects<T extends Entry<Project>>(
  project: Project,
  entries: T[],
  limit = 3,
): T[] {
  const score = (other: Project) => {
    const explicit = project.relatedProjects.indexOf(other.slug);
    if (explicit >= 0) return 1000 - explicit;
    return (
      other.tags.filter((tag) => project.tags.includes(tag)).length * 3 +
      other.genres.filter((genre) => project.genres.includes(genre)).length * 2
    );
  };
  return sortProjects(entries)
    .filter(
      (entry) =>
        entry.data.slug !== project.slug &&
        (entry.data.status !== 'Archived' ||
          project.relatedProjects.includes(entry.data.slug)) &&
        score(entry.data) > 0,
    )
    .sort((a, b) => score(b.data) - score(a.data))
    .slice(0, limit);
}

export function validateReferences(
  projects: Entry<Project>[],
  posts: Entry<Post>[],
) {
  const errors: string[] = [];
  for (const [name, entries] of [
    ['projects', projects],
    ['devlog', posts],
  ] as const) {
    const seen = new Set<string>();
    for (const entry of entries) {
      if (seen.has(entry.data.slug))
        errors.push(`${name}: duplicate slug "${entry.data.slug}"`);
      seen.add(entry.data.slug);
      if (entry.id !== entry.data.slug)
        errors.push(
          `${name}/${entry.id}: filename must match slug "${entry.data.slug}"`,
        );
    }
  }
  const slugs = new Set(projects.map((entry) => entry.data.slug));
  for (const entry of [...projects, ...posts]) {
    const refs =
      'relatedProjects' in entry.data
        ? entry.data.relatedProjects
        : entry.data.projects;
    for (const ref of refs) {
      if (!slugs.has(ref))
        errors.push(`${entry.id}: unknown related project "${ref}"`);
      if ('relatedProjects' in entry.data && ref === entry.data.slug)
        errors.push(`${entry.id}: cannot relate a project to itself`);
    }
  }
  return errors;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { projectSchema, postSchema } from '../src/lib/schema.ts';
import {
  benchEligible,
  isPublished,
  relatedProjects,
  sortPosts,
  sortProjects,
  validateReferences,
} from '../src/lib/content.ts';
import { benchIndex } from '../src/lib/bench.ts';

const project = (slug: string, extra = {}) => ({
  id: slug,
  data: projectSchema.parse({
    slug,
    title: slug,
    excerpt: 'A project.',
    collection: 'games',
    status: 'Playable Demo',
    developmentState: 'Active Development',
    ...extra,
  }),
});
const post = (slug: string, extra = {}) => ({
  id: slug,
  data: postSchema.parse({
    title: slug,
    slug,
    excerpt: 'A post.',
    published: '2026-01-01',
    ...extra,
  }),
});

test('one file graduates from workshop while retaining all metadata and URL slug', () => {
  const idea = project('idea', {
    collection: 'workshop',
    status: 'Concept',
    tags: ['logic'],
    milestones: [{ category: 'Planned', title: 'Demo' }],
  });
  const game = projectSchema.parse({
    ...idea.data,
    collection: 'games',
    status: 'Playable Demo',
  });
  assert.equal(game.slug, idea.data.slug);
  assert.deepEqual(game.milestones, idea.data.milestones);
  assert.deepEqual(game.tags, idea.data.tags);
  assert.throws(() => project('idea', { status: 'Concept' }));
});

test('schema rejects malformed enums, URLs, gallery, dates and milestones', () => {
  for (const extra of [
    { collection: 'other' },
    { status: 'Shipping' },
    { developmentState: 'Busy' },
    { actions: [{ label: 'Bad', url: 'javascript:alert(1)' }] },
    { gallery: [{ src: 'https://example.com/image.jpg', alt: '' }] },
    { milestones: [{ category: '50%', title: 'Progress' }] },
    { updated: '2026-02-30' },
    { requirements: { minimum: {} } },
  ])
    assert.throws(() => project('test', extra));
  assert.throws(() => projectSchema.parse({ title: 'Missing' }));
  assert.doesNotThrow(() =>
    project('test', {
      displayDate: 'Someday, perhaps',
      status: 'Playable Demo',
      developmentState: 'On Hold',
    }),
  );
  assert.equal(
    projectSchema.parse({
      title: 'Known release',
      slug: 'known-release',
      excerpt: 'A released game with no confirmed development state.',
      collection: 'games',
      status: 'Released',
    }).developmentState,
    undefined,
  );
});

test('editorial ordering then update then title; input is not mutated', () => {
  const entries = [
    project('b', { updated: '2026-02-01' }),
    project('a', { updated: '2026-02-01' }),
    project('pinned', { pinned: true, order: 0 }),
    project('older', { featured: true, order: 1 }),
  ];
  assert.deepEqual(
    sortProjects(entries).map((entry) => entry.id),
    ['pinned', 'older', 'a', 'b'],
  );
  assert.equal(entries[0].id, 'b');
});

test('publication gate excludes drafts and future posts everywhere', () => {
  const now = new Date('2026-10-04T12:00:00Z');
  const entries = [
    post('published'),
    post('today', { published: '2026-10-04' }),
    post('future', { published: '2099-01-01' }),
    post('draft', { draft: true }),
  ];
  assert.equal(isPublished(entries[2].data, now), false);
  assert.equal(isPublished(entries[3].data, now), false);
  assert.deepEqual(
    sortPosts(entries, now).map((entry) => entry.id),
    ['today', 'published'],
  );
});

test('bench includes active Games and Workshop only; empty and single are safe', () => {
  assert.equal(benchEligible(project('active').data), true);
  assert.equal(
    benchEligible(
      project('concept', { collection: 'workshop', status: 'Concept' }).data,
    ),
    true,
  );
  for (const extra of [
    { status: 'Archived' },
    { bench: false },
    { developmentState: 'On Hold' },
    { developmentState: undefined },
  ]) {
    assert.equal(benchEligible(project('no', extra).data), false);
  }
  assert.equal(benchIndex(0), -1);
  assert.equal(benchIndex(1), 0);
  assert.equal(
    benchIndex(3, () => 0.9),
    2,
  );
});

test('explicit related projects outrank similarity; never self or inferred archive', () => {
  const base = project('base', {
    tags: ['logic'],
    relatedProjects: ['explicit'],
  });
  const entries = [
    base,
    project('similar', { tags: ['logic'] }),
    project('explicit'),
    project('archive', { status: 'Archived', tags: ['logic'] }),
    project('unrelated'),
  ];
  assert.deepEqual(
    relatedProjects(base.data, entries).map((entry) => entry.id),
    ['explicit', 'similar'],
  );
  const curated = { ...base.data, relatedProjects: ['archive', 'explicit'] };
  assert.deepEqual(
    relatedProjects(curated, entries).map((entry) => entry.id),
    ['archive', 'explicit', 'similar'],
  );
});

test('reference validation catches duplicates, filename mismatch, self and missing references including drafts', () => {
  const entries = [
    project('one', { relatedProjects: ['one', 'missing'] }),
    { ...project('one'), id: 'duplicate' },
  ];
  const errors = validateReferences(entries, [
    post('draft', { draft: true, projects: ['missing'] }),
  ]);
  assert.ok(errors.some((error) => error.includes('duplicate slug')));
  assert.ok(errors.some((error) => error.includes('filename')));
  assert.ok(errors.some((error) => error.includes('itself')));
  assert.ok(errors.some((error) => error.includes('draft: unknown')));
});

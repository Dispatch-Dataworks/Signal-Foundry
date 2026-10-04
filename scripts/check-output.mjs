import { readdir, readFile, access, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { isPublished } from '../src/lib/content.ts';

const root = path.resolve('dist');
async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(location)));
    else files.push(location);
  }
  return files;
}
const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const errors = [];
const ids = new Map();
const html = new Map();
for (const file of htmlFiles) {
  const text = await readFile(file, 'utf8');
  html.set(file, text);
  ids.set(
    file,
    new Set(Array.from(text.matchAll(/\bid="([^"]+)"/g), (match) => match[1])),
  );
}
for (const [file, text] of html) {
  const relative = path.relative(root, file);
  if (!/<html[^>]+lang="en"/.test(text))
    errors.push(`${relative}: missing language`);
  if (!/<title>[^<]+<\/title>/.test(text))
    errors.push(`${relative}: missing title`);
  if (!/name="description"[^>]+content="[^"]+"/.test(text))
    errors.push(`${relative}: missing description`);
  if (!/rel="canonical"/.test(text))
    errors.push(`${relative}: missing canonical`);
  if (/<script[^>]+src="https:\/\/www\.googletagmanager\.com/.test(text))
    errors.push(`${relative}: analytics must not load before consent`);
  if (/<iframe[^>]+src="https:\/\/(?:www\.)?youtube/.test(text))
    errors.push(`${relative}: YouTube must be click-to-load`);
  if (/serviceWorker\.register/.test(text))
    errors.push(`${relative}: unexpected service worker`);
  const references = [
    ...Array.from(
      text.matchAll(/\b(?:href|src)="([^"]+)"/g),
      (match) => match[1],
    ),
    ...Array.from(text.matchAll(/\bsrcset="([^"]+)"/g)).flatMap((match) =>
      match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]),
    ),
  ];
  for (const reference of references) {
    const raw = reference.replaceAll('&amp;', '&');
    if (/^(?:[a-z]+:|\/\/)/i.test(raw) || raw === '') continue;
    const pageUrl = `https://signalfoundry.games/${relative === 'index.html' ? '' : relative.replace(/index\.html$/, '')}`;
    const url = new URL(raw, pageUrl);
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, 'index.html');
      await access(target);
      if (
        url.hash &&
        target.endsWith('.html') &&
        !ids.get(target)?.has(decodeURIComponent(url.hash.slice(1)))
      ) {
        errors.push(`${relative}: missing anchor ${raw}`);
      }
    } catch {
      errors.push(`${relative}: missing local target ${raw}`);
    }
  }
}
for (const filename of await readdir('src/content/devlog')) {
  if (!filename.endsWith('.md')) continue;
  const source = await readFile(
    path.join('src/content/devlog', filename),
    'utf8',
  );
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;
  const post = parse(match[1]);
  if (isPublished(post)) continue;
  const url = `/devlog/${post.slug}/`;
  for (const [file, text] of html) {
    if (text.includes(url))
      errors.push(
        `${path.relative(root, file)}: unpublished post leaked: ${url}`,
      );
  }
  if (
    files.some(
      (file) => file === path.join(root, 'devlog', post.slug, 'index.html'),
    )
  )
    errors.push(`Unpublished post emitted: ${url}`);
  if ((await readFile(path.join(root, 'sitemap.xml'), 'utf8')).includes(url))
    errors.push(`Sitemap leaks unpublished post: ${url}`);
}
for (const required of ['CNAME', 'robots.txt', 'sitemap.xml', '404.html']) {
  try {
    await access(path.join(root, required));
  } catch {
    errors.push(`Missing deployment output: ${required}`);
  }
}
if (errors.length) {
  console.error(`Static output validation failed:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else
  console.log(
    `Validated ${htmlFiles.length} HTML pages: local links, assets, metadata, privacy gates and publication visibility.`,
  );

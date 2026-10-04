import type { APIRoute } from 'astro';
import { getSiteContent } from '../lib/data';
import { site } from '../config';

export const GET: APIRoute = async () => {
  const { projects, posts } = await getSiteContent();
  const pages = [
    ...['/', '/games/', '/workshop/', '/devlog/', '/privacy/'].map((path) => ({ path, updated: undefined as string | undefined })),
    ...projects.map((entry) => ({ path: `/projects/${entry.data.slug}/`, updated: entry.data.updated })),
    ...posts.map((entry) => ({ path: `/devlog/${entry.data.slug}/`, updated: entry.data.updated ?? entry.data.published })),
  ];
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page) => `<url><loc>${escape(new URL(page.path, site.url).href)}</loc>${page.updated ? `<lastmod>${escape(page.updated)}</lastmod>` : ''}</url>`).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

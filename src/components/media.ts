import type { Project } from '../lib/schema';

const assets = import.meta.glob(
  '../../public/assets/**/*.{svg,png,jpg,jpeg,webp,avif}',
  { eager: true, query: '?url', import: 'default' },
);

export function assetExists(src: string) {
  return Object.hasOwn(assets, `../../public${src}`);
}

export function projectImage(project: Project, card = false) {
  const candidates = [
    ...(card ? [project.card, project.hero] : [project.hero, project.card]),
    {
      src: `/assets/projects/${project.slug}/cover.svg`,
      alt: `${project.title} project artwork`,
    },
  ];
  return candidates.find((image) => image && assetExists(image.src));
}

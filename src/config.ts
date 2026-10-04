export const site = {
  title: 'Signal Foundry Games',
  tagline: 'Games we want to play. Built for people who think like we do.',
  description:
    'Intelligent, engaging games, playable experiments, and ideas still on the bench. We make the games we want to play.',
  url: 'https://signalfoundry.games',
  email: 'hello@signalfoundry.games',
  parent: {
    name: 'Dispatch Dataworks LLC',
    url: 'https://dispatchdataworks.com/',
    relationship: 'A division of',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Games', href: '/games/' },
    { label: 'The Workshop', href: '/workshop/' },
    { label: 'Devlog', href: '/devlog/' },
  ],
  socials: [] as { label: string; href: string }[],
  analytics: { enabled: true, measurementId: '' },
  defaultSocialImage: '/assets/brand/social.png',
  branding: {
    logo: '',
    badge: '/assets/brand/built-at-signal-foundry.svg',
  },
  featuredProjects: ['far-haul', 'wordweave', '911-simulator'],
  features: { bench: true },
  footer: {
    note: 'We make the games we want to play.',
    feedbackLabel: 'General feedback',
  },
} as const;

export function feedbackHref(subject = 'Signal Foundry — General Feedback') {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

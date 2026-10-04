export type Consent = 'accepted' | 'declined';
export const consentKey = 'signal-foundry-consent';

export function parseConsent(value: string | null): Consent | null {
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function validMeasurementId(value: string) {
  return /^G-[A-Z0-9]{4,20}$/.test(value);
}

export const analyticsEvents = {
  play: 'play_game',
  demo: 'try_demo',
  website: 'project_website',
  store: 'storefront_click',
  github: 'github_click',
  feedback: 'feedback',
} as const;

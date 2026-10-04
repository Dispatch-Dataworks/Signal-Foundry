import {
  consentKey,
  parseConsent,
  validMeasurementId,
  analyticsEvents,
} from '../lib/consent';
import type { Consent } from '../lib/consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const id =
  document.querySelector<HTMLMetaElement>('meta[name="ga-id"]')?.content ?? '';
const configured = validMeasurementId(id);
const panel = document.querySelector<HTMLElement>('[data-consent]');
let choice: Consent | null = null;
let loaded = false;
try {
  choice = parseConsent(localStorage.getItem(consentKey));
} catch {
  /* Storage is optional. */
}

function announce() {
  const status = document.querySelector('[data-consent-status]');
  if (status)
    status.textContent = !configured
      ? 'Analytics is not configured. No analytics is loaded.'
      : choice === 'accepted'
        ? 'Optional analytics accepted.'
        : choice === 'declined'
          ? 'Optional analytics declined.'
          : 'Optional analytics is off until you accept.';
}

function loadAnalytics() {
  if (!configured || choice !== 'accepted' || loaded) return;
  loaded = true;
  Reflect.set(window, `ga-disable-${id}`, false);
  window.dataLayer = [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params -- GA's command queue uses Arguments objects.
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.async = true;
  script.id = 'foundry-analytics';
  document.head.append(script);
}

function revokeAnalytics() {
  if (!configured) return;
  Reflect.set(window, `ga-disable-${id}`, true);
  if (!loaded) return;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  document.getElementById('foundry-analytics')?.remove();
  window.gtag = undefined;
  window.dataLayer = [];
  loaded = false;
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) continue;
    const domains = ['', location.hostname, `.${location.hostname}`];
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`;
    }
  }
}

let opener: HTMLElement | null = null;
function closePanel() {
  if (panel) panel.hidden = true;
  opener?.focus();
}
function setChoice(next: Consent) {
  choice = next;
  try {
    localStorage.setItem(consentKey, next);
  } catch {
    /* Site works without storage. */
  }
  if (next === 'accepted') loadAnalytics();
  else revokeAnalytics();
  announce();
  closePanel();
}
document
  .querySelector('[data-consent-accept]')
  ?.addEventListener('click', () => setChoice('accepted'));
document
  .querySelector('[data-consent-decline]')
  ?.addEventListener('click', () => setChoice('declined'));
document
  .querySelector('[data-consent-close]')
  ?.addEventListener('click', closePanel);
document
  .querySelectorAll<HTMLElement>('[data-privacy-settings]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      opener = button;
      if (panel) {
        panel.hidden = false;
        panel.querySelector<HTMLButtonElement>('button')?.focus();
      }
    });
  });
panel?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePanel();
});
window.addEventListener('storage', (event) => {
  if (event.key !== consentKey) return;
  choice = parseConsent(event.newValue);
  if (choice === 'accepted') loadAnalytics();
  else revokeAnalytics();
  announce();
});
document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>(
    'a[data-track]',
  );
  if (!configured || choice !== 'accepted' || !link || !loaded) return;
  const kind = link.dataset.track as keyof typeof analyticsEvents;
  const name = analyticsEvents[kind];
  if (name)
    window.gtag?.('event', name, {
      project: link.dataset.project ?? 'studio',
      transport_type: 'beacon',
    });
});
if (configured && choice === null && panel) panel.hidden = false;
loadAnalytics();
announce();

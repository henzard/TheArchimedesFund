// Site-wide constants and small rules shared across pages (RSS feed, the
// writing index, essay pages, ...). Kept in one module so these can't drift
// apart the way per-file copies did — see the code review that added this
// file for the concrete duplication it replaced.

export const SITE_TITLE = 'Henzard Kruger';

export const SITE_DESCRIPTION =
  'Essays on AI, agentic systems, enterprise transformation and systems thinking.';

// Matches astro.config.mjs `site`. Kept here too so non-Astro-page code
// (structured data, feeds) that needs an absolute origin has one source of
// truth instead of a second hard-coded string.
export const SITE_URL = 'https://henzard.co.za';

// Henzard's real, sourced identity links. Used in Person JSON-LD - never
// extend this with an employer, job title or credential that isn't sourced.
export const AUTHOR_NAME = 'Henzard Kruger';
export const AUTHOR_SAME_AS = ['https://github.com/henzard'];

// Resolves a site-relative path (or an already-absolute URL) against
// SITE_URL, for places that need a fully-qualified URL: og:image,
// JSON-LD, llms.txt. `site` is accepted as a param (rather than always
// reading SITE_URL) so callers can pass Astro.site and stay consistent
// with whatever origin Astro itself resolved canonical URLs against.
export function absoluteUrl(pathOrUrl, site = SITE_URL) {
  return new URL(pathOrUrl, site).href;
}

// A Person JSON-LD fragment for Henzard, reused wherever a page needs an
// `author`. Deliberately minimal: name, url, sameAs only - see the "never
// invent proof" rule in CLAUDE.md. No jobTitle, worksFor, award or
// alumniOf, and no knowsAbout beyond what's asserted per-page.
export function personJsonLd(site = SITE_URL) {
  return {
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: absoluteUrl('/', site),
    sameAs: AUTHOR_SAME_AS,
  };
}

// Newest-first, matching how both the writing index and the RSS feed
// present essays.
export function sortByDateDesc(a, b) {
  return b.data.date.getTime() - a.data.date.getTime();
}

// The published URL for an essay's own page. `essay.id` is the loader's
// content-collection id, which already doubles as the route's [...slug]
// param (see src/pages/writing/[...slug].astro).
export function essayUrl(essay) {
  return `/writing/${essay.id}/`;
}

// Buttondown username for the email-capture form's embed-subscribe
// endpoint. Null until Henzard confirms a Buttondown account exists under
// this name — the host was unreachable to verify at build time, and
// shipping a form that posts to a non-existent endpoint is worse than
// shipping no form. Setting this to the confirmed username is the only
// change needed to switch capture on; see src/components/EmailCapture.astro.
// Newsletter capture posts to Henzard's own personal-os server rather than
// a third-party newsletter provider, so the list lives on infrastructure he
// controls. A plain form post is a navigation, not a fetch, so this needs no
// JavaScript and no CORS. The server replies with a 303 back to /subscribed/.
//
// Swapping to a hosted provider later is a one-line change here.
export const SUBSCRIBE_ENDPOINT =
  'https://personal-os-production-b126.up.railway.app/subscribe';

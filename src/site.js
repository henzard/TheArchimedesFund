// Site-wide constants and small rules shared across pages (RSS feed, the
// writing index, essay pages, ...). Kept in one module so these can't drift
// apart the way per-file copies did — see the code review that added this
// file for the concrete duplication it replaced.

export const SITE_TITLE = 'Henzard Kruger';

export const SITE_DESCRIPTION =
  'Essays on AI, agentic systems, enterprise transformation and systems thinking.';

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
export const BUTTONDOWN_USER = null;

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

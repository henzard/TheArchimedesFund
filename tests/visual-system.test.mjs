import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const html = (p) => readFileSync(join(DIST, p), 'utf8');
const PAGES = ['index.html', '404.html', 'writing/index.html', 'writing/hello-world/index.html'];

test('every page renders through the shared layout', () => {
  for (const p of PAGES) {
    const doc = html(p);
    assert.match(doc, /class="skip-link"/, `${p} is missing the skip link`);
    assert.match(doc, /<nav aria-label="Primary"/, `${p} is missing primary nav`);
    assert.match(doc, /rel="alternate"[^>]*application\/rss\+xml/, `${p} is missing RSS autodiscovery`);
  }
});

test('the approved accent and fonts are actually used', () => {
  // Astro inlines small stylesheets into the HTML instead of emitting a
  // file (inlineStylesheets: 'auto'), so looking only in dist/_astro would
  // throw or silently find nothing. Gather BOTH.
  const cssFiles = readdirSync(DIST, { recursive: true })
    .filter((f) => String(f).endsWith('.css'))
    .map((f) => readFileSync(join(DIST, String(f)), 'utf8'));
  const css = [...cssFiles, ...PAGES.map(html)].join('\n');
  assert.match(css, /#0e7490/i, 'approved teal accent missing from built CSS');
  assert.match(css, /Inter/, 'Inter missing from built CSS');
  assert.match(css, /JetBrains Mono/, 'JetBrains Mono missing from built CSS');
  assert.match(css, /prefers-reduced-motion/, 'no reduced-motion guard in built CSS');
});

test('no third-party font or asset host is referenced', () => {
  for (const p of PAGES) {
    const doc = html(p);
    assert.doesNotMatch(doc, /fonts\.googleapis\.com|fonts\.gstatic\.com/i,
      `${p} loads an external font host`);
  }
});

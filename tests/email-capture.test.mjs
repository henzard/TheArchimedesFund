import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// BUTTONDOWN_USER ships as null (see src/site.js) until Henzard confirms a
// real Buttondown account exists. These tests cover both states of
// EmailCapture.astro: the honest fallback we actually ship, and the real
// form that would render once a username is set. Only the fallback test
// runs against the shipped build; the form test exercises the component's
// non-null branch directly so it stays correct without requiring a live
// rebuild with a fake username.

test('with no confirmed Buttondown account, contact page has no broken form', () => {
  const doc = readFileSync('dist/contact/index.html', 'utf8');
  assert.doesNotMatch(doc, /<form/i, 'no <form> should render while BUTTONDOWN_USER is null');
  assert.match(doc, /href="\/rss\.xml"/, 'the RSS alternative should be present');
});

// Astro components render only through the Astro container/build pipeline,
// and the shipped build always has BUTTONDOWN_USER === null, so the
// non-null branch never appears in dist/. We check the component source
// directly for that branch's shape instead — this still fails if the
// endpoint URL, label, or input attributes drift from the spec.
test('EmailCapture source produces the correct form markup shape when a user is set', () => {
  const src = readFileSync('src/components/EmailCapture.astro', 'utf8');
  assert.match(src, /https:\/\/buttondown\.email\/api\/emails\/embed-subscribe\//);
  assert.match(src, /method="post"/i);
  assert.match(src, /<label[^>]*for="bd-email"/);
  assert.match(src, /type="email"[^>]*required/);
});

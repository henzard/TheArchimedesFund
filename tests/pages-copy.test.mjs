import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const PAGES = ['dist/about/index.html', 'dist/contact/index.html', 'dist/work/index.html'];

// Unsourced-claim vocabulary. Anything here means someone invented proof.
const FORBIDDEN = [
  'picahoo', 'years of experience', 'award-winning', 'certified',
  'keynote', 'spoke at', 'podcast', 'featured in', 'as seen in',
  'clients include', 'trusted by', 'testimonial',
];

test('no page carries an unsourced claim', () => {
  for (const path of PAGES) {
    const doc = readFileSync(path, 'utf8').toLowerCase();
    for (const term of FORBIDDEN) {
      assert.ok(!doc.includes(term), `${path} contains unsourced claim: "${term}"`);
    }
  }
});

test('contact invites speaking without implying a speaking history', () => {
  const doc = readFileSync('dist/contact/index.html', 'utf8');
  assert.match(doc, /speak/i, 'contact should invite speaking');
  assert.doesNotMatch(doc, /previous talks|past talks|speaking history/i);
});

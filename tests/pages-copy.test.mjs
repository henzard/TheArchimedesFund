import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const PAGES = ['dist/about/index.html', 'dist/contact/index.html', 'dist/work/index.html'];

// Unsourced-claim vocabulary. Anything here means someone invented proof.
const FORBIDDEN = [
  'years of experience', 'award-winning', 'certified',
  'keynote', 'spoke at', 'podcast', 'featured in', 'as seen in',
  'clients include', 'trusted by', 'testimonial',
];

// Employment is deliberately unstated on this site: the old site claimed an
// employer that was never confirmed. The guard has to match that CLAIM, not
// the bare company name - one of the owner's own public repositories is
// called PIcahoo-Communicator, and the Work page lists it straight from the
// GitHub API. A real repository of his is sourced proof; a sentence saying
// he works there is the fabrication. Match the sentence.
const EMPLOYER_CLAIM = /\b(?:at|for|with)\s+picahoo\b|\bpicahoo\s+(?:employee|team|engineer)\b|\bwork(?:s|ed|ing)?\s+(?:at|for)\s+picahoo\b/i;

test('no page carries an unsourced claim', () => {
  for (const path of PAGES) {
    const doc = readFileSync(path, 'utf8').toLowerCase();
    for (const term of FORBIDDEN) {
      assert.ok(!doc.includes(term), `${path} contains unsourced claim: "${term}"`);
    }
  }
});

// Only authored prose. The Work page's text comes straight from the GitHub
// API - repository names and descriptions the owner wrote years ago, in
// another context - so it is sourced data, not a claim this site is making.
// One of his repositories is literally described as "communicate with
// picahoo communicator". Guarding that would be guarding the wrong thing.
const AUTHORED_PAGES = ['dist/about/index.html', 'dist/contact/index.html'];

test('no authored page claims an employer', () => {
  for (const path of AUTHORED_PAGES) {
    const doc = readFileSync(path, 'utf8');
    assert.doesNotMatch(doc, EMPLOYER_CLAIM, `${path} states an unconfirmed employer`);
  }
});

test('contact invites speaking without implying a speaking history', () => {
  const doc = readFileSync('dist/contact/index.html', 'utf8');
  assert.match(doc, /speak/i, 'contact should invite speaking');
  assert.doesNotMatch(doc, /previous talks|past talks|speaking history/i);
});

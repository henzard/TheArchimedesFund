import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = () => readFileSync('dist/index.html', 'utf8');

test('the hero makes the approved specific claim', () => {
  assert.match(home(), /Strategy that survives contact with reality/);
});

test('home never implies speaking history or an employer', () => {
  const doc = home().toLowerCase();
  for (const banned of ['keynote', 'spoke at', 'as seen', 'podcast', 'featured in', 'picahoo']) {
    assert.ok(!doc.includes(banned), `home implies unsourced proof: "${banned}"`);
  }
});

test('home degrades to a sentence, not an empty list, with zero essays', () => {
  assert.match(home(), /writing/i);
});

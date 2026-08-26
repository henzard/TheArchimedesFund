import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintText } from '../scripts/lint-prose.mjs';

test('flags hype vocabulary', () => {
  const issues = lintText('We leverage AI to unlock value.');
  const terms = issues.map((i) => i.term);
  assert.ok(terms.includes('leverage'), 'expected "leverage" to be flagged');
  assert.ok(terms.includes('unlock'), 'expected "unlock" to be flagged');
});

test('reports the line number', () => {
  const issues = lintText('fine line\nanother fine line\nwe delve into it');
  assert.equal(issues.length, 1);
  assert.equal(issues[0].line, 3);
});

test('flags the "not just X, it is Y" construction', () => {
  const issues = lintText("It's not just a tool, it's a platform.");
  assert.ok(issues.some((i) => i.term === 'not-just-construction'));
});

test('flags a run of one-sentence paragraphs', () => {
  const text = 'One thought.\n\nAnother thought.\n\nA third thought.\n\nA fourth.';
  assert.ok(lintText(text).some((i) => i.term === 'paragraph-spam'));
});

test('an inline override silences a flag on that line', () => {
  const issues = lintText('We leverage the API. <!-- prose-lint-ignore: leverage -->');
  assert.equal(issues.length, 0);
});

test('clean prose produces no issues', () => {
  const text = 'Most transformation work fails in the handover.\nThe plan is fine; the operating model is not.';
  assert.deepEqual(lintText(text), []);
});

test('matching is case-insensitive but respects word boundaries', () => {
  assert.ok(lintText('Leverage this').length === 1);
  // "unlocked" is a normal English word — substring matching would flag it
  assert.deepEqual(lintText('He unlocked the door'), []);
});

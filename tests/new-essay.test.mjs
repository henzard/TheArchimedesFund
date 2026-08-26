import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, frontMatter } from '../scripts/new-essay.mjs';

test('slugify lowercases and hyphenates', () => {
  assert.equal(slugify('Hello, World'), 'hello-world');
});

test('slugify strips punctuation and collapses separators', () => {
  assert.equal(slugify('AI  &  Agentic --- Systems!'), 'ai-agentic-systems');
});

test('slugify trims leading and trailing separators', () => {
  assert.equal(slugify('  --Systems Thinking--  '), 'systems-thinking');
});

test('frontMatter emits a draft with an ISO date', () => {
  const fm = frontMatter('Hello, World', new Date('2026-08-26T10:00:00Z'));
  assert.match(fm, /^---\n/);
  assert.match(fm, /title: "Hello, World"/);
  assert.match(fm, /date: 2026-08-26/);
  assert.match(fm, /draft: true/);
});

test('frontMatter description satisfies the schema minimum of 20 characters', () => {
  const fm = frontMatter('Hello, World', new Date('2026-08-26T10:00:00Z'));
  const description = /description: "([^"]*)"/.exec(fm)?.[1] ?? '';
  assert.ok(description.length >= 20, `description too short for the schema: "${description}"`);
});

test('frontMatter escapes double quotes in the title', () => {
  const fm = frontMatter('The "hard" part', new Date('2026-08-26T10:00:00Z'));
  assert.match(fm, /title: "The \\"hard\\" part"/);
});

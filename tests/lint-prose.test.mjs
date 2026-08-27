import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
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

test('flags an inflected form: "delves" (stemmed term)', () => {
  const issues = lintText('This essay delves into the problem.');
  assert.ok(issues.some((i) => i.term === 'delve'), 'expected "delve" to be flagged for "delves"');
});

test('flags an inflected form: "leveraging" (stemmed term)', () => {
  const issues = lintText('We are leveraging AI across the org.');
  assert.ok(issues.some((i) => i.term === 'leverage'), 'expected "leverage" to be flagged for "leveraging"');
});

test('flags an inflected form: "seamlessly" (stemmed term)', () => {
  const issues = lintText('The system was seamlessly integrated.');
  assert.ok(issues.some((i) => i.term === 'seamless'), 'expected "seamless" to be flagged for "seamlessly"');
});

test('regression guard: "unlocked" still does not flag', () => {
  assert.deepEqual(lintText('He unlocked the door'), []);
});

test('inline override suppresses an inflected hit: "delving"', () => {
  const issues = lintText('We are delving into it. <!-- prose-lint-ignore: delve -->');
  assert.equal(issues.length, 0);
});

test('the CLI linter catches banned phrasing in a nested subdirectory, matching the content loader\'s recursive **/*.md pattern', () => {
  const essaysDir = path.join('src', 'content', 'essays');
  const nestedDir = path.join(essaysDir, '2026');
  const nestedFile = path.join(nestedDir, 'nested-lint-test-fixture.md');

  try {
    fs.mkdirSync(nestedDir, { recursive: true });
    fs.writeFileSync(
      nestedFile,
      '---\ntitle: "Nested fixture"\ndescription: "A throwaway fixture for the recursive lint test."\ndate: 2026-08-26\n---\n\nWe leverage this to unlock synergy and revolutionize a seamless, cutting-edge, world-class paradigm shift.\n',
      'utf8',
    );

    const result = spawnSync(process.execPath, ['scripts/lint-prose.mjs'], { encoding: 'utf8' });

    assert.notEqual(result.status, 0, `expected the linter to fail on a banned term in a nested essay, got exit ${result.status}. stdout: ${result.stdout} stderr: ${result.stderr}`);
    assert.match(result.stderr, /nested-lint-test-fixture\.md/, 'expected the linter to report the nested fixture file');
  } finally {
    fs.rmSync(nestedFile, { force: true });
    fs.rmSync(nestedDir, { recursive: true, force: true });
  }
});

// A code block containing a blank line used to split into several chunks that
// each held no sentence, so the paragraph-spam counter mistook real technical
// writing for LinkedIn cadence. It fired on a genuine C++ example. The fix
// must hold in BOTH directions, so both are asserted here.
test('a code block with blank lines is not mistaken for paragraph spam', () => {
  const text = [
    'Here is the shape of that loop, compressed to its essentials:',
    '',
    '```cpp',
    'void loop() {',
    '  read_sensor_window(buffer, WINDOW_SIZE);',
    '',
    '  float score = model_infer(buffer);',
    '',
    '  if (score > THRESHOLD) {',
    '    wake_radio();',
    '  }',
    '}',
    '```',
    '',
    'The radio is the expensive part, so it stays asleep.',
  ].join('\n');
  const issues = lintText(text).filter((i) => i.term === 'paragraph-spam');
  assert.equal(issues.length, 0, 'code block was counted as prose paragraphs');
});

test('genuine one-sentence paragraph spam is still caught', () => {
  const text = [
    'This opening paragraph has two sentences. That resets the run.',
    '',
    'Growth is a mindset.',
    '',
    'Most people never try.',
    '',
    'The ones who do, win.',
    '',
    'That is the whole secret.',
  ].join('\n');
  const issues = lintText(text).filter((i) => i.term === 'paragraph-spam');
  assert.equal(issues.length, 1, 'paragraph spam is no longer detected');
});

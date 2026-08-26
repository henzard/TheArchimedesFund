import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('published essay is rendered to its own URL', () => {
  const page = 'dist/writing/hello-world/index.html';
  assert.ok(fs.existsSync(page), `expected ${page} to exist — run \`npm run build\` first`);
  const html = fs.readFileSync(page, 'utf8');
  assert.match(html, /Hello, world/);
});

test('writing index lists the essay', () => {
  const html = fs.readFileSync('dist/writing/index.html', 'utf8');
  assert.match(html, /href="\/writing\/hello-world\/?"/);
});

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function slugify(title) {
  return String(title)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function frontMatter(title, date) {
  const escaped = String(title).replace(/"/g, '\\"');
  const day = date.toISOString().slice(0, 10);
  return [
    '---',
    `title: "${escaped}"`,
    // Must satisfy the collection schema's 20-character minimum, or a
    // scaffolded draft breaks `npm run build` immediately. Obviously
    // placeholder text so it cannot be shipped by accident.
    'description: "One sentence on what this essay argues - replace before publishing."',
    `date: ${day}`,
    'tags: []',
    // New essays start as drafts on purpose: publishing should be a
    // deliberate edit, never the side effect of creating a file.
    'draft: true',
    '---',
    '',
  ].join('\n');
}

function main() {
  const title = process.argv.slice(2).join(' ').trim();
  if (!title) {
    console.error('Usage: npm run new "Essay title"');
    process.exit(1);
  }
  const slug = slugify(title);
  if (!slug) {
    console.error(`Title "${title}" produces an empty slug — use some letters or numbers.`);
    process.exit(1);
  }
  const file = path.join('src', 'content', 'essays', `${slug}.md`);
  if (fs.existsSync(file)) {
    console.error(`${file} already exists — pick another title or edit that file.`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, frontMatter(title, new Date()));
  console.log(`Created ${file}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Seeded from brand/BRAND.md's avoid-list. The point is not prohibition:
// each term can be overridden inline. The point is that generic phrasing
// becomes a decision instead of a default.
const BANNED = [
  'leverage', 'unlock', 'delve', 'game-changer', 'game changer',
  'seamless', 'cutting-edge', 'revolutionize', 'revolutionise',
  'supercharge', 'harness the power', 'in today\'s fast-paced world',
  'at the end of the day', 'moving forward', 'synergy', 'paradigm shift',
  'best-in-class', 'world-class', 'transformative journey', 'deep dive',
];

const NOT_JUST = /\bnot just\b[^.!?]*?,\s*(it'?s|they'?re|but)\b/i;

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function lintText(text) {
  const lines = String(text).split(/\r?\n/);
  const issues = [];

  lines.forEach((line, index) => {
    const ignored = new Set(
      [...line.matchAll(/<!--\s*prose-lint-ignore:\s*([^>]+?)\s*-->/g)]
        .flatMap((m) => m[1].split(',').map((t) => t.trim().toLowerCase())),
    );
    if (ignored.has('all')) return;

    for (const term of BANNED) {
      if (ignored.has(term)) continue;
      const re = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i');
      if (re.test(line)) {
        issues.push({ line: index + 1, term, message: `banned phrasing: "${term}"` });
      }
    }
    if (!ignored.has('not-just-construction') && NOT_JUST.test(line)) {
      issues.push({
        line: index + 1,
        term: 'not-just-construction',
        message: 'the "not just X, it\'s Y" construction',
      });
    }
  });

  // Four or more consecutive single-sentence paragraphs reads as LinkedIn
  // cadence rather than an argument.
  const paragraphs = String(text).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  let run = 0;
  for (const p of paragraphs) {
    const sentences = p.split(/[.!?](\s|$)/).filter((s) => s && s.trim().length > 1);
    run = sentences.length <= 1 ? run + 1 : 0;
    if (run >= 4) {
      issues.push({ line: 0, term: 'paragraph-spam', message: 'four or more one-sentence paragraphs in a row' });
      break;
    }
  }

  return issues;
}

function main() {
  const dir = path.join('src', 'content', 'essays');
  if (!fs.existsSync(dir)) return;
  let failed = false;
  for (const name of fs.readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const file = path.join(dir, name);
    const issues = lintText(fs.readFileSync(file, 'utf8'));
    for (const issue of issues) {
      failed = true;
      console.error(`${file}:${issue.line}  ${issue.message}`);
    }
  }
  if (failed) {
    console.error('\nProse lint failed. Rewrite, or add <!-- prose-lint-ignore: <term> --> on the line if the word is genuinely right.');
    process.exit(1);
  }
  console.log('Prose lint passed.');
}

// Windows produces `file:///C:/...` from import.meta.url while process.argv[1]
// is a plain path, so string-comparing them never matches. Compare resolved
// filesystem paths instead: run directly, do nothing on import.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();

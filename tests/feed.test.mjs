import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('rss feed exists and contains the essay', () => {
  const xml = fs.readFileSync('dist/rss.xml', 'utf8');
  assert.match(xml, /<title><!\[CDATA\[Hello, world\]\]><\/title>|<title>Hello, world<\/title>/);
  assert.match(xml, /https:\/\/henzard\.co\.za\/writing\/hello-world\//);
});

test('rss feed declares the channel link and description', () => {
  const xml = fs.readFileSync('dist/rss.xml', 'utf8');
  assert.match(xml, /<link>https:\/\/henzard\.co\.za/);
  assert.match(xml, /<description>/);
});

test('sitemap is generated', () => {
  assert.ok(fs.existsSync('dist/sitemap-index.xml'), 'expected dist/sitemap-index.xml');
});

test('404 page is generated', () => {
  assert.ok(fs.existsSync('dist/404.html'), 'expected dist/404.html');
});

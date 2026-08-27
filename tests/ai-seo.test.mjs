import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

// Every essay page plus the site-level pages that should each carry
// exactly one non-empty <script type="application/ld+json"> block per
// JSON-LD entity, and valid, absolute, existing og:image markup.
const ESSAY_PAGES = [
  'dist/writing/design-taste/index.html',
  'dist/writing/esp32/index.html',
  'dist/writing/graph-engineering/index.html',
  'dist/writing/hello-world/index.html',
  'dist/writing/mentoring/index.html',
  'dist/writing/personal-assistant/index.html',
  'dist/writing/programmer-ai-world/index.html',
  'dist/writing/prompting/index.html',
  'dist/writing/railway-mcp/index.html',
  'dist/writing/vibe-coders/index.html',
  'dist/writing/voice-ai/index.html',
];
const ALL_PAGES = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/contact/index.html',
  'dist/work/index.html',
  'dist/writing/index.html',
  ...ESSAY_PAGES,
];

function jsonLdBlocks(html) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return matches.map((m) => JSON.parse(m[1]));
}

function ogImage(html) {
  const m = html.match(/<meta property="og:image" content="([^"]*)"/);
  return m ? m[1] : null;
}

test('robots.txt exists, allows the named AI crawlers, and points at the sitemap', () => {
  const doc = readFileSync('dist/robots.txt', 'utf8');
  assert.match(doc, /User-agent: \*[\s\S]*?Allow: \//);
  for (const bot of [
    'GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot',
    'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent', 'Bytespider',
  ]) {
    const re = new RegExp(`User-agent: ${bot}\\s*\\n\\s*Allow: /`);
    assert.match(doc, re, `robots.txt should Allow ${bot}`);
    assert.doesNotMatch(doc, new RegExp(`User-agent: ${bot}\\s*\\n\\s*Disallow`), `robots.txt must not block ${bot}`);
  }
  assert.match(doc, /Sitemap: https:\/\/henzard\.co\.za\/sitemap-index\.xml/);
});

test('llms.txt exists, describes the author, and links the essays and feeds', () => {
  assert.ok(existsSync('dist/llms.txt'), 'expected dist/llms.txt');
  const doc = readFileSync('dist/llms.txt', 'utf8');
  assert.match(doc, /^# Henzard Kruger/);
  assert.match(doc, /github\.com\/henzard/);
  assert.match(doc, /\[Prompting Is Specification, Not Incantation\]\(https:\/\/henzard\.co\.za\/writing\/prompting\/\)/);
  assert.match(doc, /\[RSS feed\]\(https:\/\/henzard\.co\.za\/rss\.xml\)/);
  assert.match(doc, /\[Sitemap\]\(https:\/\/henzard\.co\.za\/sitemap-index\.xml\)/);
});

test('every page emits at least one well-formed JSON-LD block', () => {
  for (const path of ALL_PAGES) {
    const html = readFileSync(path, 'utf8');
    const blocks = jsonLdBlocks(html);
    assert.ok(blocks.length > 0, `${path} has no application/ld+json block`);
    for (const block of blocks) {
      assert.equal(block['@context'], 'https://schema.org', `${path} JSON-LD missing @context`);
      assert.ok(typeof block['@type'] === 'string' && block['@type'].length > 0, `${path} JSON-LD missing @type`);
    }
  }
});

test('home page carries WebSite and Person JSON-LD, with no invented employer or credential', () => {
  const blocks = jsonLdBlocks(readFileSync('dist/index.html', 'utf8'));
  const website = blocks.find((b) => b['@type'] === 'WebSite');
  const person = blocks.find((b) => b['@type'] === 'Person');
  assert.ok(website, 'home page missing WebSite JSON-LD');
  assert.ok(person, 'home page missing Person JSON-LD');
  assert.equal(person.name, 'Henzard Kruger');
  assert.deepEqual(person.sameAs, ['https://github.com/henzard']);
  for (const banned of ['jobTitle', 'worksFor', 'award', 'alumniOf', 'knowsAbout']) {
    assert.ok(!(banned in person), `Person JSON-LD must not carry an invented "${banned}"`);
  }
});

test('every essay page carries BlogPosting and BreadcrumbList JSON-LD with the required fields', () => {
  for (const path of ESSAY_PAGES) {
    const blocks = jsonLdBlocks(readFileSync(path, 'utf8'));
    const post = blocks.find((b) => b['@type'] === 'BlogPosting');
    const breadcrumbs = blocks.find((b) => b['@type'] === 'BreadcrumbList');
    assert.ok(post, `${path} missing BlogPosting JSON-LD`);
    assert.ok(breadcrumbs, `${path} missing BreadcrumbList JSON-LD`);
    for (const field of ['headline', 'description', 'datePublished', 'author', 'image', 'mainEntityOfPage']) {
      assert.ok(post[field], `${path} BlogPosting missing "${field}"`);
    }
    assert.equal(post.author['@type'], 'Person');
    assert.ok(Array.isArray(breadcrumbs.itemListElement) && breadcrumbs.itemListElement.length >= 2);
  }
});

test('og:image and twitter:image are absolute URLs whose target actually exists in dist/', () => {
  for (const path of ALL_PAGES) {
    const html = readFileSync(path, 'utf8');
    const image = ogImage(html);
    assert.ok(image, `${path} missing og:image`);
    assert.match(image, /^https:\/\/henzard\.co\.za\//, `${path} og:image is not absolute: ${image}`);
    assert.match(html, /<meta name="twitter:image" content="[^"]*"/, `${path} missing twitter:image`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/, `${path} missing twitter:card`);

    const localPath = 'dist' + new URL(image).pathname;
    assert.ok(existsSync(localPath), `${path} og:image target does not exist on disk: ${localPath}`);
  }
});

test('essay pages use their own hero as og:image; pages without a hero use the site default', () => {
  const heroPage = readFileSync('dist/writing/prompting/index.html', 'utf8');
  assert.match(ogImage(heroPage), /\/_astro\/prompting\./, 'essay with a hero should use it as og:image');

  const noHeroPage = readFileSync('dist/writing/hello-world/index.html', 'utf8');
  assert.equal(ogImage(noHeroPage), 'https://henzard.co.za/og-default.jpg');
});

test('essay pages declare og:type article; other pages declare website', () => {
  const essay = readFileSync('dist/writing/prompting/index.html', 'utf8');
  assert.match(essay, /<meta property="og:type" content="article"/);
  const home = readFileSync('dist/index.html', 'utf8');
  assert.match(home, /<meta property="og:type" content="website"/);
});

test('the subscribe form markup carries an accessible-but-invisible honeypot and a source field', () => {
  const src = readFileSync('src/components/EmailCapture.astro', 'utf8');
  assert.match(src, /name="website"/, 'honeypot field must be named "website"');
  assert.doesNotMatch(src, /name="website"[^>]*type="hidden"|type="hidden"[^>]*name="website"/,
    'honeypot must not use type="hidden" - naive bots skip those');
  assert.match(src, /aria-hidden="true"[^>]*>\s*<label for="bd-website">|<div class="hp-field" aria-hidden="true">/);
  assert.match(src, /tabindex="-1"/);
  assert.match(src, /name="source"/, 'form should carry a source field naming the page it came from');
});

// Fetches the live repository list for the GitHub account and writes it as
// the committed snapshot used by src/data/github.mjs when the live API is
// unavailable or rate-limited at build time. Run this manually (or on a
// schedule) and commit the result — never hand-write snapshot entries.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USER = 'henzard';
const API = `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`;
const OUT = fileURLToPath(new URL('../src/data/github-snapshot.json', import.meta.url));

function shape(raw) {
  return {
    name: raw.name,
    description: raw.description ?? '',
    language: raw.language ?? '',
    stars: raw.stargazers_count ?? 0,
    url: raw.html_url,
    pushedAt: raw.pushed_at,
    fork: Boolean(raw.fork),
  };
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(API, {
    headers: {
      accept: 'application/vnd.github+json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('GitHub API returned no repositories; refusing to overwrite the snapshot.');
  }
  const shaped = json.map(shape);
  await writeFile(OUT, JSON.stringify(shaped, null, 2) + '\n');
  console.log(`Wrote ${shaped.length} repositories to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

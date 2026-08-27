import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRepos } from '../src/data/github.mjs';
import excluded from '../src/data/excluded-repos.json' with { type: 'json' };

test('falls back to the committed snapshot when the API is unavailable', async () => {
  const repos = await loadRepos({ fetchImpl: async () => { throw new Error('network down'); } });
  assert.ok(repos.length > 0, 'snapshot fallback produced nothing');
  assert.ok(repos.every((r) => r.name && r.url), 'snapshot entries are malformed');
});

test('fails loudly rather than shipping an empty proof section', async () => {
  await assert.rejects(
    () => loadRepos({
      fetchImpl: async () => { throw new Error('network down'); },
      snapshot: [],
    }),
    /no repository data/i,
  );
});

test('a rate-limit response falls back rather than returning an empty list', async () => {
  const repos = await loadRepos({
    fetchImpl: async () => ({ ok: false, status: 403, json: async () => ({}) }),
  });
  assert.ok(repos.length > 0, 'a 403 should fall back to the snapshot, not return []');
});

test('the exclusion mechanism actually removes a repository', async () => {
  const snapshot = [
    { name: 'Keep-Me', url: 'https://github.com/henzard/Keep-Me', pushedAt: '2026-01-02', fork: false },
    { name: 'Drop-Me', url: 'https://github.com/henzard/Drop-Me', pushedAt: '2026-01-01', fork: false },
  ];
  const repos = await loadRepos({
    fetchImpl: async () => { throw new Error('offline'); },
    snapshot,
    excludedNames: ['drop-me'],
  });
  const names = repos.map((r) => r.name);
  assert.deepEqual(names, ['Keep-Me'], 'exclusion did not remove the named repository');
});

test('the configured exclusions are absent from the real output', async () => {
  const repos = await loadRepos({ fetchImpl: async () => { throw new Error('offline'); } });
  const names = repos.map((r) => r.name.toLowerCase());
  for (const name of excluded) {
    assert.ok(
      !names.includes(name.toLowerCase()),
      `excluded repository "${name}" is still being rendered`,
    );
  }
});

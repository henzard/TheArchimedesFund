import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRepos } from '../src/data/github.mjs';

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

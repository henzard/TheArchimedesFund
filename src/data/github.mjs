import snapshotData from './github-snapshot.json' with { type: 'json' };

const USER = 'henzard';
const API = `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`;

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

/**
 * Repositories for the Work page.
 *
 * Live data is better, but an empty Work page that builds successfully is
 * the worst outcome: it looks deliberate and says nothing. So a failed or
 * rate-limited request falls back to the committed snapshot, and only the
 * total absence of both throws.
 */
export async function loadRepos({
  fetchImpl = fetch,
  snapshot = snapshotData,
  token = process.env.GITHUB_TOKEN,
} = {}) {
  let live = null;
  try {
    const res = await fetchImpl(API, {
      headers: {
        accept: 'application/vnd.github+json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) live = json.map(shape);
    } else {
      console.warn(`[github] API returned ${res.status}; using committed snapshot.`);
    }
  } catch (err) {
    console.warn(`[github] fetch failed (${err.message}); using committed snapshot.`);
  }

  const repos = (live ?? snapshot).filter((r) => !r.fork);
  if (repos.length === 0) {
    throw new Error('no repository data: the API gave nothing and the snapshot is empty');
  }
  return repos.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));
}

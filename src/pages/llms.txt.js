import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, sortByDateDesc, essayUrl, absoluteUrl, AUTHOR_SAME_AS } from '../site.js';

// llms.txt: the emerging plain-markdown convention for describing a site
// to AI systems (see https://llmstxt.org). Generated as a build-time route,
// like rss.xml.js, rather than a static file in public/ - a hand-maintained
// list of essays drifts the moment a new one is published, and a stale
// llms.txt is worse than none. The rendered output still lands at the
// expected /llms.txt URL.
export async function GET(context) {
  const site = context.site;
  const essays = (await getCollection('essays', ({ data }) => !data.draft)).sort(sortByDateDesc);

  const lines = [
    `# ${SITE_TITLE}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'Henzard Kruger writes about how AI, agentic systems and enterprise',
    'modernisation decisions hold up once they meet a real organisation: the',
    'architecture, operating models and engineering practice behind them,',
    'and the systems thinking that keeps trade-offs and dependencies',
    'legible rather than hidden behind reassurance. He is on GitHub at',
    `${AUTHOR_SAME_AS[0]}.`,
    '',
    '## About',
    '',
    `- [About](${absoluteUrl('/about/', site)}): who Henzard is and what he thinks about`,
    `- [Contact](${absoluteUrl('/contact/', site)}): how to get in touch or invite him to speak`,
    `- [Work](${absoluteUrl('/work/', site)}): selected public projects, described from their own READMEs`,
    '',
    '## Writing',
    '',
    `- [All essays](${absoluteUrl('/writing/', site)}): the full index, newest first`,
    ...essays.map(
      (essay) => `- [${essay.data.title}](${absoluteUrl(essayUrl(essay), site)}): ${essay.data.description}`
    ),
    '',
    '## Feeds',
    '',
    `- [RSS feed](${absoluteUrl('/rss.xml', site)})`,
    `- [Sitemap](${absoluteUrl('/sitemap-index.xml', site)})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

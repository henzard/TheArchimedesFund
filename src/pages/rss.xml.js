import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, sortByDateDesc, essayUrl } from '../site.js';

export async function GET(context) {
  const essays = (await getCollection('essays', ({ data }) => !data.draft))
    .sort(sortByDateDesc);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.description,
      pubDate: essay.data.date,
      link: essayUrl(essay),
    })),
  });
}

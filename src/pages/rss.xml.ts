import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all published content
  const [articles, thoughts, books] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('thoughts', ({ data }) => !data.draft),
    getCollection('bookshelf', ({ data }) => !data.draft)
  ]);

  // Combine and sort all content by publication date
  const allContent = [
    ...articles.map(item => ({
      ...item,
      type: 'article' as const,
      url: `/articles/${item.id}`,
    })),
    ...thoughts.map(item => ({
      ...item,
      type: 'thought' as const,
      url: `/thoughts/${item.id}`,
    })),
    ...books.map(item => ({
      ...item,
      type: 'book' as const,
      url: `/bookshelf/${item.id}`,
    }))
  ].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  return rss({
    title: 'blog',
    description: '개발, 독서, 일상의 작은 통찰들을 기록하는 개인 블로그',
    site: context.site!,
    items: allContent.map((item) => ({
      title: item.data.title,
      description: item.data.description || item.data.title,
      pubDate: item.data.publishedAt,
      link: item.url,
      categories: item.data.tags,
    })),
    customData: `<language>ko-kr</language>`,
  });
}

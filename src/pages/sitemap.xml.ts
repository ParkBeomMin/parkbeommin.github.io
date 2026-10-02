import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site!;
  const baseUrl = site.toString().replace(/\/$/, '');
  
  // Get all published content
  const [articles, thoughts, books] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('thoughts', ({ data }) => !data.draft),
    getCollection('bookshelf', ({ data }) => !data.draft)
  ]);

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: `${baseUrl}/articles/`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: `${baseUrl}/thoughts/`,
      changefreq: 'daily', 
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: `${baseUrl}/bookshelf/`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: `${baseUrl}/about/`,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString().split('T')[0]
    }
  ];

  // Dynamic content pages
  const contentPages = [
    ...articles.map(item => ({
      url: `${baseUrl}/articles/${item.id}/`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: (item.data.updatedAt || item.data.publishedAt).toISOString().split('T')[0]
    })),
    ...thoughts.map(item => ({
      url: `${baseUrl}/thoughts/${item.id}/`,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: (item.data.updatedAt || item.data.publishedAt).toISOString().split('T')[0]
    })),
    ...books.map(item => ({
      url: `${baseUrl}/bookshelf/${item.id}/`,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: (item.data.updatedAt || item.data.publishedAt).toISOString().split('T')[0]
    }))
  ];

  const allPages = [...staticPages, ...contentPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
import { getCollection, type CollectionEntry } from 'astro:content';

export type ArticleEntry = CollectionEntry<'articles'>;
export type ThoughtEntry = CollectionEntry<'thoughts'>;
export type BookEntry = CollectionEntry<'bookshelf'>;

// Get published articles sorted by date
export async function getPublishedArticles(): Promise<ArticleEntry[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

// Get published thoughts sorted by date
export async function getPublishedThoughts(): Promise<ThoughtEntry[]> {
  const thoughts = await getCollection('thoughts', ({ data }) => !data.draft);
  return thoughts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

// Get published books sorted by date
export async function getPublishedBooks(): Promise<BookEntry[]> {
  const books = await getCollection('bookshelf', ({ data }) => !data.draft);
  return books.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

// Get featured article
export async function getFeaturedArticle(): Promise<ArticleEntry | null> {
  const articles = await getPublishedArticles();
  return articles.find(article => article.data.featured) || null;
}

// Get latest articles excluding featured
export async function getLatestArticles(limit = 6): Promise<ArticleEntry[]> {
  const articles = await getPublishedArticles();
  const featured = await getFeaturedArticle();
  
  if (featured) {
    return articles.filter(article => article.id !== featured.id).slice(0, limit);
  }
  
  return articles.slice(0, limit);
}

// Format date for display
export function formatDate(date: Date, locale = 'ko-KR'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format date for schema/ISO
export function formatDateISO(date: Date): string {
  return date.toISOString();
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Extract excerpt from content
export function extractExcerpt(content: string, maxLength = 150): string {
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
    .replace(/`(.*?)`/g, '$1') // Remove inline code formatting
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();
    
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const [articles, thoughts, books] = await Promise.all([
    getPublishedArticles(),
    getPublishedThoughts(),
    getPublishedBooks()
  ]);
  
  const allTags = [
    ...articles.flatMap(item => item.data.tags),
    ...thoughts.flatMap(item => item.data.tags),
    ...books.flatMap(item => item.data.tags)
  ];
  
  return [...new Set(allTags)].sort();
}

// Get content by tag
export async function getContentByTag(tag: string) {
  const [articles, thoughts, books] = await Promise.all([
    getPublishedArticles(),
    getPublishedThoughts(),
    getPublishedBooks()
  ]);
  
  return {
    articles: articles.filter(item => item.data.tags.includes(tag)),
    thoughts: thoughts.filter(item => item.data.tags.includes(tag)),
    books: books.filter(item => item.data.tags.includes(tag))
  };
}

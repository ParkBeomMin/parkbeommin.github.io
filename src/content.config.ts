import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const articleCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    type: z.literal('article'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    readingTime: z.number().optional(),
  }),
});

const thoughtCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    type: z.literal('thought'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const bookCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bookshelf' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    type: z.literal('book'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    bookAuthor: z.string(),
    bookCover: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = {
  articles: articleCollection,
  thoughts: thoughtCollection,
  bookshelf: bookCollection,
};
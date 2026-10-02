import type { APIRoute } from 'astro';
import { getPublishedArticles, getPublishedThoughts, getPublishedBooks } from '../utils/content';

export const GET: APIRoute = async () => {
  try {
    const [articles, thoughts, books] = await Promise.all([
      getPublishedArticles(),
      getPublishedThoughts(),
      getPublishedBooks()
    ]);

    // 검색 인덱스 항목 타입
    interface SearchItem {
      id: string;
      title: string;
      description: string;
      content: string;
      type: 'article' | 'thought' | 'book';
      typeLabel: string;
      publishedAt: string;
      tags: string[];
      url: string;
      bookAuthor?: string;
    }

    const typeLabels = {
      article: '글',
      thought: '생각',
      book: '책'
    };

    const typeRoutes = {
      article: 'articles',
      thought: 'thoughts',
      book: 'bookshelf'
    };

    const searchItems: SearchItem[] = [];

    // Articles 처리
    for (const article of articles) {
      // 원본 body를 사용하여 컴팩트한 텍스트 생성
      const contentText = (article.body || '')
        .replace(/#+\s/g, '') // 마크다운 헤딩 제거
        .replace(/\*\*([^*]+)\*\*/g, '$1') // 볼드 제거
        .replace(/\*([^*]+)\*/g, '$1') // 이탤릭 제거
        .replace(/`([^`]+)`/g, '$1') // 인라인 코드 제거
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 링크 텍스트만 유지
        .replace(/\n{2,}/g, ' ') // 연속 줄바꿈을 공백으로
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 8000); // 컨텐츠 길이 제한

      searchItems.push({
        id: article.id,
        title: article.data.title,
        description: article.data.description || '',
        content: contentText,
        type: 'article',
        typeLabel: typeLabels.article,
        publishedAt: article.data.publishedAt.toISOString(),
        tags: article.data.tags,
        url: `/${typeRoutes.article}/${article.id}`,
      });
    }

    // Thoughts 처리
    for (const thought of thoughts) {
      const contentText = (thought.body || '')
        .replace(/#+\s/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n{2,}/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 8000);

      searchItems.push({
        id: thought.id,
        title: thought.data.title,
        description: thought.data.description || '',
        content: contentText,
        type: 'thought',
        typeLabel: typeLabels.thought,
        publishedAt: thought.data.publishedAt.toISOString(),
        tags: thought.data.tags,
        url: `/${typeRoutes.thought}/${thought.id}`,
      });
    }

    // Books 처리
    for (const book of books) {
      const contentText = (book.body || '')
        .replace(/#+\s/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n{2,}/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 8000);

      searchItems.push({
        id: book.id,
        title: book.data.title,
        description: book.data.description || '',
        content: contentText,
        type: 'book',
        typeLabel: typeLabels.book,
        publishedAt: book.data.publishedAt.toISOString(),
        tags: book.data.tags,
        url: `/${typeRoutes.book}/${book.id}`,
        bookAuthor: book.data.bookAuthor,
      });
    }

    // 날짜순 정렬 (최신순)
    searchItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return new Response(JSON.stringify(searchItems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Search index generation failed:', error);
    // 빌드시 실제 에러를 발생시켜 디버깅 가능하게 함
    throw error;
  }
};

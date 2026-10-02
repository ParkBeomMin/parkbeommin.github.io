/**
 * 문서의 썸네일을 추출하는 유틸리티
 * 1. frontmatter의 cover가 있으면 우선 사용
 * 2. 없으면 문서 본문에서 첫 번째 이미지 추출
 * 3. 둘 다 없으면 기본 플레이스홀더 반환
 */

export interface ThumbnailResult {
  src: string | null;
  alt: string;
  isPlaceholder: boolean;
}

interface ImageCandidate {
  src: string;
  alt: string;
  index: number;
}

/**
 * 문서 본문에서 첫 번째 안전한 이미지를 추출
 */
export function extractFirstImageFromContent(content: string): { src: string; alt: string } | null {
  if (!content) return null;

  const candidates: ImageCandidate[] = [];

  // 마크다운 이미지 수집 (![alt](src) 및 ![alt](<src with spaces>) 형식)
  const markdownImageRegex = /!\[([^\]]*)\]\(\s*(?:<([^>]+)>|([^\s)]+)(?:\s+(?:"[^"]*"|'[^']*'))?\s*)\)/g;
  let markdownMatch;

  while ((markdownMatch = markdownImageRegex.exec(content)) !== null) {
    const [, alt] = markdownMatch;
    // angle bracket 또는 일반 src 처리
    const src = markdownMatch[2] || markdownMatch[3];

    if (src) {
      const cleanSrc = src.trim();
      candidates.push({
        src: cleanSrc,
        alt: alt.trim(),
        index: markdownMatch.index
      });
    }
  }

  // HTML img 태그 수집
  const htmlImageRegex = /<img([^>]*)>/gi;
  let htmlMatch;

  while ((htmlMatch = htmlImageRegex.exec(content)) !== null) {
    const [, attributes] = htmlMatch;
    const parsedAttrs = parseImgAttributes(attributes);

    if (parsedAttrs.src) {
      candidates.push({
        src: parsedAttrs.src,
        alt: parsedAttrs.alt || '',
        index: htmlMatch.index
      });
    }
  }

  // 문서 순서대로 정렬하고 첫 번째 안전한 후보 반환
  candidates.sort((a, b) => a.index - b.index);

  for (const candidate of candidates) {
    if (isSafeImageSrc(candidate.src)) {
      return { src: candidate.src, alt: candidate.alt };
    }
  }

  return null;
}

/**
 * HTML img 태그의 속성들을 파싱 (src/alt 순서 무관, 대소문자 무관, 따옴표 처리)
 */
function parseImgAttributes(attributeString: string): { src?: string; alt?: string } {
  const result: { src?: string; alt?: string } = {};

  // 속성 파싱: name="value" 또는 name='value' 형식
  const attrRegex = /(\w+)\s*=\s*(['"])((?:(?!\2)[^\\]|\\.)*)?\2/g;
  let attrMatch;

  while ((attrMatch = attrRegex.exec(attributeString)) !== null) {
    const [, name, , value] = attrMatch;
    const lowerName = name.toLowerCase();

    if (lowerName === 'src' && value) {
      result.src = value;
    } else if (lowerName === 'alt' && value !== undefined) {
      result.alt = value;
    }
  }

  return result;
}

/**
 * 이미지 URL이 안전한지 검증
 */
function isSafeImageSrc(src: string): boolean {
  if (!src || typeof src !== 'string') return false;

  const trimmedSrc = src.trim();

  // 빈 문자열 제외
  if (!trimmedSrc) return false;

  // 대소문자 무관 unsafe schemes 제외
  const lowerSrc = trimmedSrc.toLowerCase();
  if (lowerSrc.startsWith('data:') || lowerSrc.startsWith('javascript:')) {
    return false;
  }

  // 허용되는 패턴들
  const allowedPatterns = [
    /^\/images\//,     // /images/...
    /^\/assets\//,     // /assets/...
    /^https?:\/\//     // http://, https://
  ];

  return allowedPatterns.some(pattern => pattern.test(trimmedSrc));
}

/**
 * 문서의 썸네일을 추출하는 메인 함수
 */
export function getArticleThumbnail(
  cover?: string,
  coverAlt?: string,
  content?: string,
  title?: string
): ThumbnailResult {
  // 1. frontmatter의 cover 우선 사용
  if (cover && isSafeImageSrc(cover)) {
    return {
      src: cover,
      alt: coverAlt || title || 'Article cover',
      isPlaceholder: false
    };
  }

  // 2. 문서 본문에서 첫 번째 이미지 추출
  if (content) {
    const firstImage = extractFirstImageFromContent(content);
    if (firstImage) {
      return {
        src: firstImage.src,
        alt: firstImage.alt || title || 'Article image',
        isPlaceholder: false
      };
    }
  }

  // 3. 기본 플레이스홀더
  return {
    src: null,
    alt: title || 'Article',
    isPlaceholder: true
  };
}
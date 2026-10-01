# 개인 블로그

[kciter.so](https://kciter.so/)의 레이아웃 리듬에서 영감을 받아 제작된 개인 에디토리얼 블로그입니다. Astro와 TypeScript로 구축되었으며, GitHub Pages를 통해 정적 사이트로 배포됩니다.

## 🚀 빠른 시작

### 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:4321/blog 접속
```

### 빌드 및 미리보기

```bash
# 프로덕션 빌드
npm run build

# 빌드된 사이트 미리보기
npm run preview

# 타입 체크 및 Astro 검증
npm run check
```

## 📝 글 작성하기

이 블로그는 3가지 종류의 콘텐츠를 지원합니다:

### 1. Articles (긴 글)
`src/content/articles/` 디렉토리에 마크다운 파일을 생성하세요.

```markdown
---
title: '글 제목'
description: '글 요약'
publishedAt: 2026-10-01T09:00:00.000Z
type: 'article'
tags: ['태그1', '태그2']
featured: false  # 홈페이지 featured로 표시할지 여부
draft: false     # true면 프로덕션 빌드에서 제외
readingTime: 5   # 예상 읽는 시간(분)
---

여기에 글 내용을 마크다운으로 작성하세요.
```

### 2. Thoughts (짧은 메모)
`src/content/thoughts/` 디렉토리에 마크다운 파일을 생성하세요.

```markdown
---
title: '생각 제목'
publishedAt: 2026-10-01T16:30:00.000Z
type: 'thought'
tags: ['메모']
draft: false
---

짧은 생각이나 메모 내용
```

### 3. Books (독서 노트)
`src/content/bookshelf/` 디렉토리에 마크다운 파일을 생성하세요.

```markdown
---
title: '독서 노트 제목'
description: '책에 대한 간단한 설명'
publishedAt: 2026-09-29T13:00:00.000Z
type: 'book'
tags: ['독서', '리뷰']
bookAuthor: '책 저자'
draft: false
readingTime: 4
---

책에 대한 생각과 노트
```

### Frontmatter 필드 설명

| 필드 | 필수 | 설명 |
|------|------|------|
| `title` | ✅ | 글 제목 |
| `description` | ✅ (articles, books) | 글 요약 설명 |
| `publishedAt` | ✅ | 발행 날짜 (ISO 8601 형식) |
| `updatedAt` | ❌ | 최종 수정 날짜 |
| `type` | ✅ | 콘텐츠 타입 ('article', 'thought', 'book') |
| `tags` | ❌ | 태그 배열 |
| `featured` | ❌ | 홈페이지 featured 표시 여부 (articles만) |
| `draft` | ❌ | 드래프트 여부 (true면 빌드에서 제외) |
| `readingTime` | ❌ | 예상 읽는 시간(분) |
| `bookAuthor` | ✅ (books) | 책 저자 (독서 노트만) |

## 🎨 사용자 정의

### About 페이지 수정
`src/pages/about.astro` 파일을 편집하여 개인 소개를 추가하세요.

### 작성자 소개 수정
`src/components/AuthorIntro.astro` 파일을 편집하여 홈페이지의 작성자 소개를 변경하세요.

### RSS 피드
RSS 피드는 `/rss.xml` 경로에서 자동으로 생성됩니다.

## 🚀 배포하기

### GitHub Pages 자동 배포

1. GitHub에 저장소를 생성하고 코드를 푸시합니다
2. GitHub 저장소 설정에서 Pages 섹션으로 이동합니다
3. Source를 "GitHub Actions"로 설정합니다
4. `main` 브랜치에 코드를 푸시하면 자동으로 배포됩니다

배포된 사이트는 `https://parkbeommin.github.io/blog/`에서 확인할 수 있습니다.

### 배포 URL 변경
다른 도메인이나 경로를 사용하려면 `astro.config.mjs`의 `site`와 `base` 설정을 수정하세요:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/your-path',
  // ...
});
```

## 📋 드래프트 관리

- `draft: true`로 설정된 글은 개발 환경에서는 보이지만 프로덕션 빌드에서는 제외됩니다
- 글을 작성 중일 때는 `draft: true`로 설정하고, 발행 준비가 되면 `draft: false`로 변경하세요

## 🔧 기술 스택

- **프레임워크**: [Astro](https://astro.build/)
- **언어**: TypeScript
- **콘텐츠**: Markdown with Content Collections
- **스타일링**: CSS (스타일드 컴포넌트)
- **배포**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 프로젝트 구조

```
blog/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── content/            # 마크다운 콘텐츠
│   │   ├── articles/       # 긴 글들
│   │   ├── thoughts/       # 짧은 생각들
│   │   └── bookshelf/      # 독서 노트들
│   ├── layouts/            # 페이지 레이아웃
│   ├── pages/              # 페이지 라우트
│   └── utils/              # 유틸리티 함수
├── public/                 # 정적 자산
└── .github/workflows/      # GitHub Actions 워크플로우
```

## 🎯 주요 기능

- ✅ 반응형 디자인 (모바일 최적화)
- ✅ SEO 최적화 (메타태그, 구조화된 데이터)
- ✅ RSS 피드
- ✅ 사이트맵 자동 생성
- ✅ 접근성 (WCAG AA 준수)
- ✅ 다크모드 준비 (CSS 변수 사용)
- ✅ 타입스크립트 지원
- ✅ 드래프트 시스템
- ✅ 태그 시스템
- ✅ 읽는 시간 표시
- ✅ 자동 배포 (GitHub Actions)

## 📖 샘플 콘텐츠 제거

처음 설치 후에는 다음 샘플 파일들을 삭제하거나 실제 콘텐츠로 교체하세요:

- `src/content/articles/layout-check-first.md`
- `src/content/articles/sample-second-article.md`
- `src/content/articles/third-sample-post.md`
- `src/content/articles/draft-example.md`
- `src/content/thoughts/first-thought.md`
- `src/content/thoughts/quick-note.md`
- `src/content/thoughts/random-idea.md`
- `src/content/thoughts/draft-thought.md`
- `src/content/bookshelf/sample-book-*.md`

## 🆘 문제 해결

### 빌드 실패
```bash
# 타입 체크 및 Astro 검증
npm run check

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 개발 서버 문제
```bash
# 캐시 정리
rm -rf .astro node_modules/.astro
npm run dev
```

### 배포 문제
- GitHub Pages 설정에서 Source가 "GitHub Actions"로 설정되어 있는지 확인
- 저장소가 public이거나 GitHub Pro 계정인지 확인
- `astro.config.mjs`의 `site`와 `base` 설정 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
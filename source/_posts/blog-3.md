---
title: '블로그 개편기 EP.3'
date: 2023-09-06 09:47:00+09:00
categories: blog nuxt tailwindCSS
---

<img src='/images/blog/banner.png'>

> 깔끔하고 내 입맛대로 블로그를 꾸며보고 싶어 시작한 블로그 개편기..!

## 🚛 포스팅 이전

Jekyll로 운영되던 [기존 블로그](https://parkbeommin.github.io/)에서 md 파일들로 만들어져 있었고, 그대로 활용할 수 있길 바랬다.

<img src='/images/blog/blog-3-1.png'>

넉스트 공식 홈페이지에 있는 인증 마크(?)까지 받은 [nuxt/content 모듈](https://nuxt.com/modules/content)을 활용하여 기존 md파일들을 무사히 이전할 수 있었다.

## 🚀 배포

> 배포 과정이 정말 문제가 많았다. 🤦‍♂️

### github pages

<img src='/images/blog/blog-3-2.png'>

로컬에선 잘되는데,,, 를 어김없이 경험했던 github pages...

github.io 도메인 포기 못한다는 생각에 공식 github의 이슈에 있는 비슷한 사례들로 이런 저런 시도를 해봤지만 끝끝내 해결 하지 못했다..

인생 첫 [discussion](https://github.com/nuxt/content/discussions/2236)도 남겨봤지만 아직 미해결..

[멍청하게도 SSR(Server Side Rendering)을 하기 때문에 ](https://velog.io/@anjoy/%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A7%8C%EB%93%A4%EA%B8%B011-Vercel%EB%A1%9C-%ED%94%84%EB%A1%A0%ED%8A%B8%EB%8B%A8-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0) 라는 이유로 문제가 있었던 것 같고 아직 정확한 파악과 해결은 못했습니다 ㅠㅠㅠ

### firebase hosting

파이어베이스를 통한 배포는 큰 어려움은 없었고, Nuxt로 구성되어 있기 때문에 Firebase Function 기능도 활성화하여야 했습니다.

큰 문제 없이 Function 기능도 활성화하고(과금 가능성 생김) 배포까지 했지만, 성능이 너무나 좋지 않았습니다..

아마 Function 기능을 통해 의도치 않은 서버 통신도 생기고 해서 그랬던 것 같습니다.. (정적 페이지로써 굳이 서버 통신이 없어도 됨..)

### goorm ide

firebase로 해결이 될 줄 알았지만 성능 이슈때문에,, 무료로 서버를 운영하고 있던 goorm ide로 갔습니다.

챗봇 서버와 웹을 하나 돌려놓고 있던 서버에 블로그도 추가하여 배포를 했습니다.

이 과정도 당연히 문제 없이 서버에 코드를 받아 실행시켜, 잘 배포가 되었습니다.

근데.. 🤦‍♂️

아무래도 무료 버전이다보니 cpu, ram에 한계가 있었고,, 기존 운영되던 서비스들에 영향이 생겨버려.. 이 방법도 포기해야했습니다..

### vercel

간단하게 정적 사이트를 배포할 수 있는 서비스인 vercel을 찾아 드디어!! 정상적인 배포를 했습니다!

git repo를 연결시켜 간단하게 배포를 진행할 수 있더군요..

그동안의 고생이 무색하게 너무 쉽게 배포가 되었습니다..!

무료 도메인도 발급받아 도메인 변경도 했습니다. ✨✨

## 🎊 BeomLog

[https://blog.beommin.kro.kr/](https://blog.beommin.kro.kr/)

부족한 블로그겠지만, 점차 나아가보겠습니다...!!

## 아쉬운 점

기존 블로그에서는 구글 애드센스를 붙여 어느정도 수익화를 생각할 수 있었는데,, kro.kr 도메인은 애드센스 신청이 불가하더라구요.. (최상위 도메인이 kro.kr이라..)  
카카오 애드몹은 붙여놓긴 했지만,, 최근 포스팅 갯수 부족으로 거절당해 열심히.. 포스팅해야겠습니다..!!

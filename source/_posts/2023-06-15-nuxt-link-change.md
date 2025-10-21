---
title: 'a태그의 target 속성을 전부 변경하기'
date: 2023-06-15 15:04:00+09:00
categories: nuxt
---

> A -> B로 이동하는 부분이 전부 새창으로 뜨도록 되어있는데 모든 부분을 페이지 전환으로 변경해주세요!

위와 같은 업무 요청이 들어온 경우 어떻게 대응하실건가요?

1. 모든 코드를 찾아서 target="\_blank"를 지운다.
1. DOM이 만들어질 때, B로 이동하는 경로로 되어있는 a태그를 찾아 target="\_self"로 바뀌게 한다.

코드 10줄로 NN개의 파일을 드나들며 코드를 하나하나 수정하지 않도록 하는 방법인 2번에 대해 이야기해보려합니다.

### plugin 파일 생성

nuxt plugin으로 등록하여 mixin을 적용시키는 방법입니다.  
link.js 라는 plugin 파일을 생성합니다.  
아래 코드를 작성해줍니다.

```
import Vue from 'vue';

Vue.mixin({
    mounted() {
        const links = Array.from(document.querySelectorAll('a')).filter((l) => l.getAttribute('href')?.startsWith('/B') && l.target == '_blank');
        links.forEach((link) => {
            link.target = '_self';
        });
    },
});
```

Vue Mixin을 전역으로 적용시켜서 뷰 컴포넌트가 mounted될 때 B경로로 새창으로 여는 a태그를 찾아서 해당 태그의 target속성을 변경시켜줍니다.  
DOM이 그려진 이후에 속성을 바꿔주도록 되어야 잘 반영이 되어서 mounted 훅에서 해당 작업이 수행되도록 했습니다.

### nuxt.config.js에서 plugin 등록

이제 nuxt.config.js로 이동해서, plugin을 등록해줍니다.

```
module.exports = {
	...
    plugins: [
        { src: '~/plugins/link.js' }
	]
	...
}
```

페이지를 실행시켜보시면 잘 적용된 것을 확인하실 수 있습니다.

### 주의사항

결론적으로 위와 같은 코드를 적용하지는 못했고, 모든 코드를 찾아 수정했습니다.  
<b>모든 태그를 일괄로 바꾸는 것에 대한 위험성</b>과 <b>추후 예외로 다시 새창으로 띄워야하는 요청이 왔을 때의 충돌상황</b>이 있을 수 있기에 이번에는 적용하지 않도록 했습니다.  
실제 프로젝트에 적용하실 때 참고하시길 바랍니다.

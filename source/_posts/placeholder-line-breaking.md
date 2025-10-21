---
title: "Placeholder 줄바꿈 적용하기"
date: 2023-08-24 22:15:00+09:00
categories: html placeholder textarea web
---

<img src='/images/web/banner.png'>

> 🙋🏻‍♂️: textarea 영역의 placeholder 문구를 두줄로 보여지게 해주세요.  
> 👨🏻‍💻: 개행 문자를 넣으면 되려나...?

placeholder에서의 줄바꿈 요청이 왔을 때, 딱 떠오른 생각은 개행 문자를 넣는 것이었다.  
그닥 신경쓸만한 요구사항이 아니었다.

## 😋 개행 문자로 쉽게 적용

```html
<textarea placeholder="-첫번째줄 &#10;-두번째줄"></textarea>
```

<img src='/images/web/placeholder-1.png'>

html상에서 처리할 땐, `&#10;` 유니코드를 사용하여 줄바꿈을 적용할 수 있습니다.

Vue 환경에서 placeholder 값을 변수/상수로 할당시켜 표현하고 싶다면 `\n`으로도 적용할 수 있습니다.

## 😩 아이폰 사파리에서는 줄바꿈이 되질 않아요

> 매번 아이폰이 문제다..

<img src='/images/web/placeholder-2.png'>

[Can I Use](https://caniuse.com/mdn-html_elements_textarea_placeholder_line_breaks) 사이트에서 placeholder의 line breaks는 사파리에서는 지원이 안된다고 나와있었다..

기능이 안되는 것도 아니고 사파리에서만 줄바꿈이 되지 않기에,, 포기하고 넘어가려했는데 퍼블리셔분의 도움으로 방법을 찾았습니다!

## 🥳 또 다른 방법, 그리고 버전

```html
<textarea
    placeholder="-첫번째줄
-두번째줄"
></textarea>
```

위와 같이 엔터처리 후 좌우 공백이 없도록 해주면 줄바꿈 처리가 됩니다!!  
그리고 아이폰의 최신버전 16.6 (2023.08 기준) 으로 업데이트를 하면 아이폰에서도 잘 적용이 됩니다.

---

이전 버전들에 대해서는 어쩔 수 없이 줄바꿈이 되지 않은 채로 노출이 됩니다..  
이를 우회하는 방법으로 html 요소를 겹쳐서 js로 컨트롤되도록 하는 방법도 있으니 꼭 필요하다면 이와 같은 방식으로 구현을 하면 될 것 같습니다.

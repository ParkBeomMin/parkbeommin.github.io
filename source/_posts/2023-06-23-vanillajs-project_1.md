---
title: '[Vanilla JS] About Me 프로젝트 - SPA 구조 만들기'
date: 2023-06-23 10:04:00+09:00
categories: web frontend
---

> About Me  
> 친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!

Vue로 웹개발을 시작하여 Vanilla JS에 대해 관심이 없다가 프로그래머스의 dev-matching 과제를 통해 처음으로 접하게 되었고 웹 프로그래밍의 기본이라는 생각이 들었습니다.  
Vanilla JS에 익숙해지기 위해 프로젝트를 시작했습니다.

## 💾파일 구조

기본적인 파일 구조는 아래와 같이 잡았습니다. 프레임워크를 쓰는 것이 아니기에 별다른 명령어 없이 직접 파일과 폴더를 생성해주면 됩니다.

```
├── src
│   ├── assets
│   │    ├── css
│   │    ├── images
│   ├── components
│   ├── pages
│   ├── lib
│   ├── router.js
│   ├── index.js
│   └── app.js
└── index.html
```

-   assets : css와 image 파일 등의 프로젝트 자산들을 담는 폴더
-   components : 컴포넌트 폴더
-   pages : 각 url에 해당되는 페이지 폴더
-   lib : db통신 등 비즈니스 로직이 필요한 파일들을 담는 폴더
-   router.js : 라우팅 설정 파일
-   index.js : html에 app.js를 등록해주고 기본적인 설정을 위한 파일
-   app.js : SPA로 동작하기 위한 로직 파일
-   index.html : 단일 페이지를 보여주는 html 파일

## 📃SPA 페이지 만들기

먼저 index.html 파일에 SPA로 동작하기 위한 js파일을 삽입해줍니다.  
그리고 동작을 컨트롤할 수 있도록 div 태그에 app이라는 id를 지정해줍니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About Me</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="./src/index.js"></script>
    </body>
</html>
```

이제 app.js에 SPA가 되도록 코드를 작성해줍니다.

```js
export default class App {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        const $main = document.createElement('main');
        $main.setAttribute('id', 'page_content');
        this.$target.appendChild($main);
    }
}
```

index.js에서 app.jss가 html에 붙을 수 있도록 해줍니다.

```js
import App from "./App.js";
new App({ $target: document.querySelector("#app") }).render();
```

이제 SPA를 위한 기본적인 틀이 생성이 되었습니다.

## 🖥실행하기

SPA로만 프로젝트를 진행하여 따로 서버용 파일을 만들지 않았습니다.  
serve를 install 받아서 실행시키도록 하겠습니다.

```
npm install serve
```

serve 패키지가 install되고나면 package.json에 명령어 스크립트를 추가해줍니다.

```json
{
    "name": "aboutme",
    "version": "1.0.0",
    "description": "",
    "main": "./src/index.js",
    "scripts": {
        "start": "serve", // 이 부분 추가
    },
    "author": "",
    "license": "ISC",
    ...
}
```

이제 터미널창에서 `npm run start`로 프로젝트를 실행시켜 main 태그가 잘 붙었는지 확인하시면 됩니다.

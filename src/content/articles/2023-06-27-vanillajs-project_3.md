---
title: "[Vanilla JS] About Me 프로젝트 - 라우터 구성하기"
description: "바닐라 자바스크립트 프로젝트 시리즈의 세 번째입니다. About Me 페이지에 인터랙티브한 기능들을 추가하여 더욱 동적인 사용자 경험을 제공합니다."
publishedAt: 2023-07-10T01:16:00.000Z
type: article
tags: ["web","frontend"]
featured: false
draft: false
cover: "/assets/about-me/banner.png"
coverAlt: "About Me Project"
---


<img src='/assets/about-me/banner.png'>

> [About Me](https://aboutme2.web.app)  
> 친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!

지난 [라우터 구성하기](https://parkbeommin.github.io/web/frontend/vanillajs-project_2/)에 이어서 프로젝트의 페이지 및 컴포넌트 구성에 대해 이야기해보겠습니다.

About Me 컨셉은 나의 새싹을 만들어 키우는 것입니다.  
나의 새싹을 만들면, 색상 및 종류가 랜덤하게 정해지고 id가 부여됩니다.  
id를 통해 링크가 생성되며 링크를 친구들에게 공유하여 나에 대한 생각을 받습니다.  
친구들에게 입력받은 단어/문장들이 비가 되어 나의 새싹을 키우게 됩니다.

## 📃라우터 만들기

SPA로 만들기 위해 라우터 기능을 구현할 필요가 있습니다. 해시라우팅 방식으로 구현해보도록 하겠습니다.

`router.js`에 라우터 클래스를 만들어줍니다.

```
export default class Router {
    constructor({ view, route }) {
        this.view = view;
        this.route = route;
    }
}
```

라우터를 통해 그려질 화면에 대한 요소를 view로 받습니다.  
route로는 라우팅될 정보들을 받습니다.

```
export default class Router {
    constructor({ view, route }) {
        this.view = view;
        this.route = route;
        this.setRoute(); // 라우터가 동작할 수 있도록 추가
    }
    setRoute() {
        document.addEventListener("DOMContentLoaded", () => {
            const url = window.location.hash.replace("#", "");
            this.renderPage(url);
        });
        window.addEventListener("hashchange", () => {
            const url = window.location.hash.replace("#", "");
            this.renderPage(url);
        });
    }
...
```

페이지가 랜딩될 때와 url의 해시에 변화가 있을 때마다 페이지가 잘 랜더링될 수 있도록 setRoute함수를 만들고 라우터 클래스가 생성될 때 실행될 수 있도록 합니다.

```
export default class Router {
    constructor({ view, route }) {
        this.view = view;
        this.route = route;
        this.setRoute();

        // urlChange함수를 window객체에 등록하여 전역으로 사용할 수 있도록 추가
        window.urlChange = (url) => {
            this.urlChange(url);
        };
    }
    ...
    urlChange(url) {
        window.history.pushState("", "", `#${url}`);
        this.renderPage(url);
    }
...
```

각 페이지에서 라우팅이 필요할 경우, window.urlChange(...)로 사용가능하도록 함수를 셋팅시켜줍니다.

```
...
    renderPage(url) {
        this.view.innerHTML = "";

        const to =
            this.route.filter((r) => this.matchUrl(r.url, url))[0] ||
            this.route.filter((r) => r.url === "/")[0];
        try {
            to.page.render();
            to.css
                ? to.css.forEach((c) => require(`@/assets/css/${c}.css`))
                : null;
            document.title = to.title;
            document
                .querySelector(`meta[name='description']`)
                .setAttribute("content", to.description);
        } catch (e) {
            this.route.filter((r) => r.url === "/")[0].page.render();
            console.error(e);
        }
    }

    matchUrl(a, b) {
        const index = a.indexOf(":");

        if (index > -1) {
            return a.substring(0, index) === b.substring(0, index);
        } else {
            return a === b;
        }
    }
...
```

라우팅을 통해 새로운 페이지가 랜더링되는 부분입니다.  
기존 view를 초기화시켜준 뒤, 등록된 route에 있는 페이지를 랜더링 시켜줍니다.  
추가적으로 페이지가 랜더링될 때 css파일도 불러오도록 처리를 했으며, 각 메타정보도 바뀔 수 있도록 했습니다.  
오류가 날 경우에는 메인으로 랜더링되도록 했습니다.

## 🎊라우터 등록하기

위에서 만든 라우터를 등록시켜야 사용할 수 있습니다.  
`app.js`에 라우터를 등록시켜줍니다.

```
import Home from './pages/Home.js';
import New from './pages/New.js';
import About from './pages/About.js';
import Router from './router.js';

export default class App {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        ...
        const $main = document.createElement('main');
        $main.setAttribute('id', 'page_content');

        this.$target.appendChild($main);

        const homePage = new Home({ $target: $main });
        const newPage = new New({ $target: $main });
        const aboutPage = new About({ $target: $main });
        new Router({
            view: $main,
            route: [
                {
                    url: '/me/:id',
                    page: homePage,
                    css: ['AboutMe', 'Header'],
                    title: '나의 새싹 보기',
                    description: '친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!',
                },
                {
                    url: '/',
                    page: newPage,
                    css: ['New', 'Layer'],
                    title: 'About Me',
                    description: '친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!',
                },
                {
                    url: '/about/:id',
                    page: aboutPage,
                    css: ['About', 'Layer'],
                    title: '나는 어떤 사람이야?',
                    description: '친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!',
                },
            ],
        });
    }
}

```

이와 같이 각 페이지에 대한 정보들을 등록시켜주면 됩니다.

## 🕹라우터 사용하기

라우터 사용은 window객체에 등록시켜준 urlChange 함수를 활용합니다.  
`About.js`에서 '내 새싹 만들기'를 클릭해 메인화면으로 넘어오는 부분입니다.

```
export default class About {
    constructor({ $target }) {
        this.$target = $target;
        this.id = window.location.hash.split('#/about/')[1];
    }

    render() {
        ...
        const $goNew = document.createElement('a');
        const $goNewImg = document.createElement('img');
        $goNewImg.setAttribute('src', require('@/assets/images/sprout.svg'));
        $goNewImg.setAttribute('alt', 'goNew');
        $goNew.setAttribute('class', 'go-new');
        $goNew.textContent = '내 새싹 만들러가기';
        $goNew.appendChild($goNewImg);
        $goNew.addEventListener('click', () => {
            window.urlChange('/');
        });
        ...
    }
    ...
}

```

---

[AboutMe GitHub](https://github.com/ParkBeomMin/AboutMe)

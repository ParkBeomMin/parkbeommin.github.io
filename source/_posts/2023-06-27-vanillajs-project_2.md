---
title: '[Vanilla JS] About Me 프로젝트 - 페이지 구성하기'
date: 2023-06-27 09:16:00+09:00
categories: web frontend
---

> About Me  
> 친구들이 생각하는 나는 어떤 사람일까? 친구들의 마음이 모여 나의 새싹을 키워보세요!

지난 [SPA 구조 만들기](https://parkbeommin.github.io/web/frontend/vanillajs-project_1/)에 이어서 프로젝트의 페이지 및 컴포넌트 구성에 대해 이야기해보겠습니다.

About Me 컨셉은 나의 새싹을 만들어 키우는 것입니다.  
나의 새싹을 만들면, 색상 및 종류가 랜덤하게 정해지고 id가 부여됩니다.  
id를 통해 링크가 생성되며 링크를 친구들에게 공유하여 나에 대한 생각을 받습니다.  
친구들에게 입력받은 단어/문장들이 비가 되어 나의 새싹을 키우게 됩니다.

## 📃페이지 및 컴포넌트 구성

```
...

├── components
│   ├── Hader.js
│   ├── AboutMe.js
│   ├── MoneyLayer.js
│   └── PasswordLayer.js
├── pages
│   ├── New.js
│   ├── About.js
│   └── Home.js

...
```

### 페이지

-   생성 페이지(New.js): 새싹을 생성하는 페이지, 모든 사용자들이 입력했던 값들이 보여진다.
-   작성 페이지(About.js): 공유받은 링크로 들어와 친구에 대해 작성하는 페이지
-   메인 페이지(Home.js): 만든 새싹과 친구들에게 입력받은 단어/문장들이 보여지는 페이지

### 컴포넌트

-   헤더 컴포넌트(Header.js): 공유, 기부 버튼이 있는 헤더
-   메인 컴포넌트(AboutMe.js): 새싹이 보여지고, 단어/문장들이 비처럼 떨어지는 컴포넌트
-   기부 컴포넌트(MoneyLayer.js): 카카오 송금하기로 링크되는 레이어
-   비밀번호 컴포넌트(PasswordLayer.js): 비밀번호를 입력받는 레이어

## 🎊생성 페이지

`pages/New.js` `components/AboutMe.js` `components/PasswordLayer.js`

생성 페이지에서는 나의 새싹을 생성할 수 있는 버튼과 안내 문구가 필요합니다.  
생성 버튼을 누르면 비밀번호를 입력할 수 있는 레이어가 노출됩니다.  
그리고 뒷 배경으로 모든 사용자의 입력 값을 예시로 보여지도록 합니다.

```js
import AboutMe from "@/components/AboutMe";
import PasswordLayer from "../components/PasswordLayer.js";

export default class New {
    constructor({ $target }) {
        this.$target = $target;
    }
    async render() {
        const $div = document.createElement("div");
        $div.setAttribute("class", "new-container");
        const $button = document.createElement("button");
        $button.setAttribute("class", "create-btn");
        $button.textContent = "나의 새싹 만들기";
        $button.addEventListener("click", async () => {
            new PasswordLayer({$target: this.$target}).render();
        });
        const $info = document.createElement("span");
        $info.setAttribute("class", "info");
        $info.innerHTML =
            "친구들의 관심을 모아 새싹을 자라나게 해주세요!<br>새싹 -> 중간 -> 트리 형태로 자라납니다<br>나무의 형태, 색상은 모두 랜덤으로 생성됩니다.";
        $div.appendChild($button);
        $div.appendChild($info);
        this.$target.appendChild($div);
        new AboutMe({ $target: this.$target, id: "new" }).render();
    }
}

```

위와 같이 new-container를 클래스 명으로 갖는 div 태그를 만들고 그 안에 버튼과 문구를 만들어 넣어줍니다.  
button에는 click이벤트를 넣어주고 클릭 시 PasswordLayer가 랜딩될 수 있도록 구현합니다.  
그리고 AboutMe 컴포넌트도 new라는 id를 넘겨주고 랜더링 시켜줍니다.

```js
export default class PasswordLayer {
    constructor({ $target, callback }) {
        this.$target = $target;
        this.callback = callback;
    }
    render() {
        // 다시 랜딩을 시도하는 경우에는 이미 켜진 레이어가 꺼지도록 설정
        if (document.querySelector('.layer-container')) {
            document.querySelector('.layer-container').outerHTML = '';
            return;
        }
        const $div = document.createElement('div');
        $div.setAttribute('class', 'layer-container');

        const $closeBtn = document.createElement('button');
        $closeBtn.setAttribute('class', 'close-btn');
        const $closeImg = document.createElement('img');
        $closeImg.setAttribute('src', require('@/assets/images/close.svg'));
        $closeImg.setAttribute('alt', 'close');
        $closeBtn.appendChild($closeImg);
        $closeBtn.addEventListener('click', () => {
            $div.outerHTML = '';
        });

        const $h3 = document.createElement('h3');
        $h3.textContent = '비밀번호';

        const $form = document.createElement('form');
        $form.setAttribute('class', 'pw-box');

        const $input = document.createElement('input');
        $input.setAttribute('class', 'pw-input');
        $input.setAttribute('type', 'password');
        $input.addEventListener('change', () => {
            $input.classList.remove('error');
        });

        const $button = document.createElement('button');
        $button.setAttribute('class', 'pw-btn');
        $button.textContent = '완료';

        $form.addEventListener('submit', (e) => {
            e.preventDefault();
            if ($input.value) {
                this.callback({ password: $input.value });
            } else {
                $input.classList.add('error');
            }
        });

        $form.appendChild($input);
        $form.appendChild($button);

        $div.append($closeBtn, $h3, $form);
        this.$target.appendChild($div);
    }
}
```

PasswordLayer는 닫기 버튼과 타이틀, 비밀번호 입력창, 완료 버튼으로 구성됩니다.  
레이어의 중복 노출 방지를 위해 .layer-container 클래스를 갖는 요소를 찾아 랜딩되기 전 이미 랜딩되어있다면 닫히도록 처리했습니다.  
input과 button은 form 태그로 감싸서 submit 이벤트로 합쳐지게 처리했으며, e.preventDefault()를 통해 submit시 새로고침되는 것을 방지하였습니다.  
callback 함수를 인자로 받아서 레이어가 생성되도록 해서 레이어 이후 콜백함수를 처리할 수 있도록 구현하였습니다.

## 💻작성 페이지

`pages/About.js`, `components/PasswordLayer.js`

```js
import PasswordLayer from '../components/PasswordLayer.js';
export default class About {
    constructor({ $target }) {
        this.$target = $target;
        this.id = window.location.hash.split('#/about/')[1];
    }

    render() {
        const $div = document.createElement('div');
        $div.setAttribute('class', 'wrap');

        const $title = document.createElement('h1');
        $title.textContent = '나는 어떤 사람이야?';

        const $inputBox = this.createInputBox();

        const $info = document.createElement('span');
        $info.setAttribute('class', 'info');
        $info.innerHTML = 'ex) 마음이 따듯해. 예뻐. 냉정해. 극I...<br>친구를 떠올렸을 때 생각나는 말을 적어주세요.';

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

        const $goMy = document.createElement('a');
        $goMy.setAttribute('class', 'go-my');
        $goMy.textContent = '내 새싹 보러가기💚';
        $goMy.addEventListener('click', () => {
            new PasswordLayer({
                $target: this.$target,
                callback: async ({ password }) => {
                    ...
                },
            }).render();
        });

        $div.append($title, $inputBox, $info, $goNew, $goMy);
        this.$target.appendChild($div);
    }

    createInputBox() {
        const id = window.location.hash.split('#/about/')[1];

        const $inputBox = document.createElement('form');
        $inputBox.setAttribute('class', 'input-box');

        const $input = document.createElement('input');
        $input.setAttribute('type', 'text');
        const $sendBtn = document.createElement('button');
        $sendBtn.setAttribute('class', 'about-send-btn');
        const $sendBtnImg = document.createElement('img');
        $sendBtnImg.setAttribute('src', require('@/assets/images/send.svg'));
        $sendBtnImg.setAttribute('alt', 'send');
        $sendBtn.appendChild($sendBtnImg);
        $inputBox.appendChild($input);
        $inputBox.appendChild($sendBtn);
        $inputBox.addEventListener('submit', (e) => {
            e.preventDefault();
            ...
        });
        return $inputBox;
    }
}
```

작성 페이지는 타이틀과 사용자에게 입력받는 인풋창, 그리고 새싹 만들러 가기, 내 새싹 보러 가기 링크로 구성되어 있습니다.  
내 새싹 보러 가기를 클릭하면 비밀번호 레이어가 노출되고, 비밀번호를 입력하면 만들었던 새싹 페이지로 랜딩되어야 합니다.

## 🖼메인 페이지

`pages/Home.js` `components/AboutMe.js` `components/Header.js` `components/MoneyLayer.js`

```js
// Home.js
import AboutMe from "../components/AboutMe.js";
import Header from "@/components/Header";
export default class Home {
    constructor({ $target }) {
        this.$target = $target;
    }
    render() {
        const id = window.location.hash.split("#/me/")[1];
        new Header({ $target: this.$target }).render();

        new AboutMe({ $target: this.$target, id }).render();
    }
}
```

메인 페이지는 Header.js와 AboutMe.js 컴포넌트로 구성됩니다.  
Header.js에는 기부하기와 공유하기 기능이 있고, AboutMe.js에는 사용자의 새싹과 입력받은 문자들을 노출해주는 기능이 있습니다.

```js
// AboutMe.js
export default class AboutMe {
    constructor({ $target, id }) {
        this.$target = $target;
        this.id = id;
    }

    async render() {
        const num = 1
        const treeFilter = ''
        const groundColor = ''
        const aboutList = []

        let type = 'sprout';
        let size = '50px';
        if (aboutList.length > 10) {
            type = `${num}/growing`;
            size = '100px';
        }
        if (aboutList.length > 50) {
            type = `${num}/tree`;
            size = '200px';
        }

        const $div = document.createElement('div');
        $div.setAttribute('class', 'wrap');
        const $ground = document.createElement('div');
        $ground.setAttribute('class', 'ground');
        $ground.style.backgroundColor = `${groundColor}`;
        $ground.style.borderColor = `${groundColor}`;
        const $sky = document.createElement('div');
        $sky.setAttribute('class', 'sky');
        const $aboutMe = document.createElement('img');
        $aboutMe.setAttribute('class', 'about-me');
        $aboutMe.setAttribute('src', `../assets/images/${type}.svg`);
        $aboutMe.setAttribute('alt', 'aboutMe');
        $aboutMe.style.width = size;
        $aboutMe.style.height = size;
        $aboutMe.style.filter = treeFilter;
        $div.append($sky, $aboutMe, $ground);
        const $textContainer = document.createElement('div');
        $textContainer.setAttribute('class', 'text-container');
        aboutList.forEach((al) => {
            const $text = document.createElement('span');
            $text.setAttribute('class', 'falling-text');
            $text.style.animationDuration = `${Math.random() * 10 + 4}s`;
            $text.style.left = `${Math.random() * 100}%`;
            $text.style.color = al.color;
            $text.textContent = al.content;
            $textContainer.appendChild($text);
        });
        $div.appendChild($textContainer);

        this.$target.appendChild($div);
    }
}
```

num에 따라 트리의 종류가 결정되고, treeFilter와 groundColor로 새싹과 땅의 색을 지정해줍니다. 이 값들은 생성이 될 때 랜덤하게 생성되도록 설정된 값입니다. 아직은 덤프데이터로 놔두겠습니다.  
aboutList는 친구들에게 입력받은 나에 대한 문장/문구들이 담긴 배열입니다. {color, content} 형태의 객체로 담기게 되며 color도 생성될 때 랜덤하게 생성이 됩니다.  
미리 저장해둔 경로에 맞게 새싹 이미지를 불러오도록 하고 사이즈와 필터도 지정해줍니다. svg파일을 img태그로 지정해놓았기때문에 색상 변동을 filter로 컨트롤합니다.  
aboutList의 결과값들도 만들어줍니다. 하늘에서 비처럼 떨어지는 애니메이션효과를 css로 주고, 각 요소마다 속도 차이를 주기 위해 랜덤하게 생성될 수 있도록 합니다.

```js
// Header.js
import MoneyLayer from './MoneyLayer';

export default class Header {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        const $header = document.createElement('header');

        const $shareBtn = document.createElement('button');
        $shareBtn.setAttribute('class', 'share-btn');
        const $shareImg = document.createElement('img');
        $shareImg.setAttribute('src', '../assets/images/share.svg');
        $shareImg.setAttribute('alt', 'share');
        $shareBtn.appendChild($shareImg);
        $shareBtn.addEventListener('click', () => {
            ...
        });

        const $moneyBtn = document.createElement('button');
        $moneyBtn.setAttribute('class', 'money-btn');
        const $moneyImg = document.createElement('img');
        $moneyImg.setAttribute('src', '../assets/images/money.svg');
        $moneyImg.setAttribute('alt', 'money');
        $moneyBtn.appendChild($moneyImg);
        $moneyBtn.addEventListener('click', () => {
            new MoneyLayer({ $target: this.$target }).render();
        });

        $header.appendChild($shareBtn);
        $header.appendChild($moneyBtn);
        this.$target.appendChild($header);
    }
}
```

Header에는 버튼을 2개 만들고, 각 이미지를 지정해줍니다.  
share버튼의 클릭 이벤트를 만들어주고 추후에 링크가 복사될 수 있도록 구현할 예정입니다.  
money버튼은 기부를 할 수 있는 레이어를 띄우는 역할로 클릭 이벤트로 MoneyLayer가 노출될 수 있도록 합니다.

```js
// MoneyLayer.js
export default class MoneyLayer {
    constructor({ $target }) {
        this.$target = $target;
    }

    render() {
        if (document.querySelector('.layer-container')) {
            document.querySelector('.layer-container').outerHTML = '';
            return;
        }
        const $div = document.createElement('div');
        $div.setAttribute('class', 'layer-container');

        const $h3 = document.createElement('h3');
        $h3.textContent = '개발자 밥 사주기🍚';

        const $closeBtn = document.createElement('button');
        $closeBtn.setAttribute('class', 'close-btn');
        const $closeImg = document.createElement('img');
        $closeImg.setAttribute('src', '../assets/images/close.svg');
        $closeImg.setAttribute('alt', 'close');
        $closeBtn.appendChild($closeImg);
        $closeBtn.addEventListener('click', () => {
            $div.outerHTML = '';
        });

        const $moneyBox = document.createElement('div');
        $moneyBox.setAttribute('class', 'money-box');

        const $sojuBtn = this.createMoneyBtn({
            text: '🍺',
            url: '...',
        });
        const $coffeeBtn = this.createMoneyBtn({
            text: '☕️',
            url: '...',
        });
        const $chocolateBtn = this.createMoneyBtn({
            text: '🍫',
            url: '...',
        });

        $div.appendChild($closeBtn);
        $div.appendChild($h3);
        $moneyBox.append($sojuBtn, $coffeeBtn, $chocolateBtn);
        $div.appendChild($moneyBox);
        this.$target.appendChild($div);
    }

    createMoneyBtn({ text, url }) {
        const $button = document.createElement('button');
        $button.setAttribute('class', 'dev-money-btn');
        $button.textContent = text;
        $button.addEventListener('click', () => {
            window.location.href = url;
        });
        return $button;
    }
}
```

PasswordLayer와 비슷한 형태로 구성되며 각 기부용 버튼을 만들어줍니다.  
url로는 기부할 수 있는 링크를 생성해서 넣어주면 됩니다. 저는 카카오 송금하기 링크를 활용했습니다.

---

여기까지 각 페이지와 컴포넌트를 만들어보았고, 다음에는 라우터 설정을 통해 페이지 간 이동을 구현해보도록 하겠습니다.

---
title: '[DX] 팀즈 WebHook으로 에러 알림받기'
date: 2023-07-14 16:33:00+09:00
categories: dx teams webhook error
---

<img src='/assets/dx/banner.png'>

> 개발자님 A페이지에서 오류가 났나봐요.  
> 확인해보겠습니다.  
> 내부망 > 서버 > 로그 찾기

서버 에러가 나는 경우 500 상태 값을 리턴해주고 console.error()를 찍어놓는 방식으로 관리가 되고 있었습니다.  
사이트에 오류가 났을 경우, 대개 서버에러인 경우가 많고 그러면 내부망에서 서버에 접근해서 로그를 찾아봐야했습니다.  
오류가 발생했을 때 확인하는 과정도 귀찮음이 있고, 오류가 발생하더라도 서버 로그를 모니터링하지 않으면 모르고 지나가는 경우도 있었습니다.

## 🔑에러가 났을 때 바로 알게 할 수 있지 않을까?

저희 팀은 팀즈로 소통을 하고 있고, 팀즈 알림에 반응하도록 적응이 되어있어서 팀즈 알림을 활용하면 어떨까 했습니다.  
팀즈에는 각 채널별로 웹훅을 설정할 수 있는 기능이 있습니다.

> 팀즈의 웹훅을 활용해 오류가 났을 때 알람이 가도록 하면 되겠다!

## 🎊에러 핸들링에 팀즈 웹훅 추가하기

```
const axios = require('axios');
const config = require('./config/index.js');

let errorMiddleware = (err, req, res, next) => {
   ...
    if (process.env.NODE_ENV === 'production') {
        teamsWebHook(err.stack);
    }
    console.error(`SERVER ERROR (${new Date().toISOString()}) - ${req.originalUrl}\n${err.stack}`);
    res.status(500).end('Server Error');
};

const teamsWebHook = (errMsg) => {
    try {
        const $axios = axios.create({
            baseURL: config.teamsWebHook,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000,
        });
        $axios.post('/', {
            type: 'message',
            attachments: [
                {
                    contentType: 'application/vnd.microsoft.card.adaptive',
                    content: {
                        type: 'AdaptiveCard',
                        body: [
                            {
                                type: 'TextBlock',
                                size: 'Large',
                                weight: 'Bolder',
                                text: 'Server Error',
                            },
                            {
                                type: 'TextBlock',
                                text: '<at>mention</at>',
                            },
                            {
                                type: 'TextBlock',
                                text: errMsg,
                                wrap: true,
                            },
                        ],
                        $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
                        version: '1.0',
                        msteams: {
                            width: 'Full',
                            entities: [
                                {
                                    type: 'mention',
                                    text: '<at>mention</at>',
                                    mentioned: {
                                        id: 'abc@def.com',
                                        name: 'name',
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        });
    } catch (e) {}
};
...
```

console.error()로만 에러 로그를 남기고 있던 `errorMiddleware`에 teamsWebHook 함수를 만들어서 알람이 가도록 추가했습니다.  
웹훅을 통해 메세지를 보내는 것은 더 간단하지만, 멘션기능을 사용하려면 AdaptiveCard으로만 가능합니다.  
멘션이 표현될 부분을 `<at></at>`으로 감싸주고 msteams > entities에서 type을 mention으로 설정하고 text에는 멘션이 표현될 부분과 동일하게 지정해줍니다.(변수에 값을 할당하는 느낌)  
mentioned에는 팀즈에서 사용중인 이메일과 이름을 지정해줍니다. 이메일기반으로 멘션이 진행되기에 이메일을 정확하게 입력해주셔야합니다.  
TextBlock에 `wrap: true`를 주지 않으면 자동으로 텍스트를 생략시키기때문에 추가해줍니다.  
msteams에 `width: 'Full'`이 부분도 넣어주어야 가로로 꽉찬 알림을 받아보실 수 있습니다.

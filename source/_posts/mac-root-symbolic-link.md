---
title: "MAC 루트 경로에 폴더 만들기"
date: 2023-12-26 14:26:00+09:00
categories: mac symbolic link
---

> 🙋🏻‍♂️: mac 환경에서도 Root에 LOGS 폴더를 만들어주세요.  
> 👨🏻‍💻: mkdir LOGS 하면 되겠지?

<img src='/images/mac/root-symbolic-link.png'/>

mac Catalina부터는 보안상의 이유로 루트경로에 디렉토리를 만들 수가 없습니다..

Read-only file system이라는 오류 메세지를 주고 생성이 되질 않습니다.

## 😋 심볼릭 링크를 활용해보자

`USERS/{userName}`의 경로에 LOGS 폴더를 만들어줍니다.

> mkdir LOGS

이제 심볼릭 링크 설정을 해줍니다.

> vi /etc/synthetic.conf

해당 파일을 열어 아래와 같이 입력해줍니다.

```
LOGS    /Users/{userName}/LOGS
```

LOGS와 /Users/{userName}/LOGS 사이는 탭으로 입력해야합니다.

/Users/{userName}/LOGS를 루트의 LOGS로 인식하겠다라는 의미입니다.

이제 저장하고 재부팅을 하면, 루트에 LOGS가 잘 생성되어있는 것을 볼 수 있습니다.

---
title: "[DX] git actions로 ssh 접속하여 자동 배포 하기"
description: "GitHub Actions에서 SSH를 활용한 배포 자동화 설정 방법을 알아봅니다. 안전한 SSH 키 관리와 배포 스크립트 작성법을 다룹니다."
publishedAt: 2023-07-21T01:34:00.000Z
type: article
tags: ["dx","git","actions","ssh","ci/cd"]
featured: false
draft: false
cover: "/assets/dx/banner.png"
coverAlt: "DX Development"
---


<img src='/assets/dx/banner.png'>

> 로컬에서 작업하고 푸쉬하고  
> 마스터 브랜치로 합치고  
> 서버에 접속해서 빌드&배포 하고...

개발자는 귀찮음이 많아야 좋은 환경들을 만들어 간다고 합니다.  
위와 같은 작업이 슬슬 귀찮아져서 자동 배포를 적용해야겠다 싶었습니다.  
goorm ide로 ubuntu 서버를 사용하고 있고 vue3로 제작된 웹 페이지를 운영하는 환경입니다.

## 🔑마스터 브랜치에 코드가 변경되면 빌드&배포가 실행되게 할 수 없을까?

goorm ide에 jenkins를 설치해서 ci/cd환경을 구축해보려 했는데 설치가 잘 되지 않아 그냥 계속 수동으로 빌드&배포를 진행해왔습니다.  
수개월간 방치하다 문득 git actions가 떠올랐습니다.  
git actions로 브랜치에 코드 변화 감지를 할 수 있고 명령어를 실행시킬 수 있기에 ssh 접근도 가능한지 알아봤습니다.

> git actions로 ssh 접속하여 빌드&배포 스크립트를 실행시키게 하면 되겠다!

## 📃배포 스크립트 만들기

```
#!/bin/bash

project() {
	cd /workspace/project
	git pull
	npm run build
	pm2 restart project
}

project
```

workspace의 project폴더로 이동한 후 git pull을 받고 빌드를 하고 pm2를 재시작하는 스크립트입니다.  
cd 경로를 지정할 때 상대경로로 지정하게 되면 수동으로는 잘 동작하지만, ssh로 접근 시에는 다르기때문에 절대경로로 지정해줍니다.

## 💻git actions 스크립트 만들기

`.github/workflows/main.yml`

```
name: remote ssh command
on: [push]
jobs:

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - name: executing remote ssh commands using password
      uses: appleboy/ssh-action@master
      with:
        host: -
        username: -
        password: -
        port: -
        script: /workspace/baepo.sh
```

github 레포지토리로 이동해서 main.yml 파일을 위와 같이 만들어줍니다.  
host와 username, password, port를 잘 지정해주고 먼저 만들어놨던 baepo.sh파일을 실행하도록 스크립트를 만들어줍니다.

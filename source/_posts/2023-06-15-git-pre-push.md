---
title: '[GIT] Push 정책 설정하기'
date: 2023-06-15 15:04:00+09:00
categories: git
---

> 팀원: 이번 프로젝트에 Jenkins를 도입해서 자동 빌드 및 배포를 적용했어요. 다만 같은 version으로 push를 하면 오류가 나니 version 변경에 신경써서 push해주세요!

최근 팀원분이 배포 환경을 크게 개선해줘서 push만 해도 빌드 & 배포가 이뤄지도록 해주셨습니다.  
하지만 같은 package 버전으로 push가 되면 빌드 오류가 나게 되어 있어서 push할 때 주의해달라는 요청도 함께 주셨습니다.  
version을 올리지 않고 push를 하는 실수가 잦아서 version을 변경하지 않으면 push를 막을 순 없을까해서 찾아보다가 git push 정책을 설정할 수 있다는 것을 알았습니다.

pre-push라는 파일을 .git/hooks 경로에 생성하여 스크립트를 작성하면 됩니다.

### pre-push 파일 생성

아래와 같이 pre-push 파일을 생성해줍니다.

```
cd .git/hooks
echo > pre-push // touch pre-push
```

pre-push 파일을 열어서 아래와 같은 스크립트를 작성해줍니다.

```
#!/bin/bash

# package.json 파일의 version 필드를 가져옵니다.
current_version=$(node -pe "require('./package.json').version")

# 현재 작업 중인 브랜치를 가져옵니다.
current_branch=$(git rev-parse --abbrev-ref HEAD)

# 원격 저장소의 package.json 파일의 버전을 가져옵니다.
remote_version=$(git show origin/${current_branch}:package.json | awk -F'"' '/"version"/{print $4}')

# 버전이 변경되지 않았다면 push를 막습니다.
if [ "$current_version" == "$remote_version" ]; then
  echo "Error: package.json version has not been updated."
  exit 1
fi

```

### git push 해보기

version을 변경하지 않고 push를 시도한다면 아래와 같은 에러메세지가 출력되는 것을 볼 수 있습니다.

<img src="/assets/git/pre-push.png">

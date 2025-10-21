---
title: "[React Native] React Native 시작하기 - React Native CLI"
date: 2019-07-15 22:29:00+09:00
categories: react-native
toc: true
toc_sticky: true
---

[저번 포스팅][last-posting]에서 React Native 개발 환경을 Expo로 셋팅하는 것에 대해서 알아보았습니다.  
Expo를 이용하여서 잘 개발을 진행하면 될 줄 알았지만, 조금 알아보니 Expo를 이용하면 빠르게 환경 셋팅을 하고 시작할 수 있다는 장점이 있지만, React Native CLI로 하는 것보다 한계가 존재한다고 하네요. 그래서 React Native CLI로 셋팅하는 것에 대해서 알아보도록 하겠습니다.  
기본적인 제 노트북 환경은 다음과 같습니다.

> macOS Mojave 10.14.3
> 2.3 GHz Intel core i5
> 8GB 2133 MHz LPDDR3
> Macintosh HD
> intel Iris Plus Graphics 640 1536 MB

## Getting Started

[React Native 공식 문서][docs-url]에 들어가서 하라는대로 해보도록 하겠습니다.

Expo는 저번에 설치했으니, Expo에 관한 글은 넘어가고, '네이티브 개발에 친숙하다면'의 문구가 적힌 글을 봅니다.

Xcode나 Android Studio가 설치되어있다면, 몇분안에 셋팅이 끝난다고 하네요.  
저는 둘 다 설치가 되어있지만, Xcode는 거의 사용을 안해봐서 Android Studio 기준으로 해보겠습니다.

개발 운영체제와 플랫폼에 따라서 설치가 조금씩 다르다고 합니다.  
저는 일단 macOS와 Android를 선택하고 설명을 따라해보도록 하겠습니다.

### Installing dependencies

문서에서 Node, Watchman, React Native command line interface, JDK, Android Studio가 설치되어 있어야한다고 합니다.  
문서에서 Homebrew를 이용하여서 다음과 같은 명령어로 설치를 안내하고 있습니다.

```
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
npm install -g react-native-cli
```

Node는 8.3 버전 이상이어야합니다.  
Watchman은 파일시스템 변화를 감지하는 페이스북에서 만든것이라고 합니다. 성능 향상을 위해 설치하는 것을 추천한다고 하네요.  
JDK는 8 버전 이상이어야합니다.

Node는 저번 Expo 셋팅 때 10.16.0 버전으로 업그레이드했으니, 넘어가고 Watchman과 JDK, React Native CLI를 설치해보도록 하겠습니다.

<img src="/assets/react-native-cli-setting/watchman.png">

watchman 설치 후 이런 에러가 뜨네요.  
하지만 친절하게도 어떻게 하라고 안내가 되어있어서 그대로 복붙해줍니다.

<img src="/assets/react-native-cli-setting/jdk1.png">
<img src="/assets/react-native-cli-setting/jdk2.png">

JDK 설치도 완료가 되었습니다.  
이제 React Native CLI만 설치하면 필요한 설치는 다 끝이나네요.  
React Native CLI 설치 할 때 앞에 sudo를 붙여주었습니다.

<img src="/assets/react-native-cli-setting/install-react-native-cli.png">

이제 필요한 설치가 모두 끝이났네요.

### Android SDK

React Native 앱 개발을 위해서는 Android SDK 버전이 Pie버전이 요구된다고 합니다.  
문서에 나와있는대로 따라서 SDK 설치를 해줍니다.

<img src="/assets/react-native-cli-setting/install-sdk.png">
<img src="/assets/react-native-cli-setting/install-sdk2.png">

우측 하단의 show package details을 클릭하여서 알맞는 것들을 체크하고 설치해줍니다.

그리고 문서에 따라 환경 변수 설정을 진행해줍니다.  
터미널 창을 켜서 .bash_profile 파일을 열어 아래 코드를 추가해줍니다.

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

<img src="/assets/react-native-cli-setting/set-bash-profile.png">

이제 환경 변수 설정까지 끝났습니다.

### Project 생성하기

이제 react-native-cli로 프로젝트를 생성해보도록 하겠습니다.

```
react-native init AwesomeProject
```

<img src="/assets/react-native-cli-setting/cocoapod.png">

생성이 완료되고, cocoapod이라는 ios개발에 필요한 것을 설치할 것이냐 묻습니다. y를 입력하고 설치를 진행해주면 생성이 끝납니다.

### Project 실행하기

저는 안드로이드 스마트폰을 사용하기 때문에, 따로 가상머신으로 하지 않겠습니다.  
프로젝트 폴더로 이동하여서, 아래와 같은 명령어로 프로젝트를 실행시킵니다.

```
react-native run-android
```

<img src="/assets/react-native-cli-setting/err1.png">

에러가 나네요..  
안드로이드 환경변수 관련된 에러인거 같은데 뭐가 잘못된걸까요..?  
SDK 설치가 제대로 완료가 안되었었네요..  
설치 후 다시 해봐도 에러가 해결이 안되었습니다..
환경변수가 제대로 설정이 안되었나 확인을 해보도록 하겠습니다.  
.bash_profile을 열어 확인해보니 문서에서 하라는대로 잘 되어있습니다.  
그럼 경로가 잘못된걸까요..?

<img src="/assets/react-native-cli-setting/confirm-sdk-path.png">

SDK 매니저에 들어가서 SDK 경로를 확인해보니 잘못된 것 같진 않습니다..

<img src="/assets/react-native-cli-setting/empty-path.png">

echo로 찍어보니 아무것도 출력이 되지 않네요..

문서를 다시 한 번 읽어보도록 하겠습니다.. 빠트린건 없는지..

> Type source $HOME/.bash_profile to load the config into your current shell. Verify that ANDROID_HOME has been added to your path by running echo $PATH.

이럴수가.. 아래와 같은 명령어를 통해 설정 변경한 것을 로드 시켜줘야한다고 하네요..

```
source $HOME/.bash_profile
```

<img src="/assets/react-native-cli-setting/path.png">

이제 설정이 잘 되었습니다..!  
바로 다시 실행시켜보니 또 에러가 납니다..

<img src="/assets/react-native-cli-setting/err2.png">

그런데 조금 다른 것 같습니다.  
SDK 경로가 조금 이상하게 출력이 되는 것 같습니다.

혹시나해서 프로젝트를 다시 생성해보았습니다.  
역시나 똑같네요..  
뭐가 문제일까요..

에러를 검색해보고 [여기][ref-url-1]를 참고하여서 해결하였습니다!!

<img src="/assets/react-native-cli-setting/import-project.png">

일단 안드로이드 스튜디오를 실행하여서, React Native 프로젝트를 import해줍니다.

<img src="/assets/react-native-cli-setting/sync.png">

그리고 싱크를 맞춰줍니다.

<img src="/assets/react-native-cli-setting/solution.png">

그러면 에러 메시지가 뜹니다.  
SDK 경로에 이상이 있다는 거죠..  
파란 글씨로 되어있는 부분을 클릭하면 에러를 알아서 해결해줍니다.!!

이제 다시 터미널창으로 돌아와서 아래 명령어를 입력해줍니다.

```
react-native start
react-native run-android
```

<img src="/assets/react-native-cli-setting/start.png">
<img src="/assets/react-native-cli-setting/run-android.png">

문서에서는 react-native run-android 만 하면 된다고 했는데, 저는 react-native start로 서버 같은걸 실행시켜줘야하더라구요.

<img src="/assets/react-native-cli-setting/finish.jpeg">

그러면 이렇게 디바이스에 출력이 됩니다.!!

이상 삽질 셋팅하기 였습니다..

감사합니다.

## 레퍼런스

[React Native 공식 문서][docs-url]

<!-- [last-posting]: "https://parkbeommin.github.io/react-native/react-native-setting-expo/"
[docs-url]: "https://facebook.github.io/react-native/docs/getting-started"
[ref-url-1]: "https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found" -->

---
title: "[안드로이드 스튜디오] 함수 오버라이드 시 의미 있는 이름 인자 값 설정하기" 
date: 2019-07-01 17:53:00+09:00
categories: android-studio
toc: true
toc_sticky: true
---
안드로이드 스튜디오를 사용하면서 **자동완성 기능**이 있어서 정말 정말 편리하고 좋게 사용하고 있습니다.  

그런데 콜백 함수를 구현하거나 할 때, 함수도 자동으로 생성이 되는데 인자 값이 의미 없는 변수명으로 되어있는 경우가 있습니다.  

<img src="/assets/match-sdk/no-mean.png" style="width: 100%">

사진과 같이 변수 이름이 p0, p1 처럼 의미 없는 값들로 이루어져있습니다.  
큰 문제가 되는건 아니지만, 의미있는 변수로 되어있다면 좀 더 보기 좋은 코드가 될 것이고 유지보수에도 좋을 것 같습니다.  

이렇게 의미 없는 값으로 나오는 경우는 안드로이드 스튜디오의 **컴파일sdk버전에 맞는 sdk 소스가 설치되어 있지 않은 경우**입니다.  

## compileSdkVersion 확인하기

가장 먼저 본인의 안드로이드 스튜디오의 compileSdkVersion을 확인합니다.  
저의 경우는 28입니다.  

> build.gradle (Module: app)

<img src="/assets/match-sdk/sdk-version.png" style="width: 100%">

## SDK Manager 실행하기

안드로이드 스튜디오 상단 툴바에 있는 아이콘을 클릭하여서 SDK Manager를 실행합니다.  

<img src="/assets/match-sdk/sdk-manager.png" style="width: 100%">

## Sources for Android (version) 설치하기

이제 compileSdkVersion에 맞는 Sources for Android를 설치합니다.  
저의 경우는 Sources for Android 28을 설치했습니다.  

<img src="/assets/match-sdk/set-sdk.png" style="width: 100%">

## 안드로이드 스튜디오 재 실행하기

이제 안드로이드 스튜디오를 재 실행하여서 다시 오버라이드합니다.  

<img src="/assets/match-sdk/mean.png" style="width: 100%">

변수 이름이 sensor, accuracy, event와 같이 의미있는 이름으로 변한 것을 확인할 수 있습니다.

## 레퍼런스

오준석의 안드로이드 생존코딩 코틀린 편 ( 오준석 저 / 한빛미디어 / 2018.10.01 )

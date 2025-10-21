---
title: "[React Native] React Native 알아보기"
date: 2019-07-14 01:16:00+09:00
categories: react-native
toc: true
toc_sticky: true
---

안녕하세요.  
안드로이드 개발 경험만 있던 개발자를 꿈꾸는 한 사람입니다. :smile:  
이 글은 React Native를 처음 시작함과 동시에 작성하는 글입니다.  
따라서 완전 초보자의 시선에서 바라 본 과정이 될겁니다.  
제가 React Native를 시작하게 된 것은 네이버에서 주최하는 [D2 CAMPUS FEST mini][d2-campus-fest-mini-url]에 한 번 도전해보고자 친구들과 함께 주제 선정 중 React Native 기술이 필요한 주제를 골랐기 때문입니다.  
남은 기간이 많지 않기에 일단은 빠르게 습득하는 것을 목표로 하고 있고, 새로운 기술을 습득하게 될 계기를 만들어서 좋습니다. :smile:
우선 React Native란 무엇인지에 대해서 알아보도록 하겠습니다.

## React Native란?

React Native란 무엇일까요..?  
안드로이드 개발을 하면서 React Native라는 말은 많이 들어봤습니다.

_페이스북이 만든거다. 크로스 플랫폼이다. 등등.._

그리고 이런 의문점도 있었습니다.

_근데, React와 React Native는 뭐가 다른거지..? 그냥 웹, 앱 이렇게 구분되는 건가?_

이제 이런 의문점? 흘려들은것?들에 대해서 차근 차근 알아가보도록 하겠습니다.

### 페이스북이 만든거다.

맞습니다!
React Native는 페이스북의 오픈소스 프로젝트입니다.  
한번 배워서 어디서든 써먹자(Learn once, write anywhere)는 페이스북의 철학이 담겨있는 기술입니다.  
오픈소스 프로젝트이기 때문에 이슈들을 해결하거나, 필요한 네이티브 모듈등을 만들어 올리면 오픈소스에 기여할 수 있습니다.

### 크로스 플랫폼이다.

맞습니다!
React Native는 Android와 IOS 개발을 동시에 할 수 있는 크로스 플랫폼입니다.  
보통 Android 따로 IOS 따로 개발하는 것을 Native로 개발한다고 말하는데, 그래서 Native가 붙은 것 같습니다..  
Android와 IOS 개발을 같이 하기 위해 하이브리드 앱의 개념이 생겨났는데, 일반적으로 네이티브에 웹뷰를 띄워 보여주었는데, 속도가 느린 단점이 있어서 React Native가 나오게 되었습니다.

### React와 React Native의 차이점은 뭔가요?

React 또한 페이스북의 오픈소스 프로젝트이고, 웹 개발에 유용한 자바스크립트 라이브러리라고 합니다.  
React Native는 React에서 네이티브 모바일 앱을 만들 수 있게 확장된? 자바스크립트 라이브러리입니다.  
따라서 React의 여러 규칙들을 이용하여서 모바일 앱을 개발할 수 있게 만든 것이 React Native입니다.

## React Native의 장단점

이제 React Native가 Android와 IOS 개발을 동시에 하기 위한 자바스크립트 라이브러리 이며, 페이스북의 오픈소스 프로젝트라는 것을 알았습니다.  
그러면 React Native를 하면 어떤 장단점이 있을까요?
지금부터 알아보도록 하겠습니다.

### 장점

일단, 앞에서 말했던 것처럼 React Native는 크로스 플랫폼입니다.  
즉, Android와 IOS를 자바스크립트로 동시에 개발할 수 있어 엄청난 시간 절약이 됩니다.  
그리고 네이티브 개발을 하는 것과 같이 네이티브 모듈(카메라, GPS 등)을 이용할 수 있습니다.  
그리고 굉장히 솔깃햇던 부분인데, 개발을 하다가 UI를 변경하였을 때, 따로 컴파일을 하지 않아도 라이브 리로딩이 됩니다. ( 안드로이드 개발에선 조금 답답했던 기억이.. )  
그리고 오래된 기술이 아님에도 불구하고, 여러 뛰어난 개발자분들께서 여러 모듈들을 많이 만들어주셔서 리소스가 풍부하고 많은 질의응답이 오간다고 합니다.

전체적으로 봤을 때, **시간 절약**이 주 키워드가 될 것 같습니다.

정리를 해보면, 다음과 같습니다.

1. 한 가지 언어(JavaScript)로 Android와 IOS를 동시에 개발할 수 있다.
2. 네이티브 모듈을 이용하여서 개발할 수 있다.
3. Live Reloading 기능이 있어서, 컴파일을 따로 하지 않아도 된다.
4. 개발 생태계 활동이 활발하다.

### 단점

좋을 것만 같지만, 단점은 어디에나 존재합니다.

제공되는 기능에 한계가 있을 수 있습니다.  
필요한데 없는 기능이라면, Android나 IOS에서 Native로 개발을 진행해야합니다.  
그리고 Android와 IOS는 각각 다른 특징들을 가지고 있기 때문에, 특정 기능에 있어서는 각 플랫폼별 API를 사용해야합니다.  
그리고 비즈니스 로직이나 뷰 스택이 많아지게 되면, 성능 저하가 있습니다.

전체적으로 봤을 때, **네이티브 개발의 완전한 대체에는 한계**가 있는 것 같습니다.

정리를 해보면, 다음과 같습니다.

1. 제공되는 기능에 한계가 있어, Native개발이 필요할 수 있다.
2. 각 플랫폼별 API를 사용해야 하는 경우도 있다.
3. 비즈니스 로직이나 뷰 스택이 많아지면, 성능 저하가 있다.

감사합니다.

## 레퍼런스

[https://starvinglion-rn.tistory.com/2][ref-url-1]
[https://tansfil.tistory.com/57][ref-url-2]
[https://zeddios.tistory.com/409][ref-url-3]

<!-- [d2-campus-fest-mini-url]: "http://d2campusfest.kr/7th/"
[ref-url-1]: "https://starvinglion-rn.tistory.com/2"
[ref-url-2]: "https://tansfil.tistory.com/57"
[ref-url-3]: "https://zeddios.tistory.com/409" -->

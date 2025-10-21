---
title: '웹워커와 서비스워커'
date: 2023-06-08 09:23:00+09:00
categories: web frontend
---

> Web Worker와 Service Worker는 Web API 중 하나이다.  
> Web Worker와 Service Worker는 웹 애플리케이션에서 백그라운드 작업을 수행하기 위한 기술이다.

<img src="/assets/web/web-worker-and-service-worker.avif">

출처: [web.dev][이미지출처1]

## Web Worker API

> 웹 워커(Web worker)는 스크립트 연산을 웹 어플리케이션의 주 실행 스레드와 분리된 별도의 백그라운드 스레드에서 실행할 수 있는 기술입니다. 웹 워커를 통해 무거운 작업을 분리된 스레드에서 처리하면 주 스레드(보통 UI 스레드)가 멈추거나 느려지지 않고 동작할 수 있습니다.  
> \- MDN web docs -

### 웹 애플리케이션의 반응성 향상에 도움을 주는 Web Worker

자바스크립트는 싱글 스레드이며 call stack에 task를 담아 one by one으로 처리하기 때문에 부하가 많은 작업에 취약합니다.

브라우저 런타임 시 이러한 취약점을 보완하기 위해 Web Worker API가 등장하게 되었습니다. Web Worker는 주 스레드와 별도의 백그라운드 스레드에서 실행되어, 주 스레드가 차단되지 않고 다른 작업을 수행할 수 있어 웹 애플리케이션의 반응성 향상에 도움을 줍니다.

그리고 Web Worker는 메시지 전달을 통해 주 스레드와 통신하고 작업 결과를 반환할 수 있어서 웹 애플리케이션의 다른 부분과 상호작용할 수 있습니다.

Web Worker도 자바스크립트 실행환경을 제공하는 런타임 스레드이기에 어떠한 작업이든 수행할 수 있습니다. 다만 DOM을 직접 조작을 하거나 window객체의 일부 메서드와 속성은 사용이 불가합니다.

## Service Worker API

> 서비스 워커는 웹 응용 프로그램, 브라우저, 그리고 (사용 가능한 경우) 네트워크 사이의 프록시 서버 역할을 합니다. 서비스 워커의 개발 의도는 여러가지가 있지만, 그 중에서도 효과적인 오프라인 경험을 생성하고, 네트워크 요청을 가로채서 네트워크 사용 가능 여부에 따라 적절한 행동을 취하고, 서버의 자산을 업데이트할 수 있습니다. 또한 푸시 알림과 백그라운드 동기화 API로의 접근도 제공합니다.
> \- MDN web docs -

### 캐싱을 통한 효과적인 오프라인 경험을 주는 Service Worker

Service Worker는 이벤트 기반 워커로서 Javscript 파일의 형태로 존재합니다.

네트워크 요청을 가로채서 수정하고 컨트롤할 수 있으며, 캐싱을 통해 오프라인 환경에서도 앱이 동작할 수 있도록 컨트롤할 수 있습니다.

Service Worker는 DOM에 접근할 수 없으며, 자바스크립트의 메인 스레드와 다른 스레드에서 동작하기 때문에 블락되지 않습니다.(no-blocking)

비동기적으로 동작하도록 설계되었으며, 동기처리API와 같은 XHR, Web Storage등은 Service Worker에서 사용할 수 없습니다.

자바스크립트 모듈을 동적으로 import할 수 없기때문에 global scope로 선언하여 사용해야합니다.

Service Worker는 네트워크 요청을 가로채 처리할 수 있기때문에 중간자 공격등에 취약할 수 있어서 보안상의 이유로 HTTPS에서만 동작합니다. 일부 브라우저에서는 private mode에서도 동작하지 않을 수 있습니다.

## Web Worker vs Service Worker

Web Worker와 Service Worker는 둘 다 웹앱의 사용성을 증가시키기 위한 API입니다.  
메인 스레드를 블록하지 않고 추가 스레드에서 실행되는 공통점을 갖고 있습니다.

Web Worker는 한 페이지 내에서 여러개를 생성하여 활용할 수 있지만, Service Worker는 하나의 도메인에 등록된 scope내에서 활용가능합니다.  
Web Worker의 수명은 웹페이지가 닫히면 끝나지만, Service Worker는 웹페이지가 닫혀도 백그라운드에서 유지됩니다.

## 참고 자료

-   [블로그][참고자료1]
-   [블로그][참고자료4]
-   [MDN Web Worker API][참고자료2]
-   [MDN Service Worker API][참고자료3]

[참고자료1]: https://velog.io/@oneook/Web-Worker%EC%99%80-Service-Worker%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
[참고자료2]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[참고자료3]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[참고자료4]: https://velog.io/@yrnana/Web-Worker%EC%99%80-Service-Worker
[이미지출처1]: https://web.dev/workers-overview/

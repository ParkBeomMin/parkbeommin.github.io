---
title: 서로 다른 도메인간 SSO 인증 구현
tags: SSO SAML JWT 인증 아키텍처
date: 2025-10-23 08:58:59
categories: 인증
---


<p style="text-align:center;"><img src="/images/sso/1.jpeg" alt="SSO"></p>


# 🔐 SSO란?

SSO란 Single Sign-On(🔊 싱글 사인온)의 약자로, 한 번의 로그인으로 여러 애플리케이션이나 웹사이트에 접속할 수 있도록 하는 통합 인증 기술입니다.

> 예를 들어, 바(bar)에 입장한 손님이 술을 한 잔 더 주문할 때마다 신분증을 다시 제시해야 한다면 매우 번거로울 것입니다.  
하지만 대부분의 식당에서는 입장 시 한 번만 신원을 확인하고, 이후에는 자유롭게 주문할 수 있습니다.  
이와 같이 SSO는 사용자의 신원을 한 번만 확인한 뒤 여러 서비스에서 인증 정보를 재사용하도록 해줍니다.  

# 🧩 SSO의 표준 구조 (SAML 기반)

SSO의 표준 설계는 아래와 같습니다.

1. SP(Service Provider) → IdP(Identity Provider)로 로그인 요청
2. IdP는 사용자 인증 후 SAML(Security Assertion Markup Language) 프로토콜을 통해 서명된 인증 정보(SAML Assertion)를 SP로 전달
3. SP는 전달받은 인증 정보를 검증하고 자체 로그인 처리

## 예시 시나리오

### 환경 구성
> www.aaa.com (SP)  
join.aaa.com (IdP)  
www.bbb.com (SP)  

### 시나리오 1 - www.aaa.com에서 최초 로그인
1. www.aaa.com에서 로그인 버튼 클릭  
2. www.aaa.com/api/saml/login 호출  
3. www.aaa.com/api/saml/login에서 SAMLRequest 정보 생성 후 join.aaa.com/api/authorize?SAMLRequest= 로 이동하도록 응답  
4. join.aaa.com/api/authorize에서 Redis에 SAMLRequest값 저장 후 쿠키값이 없으면 join.aaa.com/login?rid= 페이지로 이동  
5. join.aaa.com/login 페이지에서 아이디, 비밀번호 입력 후 로그인 버튼 클릭  
6. join.aaa.com/api/login api 호출  
7. join.aaa.com/api/login DB에서 값 조회 후 응답 및 쿠키값(httpOnly, IdP 로그인 확인용) 생성, rid로 레디스에서 값 조회 및 AuthnRequest 인증 후 SAMLResponse생성하여 form데이터로 담은 페이지(자동 POST HTML 반환) 호출  
8. form데이터로 담은 페이지로 www.aaa.com/api/auth/success 호출되어 인증 정보 검증 후 JWT 토큰 발급 및 페이지 이동하도록 응답  
### 시나리오 2 - www.aaa.com에서 로그인 이후, www.bbb.com 접속했을 때
1. www.bbb.com 최초 접근  
2. www.bbb.com에 발급된 로그인 쿠키가 없음(ex. jwt)  
3. www.bbb.com/api/saml/login 호출  
4. www.bbb.com/api/saml/login에서 SAMLRequest 정보 생성 후 join.aaa.com/api/authorize?SAMLRequest= 로 이동하도록 응답  
5. join.aaa.com/api/authorize에서 쿠키 여부 확인 후 AuthnRequest 인증 후 SAMLResponse생성하여 form데이터로 담은 페이지(자동 POST HTML 반환) 호출  
6. form데이터로 담은 페이지로 www.bbb.com/api/auth/success 호출되어 인증 정보 검증 후 JWT 토큰 발급 및 페이지 이동하도록 응답  



# 🧠 실제 구현: 커스텀 Token Relay 기반 SSO
위의 표준 구조(SAML 기반)가 정석이지만,
제가 진행한 프로젝트에서는 기존 서비스(B도메인)의 코드를 최소한으로 수정해야 하는 제약이 있었습니다.
위 내용이 표준이고 정석이지만, 제가 구현했던 서비스는 조금 다른 구조로 SSO를 구현하였습니다.
> 즉, SAML 프로토콜 대신 JWT 기반 Token Relay 방식의 커스텀 SSO를 선택했습니다.


<p style="text-align:center;"><img src="/images/sso/2.jpeg" alt="SSO"></p>

## 🏗️ 배경
- A도메인(www.a.com)과 B도메인(www.b.com)이 별도 회원 DB를 가진 상태로 운영 중
- 통합 로그인(IdP) 서버를 join.a.com에 구축
- B서비스는 최대한 기존 로직 유지해야 함
- B서비스는 로컬스토리지로 로그인 정보를 가져옴
- 향후 회원 분리도 고려해야 함

## 구현 설계

1. 통합 로그인 서비스에서 로그인 시도  
2. 로그인 성공 시 JWT 토큰 발급 및 A서비스 쿠키 생성
3. B서비스 로그인 처리를 위한 암호화 토큰 생성 및 페이지 호출    
ex) www.b.com/connect-login?encrypted=abc  
4. B서비스 서버에서 토큰 복호화 후 시크릿 키 검증
5. 검증 성공 시 B서비스 JWT 발급 및 쿠키 생성 → 스토리지 저장
6. 최종적으로 redirectUrl로 이동

위 구현 설계에서는 2가지 문제점이 존재했습니다.

### ⚠️ 문제점 및 개선 
#### 1️⃣ 서로 다른 도메인 간 스토리지 공유 불가
초기에는 Iframe 내에서 B서비스 로그인 처리를 시도했지만,
브라우저의 SameSite 정책으로 인해
타 도메인 쿠키와 스토리지가 반영되지 않는 문제가 발생했습니다.
(로컬 테스트에서는 정상 작동했으나, 실제 운영 환경에서는 실패)

👉 해결: Iframe 방식 대신, B서비스 로그인 페이지로 직접 리다이렉트하도록 변경.

#### 2️⃣ 보안 리스크 (URL 기반 토큰 전달)

URL은 브라우저 히스토리, 로그, 네트워크 기록 등에 남기 때문에
암호화되어 있더라도 토큰 탈취 위험이 존재합니다.

👉 해결: Redis 기반의 일회성 검증(One-Time Token) 구조 도입  
- 로그인 성공 시 Redis에 일회성 검증 값 저장 (TTL = 10초)  
- B서비스 로그인 시 해당 값으로 검증 후 즉시 폐기
  










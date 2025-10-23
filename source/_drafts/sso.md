---
title: 서로 다른 도메인간 SSO 인증
date: 2025-10-23 08:58:59
tags: SSO
categories: 
---

# SSO

SSO란 Single Sign-On(🔊 싱글 사인온)의 약자로, 한 번의 로그인으로 여러 애플리케이션이나 웹사이트에 접속할 수 있도록 하는 통합 인증 기술입니다.

> 이미 바에 입장한 고객이 추가로 술을 구매하려고 할 때마다 나이를 증명하기 위해 신분증을 제시해야 한다고 상상해 보세요. 일부 고객은 계속되는 확인에 빠르게 불만을 표시하고 자신의 음료를 몰래 가져와 이러한 조치를 우회하려고 할 수도 있습니다.  
그러나 대부분의 식당에서는 고객의 신원을 한 번만 확인한 다음 저녁 시간 내내 고객에게 술을 제공합니다. 이는 SSO 시스템과 다소 비슷합니다. 사용자는 ID를 계속해서 확인받는 대신 ID를 한 번 확인받은 다음 여러 서비스에 액세스할 수 있습니다.

SSO의 표준 설계는 아래와 같습니다.

1. SP(Service Provider)에서 IdP(Identity Provider)로 로그인 요청
2. 사용자 인증 후, SAML(Security Assertion Markup Language) 프로토콜을 통해 서명된 인증 정보(SAML Assertion)를 SP로 전달
3. SP에서 인증 정보를 가지고 로그인 처리

프로세스 예시는 아래와 같습니다.

> [환경]  
www.aaa.com (SP)  
join.aaa.com (IdP)  
www.bbb.com (SP)  
[시나리오 1 - www.aaa.com에서 최초 로그인]  
www.aaa.com에서 로그인 버튼 클릭  
www.aaa.com/api/saml/login 호출  
www.aaa.com/api/saml/login에서 SAMLRequest 정보 생성 후 join.aaa.com/api/authorize?SAMLRequest= 로 이동하도록 응답(302 Redirect)  
join.aaa.com/api/authorize에서 Redis에 SAMLRequest값 저장 후 쿠키값이 없으면 join.aaa.com/login?rid= 페이지로 이동(302 Redirect)  
join.aaa.com/login 페이지에서 아이디, 비밀번호 입력 후 로그인 버튼 클릭  
join.aaa.com/api/login api 호출  
join.aaa.com/api/login DB에서 값 조회 후 응답 및 쿠키값(httpOnly, IdP 로그인 확인용) 생성, rid로 레디스에서 값 조회 및 AuthnRequest 인증 후 SAMLResponse생성하여 form데이터로 담은 페이지(자동 POST HTML 반환) 호출  
form데이터로 담은 페이지로 www.aaa.com/api/auth/success 호출되어 인증 정보 검증 후 JWT 토큰 발급 및 페이지 이동하도록 응답(302 Redirect)  
[시나리오 2 - www.aaa.com에서 로그인 이후, www.bbb.com 접속했을 때]
www.bbb.com 최초 접근  
www.bbb.com에 발급된 로그인 쿠키가 없음(ex. jwt)  
www.bbb.com/api/saml/login 호출  
www.bbb.com/api/saml/login에서 SAMLRequest 정보 생성 후 join.aaa.com/api/authorize?SAMLRequest= 로 이동하도록 응답(302 Redirect)  
join.aaa.com/api/authorize에서 쿠키 여부 확인 후 AuthnRequest 인증 후 SAMLResponse생성하여 form데이터로 담은 페이지(자동 POST HTML 반환) 호출  
form데이터로 담은 페이지로 www.bbb.com/api/auth/success 호출되어 인증 정보 검증 후 JWT 토큰 발급 및 페이지 이동하도록 응답(302 Redirect)  

위 내용이 표준이고 정석이지만, 제가 구현했던 서비스는 조금 다른 구조로 SSO를 구현하였습니다.
(커스텀 Token Relay 방식 SSO)






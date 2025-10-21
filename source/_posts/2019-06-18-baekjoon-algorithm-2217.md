---
title: "BOJ 2217[백준 2217]"
date: 2019-06-18 01:49:00+09:00
categories: algorithm baekjoon greedy
---
[로프][url]

## 조건

1. N개의 로프가 주어진다.
2. 각각의 로프는 들 수 있는 중량이 다르다.
3. 로프를 병렬로 연결하면, 드는 물체의 중량을 고르게 나눌 수 있다.
4. 각각의 로프는 한 개씩 존재한다.
5. 모든 로프를 반드시 다 사용해야하는 것은 아니다.

## 결과

- 로프들을 이용하여 들어올릴 수 있는 물체의 최대 중량

## 해결 방법

- 각각의 로프에 모두 동일한 중량이 가해진다는 것이 핵심이다.
1. 들어올릴 수 있는 최대 중량을 내림차순으로 정렬한다.
2. 첫 번째 로프의 최대 중량으로 생각하면, 최대 중량 = ( 첫 번째 로프가 들 수 있는 무게 ) * ( N ) 
2. 두 번째 로프의 최대 중량으로 생각하면, 최대 중량 = ( 두 번째 로프가 들 수 있는 무게 ) * ( N - 1 )
3. N번째 로프까지 반복하면서, 각각의 최대 중량을 비교하여 본다.

## 핵심 코드

```
Arrays.sort(rope);
for(int i = 0; i < N; i++) {
	w = Math.max(w, rope[i]*(N-i));
}
System.out.println(w);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2217
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_2217.java

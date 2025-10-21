---
title: "BOJ 2193[백준 2193]"
date: 2019-06-23 01:27:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[이친수][url]

## 조건

1. 0과 1로만 이루어진다.
2. 0으로 시작하지 않는다.
3. 1은 연속으로 나올 수 없다.
4. 1 <= N <= 90

## 결과

- N자리 이친수의 갯수

## 해결 방법

- N일 때, 이친수의 갯수의 규칙을 찾는다.
1. N = 1 일 때, 1 -> 1개
2. N = 2 일 때, 10 -> 1개
3. N = 3 일 때, 100, 101 -> 2개
4. N = 4 일 때, 1000, 1001, 1010 -> 3개
5. 여기까지 보면, N이 2이상일 때는 무조건 10으로 시작하는 것을 알 수 있다.
6. 그리고 N이 4일 때를 보면, 10**00**, 10**01**, 10**10**에서 N이 3일 때 뒷 2자리, N이 2일 때 뒷 2자리임을 알 수 있다.
7. N = 5 일 때, 10**000**, 10**001**, 10**010**, 10**100**, 10**101** -> 5개

따라서, dp[n] = dp[n-1] + dp[n-2]

그리고, N의 범위가 최대 90까지이기 때문에, 정수형의 범위를 벗어나게 됩니다( 점화식이 피보나치이기 때문에!! ).

## 핵심 코드

```
long[] result = new long[N+1];
result[0] = 0;
result[1] = 1; // n = 1, 1
for(int i = 2; i <= N; i++) {
	result[i] = result[i-1] + result[i-2];
}
System.out.println(result[N]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2193
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_2193.java

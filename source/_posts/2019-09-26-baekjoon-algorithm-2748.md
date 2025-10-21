---
title: "BOJ 2748[백준 2748]"
date: 2019-09-26 09:13:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[피보나치 수 2][url]

## 조건

1. n은 90보다 작거나 같은 자연수이다.
2. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.
3. 식으로 표현하면 Fn = Fn-1 + Fn-2 (n>=2)이다.

## 결과

- n번째 피보나치 수.

## 해결 방법

- 문제에서 주어진 식을 그대로 활용한다.
- 주의해야할 점은 n이 최대 90이기 때문에, 자료형을 신경써줘야한다.

## 핵심 코드

```
long[] dp = new long[n+1];
dp[0] = 0;
dp[1] = 1;
for(int i = 2; i <= n; i++) {
	dp[i] = dp[i-1] + dp[i-2];
}
System.out.print(dp[n]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2748
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/2748/src/Main.java

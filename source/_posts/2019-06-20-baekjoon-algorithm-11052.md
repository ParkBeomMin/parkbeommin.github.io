---
title: "BOJ 11052[백준 11052]"
date: 2019-06-20 11:42:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[카드구매하기][url]

## 조건

1. 카드는 카드팩의 형태로만 구매할 수 있다.
2. 카드의 갯수가 적은 팩이더라도 가격이 비싸면 높은 등급의 카드가 많이 들어있다.
3. 카드팩의 종류는 카드 1개가 포함된 카드팩, 카드 2개가 포함된 카드팩, ... 카드 N개가 포함된 카드팩과 같이 총 N가지가 존재한다.

## 결과

- 카드 N개를 갖기 위해 지불해야 하는 금액의 최댓값

## 해결 방법

- 카드 N개를 구매할 때의 경우를 찾고 식으로 만든다.
1. 카드 1개가 들어있는 팩을 구매하고, 카드를 N-1개 구매한다.
2. 카드 2개가 들어있는 팩을 구매하고, 카드를 N-2개 구매한다.
3. 카드 N개가 들어있는 팩을 구매하고, 카드를 N-N개 구매한다.

따라서, dp[n] = cardPackPrice[n] + dp[n-i]

## 핵심 코드

```
for(int i = 1; i <= N; i++) {
	for(int j = 1; j <= i; j++) {
		result[i] = Math.max(result[i], result[i - j] + price[j]);
	}
}
System.out.println(result[N]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/11052
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_11052.java

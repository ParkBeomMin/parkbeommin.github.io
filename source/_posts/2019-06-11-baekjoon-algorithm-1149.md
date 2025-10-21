---
title: "BOJ 1149[백준 1149]"
date: 2019-06-11 22:25:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[RGB거리][url]

## 조건

1. 집을 빨강, 초록, 파랑중에 하나로 칠한다.
2. 이웃된 집은 같은 색으로 칠할 수 없다.

## 결과

- 모든 집에 색을 칠할 때 드는 최소 비용

## 해결 방법

- n번째 집이 빨강일 때, 초록일 때, 파랑일 때 드는 최소 값을 구한다.
1. dp[n, r] = min(dp[n-1, g], dp[n-1, b]) + price[n, r]
2. dp[n, g] = min(dp[n-1, r], dp[n-1, b]) + price[n, g]
3. dp[n, b] = min(dp[n-1, g], dp[n-1, r]) + price[n, b]

## 핵심 코드

```
for(int i = 0; i < house_num; i++) {
	if(i == 0) {
		result[i][0] = price[i][0];
		result[i][1] = price[i][1];
		result[i][2] = price[i][2];				
	}else {
		result[i][0] = Math.min(result[i-1][1], result[i-1][2]) + price[i][0];
		result[i][1] = Math.min(result[i-1][0], result[i-1][2]) + price[i][1];
		result[i][2] = Math.min(result[i-1][1], result[i-1][0]) + price[i][2];
	}
}
System.out.println(Math.min(result[house_num-1][0], Math.min(result[house_num-1][1], result[house_num-1][2])));
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1149
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_1149.java

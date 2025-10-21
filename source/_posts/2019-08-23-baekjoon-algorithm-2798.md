---
title: "BOJ 2798[백준 2798]"
date: 2019-08-23 04:24:00+09:00
categories: algorithm baekjoon brute-force
---
[블랙잭][url]

## 조건

1. N(3 <= N <= 100)개의 카드가 주어진다.
2. 딜러가 숫자 M(10 <= M <= 300,000)을 외친다.
3. 합이 M을 넘지 않는 카드 3장을 찾을 수 있는 경우만 주어진다.

## 결과

- M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합.

## 해결 방법

- 브루트포스 알고리즘으로, 모든 경우를 다 해본다.
1. 카드를 정렬한다.
2. 카드를 처음부터 3개를 선택하여 합을 구한다. 이 후 한장씩 바꿔가면서 합을 구한다.
2. 카드의 합이 M보다 같거나 작고, 이전에 선택했는 카드의 합보다 크거나 같다면 결과 값을 대체한다.

## 핵심 코드

```
int result = 0;
		for(int i = 0; i < N-2; i++) {
			for(int j = i+1; j < N-1; j++) {
				for(int k = j+1; k < N; k++) {
					int sum = card[i] + card[j] + card[k];
					if(sum <= M && result <= sum) {
						result = sum;
					}
				}
			}
		}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2798
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/2798/src/Main.java

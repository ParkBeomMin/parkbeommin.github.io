---
title: "BOJ 2231[백준 2231]"
date: 2019-08-25 03:50:00+09:00
categories: algorithm baekjoon brute-force
---
[분해합][url]

## 조건

1. 자연수 N(1 <= N <= 100000)이 주어진다.
2. 어떤 자연수 M이 있을 때, M의 분해합은 M과 M을 이루는 각 자릿수의 합이다.
3. 어떤 자연수 K의 분해합이 M일 경우, K는 M의 생성자이다.
4. 생성자가 없는 경우 결과 값은 0이다.

## 결과

- N의 가장 작은 생성자.

## 해결 방법

- 브루트포스 알고리즘으로, 모든 경우를 다 해본다.
1. 1부터 N까지 분해합을 구한다.
2. 분해합과 N을 비교하여, 같으면 생성자로 저장한다. 그리고 이전 생성자와 비교하여 작은 값을 선택한다.
3. 생성자가 없다면, 0을 출력한다.

## 핵심 코드

```
for(int i = 0; i < N; i++) {
			int sum = 0;
			if(i / 100000 != 0) {
				sum = i + (i / 100000) + ((i%100000)/10000) + ((i%10000)/1000) + ((i%1000)/100) + ((i%100)/10) + i%10;
			}else if(i / 10000 != 0) {
				sum = i + ((i%100000)/10000) + ((i%10000)/1000) + ((i%1000)/100) + ((i%100)/10) + i%10;
			}else if(i / 1000 != 0) {
				sum = i + ((i%10000)/1000) + ((i%1000)/100) + ((i%100)/10) + i%10;
			}else if(i / 100 != 0) {
				sum = i + ((i%1000)/100) + ((i%100)/10) + i%10;
			}else if( i / 10 != 0) {
				sum = i + ((i%100)/10) + i%10;
			}else {
				sum = i + i%10;
			}
			if(sum == N && result > i) {
				result = i;
			}
		}
		if(result == N) {
			result = 0;
		}
		System.out.print(result);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2231
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/2231/src/Main.java

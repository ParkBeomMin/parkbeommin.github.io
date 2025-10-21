---
title: "BOJ 15953[백준 15953]"
date: 2019-08-30 05:12:00+09:00
categories: algorithm baekjoon
---
[상금 헌터][url]

## 조건

1. 가정한 횟수 T(1 <= T <= 1000)가 주어진다.
2. 각 가정별 1회 등수(a)와 2회 등수(b)가 주어진다. (0 <= a <= 100, 0 <= b <= 64)
3. 1회와 2회의 순위별 상금과 상금 부여 인원이 주어진다.

## 결과

- 각 가정별 획득 상금.

## 해결 방법

- 가정한 등수가 받을 수 있는 상금을 찾아야 한다.
1. 각 가정별 1회와 2회의 등수에 대해서 상금을 받을 수 있는지 비교한다.
2. 1회와 2회에서 받을 수 있는 상금을 합한다.
3. 합한 상금을 출력한다.

## 핵심 코드

```
for(int i = 0; i < T; i++) {
	int a = input[i][0];
	int b = input[i][1];
	if(a <= 21 && a > 0) {
		if( a == 1) {
			result[i] += first[0];
		}else if( a > 1 && a <= 3 ) {
			result[i] += first[1];
		}else if( a > 3 && a <= 6 ) {
			result[i] += first[2];
		}else if( a > 6 && a <= 10 ) {
			result[i] += first[3];
		}else if( a > 10 && a <= 15 ) {
			result[i] += first[4];
		}else if( a > 15 && a <= 21 ) {
			result[i] += first[5];
		}
	}
	if(b <= 31 && b > 0) {
		if( b == 1) {
			result[i] += second[0];
		}else if( b > 1 && b <= 3 ) {
			result[i] += second[1];
		}else if( b > 3 && b <= 7 ) {
			result[i] += second[2];
		}else if( b > 7 && b <= 15 ) {
			result[i] += second[3];
		}else if( b > 15 && b <= 31 ) {
			result[i] += second[4];
		}
	}
}

for(int i = 0; i < T; i++) {
	System.out.println(result[i]);
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/15953
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/15953/src/Main.java

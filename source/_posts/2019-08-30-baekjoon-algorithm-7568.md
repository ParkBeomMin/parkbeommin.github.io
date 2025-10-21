---
title: "BOJ 7568[백준 7568]"
date: 2019-08-30 04:32:00+09:00
categories: algorithm baekjoon brute-force
---
[덩치][url]

## 조건

1. 전체 사람의 수 N(2 <= N <= 50)이 주어진다.
2. 각 사람별 몸무게(x)와 키(y)가 주어진다. (10 <= x,y <= 200)
3. 두 사람 A 와 B의 덩치가 각각 (x,y), (p,q)라고 할 때 x>p 그리고 y>q 이라면 우리는 A의 덩치가 B의 덩치보다 **더 크다**고 말한다.
4. N명의 집단에서 각 사람의 덩치 등수는 자신보다 더 "큰 덩치"의 사람의 수로 정해진다.
5. 만일 자신보다 더 큰 덩치의 사람이 k명이라면 그 사람의 덩치 등수는 k+1이 된다. 이렇게 등수를 결정하면 같은 덩치 등수를 가진 사람은 여러 명도 가능하다.

## 결과

- 입력에 나열된 사람의 덩치 등수

## 해결 방법

- 브루트포스 알고리즘으로, 모든 경우를 다 해본다.
1. 1부터 N까지 키와 몸무게를 비교한다.
2. 덩치가 큰 사람이 있다면 해당 위치의 등수를 1 증가한다.
3. 등수가 1등부터 시작이기 때문에 전체 등수에 1씩 더해주고 출력한다.

## 핵심 코드

```
for (int i = 0; i < N; i++) {
	int weight = arr[i][0];
	int height = arr[i][1];
	for (int j = 0; j < N; j++) {
		if (weight < arr[j][0] && height < arr[j][1]) {
			result[i] = result[i] + 1;
		}
	}
}
for (int i = 0; i < N; i++) {
	System.out.print(result[i]+1 + " ");
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/7568
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/7568/src/Main.java

---
title: "BOJ 2675[백준 2675]"
date: 2019-10-08 09:41:00+09:00
categories: algorithm baekjoon string-handling
---
[문자열 반복][url]

## 문제파악

간단하게 파악할 수 있습니다.  
문자열 S와 반복될 수 R이 들어오면, 문자열 S의 각 문자를 R번 반복해서 출력시키면 됩니다.  
예를 들어 S=ABC, R=3 이라면, AAABBBCCC가 출력되게 하면 됩니다.

## 해결 방법

문자열의 문자를 돌면서 substring으로 잘라서 R번씩 result 문자열에 붙여주도록 했습니다.

## 핵심 코드

```
static String makeRepeatString(String s, int n) {
	String result = "";
	for(int i = 0; i < s.length(); i++) {
		for(int j = 0; j < n; j++) {
			result += s.substring(i, i+1);
		}
	}
	return result;
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2675
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/2675/src/Main.java

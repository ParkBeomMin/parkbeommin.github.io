---
title: "BOJ 1003[백준 1003]"
date: 2019-09-26 10:19:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[피보나치 함수][url]

## 조건

1. n은 40보다 작거나 같은 자연수이다.
2. 0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1이다. 그 다음 2번째 부터는 바로 앞 두 피보나치 수의 합이 된다.
3. 식으로 표현하면 Fn = Fn-1 + Fn-2 (n>=2)이다.

## 결과

- n번째 피보나치 수를 구할 때, 0과 1이 각각 몇번 호출되는지.

## 해결 방법

- 문제에서 주어진 코드를 그대로 활용하면, 재귀함수이기 때문에 시간 초과가 뜬다.
- 0과 1이 호출되는 것 또한, 피보나치 수를 구하는 방법과 같다.

## 핵심 코드

```
for (int j = 0; j <= num; j++) {
	if(j == 0) {
		dp_zero[j] = 1;
		dp_one[j] = 0;
	}else if(j == 1) {
		dp_zero[j] = 0;
		dp_one[j] = 1;
	}else {
		dp_zero[j] = dp_zero[j-1] + dp_zero[j-2];
		dp_one[j] = dp_one[j-1] + dp_one[j-2];	
	}			
}
System.out.println(dp_zero[num] + " " + dp_one[num]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1003
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/1003/src/Main.java

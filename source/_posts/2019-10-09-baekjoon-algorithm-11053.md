---
title: "BOJ 11053[백준 11053]"
date: 2019-10-09 15:30:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[가장 긴 증가하는 부분 수열][url]

## 문제파악

일단 저는 [여기]를 참고했습니다..   
수열이 주어지고, 그 수열의 부분 수열에서 값이 증가하는 부분 수열, 그리고 그 중 가장 긴 부분 수열의 길이를 구하는 문제입니다.  

## 해결 방법

배열에 담긴 수를 돌면서, 가장 긴 증가하는 부분 수열의 길이를 구해봅니다.  
배열의 0번째 인덱스인 경우에는 하나이기 때문에 dp[0] = 1로 초기화를 해줍니다.  
그리고 dp[1~n]도 최소 1개씩은 가질 수 있기 때문에 1로 초기화 해줍니다.  
이제 배열의 1번째 인덱스의 경우를 보면, 증가하는 수열이 되야하기 때문에 0번째 인덱스와 1번째 인덱스를 비교해줍니다.  
1번째 인덱스의 값이 더 크고 dp[1]이 dp[0] + 1 보다 작다면, dp[1] = dp[0] + 1이 됩니다.  
여기서 dp[1]이 dp[0] + 1 보다 작아야된다는 조건은 인덱스의 값을 비교했을 때, 계속 증가해야하기 때문입니다.  

## 핵심 코드

```
dp[0] = 1;
for(int i = 1; i < n; i++) {
	dp[i] = 1;
	for(int j = 0; j < i; j++) {
		if(arr[i] > arr[j] && dp[i] < dp[j] + 1) {
			dp[i] = dp[j] + 1;
		}
	}
	result = Math.max(result, dp[i]);
}
System.out.print(result);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/11053
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/11053/src/Main.java
[여기]: https://www.acmicpc.net/board/view/42010

---
title: "BOJ 1463[백준 1463]"
date: 2019-06-10 05:20:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[1로 만들기][url]

이 문제는 다이나믹 프로그래밍 문제로, bottom-up 방식으로 문제를 해결하였습니다. 
작은 값에서 부터 시작해서 큰 값으로 갈수록, 작은 값이었을 때 결과 값을 활용하는 방법입니다.
1. 입력 값 +1의 크기로 배열을 만든다.(시작값을 1로 하기 위해서, array[0]은 쓰지 않는다.)
2. 1일 때는 결과 값이 0이므로, array[1]에 0을 넣는다.
3. array[i]에 array[i-1] + 1을 넣는다.
4. i가 2로 나누어 떨어지면, array[i]에 array[i]와 array[i/2]+1 중 작은 값을 넣는다.
5. i가 3으로 나누어 떨어지면, array[i]에 array[i]와 array[i/3]+1 중 작은 값을 넣는다.
6. 3-5번을 n까지 반복한다.
7. array[n]을 출력한다.


핵심코드는 다음과 같습니다.
```
for(int i = 1; i <= n; i++) {
	if(i == 1) {
		result[i] = 0;
	}else {
		result[i] = result[i-1] + 1;
		if(i%2 == 0) {
			result[i] = Math.min(result[i], result[i/2] + 1);
		}
		if(i%3 == 0) {
			result[i] = Math.min(result[i], result[i/3] + 1);
		}
	}
}
System.out.println(result[n]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1463
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_1463.java

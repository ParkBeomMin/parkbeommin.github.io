---
title: "BOJ 17298[백준 17298]"
date: 2019-10-08 22:40:00+09:00
categories: algorithm baekjoon stack
---
[오큰수][url]

## 문제파악

아마 분류가 스택이 아니었으면, 문자열 탐색하면서 풀어보려고 시도해봤을 것 같네요..  
오큰수를 구하는 건데 오큰수는 **Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수**라고 정의되어있습니다.
따라서 [3, 5, 2, 7]의 경우에 3의 오큰수는 [5, 2, 7] 중 3보다 크면서 가장 왼쪽에 있는 수인 5가 됩니다.  

## 해결 방법

처음 입력 받아서 수열을 스택에 쌓아두고, 하나씩 꺼내면서 다른 스택에 있는 수와 비교해보는 방식으로 해결했습니다.  
처음 입력 받은 스택을 왼쪽 스택, 다른 스택을 오른쪽 스택이라고 하겠습니다.  
왼쪽 스택에서 처음 값을 꺼내면, 오른쪽 스택이 비어있으므로 -1이 되고 왼쪽 스택에서 꺼낸 값을 오른쪽 스택에 넣어줍니다.  
이제 다시 왼쪽 스택에서 값을 꺼내고, 오른쪽 스택에서 값을 꺼내 비교해줍니다.  
여기서 오른쪽 스택에 있는 값이 더 크다면, 그 값이 오큰수가 되고 오른쪽 스택에서 꺼낸 값과 왼쪽 스택에서 꺼낸 값을 순서대로 오른쪽 스택에 넣어줍니다.  
오른쪽 스택에 있는 값이 더 작다면, 그 값은 버리고 다시 오른쪽 스택에서 값을 꺼내 비교해줍니다.  
이렇게 n번 반복하면 오큰수가 담긴 배열이 생성이 됩니다.

## 핵심 코드

```
for (int i = 0; i < n; i++) {
	int lTmp = lStack.pop();
	if (rStack.isEmpty()) {
		nge[n - i - 1] = -1;
	} else {
		while (!rStack.isEmpty()) {
			int rTmp = rStack.pop();
			if (lTmp < rTmp) {
				nge[n - i - 1] = rTmp;
				rStack.push(rTmp);
				rStack.push(lTmp);
				break;
			} else {
				if (rStack.isEmpty()) {
					nge[n - i - 1] = -1;
					break;
				} else {
					rTmp = rStack.pop();
				}
			}
		}
	}
	rStack.push(lTmp);
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/17298
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/17298/src/Main.java

---
title: "BOJ 1874[백준 1874]"
date: 2019-10-07 21:29:00+09:00
categories: algorithm baekjoon stack
---
[스택수열][url]

## 문제파악

처음에 문제를 보고 뭔소린가 했습니다..  
문제를 제대로 읽지 않았던 거죠..  
**1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써** 라는 구절을 제대로 읽어야 문제가 제대로 파악이 되더라구요.  
따라서 입력에서 주어진 수열이 스택에 1부터 n까지 수를 넣었다가 뺐다가 하면서 만들 수 있느냐 없느냐를 판단하는 문제입니다.  
예제 1번을 보면 [4, 3, 6, 8, 7, 5, 2, 1] 수열이 완성이 되야하죠.  
그럼 스택에 1부터 4까지 푸쉬하면 다음과 같은 상태가 됩니다. ([1, 2, 3, 4])
여기서 두 번 팝을 하면, 스택은 ([1, 2]) 상태가 되고, 수열은 [4, 3]의 형태가 됩니다.  
이렇게 반복해서 수열이 완성되도록 하면 됩니다.  

## 해결 방법

저는 수열을 담은 배열을 선언하고 배열에 담긴 숫자와 스택에 들어갈 숫자를 비교하며, 스택에 값을 넣을지 뺄지 판단하도록 했습니다.  
예를 들면, 배열의 첫 번째 숫자가 4이고 스택에 들어갈 숫자가 1부터 시작한다면, 1~4까지는 배열의 첫 번째 숫자보다 작거나 같으므로 푸쉬를 해줍니다.  
그리고 그 다음 숫자는 5이고 배열의 첫 번째 숫자 4보다 크므로 팝 연산을 하고 배열의 인덱스를 증가시켜줍니다.  
이 과정을 반복하고, 팝 연산과정에서 현재 배열의 인덱스 숫자와 일치하지 않는다면 플래그를 통해 수열을 만들 수 없다는 것을 판단하였습니다.

## 핵심 코드

```
for (int i = 0; i < n; i++) {
	if (num <= arr[i]) {
		stack.push(num);
		num++;
		i--;
		result.add("+");
	} else {
		int popNum = stack.pop();
		if(popNum != arr[i]) {
			isRight = false;
		}
		result.add("-");
	}
}
if (isRight) {
	for (int i = 0; i < result.size(); i++) {
		System.out.println(result.get(i));
	}
} else {
	System.out.print("NO");
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1874
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/1874/src/Main.java

---
title: "BOJ 1157[백준 1157]"
date: 2019-10-08 16:08:00+09:00
categories: algorithm baekjoon string-handling
---
[단어 공부][url]

## 문제파악

간단하게 파악할 수 있습니다.  
문자열이 주어졌을 때, 해당 문자열에서 가장 많이 쓰인 알파벳을 찾으면 됩니다.  
예를 들어 S=zZa 이면, 대소문자를 구분하지 않기 때문에 Z가 2번으로 가장 많이 쓰인 것입니다.  
만약 가장 많이 쓰인 알파벳이 1개가 아니라면 ?를 출력합니다.  

## 해결 방법

먼저 문자열이 대소문자가 섞여서 입력이 되기때문에 모두 대문자로 변경해줘야 합니다.  
그리고 문자열을 돌면서 어느 알파벳인지 판단 후, 알파벳 카운팅 배열의 숫자를 증가시켜줍니다.  
이제 알파벳 카운팅 배열에서 가장 큰 값의 인덱스 번호와 가장 큰 값을 찾습니다.  
가장 많이 쓰인 알파벳이 1개가 아닐 경우를 찾아야하기때문에 가장 큰 값을 가장 큰 값의 인덱스번호를 제외하고 다시 찾아봅니다.  
가장 많이 쓰인 알파벳이 1개가 아닐 경우에는 "?"를 출력하고, 1개일 경우에는 'A'에 가장 큰 값의 인덱스 번호를 더해주고 문자로 바꿔서 출력해줍니다.

## 핵심 코드

```
for (int i = 0; i < inputString.length(); i++) {
	for (int j = 0; j < alphabetCnt.length; j++) {
		if (inputString.charAt(i) == 'A' + j) {
			alphabetCnt[j]++;
		}
	}
}
for (int i = 0; i < alphabetCnt.length; i++) {
	if (maxCnt < alphabetCnt[i]) {
		maxCnt = alphabetCnt[i];
		maxIndex = i;
	}
}
for (int i = 0; i < alphabetCnt.length; i++) {
	if (maxCnt == alphabetCnt[i] && i != maxIndex) {
		isDuplicated = true;
	}
}
if (isDuplicated) {
	System.out.print("?");
} else {
	System.out.print(Character.toChars('A' + maxIndex));
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1157
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/1157/src/Main.java

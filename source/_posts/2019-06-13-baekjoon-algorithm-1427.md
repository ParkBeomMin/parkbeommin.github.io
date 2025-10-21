---
title: "BOJ 1427[백준 1427]"
date: 2019-06-13 08:35:00+09:00
categories: algorithm baekjoon sorting
---
[소트인사이드][url]

## 조건

1. 숫자가 주어진다.

## 결과

- 주어진 숫자를 내림차순으로 출력

## 해결 방법

- 숫자를 쪼개서 배열에 담은 후, 정렬한다.
1. 숫자를 String으로 변환한다.
2. String의 각 자릿수에 해당하는 char를 int로 변환하여 int배열에 넣는다.
3. 버블 소트를 통해 내림차순으로 정렬한다.

## 핵심 코드

```
int N = scan.nextInt();
String tmp = String.valueOf(N);
int[] result = new int[tmp.length()];
for(int i = 0; i < tmp.length(); i++) {
	result[i] = Character.getNumericValue(tmp.charAt(i));
}
for(int i = 0; i < tmp.length(); i++) {
	for(int j = 0; j < tmp.length()-i-1; j++) {
		if(result[j] < result[j+1]) {
			int tmpInt = result[j];
			result[j] = result[j+1];
			result[j+1] = tmpInt;
		}
	}
}
for(int i = 0; i < tmp.length(); i++) {
	System.out.print(result[i]);
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1427
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_1427.java

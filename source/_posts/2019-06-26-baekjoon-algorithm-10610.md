---
title: "BOJ 10610[백준 10610]"
date: 2019-06-26 15:34:00+09:00
categories: algorithm baekjoon greedy
---
[30][url]

## 조건

1. N은 최대 10^5개의 숫자로 구성된다.
2. N은 0으로 시작하지 않는다.

## 결과

- N으로 만들 수 있는 30의 배수가 되는 가장 큰 수 / 만들 수 없다면 -1

## 해결 방법

- 30의 배수가 될 수 있는지 없는지 판별 후, 내림차순으로 정렬한다.
1. 30의 배수가 되는 규칙을 찾는다.
2. 3의 배수가 되는 규칙과 10의 배수가 되는 규칙으로 나눈다.
3. 3의 배수가 되는 규칙 : 각 자리의 숫자를 합했을 때, 3의 배수이면 3의 배수이다.
4. 10의 배수가 되는 규칙 : 맨 끝자리 수가 0이 나오면, 10의 배수이다.
5. n을 String형태로 입력받는다.
6. 0 ~ 9까지 각 숫자의 갯수가 들어갈 배열을 만든다.
7. n을 1자리씩 쪼개서 숫자 갯수 배열에 해당 하는 숫자를 증가시킨다.
8. n을 1자리씩 쪼개서 다 더해본다.
9. 배열에서 0의 갯수가 0이거나, 각 자릿수의 합이 3의 배수가 아니라면 -1을 출력한다.
10. 30의 배수를 만들 수 있다면, 배열에서 큰 숫자부터 꺼내서 결과 값을 만든다.

문제는 많이 어렵지 않습니다..!  
하지만.. 저는 계속 런타임 에러가 나서 이유를 찾아보니.. n의 값이 큰데 int형으로 받으려고 하다보니 에러가 나는 것 같았습니다. 그래서 String형으로 받아서 했습니다.

## 핵심 코드

```
String n = scan.nextLine();
int[] arr = new int[10];
String result = "";
long sum = 0;
for(int i = 0; i < n.length(); i++) {
	int num = Integer.parseInt(n.substring(i, i+1));
	arr[num]++;
	sum += num;
}
if(arr[0] == 0 || sum % 3 != 0) {
	result = "-1";
}else {
	for(int i = arr.length-1; i >= 0; i--) {
		while(arr[i] > 0) {
			result += i;
			arr[i]--;
		}
	}
}
System.out.println(result);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/10610
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_10610.java

---
title: "BOJ 14912[백준 14912]"
date: 2019-06-09 02:30:00+09:00
categories: algorithm baekjoon
---
[숫자 빈도수][14912]

1. 입력값의 갯수를 알려주지 않았기 때문에, 각 변수별로 나눠주는 작업을 한다.
2. 1~n까지 숫자에서 d가 포함된 갯수를 구해야하기 때문에 각 숫자의 1의 자리 숫자로 d와 비교를 한다.
3. 각 숫자의 1의 자리와 비교하기 위해 각 숫자를 10, 100, 1000, ... 으로 나눠보면서 b와 비교를 한다.
4. b와 같을 때마다 result값을 증가시킨다.


핵심코드는 다음과 같습니다.
```
for(int i = 1; i <= n; i++) {
	tmp = i;
	while(tmp > 0) {
		if(tmp%10 == d) {
			result++;
		}
		tmp /= 10;
	}
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[14912]: https://www.acmicpc.net/problem/14912
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_14912.java

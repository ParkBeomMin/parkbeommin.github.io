---
title: "BOJ 2579[백준 2579]"
date: 2019-06-11 02:55:00+09:00
categories: algorithm baekjoon dynamic-programming
---
[계단 오르기][url]

이제 막 알고리즘 문제 풀기를 시작한지라.. 문제 유형 파악을 하기 위해 분류된 문제를 풀어보고 있습니다..  
이미 다이나믹 프로그래밍 문제라는 것을 알기 때문에, 먼저 점화식을 찾으려고 생각했습니다.  
주어진 조건이

1. 3계단 연속 불가
2. 1칸 또는 2칸씩 이동 가능
3. 마지막 칸은 무조건 밟아야 함

이기 때문에, 마지막 칸을 밟았다고 했을 때 가능한 경우가 두 가지 존재합니다.

1. 전 칸을 밟고 왔을 때
2. 전전 칸을 밟고 왔을 때

따라서, 점화식을 만들어 보겠습니다.

1. dp[n] = score[n-1] + score[n] + dp[n-3]
2. dp[n] = score[n] + dp[n-2]

이와 같은 식이 나오게 됩니다.(score는 계단의 점수, dp는 총 점수의 최댓값)  

1. 입력 값의 크기로 배열을 두개 만듭니다. (계단의 각 점수가 담긴 배열, 해당 계단을 밟았을 때 점수의 최댓값이 담긴 배열)
2. 0~2까지는 점화식이 성립되지 않기 때문에, 알맞게 계산하여 값을 넣어줍니다.
3. dp[i]에 위 점화식 중 큰 값을 넣어줍니다.
4. 3번을 n까지 반복합니다.
5. dp[n-1]을 출력합니다.


핵심코드는 다음과 같습니다.
```
result[1] = Math.max(score[1], score[0] + score[1]);
result[2] = Math.max(score[0] + score[2], score[1] + score[2]);
for(int i = 3; i < stairs; i++) {
	result[i] = Math.max(result[i-3] + score[i-1] + score[i], result[i-2] + score[i]);
}
System.out.println(result[stairs-1]);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2579
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_2579.java

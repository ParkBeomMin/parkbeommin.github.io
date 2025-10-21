---
title: "BOJ 1931[백준 1931]"
date: 2019-06-14 03:00:00+09:00
categories: algorithm baekjoon greedy
---
[회의실 배정][url]

## 조건

1. 각 회의 시작 시간과 끝나는 시간이 주어진다.
2. 각 회의 간 겹치지 않아야한다.
3. 회의는 중간에 멈출 수 없다.
4. 회의가 끝남과 동시에 다른 회의가 시작될 수 있다.

## 결과

- 회의실을 사용할 수 있는 최대수의 회의

## 해결 방법

- 각 회의가 끝나는 시간을 오름차순으로 정렬한 후 비교하여 구한다.
1. 회의가 끝나는 시간을 기준으로 오름차순으로 정렬한다.
2. 이전 회의가 끝나는 시간과 이번 회의가 시작하는 시간을 비교한다.
3. 비교하여 끝나는 시간이 시작하는 시간보다 작거나 같으면 result를 1 증가시킨다.

## 핵심 코드

```
ArrayList<MeetTime> arr = new ArrayList();
for(int i = 0; i < N; i++) {
	arr.add(new MeetTime(scan.nextInt(), scan.nextInt()));
}

Collections.sort(arr);
        
int result = 0;
int prevEnd = 0;
for(MeetTime t:arr) {
    if(prevEnd <= t.getStartTime()) {
            result += 1;
            prevEnd = t.getEndTime();
    }
}
System.out.println(result);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1931
[solution]: https://github.com/ParkBeomMin/Algorithm/blob/master/Backjoon/src/B_1931.java

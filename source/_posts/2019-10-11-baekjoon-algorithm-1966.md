---
title: "BOJ 1966[백준 1966]"
date: 2019-10-11 22:01:00+09:00
categories: algorithm baekjoon queue
---
[프린터 큐][url]

## 문제파악

일단 저는 [여기]를 참고했습니다..   
어떻게든 큐를 활용해서 이것 저것해보려고 시도를 해봤는데.. 잘 안되더라구요.. 흑..  
아직 많이 부족하네요..  
이 문제는 큐에서 가장 앞에 있는 문서의 우선 순위 값을 가져와서 다른 문서들과 값을 비교해보면서 뒤로 보낼지, 출력을 할 지를 정하면서 m번째 문서가 언제 출력이 되는지 구하면 되는 문제입니다.  

## 해결 방법

가장 처음에 위치한 문서의 우선 순위값과 다른 문서들과 비교를 하고, 추가/삭제를 해야하기 때문에 링크드리스트를 활용합니다.  
값을 비교하면서, 첫번째에 위치한 값이 우선순위가 가장 높다면, 삭제 시키고 요소들이 한칸씩 앞으로 밀리기 때문에 m에 -1을 해줍니다. 그리고 카운트를 증가시켜줍니다. 만약 m=0이었다면, 비교를 멈추고 몇번째 인지 카운트한 값을 출력해줍니다.  
첫번째에 위치한 값이 우선순위가 가장 높지 않다면, 뒤쪽으로 추가를 해줍니다. 그리고 마찬가지로 한칸씩 앞으로 밀리기 때문에 m에 -1을 해줍니다. 만약 m=0이라면, 총 길이에서 1값을 빼준 값으로 바꿔줍니다.  

## 핵심 코드

```
while (!queue.isEmpty()) {
	boolean isPriority = true;
	for (int j = 1; j < queue.size(); j++) {
		if (queue.peek() < queue.get(j)) {
			isPriority = false;
			break;
		}
	}
	if (isPriority) {
		cnt++;
		queue.poll();
		if (m != 0) {
			m -= 1;
		}else {
			break;
		}
	} else {
		queue.add(queue.poll());
		if (m == 0) {
			m = queue.size() - 1;
		} else {
			m -= 1;
		}
	}
}
System.out.println(cnt);
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/1966
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/1966/src/Main.java
[여기]: https://qlyh8.tistory.com/153

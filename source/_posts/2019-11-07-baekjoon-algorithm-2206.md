---
title: "BOJ 2206[백준 2206]"
date: 2019-11-07 18:58:00+09:00
categories: algorithm baekjoon bfs
---
[벽 부수고 이동하기][url]

## 문제파악

n*m으로 이루어진 맵에서 (0, 0) 지점에서 (n-1, m-1)까지 가는 **최단 거리**를 구하는 문제입니다.  
따라서 **bfs 알고리즘**을 활용하면 되겠죠?!  
**하지만! 여기서 주의할 점은.. 벽을 한 번 부수고 이동할 수 있다는 것입니다.**  
이 점을 유의해서 문제를 해결해야 합니다.

## 해결 방법

일반적인 bfs문제 해결과 같이 큐를 활용하고, 방문한 지점을 큐에 넣고 상하좌우로 이동하면서 판단합니다.  
이 문제에서 핵심은 벽을 한 번 부수고 이동할 수 있다는 것인데, 그로 인해 최단 거리를 두 가지 경우로 나누어보아야합니다.  

1. 벽을 한 번 부수고 이동한 것
2. 벽을 부수지 않고 이동한 것  

벽을 부수고 이동한 경로인지 부수지 않고 이동한 경로인지 알기 위해서 visited 배열을 3중배열로 선언해줍니다.  
그래야 위와 같은 두 가지 경우를 다 고려해볼 수 있습니다.  

## 핵심 코드

```
static void bfs(int[][] maze, int n, int m) {
	int[] dx = { -1, 1, 0, 0 };
	int[] dy = { 0, 0, -1, 1 };
	int answer = -1;
	int distance = 0;
	boolean[][][] visited = new boolean[n][m][2]; // 맨 마지막 0이면, 벽 안뚫고 간거!
	Queue<Point> queue = new LinkedList<>();
	queue.offer(new Point(0, 0, 1, false));
	visited[0][0][0] = true;
	while (!queue.isEmpty()) {
		Point tmp = queue.poll();
		int x = tmp.x;
		int y = tmp.y;
		boolean b = tmp.isCracked;
		distance = tmp.distance;
		if (x == n - 1 && y == m - 1) {
			answer = distance;
			break;
		}
		for (int i = 0; i < 4; i++) {
			int nx = x + dx[i];
			int ny = y + dy[i];
			if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
				continue;
			}
			if (maze[nx][ny] == 1) {
				if (!b && !visited[nx][ny][1]) { // 벽을 부숨
					queue.offer(new Point(nx, ny, distance + 1, true));
					visited[nx][ny][1] = true;
				}
			} else {
				if (!b && !visited[nx][ny][0]) { // 벽을 안부수고 가는 경우
					queue.offer(new Point(nx, ny, distance + 1, b));
					visited[nx][ny][0] = true;
				}
				if (b && !visited[nx][ny][1]) { // 벽을 부수고 가는 경우
					queue.offer(new Point(nx, ny, distance + 1, b));
					visited[nx][ny][1] = true;
				}
			}
		}
	}
	System.out.println(answer);
}
```

전체 소스 코드는 [여기서][solution] 확인하실 수 있습니다.


[url]: https://www.acmicpc.net/problem/2206
[solution]: https://github.com/ParkBeomMin/BaekJoonAlgorithm/blob/2206/src/Main.java

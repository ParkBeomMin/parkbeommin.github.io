---
title: "[안드로이드] 현재 시간 구하기, 시간 계산하기"
date: 2019-07-08 18:18:00+09:00
categories: android
toc: true
toc_sticky: true
---

## currentTimeMillis

자바 언어에서 기본으로 제공하는 API Class인 System Class의 currentTimeMillis() 함수를 활용합니다.  
안드로이드 공식 언어인 코틀린도 JVM 기반이기 때문에 문제 없이 사용가능 합니다.

> long currentTimeMillis()

반환 타입은 long 타입으로 반환이 됩니다.  
반환 값은 1970년 1월 1일부터 호출 시점까지의 ms로 반환이 됩니다.

## 현재 시간 구하기

currentTimeMillis()로 받은 값으로 현재 시간을 구해보도록 하겠습니다.  
SimpleDateFormat Class 와 Date Class로 쉽게 나타낼 수 있습니다.

```
val time = System.currentTimeMillis()
val dateFormat = SimpleDateFormat("yyyy-mm-dd hh:mm:ss")
val curTime = dateFormat.format(Date(time))
```

curTime을 출력하면 포맷에 맞게 현재 시간이 출력됩니다.

## 시간 계산하기

이제 조금 응용을 해서 시간을 구해보도록 하겠습니다.

### 시간 차이 구하기

어떤 작업을 시작한 시간과 끝난 시간의 차이를 구해보도록 하겠습니다.  
예제로 앱을 실행시켰을 때 시간과 버튼을 눌렀을 때 시간 차이를 구하도록 하겠습니다.

```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val startTime = System.currentTimeMillis()

    button.setOnClickListner {
        val clickTime = System.currentTimeMillis()
        val time = (clickTime - startTime) / 1000
        Log.d("TEST", "$time 초 걸림")
    }
}
```

### 더한 시간 구하기

현재 시간에서 시간을 더했을 때의 시간을 출력하도록 하겠습니다.  
예제로 현재 시간에서 부터 30분 후의 시간을 출력하도록 하겠습니다.

```
var reservationTime = System.currentTimeMillis() + 1800000
val dateFormat = SimpleDateFormat("yyyy-mm-dd hh:mm:ss")
val curTime = dateFormat.format(Date(reservationTime))
```

currentTimeMillis()의 반환 값이 밀리초(ms)이기 때문에, 30분을 밀리초 단위로 변형 시켜서 더해주었습니다.

감사합니다.

## 레퍼런스

[https://ra2kstar.tistory.com/123][ref-url-1]
[https://aroundck.tistory.com/10][ref-url-2]

<!-- [ref-url-1]: "https://ra2kstar.tistory.com/123"
[ref-url-2]: "https://aroundck.tistory.com/10" -->

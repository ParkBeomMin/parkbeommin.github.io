---
title: "안드로이드 코틀린 개발하기 - StopWatch"
date: 2019-06-26 20:16:00+09:00
categories: android kotlin
toc: true
toc_sticky: true
---
## 사전 설정

### Design 라이브러리 추가하기

FloatingActioinButton을 사용하기 위해 design 라이브러리를 추가해야 합니다.  
다음과 같은 코드를 삽입해줍니다.

> build.gradle (Module: app)

~~~
implementation 'com.android.support:design:28.0.0'
~~~

<img src="/assets/stop-watch/design_library.png" width="100%" >

### 벡터 드로어블 사용 환경 설정하기

> build.gradle (Module: app)

버전 5.0미만의 기기에서 벡터 이미지를 사용하기 위해서 아래와 같은 코드를 삽입해줍니다.

~~~
vectorDrawables.useSupportLibrary = true
~~~

<img src="/assets/vector_drawable.png" width="100%" >

## 레이아웃 만들기

가장 최근에 등장했고, 현재 안드로이드 기본 레이아웃인 **Constrain Layout**을 사용합니다.  
초 단위와 밀리초 단위를 보여줄 **TextView**를 사용합니다.  
랩 타임을 기록할 이벤트를 발생시킬 **Button**을 사용합니다. 
스탑워치의 시작, 정지, 리셋 이벤트를 발생시킬 **FloatingActionButton**을 사용합니다.  
랩 타임이 기록되어 보여질 **ScrollView**를 사용합니다.

FloatingActionButton에 사용될 이미지는 **에셋 스튜디오**에서 벡터 이미지를 생성하여 사용합니다. 

> activity_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/secondTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textSize="100sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.1"/>

    <TextView
        android:id="@+id/milliSecondTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:text="00"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textSize="22sp"
        app:layout_constraintBaseline_toBaselineOf="@+id/secondTv"
        app:layout_constraintStart_toEndOf="@+id/secondTv"/>

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/playFab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:clickable="true"
        android:tint="@android:color/white"
        app:backgroundTint="@color/colorPrimary"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:srcCompat="@drawable/ic_play_arrow_black_24dp"/>

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/refreshFab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:layout_marginStart="16dp"
        android:clickable="true"
        app:backgroundTint="@color/colorPrimary"
        android:tint="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:srcCompat="@drawable/ic_refresh_black_24dp"/>

    <Button
        android:id="@+id/lapBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:layout_marginEnd="16dp"
        android:text="랩 타임"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"/>

    <ScrollView
        android:layout_width="wrap_content"
        android:layout_height="0dp"
        android:layout_marginBottom="8dp"
        android:layout_marginTop="8dp"
        app:layout_constraintBottom_toTopOf="@+id/lapBtn"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/secondTv">

        <LinearLayout
            android:id="@+id/lapLayout"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"/>
    </ScrollView>

</android.support.constraint.ConstraintLayout>
```

## 타이머 구현하기(Timer)

### timer 사용하기

코틀린에서 타이머를 구현하는 방법은 다음과 같습니다.  
타이머는 일정한 시간을 주기로 반복하는 동작을 수행할 때 사용합니다.  

~~~
timer(period = 1000) { // 1초(1000ms)마다
    // 수행할 동작
}
~~~

### UI 변경하기

시간이 흘러감에 따라 흘러간 시간을 사용자에게 보여줘야합니다.  

안드로이드에서 UI를 조작하는 것은 메인 스레드에서 해야 합니다.  
오래 걸리는 작업을 할 때에는 보이지 않는 곳에서 처리하는 워커 스레드에서 합니다.  
워커 스레드에서는 UI를 조작할 수 없습니다.  
그리고 timer는 워커 스레드에서 수행되기 때문에 UI를 조작할 수 없습니다.  
따라서, timer내부에 **runOnUiThread()** 메소드를 사용해서 UI를 조작해야 합니다.  

~~~
timer(period = 1000) {
    runOnUiThread {
        // UI 조작
    }
}
~~~

### 타이머 시작

타이머가 시작이 되면, 시작 버튼의 이미지가 바뀌게 됩니다.  
그리고 0.01초 단위로 타이머를 작동시킵니다.  
초와 밀리초 단위에 맞게 계산을 합니다.  
UI를 조작하기 위해, runOnUiThread 안에서 TextView에 값을 뿌려줍니다.  

~~~
private fun start() {
    playFab.setImageResource(R.drawable.ic_pause_black_24dp)
    timerTask = timer(period = 10) {
        time++
        val sec = time / 100
        val milli = time % 100
        runOnUiThread {
            secondTv.text = "$sec"
            milliSecondTv.text = "$milli"
        }
    }
}
~~~

### 타이머 일시정지

시작과 반대로, 일시정지가 되면 버튼의 이미지가 바뀌게 됩니다.  
그리고 실행중인 타이머가 있다면, 타이머를 취소시킵니다.  

~~~
private fun pause() {
    playFab.setImageResource(R.drawable.ic_play_arrow_black_24dp)
    timerTask?.cancel() // 실행중인 타이머가 있다면, 종료
}
~~~

### 타이머 초기화

타이머에 사용했던 모든 변수를 초기화해줍니다.

~~~
private fun reset() {
    timerTask?.cancel()
    time = 0
    isRunning = false
    playFab.setImageResource(R.drawable.ic_play_arrow_black_24dp)
    secondTv.text = "0"
    milliSecondTv.text = "00"
    lapLayout.removeAllViews()
    lap = 1
}
~~~

## 랩 타임 기록하기

### 동적으로 뷰 추가하기

랩 타임을 기록하는 버튼을 누르면, 스크롤뷰 내부에 있는 리니어 레이아웃 안에 텍스트 뷰가 추가가 되어야 합니다.  
텍스트뷰 객체를 생성하고, 레이아웃에 추가해주면 됩니다.  
리니어 레이아웃에 addView() 메서드를 사용하면 됩니다.  
첫 번째 인자로 추가할 뷰를 넣습니다.  
첫 번째 인자만 넣어도 되지만, 추가될 뷰가 레이아웃의 어느 위치에 위치할지 지정해주는 두 번째 인자도 설정할 수 있습니다.  
두 번째 인자에 0을 넣으면, 레이아웃의 항상 최상단에 추가가 됩니다.  

~~~
val textView = TextView(this)
textView.text = "글자"
lapLayout.addView(textView, 0)
~~~

### 랩 타임 표시하기

랩 타임을 표시하기 위해 버튼을 누르면, 시간을 받아옵니다.  
그리고 텍스트뷰 객체를 생성하고, 받아온 시간을 설정해줍니다.  
레이아웃에 텍스트뷰를 추가해줍니다.  

~~~
private fun recordLapTime() {
    val lapTime = this.time
    val lapTv = TextView(this)
    lapTv.text = "$lap LAB : ${lapTime / 100}.${lapTime % 100}"

    lapLayout.addView(lapTv, 0) // 맨 위에 뷰를 추가한다.
    lap++
}
~~~

## 소스 코드

[Kotlin_Stop_Watch][git-url]

## 레퍼런스

오준석의 안드로이드 생존코딩 코틀린 편 ( 오준석 저 / 한빛미디어 / 2018.10.01 )


[git-url]: https://github.com/ParkBeomMin/Kotlin_Stop_Watch
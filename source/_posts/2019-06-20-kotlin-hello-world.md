---
title: "안드로이드 코틀린 시작하기 - Hello World"
date: 2019-06-20 13:37:00+09:00
categories: android kotlin
toc: true
---

## 레이아웃 만들기

가장 최근에 등장했고, 현재 안드로이드 기본 레이아웃인 **Constrain Layout**을 사용합니다.  
"Hello World" 문자열을 보여줄 **TextView**를 사용합니다.  
추가적으로 문자열의 변화, 이벤트를 발생시킬 **Button**을 사용합니다.  

TextView는 화면 상단과 좌측, 우측에 제약을 걸어놓고, 상단에 마진 값을 주었습니다.  
Button에는 화면 좌측과 우측, 하단과 상단은 TextView에 제약을 걸어놓았습니다. 

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
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="@string/hello_world"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"/>

</android.support.constraint.ConstraintLayout>
```

## 문자열 리소스화

레이아웃의 TextView의 text속성을 보시면 **"@string/hello_world"** 문자열이 리소스화 되있는 것을 볼 수 있습니다.  
리소스화 하지 않는다면 스튜디오에서 자체적으로 경고를 띄워줍니다.  
컴파일에 문제는 없지만, 리소스화 하지 않는다면 **유지보수**에 어려움이 있을 수 있고 **다국어 지원**이 되지 않습니다.

- 다국어 지원 방법

프로젝트 내에서 res/values/strings/strings.xml 경로로 갑니다.  

```
<resources>
    <string name="app_name">Kotlin_HelloWorld</string>
    <string name="hello_world">Hello World!</string>
</resources>
```

위와 같이 hello_world 리소스를 추가해줍니다.  

<img src="/assets/string.png" width="100%" >

Open editor를 클릭하여 열어줍니다.  

<img src="/assets/string2.png" width="100%" >

지구본 아이콘을 클릭하여 국가를 지정해줍니다.  
그러면 에디터 테이블에 해당 국가 열이 추가됩니다.  
해당 칸에 알맞게 문자열을 넣어줍니다.  

## Kotlin Extension

코틀린에서 kotlin-android-extensions 라이브러리를 기본으로 제공해줍니다.  
따라서 레이아웃에 있는 뷰를 가지고 올 때, 자바에서는 findViewById라는 함수로 가져왔는데, 코틀린에서는 아이디값으로 바로 가져올 수 있습니다.  

```
button.setOnClickListener {
    clickNum++
    textView.text = clickNum.toString()
}
```

위와 같이 button과 textView는 레이아웃에서 각 위젯의 아이디 값입니다.  
따라서 코드가 훨씬 더 간결해진 것을 알 수 있습니다.

## 소스 코드

[Kotlin_HelloWorld][git-url]

## 레퍼런스

오준석의 안드로이드 생존코딩 코틀린 편 ( 오준석 저 / 한빛미디어 / 2018.10.01 )


[git-url]: https://github.com/ParkBeomMin/Kotlin_HelloWorld
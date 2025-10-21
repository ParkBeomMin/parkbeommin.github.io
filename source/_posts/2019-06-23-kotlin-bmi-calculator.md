---
title: "안드로이드 코틀린 개발하기 - BMI 계산기"
date: 2019-06-23 04:47:00+09:00
categories: android kotlin
toc: true
toc_sticky: true
---
## 사전 설정

### Anko라이브러리 추가하기

Anko라이브러리를 사용하기 위해서 아래와 같이 코드를 삽입해줍니다.  
이번 예제에서는 Anko commons 라이브러리만 사용합니다.

> build.gradle (Module: app)

~~~
ext.anko_version = '0.10.8'
~~~

<img src="/assets/anko_project.png" width="100%" >

> build.gradle (Project)

~~~
implementation "org.jetbrains.anko:anko-commons:$anko_version"
~~~

<img src="/assets/anko_app.png" width="100%" >


- Anko 라이브러리란?

젯브레인에서 개발한 코드 작성을 편리하게 도와주는 라이브러리.  
Anko 라이브러리는 총 4개로 구성됩니다.  
1. Anko Commons : 인텐트, 다이얼로그, 로그 등을 편리하게 사용하는 라이브러리
2. Anko Layouts : 안드로이드 레이아웃을 코드로 쉽게 작성하는 라이브러리
3. Anko SQLite : SQLite를 쉽게 사용하는 라이브러리
4. Anko Coroutines : 코루틴을 쉽게 사용하는 라이브러리  

### 벡터 드로어블 사용 환경 설정하기

> build.gradle (Module: app)

버전 5.0미만의 기기에서 벡터 이미지를 사용하기 위해서 아래와 같은 코드를 삽입해줍니다.

~~~
vectorDrawables.useSupportLibrary = true
~~~

<img src="/assets/vector_drawable.png" width="100%" >



## 레이아웃 만들기

값을 입력받는 액티비티와 결과를 보여주는 액티비티를 만듭니다.  

가장 최근에 등장했고, 현재 안드로이드 기본 레이아웃인 **Constrain Layout**을 사용합니다.  
몸무게와 키를 입력받을 **EditText**를 사용합니다.  
몸무게와 키를 결과 화면으로 넘겨주는 이벤트를 발생시킬 **Button**을 사용합니다. 
결과 내용을 보여줄 **TextView**를 사용합니다.  
결과를 이미지로 표시해줄 **ImageView**를 사용합니다.

결과 이미지는 **에셋 스튜디오**에서 벡터 이미지를 생성하여 사용합니다. 

> activity_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="8dp"
    tools:context=".MainActivity">


    <EditText
        android:id="@+id/weightEdt"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:inputType="numberDecimal"
        android:hint="@string/weight"
        app:layout_constraintBottom_toTopOf="@+id/heightEdt"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <EditText
        android:id="@+id/heightEdt"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:inputType="numberDecimal"
        android:hint="@string/height"
        app:layout_constraintBottom_toTopOf="@+id/button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/weightEdt"/>

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/click"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/heightEdt"/>
</android.support.constraint.ConstraintLayout>
```

> activity_result.xml

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ResultActivity">

    <ImageView
        android:id="@+id/resultIv"
        android:layout_width="100dp"
        android:layout_height="100dp"
        app:layout_constraintBottom_toTopOf="@+id/resultTv"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_sentiment_satisfied_black_24dp"/>

    <TextView
        android:id="@+id/resultTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="TextView"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/resultIv"/>
</android.support.constraint.ConstraintLayout>
```

## 화면 전환하기(Intent)

### 기본적인 방법

~~~
val intent = Intent(this, ResultActivity::class.java)
startActivity(intent)
~~~

### Anko Commons 라이브러리 방법

~~~
startActivity<ResultActivity>()
~~~

*코드가 확실하게 짧아짐을 볼 수 있습니다.*  

여기서 우리는 결과 화면으로 몸무게와 키 값을 넘겨주어야 하기 때문에, 액티비티간 데이터 전송을 추가하도록 하겠습니다.  

### 기본적인 방법 - 데이터 전송

~~~
val intent = Intent(this, ResultActivity::class.java)
intent.putExtra("weight", weightEdt.text.toString())
intent.putExtra("height", heightEdt.text.toString())
startActivity(intent)
~~~

### Anko Commons 라이브러리 방법 - 데이터 전송

~~~
startActivity<ResultActivity>(
        "weight" to weightEdt.text.toString(),
        "height" to heightEdt.text.toString()
)
~~~

이제 결과 화면에서 값을 받아와야 합니다.

### 값 받아오기

~~~
val weight = intent.getStringExtra("weight").toInt()
val height = intent.getStringExtra("height").toInt()
~~~

값을 넘겨줄 때, 지정했던 **키 값**으로 가지고 옵니다.

### 부모 액티비티 설정하기

부모 액티비티를 설정하면 상단에 위치한 네비게이션바에 자동으로 뒤로가기 버튼이 생겨납니다.  

> AndroidManifest.xml

~~~
<activity android:name=".ResultActivity"
    android:parentActivityName=".MainActivity">
</activity>
~~~

<img src="/assets/manifest.png" width="100%" >


## 계산하기

몸무게와 키를 받아왔기 때문에 BMI를 계산해야 합니다.  

> BMI = 몸무게 / (키/100)^2

~~~
val bmi = weight / Math.pow(height / 100.0, 2.0)
~~~

그리고 bmi의 결과 값에 따라 결과 문구와 이미지가 다르게 나타나야합니다.

~~~
when {
    bmi >= 35 -> resultTv.text = "고도 비만"
    bmi >= 30 -> resultTv.text = "2단계 비만"
    bmi >= 25 -> resultTv.text = "1단계 비만"
    bmi >= 13 -> resultTv.text = "과체중"
    bmi >= 18.5 -> resultTv.text = "정상"
    else -> resultTv.text = "저체중"
}

when {
    bmi >= 23 -> resultIv.setImageResource(R.drawable.ic_sentiment_very_dissatisfied_black_24dp)
    bmi >= 18.5 -> resultIv.setImageResource(R.drawable.ic_sentiment_satisfied_black_24dp)
    else -> resultIv.setImageResource(R.drawable.ic_sentiment_dissatisfied_black_24dp)
}
~~~

## 데이터 저장하기 (SharedPreference)

몸무게와 키에 입력했던 값이 앱을 다시 실행했을 때 남아있도록 합니다.  

### 데이터 저장하기

값을 입력하고 버튼을 누르면 저장이 됩니다.  

> MainActivity.kt

~~~
private fun saveData(weight: Int, height: Int) {
    val pref = PreferenceManager.getDefaultSharedPreferences(this)
    val editor = pref.edit()

    editor.putInt("KEY_WEIGHT", weight)
            .putInt("KEY_HEIGHT", height)
            .apply()
}
~~~

### 데이터 불러오기

앱이 실행되었을 때, 값을 불러옵니다.  
초기값은 0으로 설정합니다.

~~~
private fun loadData() {
    val pref = PreferenceManager.getDefaultSharedPreferences(this)
    val weight = pref.getInt("KEY_WEIGHT", 0)
    val height = pref.getInt("KEY_HEIGHT", 0)

    if( weight != 0 && height != 0) {
        weightEdt.setText(weight.toString())
        heightEdt.setText(height.toString())
    }
}
~~~

## 소스 코드

[Kotlin_BMI_Calculator][git-url]

## 레퍼런스

오준석의 안드로이드 생존코딩 코틀린 편 ( 오준석 저 / 한빛미디어 / 2018.10.01 )


[git-url]: https://github.com/ParkBeomMin/Kotlin_BMI_Calculator
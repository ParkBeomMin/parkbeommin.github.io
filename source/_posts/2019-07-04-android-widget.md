---
title: "[안드로이드] Widget 만들기"
date: 2019-07-04 14:56:00+09:00
categories: android
toc: true
toc_sticky: true
---

## 위젯이란?

안드로이드에서 위젯이라고 하면, TextView, EditText와 같은 위젯이 있고, 스마트폰 홈 스크린 화면에 표시되는 위젯이 있습니다.  
여기서는 후자에 해당하는 위젯에 대해서 설명하도록 하겠습니다.

공식 문서에서 위젯은 **홈 화면에서 바로 쓸 수 있도록 앱에서 가장 중요한 자료와 기능을 한 곳에 모아주는 역할**을 한다고 합니다.

위젯은 일반적으로 4가지 종류가 있습니다.

1. 정보 위젯
2. 모음 위젯
3. 제어 위젯
4. 혼합 위젯

그리고 위젯을 만들 때, 제약 사항이 있습니다.

- 제스처

**터치**와 **세로로 스와이프**만 가능합니다.  
가로로 스와이프의 경우에는 홈화면간 전환이 되는 제스처와 겹치기 때문에 불가합니다.  
요즘엔 홈화면에서 세로로 스와이프하여서 모든 앱을 볼 수 있는 기능이 있는데, 이 경우는 고려되는지 잘 모르겠습니다.. 아직 공식문서에서는 따로 언급이 없는 걸로 보아서 가능한 것 같습니다.

- 구성 요소 및 레이아웃

위젯의 레이아웃은 RemoteViews를 기반으로 하기 때문에, 모든 종류의 레이아웃이 가능하지 않습니다.

가능한 레이아웃은 **FrameLayout, LinearLayout, RelativeLayout, GridLayout** 입니다.

그리고 구성 요소 또한 제한이 있습니다.

가능한 구성 요소는 **AnalogClock, Button, Chronometer, ImageButton, ImageView, ProgressBar, TextView, ViewFlipper, ListView, GridView, StackView, AdapterViewFlipper** 입니다.

## 위젯 만들기

위젯을 만들기 위해서는 다음과 같은 절차를 거쳐야 합니다.

1. widget 레이아웃 만들기
2. widget 속성(meta data) 만들기
3. AppWidgetProvider 클래스를 상속받은 ProviderClass 만들기
4. AndroidManifest에 widget과 receiver 등록하기

이렇게 4가지 과정을 거치면 위젯을 만들 수 있습니다.  
그런데 최근 안드로이드 스튜디오에서는 New > Widget > AppWidget으로 4가지 과정을 한 번에 할 수 있더라구요.  
일단 이번 포스팅에서는 4가지 과정을 차례 차례 진행해보도록 하겠습니다.

### widget 레이아웃 만들기

일반적인 레이아웃 파일을 만드는 것과 동일하게 만들어줍니다.

> res/layout > New > Layout Resource File

여기서 주의할 점은 위젯의 제약사항 중 구성 요소 및 레이아웃을 고려해야한다는 점입니다.  
처음에 저는 제약 사항의 존재를 모르고, Constrain Layout으로 했다가 계속 위젯 설정에 문제가 있었습니다... ㅠ  
저는 파일 이름을 widget.xml로 했습니다.  
그리고 버튼을 두 개 띄우도록 하겠습니다.

> widget.xml

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <Button
        android:id="@+id/button"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp"
        android:layout_weight="1"
        android:text="Button" />

    <Button
        android:id="@+id/button2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginTop="16dp"
        android:layout_weight="1"
        android:text="Button" />
</LinearLayout>
```

### widget 속성(meta data) 만들기

위젯의 속성을 기술하는 파일을 만들어야 합니다.  
위젯의 속성으로는 **최소 가로, 세로, 업데이트 시간, 초기 레이아웃, 리사이즈 모드 등**이 있습니다.

최소 가로, 세로의 단위는 dp 이며, 위젯은 셀 단위로 표시되기 때문에 셀 크기에 따른 최소 단위 값을 구하는 공식은 다음과 같습니다.

> (셀 개수 \* 74) - 2

업데이트 시간의 경우는 얼마나 자주 onUpdate()를 호출할 것인지에 대한 값입니다.  
최소 값은 30분(86400000밀리초)이며, 이 값보다 작게 지정을 해도 30분으로 됩니다.  
30분보다 적은 시간에 업데이트를 하고 싶다면, 사용자에게 업데이트를 요청하는 버튼을 만들거나, AppWidgetManager.ACTION_APPWIDGET_UPDATE로 전달되는 intent를 이용하여 AlarmManager를 이용하여 처리하면 될 것 같습니다.

초기 레이아웃은 onUpdate()가 호출될 때 레이아웃에 변경이 있을 수 있기 때문에, 초기 레이아웃을 설정합니다.

리사이즈 모드는 위젯의 크기를 가로, 세로로 변경할 수 있는지에 대한 값을 지정해줍니다.

이 외에도 다른 속성들이 있는데 필수사항은 아니기 때문에, 문서를 참고해주시면 될 것 같습니다.

> widget_provider.xml

```
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider
    android:initialLayout="@layout/widget"
    android:minWidth="146dp"
    android:minHeight="72dp"
    android:updatePeriodMillis="86400000"
    android:resizeMode="horizontal|vertical"
    xmlns:android="http://schemas.android.com/apk/res/android" />
```

### AppWidgetProvider 클래스를 상속받은 ProviderClass 만들기

이제 위젯의 동작 및 생명주기 관리를 위해 AppWidgetProvider를 상속받는 클래스 파일을 만듭니다.  
그리고 다음과 같은 메서드들을 오버라이드합니다.

- onEnabled() : 위젯이 처음 생성될때 호출되며, 동일한 위젯의 경우 처음에만 호출
- onUpdate() : 위젯 갱신 주기에 따라 위젯을 갱신할때 호출, 처음 위젯이 화면에 붙을 때 호출(Configuration activity를 따로 두었다면, 처음 붙을 때 불리지는 않음)
- onDeleted() : 위젯이 사용자에 의해 제거될때 호출
- onDisabled() : 위젯의 마지막 인스턴스가 제거될때 호출
- onReceive() : 일반적인 브로드캐스팅 receiver, 위젯이 붙었을 때, 위젯이 삭제되었을 때 호출

> WidgetProvider.kt

```
package com.beomji.parkbeommin.soundreservation

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.support.v4.content.ContextCompat.getSystemService
import android.util.Log
import android.widget.RemoteViews


class WidgetProvider : AppWidgetProvider() {
    private val MY_ACTION = "android.action.MY_ACTION"

    //    위젯 갱신 주기에 따라 위젯을 갱신할때 호출
    override fun onUpdate(context: Context?, appWidgetManager: AppWidgetManager?, appWidgetIds: IntArray?) {
        super.onUpdate(context, appWidgetManager, appWidgetIds)
        appWidgetIds?.forEach { appWidgetId ->
            val views: RemoteViews = addViews(context)
            appWidgetManager?.updateAppWidget(appWidgetId, views)
        }
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        super.onReceive(context, intent)
        var action = intent?.action
        if (action == MY_ACTION) {
            // TODO
        }
    }

    //    위젯이 처음 생성될때 호출되며, 동일한 위젯의 경우 처음 호출
    override fun onEnabled(context: Context?) {
        super.onEnabled(context)
    }

    //    위젯의 마지막 인스턴스가 제거될때 호출
    override fun onDisabled(context: Context?) {
        super.onDisabled(context)
    }

    //    위젯이 사용자에 의해 제거될때 호출
    override fun onDeleted(context: Context?, appWidgetIds: IntArray?) {
        super.onDeleted(context, appWidgetIds)
    }

    private fun setMyAction(context: Context?): PendingIntent {
        val intent = Intent(MY_ACTION)
        return PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
    }

    private fun buildURIIntent(context: Context?): PendingIntent {
        val intent = Intent(Intent.ACTION_VIEW).setData(Uri.parse("http://parkbeommin.github.io"))
        return PendingIntent.getActivity(context, 0, intent, 0)
    }

    private fun addViews(context: Context?): RemoteViews {
        val views = RemoteViews(context?.packageName, R.layout.widget)
        views.setOnClickPendingIntent(R.id.button, setMyAction(context))
        views.setOnClickPendingIntent(R.id.button2, buildURIIntent(context))
        return views
    }
}
```

위의 코드를 보면, RemoteViews를 이용해서 레이아웃을 만들고, 버튼에 클릭이벤트를 만들어줬습니다.  
button에는 커스텀 액션을 만들어서 버튼을 클릭했을 때, 브로드캐스트로 이벤트가 보내지고, onReceive에서 받아서 처리합니다.(이 경우, 오레오버전부터는 백그라운드 정책이 바뀌어서 조금 다르게 구현을 해야합니다. 추후에 추가하도록 하겠습니다.)  
button2에는 웹사이트로 이동하게 됩니다.

### AndroidManifest에 widget과 receiver 등록하기

이제 모든 준비가 끝나고, manifest에 등록을 해줘야합니다.

> AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.beomji.parkbeommin.soundreservation">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

        <receiver
            android:name=".WidgetProvider">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE"/>
                <action android:name="android.action.MY_ACTION"/>
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/widget_provider"/>
        </receiver>
    </application>
</manifest>
```

이제 완성이 되어서, 위젯을 만들어서 잘 동작하는 것을 확인하시면 됩니다.

감사합니다.

## 레퍼런스

[https://developer.android.com/guide/topics/appwidgets/overview][ref-url-1]
[http://klutzy.nanabi.org/android-design-ko/patterns/widgets.html][ref-url-2]
[https://tech.wanted.co.kr/android/2018/02/12/android-widget.html][ref-url-3]
[https://arabiannight.tistory.com/entry/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9CAndroid-App-widget%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EC%9E%90-2][ref-url-4]

<!-- [ref-url-1]: "https://developer.android.com/guide/topics/appwidgets/overview"
[ref-url-2]: "http://klutzy.nanabi.org/android-design-ko/patterns/widgets.html"
[ref-url-3]: "https://tech.wanted.co.kr/android/2018/02/12/android-widget.html"
[ref-url-4]: "https://arabiannight.tistory.com/entry/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9CAndroid-App-widget%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4-%EB%B3%B4%EC%9E%90-2" -->

---
title: "안드로이드 코틀린 개발하기 - WebBrowser"
date: 2019-06-28 01:19:00+09:00
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

### 인터넷 사용 권한 추가하기

안드로이드에서는 특정 권한이 필요한 동작을 할 때는 권한을 추가해줘야 합니다.  
우리는 웹 뷰에 웹 페이지를 표시해야하기 때문에 인터넷 사용 권한을 추가해줍니다.  

> AndroidManifest.xml

~~~
<uses-permission android:name="android.permission.INTERNET" />
~~~

<img src="/assets/web-browser/internet.png" width="100%" >

### http프로토콜 접속 허용 추가하기

안드로이드9(APL Lv 28) 부터 강화된 네트워크 보안정책에 따라 http 접속시 제한이 될 수도 있습니다.  
따라서 허용이 되도록 코드를 추가해줍니다.  

> AndroidManifest.xml

~~~
android:usesCleartextTraffic="true"
~~~

<img src="/assets/web-browser/http.png" width="100%" >

## 레이아웃 만들기

가장 최근에 등장했고, 현재 안드로이드 기본 레이아웃인 **Constrain Layout**을 사용합니다.  
url주소를 입력받을 **EditText**를 사용합니다.  
웹 페이지를 보여줄 **WebView**를 사용합니다.  

추가적으로, EditText속성 중 imeOptions을 actionSearch로 설정해줍니다.  
키보드의 엔터 아이콘이 변하게 됩니다.

<img src="/assets/web-browser/layout.png" width="100%" >

## 웹 페이지 표시하기

### 웹뷰 기본 설정하기

웹뷰를 사용할 떄는 항상 기본으로 두 가지 설정을 해야합니다.  

1. javaScriptEnabled 기능을 킨다.
2. WebViewClient 클래스를 지정한다.  

javaScriptEnabled 기능을 켜야 웹 페이지의 자바스크립트 기능이 동작하게 됩니다.  
WebViewClient 클래스를 지정해야 웹뷰에 페이지가 표시되게 됩니다.  
지정하지 않을 경우, 자체 웹 브라우저가 동작하게 됩니다.

웹 페이지를 로딩할 때는 loadUrl() 메소드를 사용합니다.  

~~~
webView.apply {
    // 자바스크립트 기능이 잘 동작하도록 설정
    settings.javaScriptEnabled = true
    // 자체 웹 브라우저가 실행되지 않고, 웹뷰에서 페이지가 표시되도록 설정
    webViewClient = WebViewClient()
}

webView.loadUrl("https://www.google.com")
~~~

### 키보드 검색 버튼(엔터 버튼) 이벤트 구현하기

EditText에 url을 입력하고 검색 버튼을 눌렀을 때, 해당 url로 페이지가 이동해야합니다.  
따라서 키보드의 검색 버튼에 웹 페이지가 이동될 수 있도록 이벤트를 발생시켜야 합니다.   

setOnEditorActionListener는 EditText가 선택되고 글자가 입력될 때마다 호출됩니다.  
그리고 인자로는 반응한 뷰, 액션 Id, 이벤트 세가지이며, 사용하지 않는 인자의 경우 _로 대치할 수 있습니다.

~~~
// 에딧텍스트가 선택디고 글자가 입력될 때마다 호출
urlEdt.setOnEditorActionListener { _, actionId, _ -> // 반응한 뷰, 액션ID, 이벤트
    if (actionId == EditorInfo.IME_ACTION_SEARCH) {
        webView.loadUrl(urlEdt.text.toString())
        true
    } else {
        false
    }
}
~~~

### 뒤로가기 동작 재정의하기

기본적으로 뒤로 가기 버튼을 눌르면, 앱이 종료가 됩니다.  
하지만 보통 웹 페이지의 경우, 뒤로 가기 버튼을 누르면 이전 페이지로 돌아가게 됩니다.  
따라서 뒤로가기 버튼의 이벤트를 재정의하기 위해 onBackPressed() 메서드를 오버라이드해서 코드를 작성해줍니다.  

~~~
override fun onBackPressed() {
    if (webView.canGoBack()) {
        webView.goBack()
    } else {
        super.onBackPressed()
    }
}
~~~

## 메뉴 사용하기

### 옵션 메뉴 사용하기

상단 툴바에 표시되는 메뉴를 옵션 메뉴라고 합니다.  

옵션 메뉴를 사용하기 위해서는 다음과 같은 순서를 따라야합니다.  

1. 메뉴 리소스를 준비한다.
2. onCreateOptionsMenu() 메서드를 재정의하여 메뉴를 붙이고 true를 반환한다.
3. onOptionsItemSelected() 메서드를 재정의하여 메뉴 아이템이 선택되었을 때의 이벤트를 작성한다.

메뉴 리소스를 만들기 위해, 메뉴 디렉터리를 만들어야 합니다.  
res 우클릭 > New > Android Resource Directory를 클릭합니다.  
Resource type을 menu로 변경하고 OK 버튼을 누릅니다.  

이제 menu 디렉토리에서 메뉴 리소스를 만듭니다.  
menu 디렉토리 우클릭 > New > Menu resource file을 클릭합니다.  
File name을 지정합니다.(예제에서는 main으로 지정했습니다.)  

> main.xml

~~~
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:title="검색 사이트">
        <menu
            >
            <item
                android:id="@+id/action_google"
                android:title="구글"/>
            <item
                android:id="@+id/action_naver"
                android:title="네이버"/>
            <item
                android:id="@+id/action_daum"
                android:title="다음"/>
        </menu>
    </item>
    <item android:title="개발자 정보">
        <menu
            >
            <item
                android:id="@+id/action_call"
                android:title="전화하기"/>
            <item
                android:id="@+id/action_send_text"
                android:title="문자보내기"/>
            <item
                android:id="@+id/action_email"
                android:title="이메일 보내기"/>
        </menu>
    </item>
    <item
        android:id="@+id/action_home"
        android:icon="@drawable/ic_home_black_24dp"
        android:title="Home"
        app:showAsAction="ifRoom"/>
</menu>
~~~

코드는 위와 같지만, design탭에서 드래그 앤 드랍으로 만드는 것이 더 편리할 수 있습니다.  
home의 경우에 showAsAction 속성이 지정되어 있는데, 툴바에 노출할지 안할지에 대한 속성입니다.  

- showAsAction 속성
1. never : 밖으로 절대 노출시키지 않는다.
2. ifRoom : 툴바에 여유가 있으면 노출한다.
3. always : 항상 노출한다.
4. withText : 글자와 아이콘을 함께 표시한다.
5. collapseActionView : 액션 뷰와 결합하면 축소되는 메뉴를 만들 수 있다.

이제 메뉴 리소스는 다 만들었기 떄문에, 옵션 메뉴를 지정하고 이벤트 처리를 해야합니다.  

옵션 메뉴를 지정하기 위해서는 onCreateOptionsMenu() 메서드를 오버라이드해서 menuInflater 객체의 inflate() 메서드를 사용해야합니다.  
반환값을 true로 해줘야 옵션메뉴가 있다고 인식하게 됩니다.  

~~~
override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.main, menu)
    return true
}
~~~

각 메뉴의 이벤트 처리는 onOptionsItemSelected() 메서드를 오버라이드해서 처리합니다.  

~~~
override fun onOptionsItemSelected(item: MenuItem?): Boolean {
    when (item?.itemId) {
        R.id.action_google, R.id.action_home -> {
            webView.loadUrl("http://google.com")
            return true
        }
        R.id.action_naver -> {
            webView.loadUrl("http://naver.com")
            return true
        }
        R.id.action_daum -> {
            webView.loadUrl("http://daum.com")
            return true
        }
        R.id.action_call -> {
            val intent = Intent(Intent.ACTION_DIAL)
            intent.data = Uri.parse("tel:010-2434-7280")
            if (intent.resolveActivity(packageManager) != null) {
                startActivity(intent)
            }
            return true
        }
        R.id.action_send_text -> {
            sendSMS("010-0000-0000", webView.url)
            return true
        }
        R.id.action_email -> {
            email("club20608@gmail.com", "Good Site!", webView.url)
            return true
        }
    }
    return super.onOptionsItemSelected(item)
}
~~~

### 컨텍스트 메뉴 사용하기

컨텍스트 메뉴는 특정 뷰를 길게 클릭하고 있을 때 표시되는 메뉴입니다.  
컨텍스트 메뉴는 옵션 메뉴를 사용하는 방법과 동일하지만 오버라이드하는 메서드만 다릅니다.  

메뉴 리소스 파일을 생성합니다.(예제에서는 context로 이름을 지정했습니다.).

> context.xml

~~~
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/action_share"
        android:title="페이지 공유"/>
    <item
        android:id="@+id/action_browser"
        android:title="기본 브라우저에서 열기"/>
</menu>
~~~

onCreateContextMenu() 메서드를 오버라이드해서 컨텍스트 메뉴를 지정합니다.  
옵션 메뉴와는 다르게 반환값이 없습니다.  
대신 onCreate() 내부에 registerForContextMenu() 메소드를 호출해야하며, 인자로 컨텍스트 메뉴가 지정될 뷰를 넣습니다.  

~~~
override fun onCreateContextMenu(menu: ContextMenu?, v: View?, menuInfo: ContextMenu.ContextMenuInfo?) {
    super.onCreateContextMenu(menu, v, menuInfo)
    menuInflater.inflate(R.menu.context, menu)
}
~~~

~~~
// 컨텍스트 메뉴가 표시될 대상 뷰 설정
registerForContextMenu(webView)
~~~

이제 onContextItemSelected() 메서드를 오버라이드해서 이벤트를 구현해줍니다.  
~~~
override fun onContextItemSelected(item: MenuItem?): Boolean {
    when (item?.itemId) {
        R.id.action_share -> {
            share(webView.url)
            return true
        }
        R.id.action_browser -> {
            browse(webView.url)
            return true
        }
    }
    return super.onContextItemSelected(item)
}
~~~

## 암시적 인텐트 사용하기

예제에서 보면 전화 걸기, SMS 보내기, 메일 보내기 등의 기능이 있는데 해당 기능을 수행할 수 있는 액티비티를 띄워주게 됩니다.  
우리가 따로 만든 액티비티가 아니지만, 안드로이드에서는 이와 같이 미리 정의된 인텐트들이 있어서 이런 기능들이 가능합니다.  
이렇게 미리 정의된 인텐트를 암시적 인텐트라고 합니다.  

암시적 인텐트로 다양한 기능들을 구현하기 위해서는 코드가 조금 길어질 수 있는데, 우리는 Anko라이브러리를 사용합니다.  

1. 전화걸기 : makeCall(전화번호)
2. 문자 보내기 : sendSms(전화번호, [문자열])
3. 웹 브라우저에서 열기 : browse(url)
4. 문자열 공유 : share(문자열, [제목])
5. 이메일 보내기 : email(받는 메일주소, [제목], [내용])

[]는 옵션 사항입니다.

## 소스 코드

[Kotlin_Web_Browser][git-url]

## 레퍼런스

오준석의 안드로이드 생존코딩 코틀린 편 ( 오준석 저 / 한빛미디어 / 2018.10.01 )
[안드로이드 http 프로토콜 접속 시 예외발생 조치 (ERR CLEARTEXT NOT PERMITTED)][refer-url]

[git-url]: https://github.com/ParkBeomMin/Kotlin_Web_Browser
[refer-url]: https://developside.tistory.com/85
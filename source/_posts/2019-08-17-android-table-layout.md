---
title: "[안드로이드] 테이블 레이아웃(TableLayout)"
date: 2019-08-17 12:19:00+09:00
categories: android boostcourse
toc: true
toc_sticky: true
---

## 0.

우리는 안드로이드에서 대표적인 레이아웃인 LinearLayout, RelativeLayout, ConstrainLayout을 활용해서 다양한 화면을 만들 수 있습니다.

하지만 특정한 모양의 레이아웃이 제공된다면 더 쉽게 만들 수 있겠죠?

이번에는 테이블 형태의 모양을 제공해주는 테이블 레이아웃에 대해서 알아보도록 하겠습니다.

## 1. 구조

테이블 레이아웃의 구조는 다음과 같습니다.

```
<TableLayout>
  <TableRow></TableRow>
  <TableRow></TableRow>
  ...
</TableLayout>
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMTYz/MDAxNTYzOTQ2NTQwMzEx.ehbF-a5zKKs16GDTMRX-ea84MJ3ZGUSGXgMfvAl3Apog.GW9TPdE5JrlIrCpblZQZp4hdJsv25Hw0iUlMfbpqPIYg.PNG.club1294/image.png?type=w773">

TableLayout으로 전체를 감싸고 그 안에 한 행(row)이 TableRow가 됩니다.

그리고 그 행안에 필요한 위젯들을 추가해줍니다.

## 2. 속성

속성에 대해 설명하기에 앞서 기본적으로 테이블 레이아웃을 구성하고, 속성을 하나씩 추가해가면서 변화하는 모습으로 설명을 드리겠습니다.

```
<?xml version="1.0" encoding="utf-8"?>
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <TableRow
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <Button
                android:text="1"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
        <Button
                android:text="2"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
    </TableRow>
    <TableRow android:layout_width="match_parent"
              android:layout_height="match_parent">
        <Button
                android:text="3"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
        <Button
                android:text="4"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
    </TableRow>

</TableLayout>
```

<img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMTIg/MDAxNTYzOTQ4MzQ2OTgz.kpGUdeipNxivzCgyxPoS1cKpOMdkh0Sleaxc5C8PkaEg.4qVsZW_6C3OPvYhHr3z_J2dD32FZu50Ci-Nib2PiGLEg.PNG.club1294/image.png?type=w773">​

### 2.1 테이블 레이아웃 속성(TableLayout Attribute)

영상에서는 stretchColumns에 대한 속성만 언급이 되어있지만, 안드로이드 공식문서에 보면 이것 외에 두가지 속성이 더 있습니다.

> collapseColumns / shrinkColumns / stretchColumns

테이블 레이아웃에는 위와 같이 세 가지 속성을 지정할 수 있습니다.

세 가지 모두 값으로 열(column)의 인덱스 값을 받습니다.

#### 2.1.1 collapseColumns

collapseColumns는 지정한 열을 없애줍니다.

테이블 레이아웃 태그에 collapseColumns 속성으로 0 인덱스를 지정했습니다.

```
<TableLayout
        android:collapseColumns="0"
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMjc2/MDAxNTYzOTQ4NTM2ODQ3.L4yAdSkFEBu-Nunx8F6MceeCljSBBD1R2fCFA4NA6oIg.jVdPGkTBR2o-xOnD-q5hNbxTnEGH5_Ds0-TE9C7kb6Yg.PNG.club1294/image.png?type=w773">

첫번째 열이 사라진 것을 볼 수 있습니다.
​
속성의 값으로 여러 개의 열을 지정할 수 있습니다.

콤마(',')로 구분을 해줍니다.

```
<TableLayout
        android:collapseColumns="0, 1"
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMTgy/MDAxNTYzOTQ4NjU1Mzc5.IR2DQUIuHrPbReW9LQS36EjTTahR3DsXPYkyX63YGC0g.CF7xQqP8IkbWbY0fg2buM21HSfbl3hFV9dn6s3WYkwQg.PNG.club1294/image.png?type=w773">

속성 값이 테이블 열의 인덱스 값을 벗어나게 되면, 무시하게 됩니다.

#### 2.1.2 shrinkColumns

shrinkColumns는 지정한 열을 축소해줍니다.

shrinkColumns의 경우 화면을 벗어날 경우 해당 인덱스를 축소시켜주는 것이기 때문에, 기본 레이아웃에 버튼을 여러개 더 추가한 상태에서 설명드리도록 하겠습니다.

테이블 레이아웃 태그에 shrinkColumns 속성으로 0 인덱스를 지정했습니다.

```
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:shrinkColumns="0"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMjIg/MDAxNTYzOTQ5Mzg1NzQ4.RIseIecXDYjNMpp4-XUBIWi7fY3OdW4-Fyhzu3bPSIEg.kVrVTQbA_B1_olwpHl7rgzek99SRwACXzKMupfsMqKUg.PNG.club1294/image.png?type=w773">

첫번째 열에 있는 버튼이 사라진 것처럼 보입니다.

1~5열에 있는 버튼들의 크기가 아직도 화면을 벗어나 있기 때문입니다.

여러개의 속성을 지정해보겠습니다.

```
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:shrinkColumns="0, 1, 2"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfNDUg/MDAxNTYzOTQ5NTIyNTkx.0qWmhodZdUmxE2J-Nt5kfqSlMwOlGsOJvyTdwZ7zJ7gg.YCX1iSWdi4a6jbX6Pn68QepqXQJJAZK8d8z2oQCYW4Yg.PNG.club1294/image.png?type=w773">

지정된 인덱스에 해당되는 열이 축소된 것을 볼 수 있습니다.

모든 열에 똑같이 지정하고 싶을 때는 '\*'을 넣어주면 됩니다.

```
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:shrinkColumns="*"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMTUz/MDAxNTYzOTQ5NjMwNTcz.4UXgUuUkOjtG-KfG83DIqqAp4NtpegzihPfrjLI5cdQg.pU0qQ7Uu0qSrH6cCtz4HsofVO1VsEjoUDEZxGKpxAQ8g.PNG.club1294/image.png?type=w773">

모든 열이 화면에 맞게 축소된 것을 볼 수 있습니다.

#### 2.1.3 stretchColumns

stretchColumns는 지정한 열을 늘려줍니다.

테이블 레이아웃 태그에 stretchColumns 속성으로 0 인덱스를 지정했습니다.

```
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:stretchColumns="0"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfODAg/MDAxNTYzOTQ5OTQ5Nzk0.PNfjklwvoGkftBdZ6bm6bs85VILeEssOoY-0nBMXZfMg.feQI33Fh6DG97hLt1VimQK-86gMlx1cu82N71ImXVK4g.PNG.club1294/image.png?type=w773">

해당하는 열이 화면에 맞게 늘어나는 것을 볼 수 있습니다.

다른 속성과 마찬가지로 여러 개의 열을 지정할 수 있고,

shrink 속성과 마찬가지로 모든 열에 지정하고 싶을 때는 '\*'을 넣어줍니다.

```
<TableLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:stretchColumns="*"
        android:layout_width="match_parent"
        android:layout_height="match_parent">
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMzgg/MDAxNTYzOTUwMDc1ODkz.m9dw-WoF1iQav72IFYIjFhd4BKwAwAdp5MZfUHFVh8Yg.qiey47SEiGhbDAjmhShbZz47Lgkpay_cQLLKeKL7zFUg.PNG.club1294/image.png?type=w773">

### 2.2 테이블레이아웃 내 위젯 속성

테이블 레이아웃 내에 위치한 위젯들에는 layout_column이란 속성을 지정할 수 있습니다.

layout_column의 값은 마찬가지로 열(column)의 인덱스 값이고 해당하는 인덱스에 위치하게 됩니다.

하지만 주의할 사항이 있습니다.

순서상 앞에 있는 위젯의 열의 위치를 뒤로 옮기면 뒤에 있던 위젯들은 그대로 따라서 뒤로 옮겨지게 됩니다.

즉, 뒤에 있는 위젯에 인덱스 값을 다른 위젯의 앞의 값으로 변경하여도 적용되지 않습니다.
​

2번 버튼을 3번째 열(인덱스 값=2)로 옮겨보도록 하겠습니다.

```
<Button
                android:layout_column="2"
                android:text="2"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
```

 <img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMjEw/MDAxNTYzOTUwNzQwNTQ3.z8Gr-Mb7bvtQLl3mN2n2zAJgtxpYMWBRpdJxop3OltUg.QC_kM58DRn177w2UMcOKHA1Pj2nnRcL1YWOro0UBXpMg.PNG.club1294/image.png?type=w773">

2열에 있던 2번 버튼이 3열로 잘 옮겨졌습니다.

그러면 1번 버튼을 2열(1번 인덱스)로 옮기고, 2번 버튼을 1열(0번 인덱스)로 지정을 해보겠습니다.

```
<Button
                android:layout_column="1"
                android:text="1"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
        <Button
                android:layout_column="0"
                android:text="2"
                android:layout_height="wrap_content"
                android:layout_width="wrap_content"/>
```

<img src ="https://postfiles.pstatic.net/MjAxOTA3MjRfMjI0/MDAxNTYzOTU3NjM0ODgw.qmmUifiJs3So_RJotioio4ugRfrv7G_VM6I2x-DbjzEg.d7cDKaAAS0AX0DwSg5fQgyM8eDYaYYb7TZIUO39vOHsg.PNG.club1294/image.png?type=w773">

1번 버튼은 잘 옮겨졌지만, 2번 버튼은 제대로 동작하지 않습니다.

순서상 1번 버튼이 앞에 있어서 그런 것 같습니다.

​

## 3. 생각해보기

<img src="https://postfiles.pstatic.net/MjAxOTA3MjRfMTQx/MDAxNTYzOTU3Nzg4NjU3.-gA2d_wflwGBsYqQBmgXP8MwfIYA9Kf8vfOlU7jmFuMg.vNULTjr02-_2AqCTX2I3mYptSuef9qLspdCSDuqlKz8g.PNG.club1294/image.png?type=w773">

A) 유지 보수에 더 불편함이 많을 것 같다.

테이블 레이아웃에서 제공되는 속성들을 활용하여서 모양을 잡기가 훨씬 편리하다.

리니어 레이아웃으로 구성을 한다면, 각 행 마다 수정을 해줘야한다.
감사합니다.

## 레퍼런스

[#부스트코스][ref-url-1]

<!-- [ref-url-1]: "https://www.edwith.org/boostcourse-android/lecture/17050/" -->

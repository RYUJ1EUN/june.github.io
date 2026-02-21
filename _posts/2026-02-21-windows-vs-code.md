---
layout: post
title: "(Windows) VS code"
date: 2023-01-13
description: "Windows에서 VS code 컴파일 환경 구축"
tags: [Windows, Tool, VScode]
categories: [Tool]
---



연구실에 맥 유저인 오빠랑 코딩 환경을 맞추다보니 VScode를 애용하게 됐다. 다만, windows 터미널 환경은 가용성이 매우 떨어지므로 모든 걸 VScode 내에서 끝내자는 마음으로 환경을 구축했다.

문제는 한참 전에 문서로 HowTo를 만들고 참고한 글들의 링크를 안 써뒀다. 환경 구축에 도움을 준 수많은 블로그 작가님들께 심심한 사과와 감사를 드린다.

---

#### 1. MinGW 다운로드 및 설치

mingw-w64를 검색해서 다운로드 사이트에 접속한다. 아래 링크로 접속하여 다운받아도 좋다. 사이트에 들어가면 아래 사진을 보고 프로그램을 받는다.

<img src="{{ '/assets/img/post/windows_vs_code/image.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![image.png](image.png) -->

<img src="{{ '/assets/img/post/windows_vs_code/image_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![image.png](image%201.png) -->

#### 2. 다운로드한 파일의 압축을 풀고 C드라이브에 복사

1에서 다운로드 한 파일의 압축을 풀면 mingw64 폴더를 확인할 수 있다. 이를 'C:\'에 복사한다.

#### 3. 환경 변수 추가

고급 시스템 설정 - 환경 변수 (사용자 변수, 시스템 변수 모두) - path - 편집 - 새로만들기 - 경로 추가

윈도우 검색 창에 고급 시스템 설정을 검색하고 환경 변수 버튼을 클릭한다. 여기서 path를 찾아 편집 버튼을 누른다. 그 뒤 새로 만들기를 하여 'C:\mingw64\bin'을 추가한다.

#### 4. gcc 버전 확인

cmd 창에서 'gcc -v'를 입력하여 버전을 확인한다. 만약 버전이 잘 뜨면 환경 변수가 잘 추가된 것이다.

#### 5. json 파일 수정

VScode - 메뉴 - 터미널 - 기본 빌드 작업 구성 - tasks.json 수정 (또는 생성)

VScode에서 상단 메뉴의 터미널 탭에서 기본 빌드 작업 구성을 선택한 뒤 tasks.json 파일을 아래 내용으로 변경한다.

```json
{
    "version": "2.0.0",
    "tasks": [{
            "label": "build",
            "type": "shell",
            "command": "mingw64-make",
            "group": {
                "kind" : "build",
                "isDefault" : true
            }
        }
    ]
}
```

#### 6. 터미널 실행

실행하려는 메인 파일에서 `Ctrl + ~`를 누르면 터미널 탭이 열린다. `mingw32-make`를 입력하면 makefile이 실행된다.


<br>
---
<br>

※ 추가사항

#### 3-2. complie path, intellisense mode 설정

이걸 설정 안 하면 안 되는 경우 있음

Extension (Ctrl + Shift + x) → C/C++ Extension Pack 설치

<img src="{{ '/assets/img/post/windows_vs_code/Untitled.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled.png) -->

Ctrl+shift+P  ⇒  C/C++: Select a Configuration  ⇒ Edit a Configuration(UI)  
⇒  complier path(mingw64 폴더 설정한 경로로 연동)와 IntelliSense mode를 아래 사진과 같이 선택

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%201.png) -->
---
layout: post
title: "(Windows) OpenSSL"
date: 2023-08-02
description: "Windows에서 OpenSSL 환경 구축"
tags: [Windows, Tool]
categories: [Tool]
---



### 1. VS

#### 1. VS 프로젝트 경로 설정

**프로젝트 → 속성 → VC++ 디렉터리**

- 포함 디렉터리 :
    
    ```
    $(VC_IncludePath);$(WindowsSDK_IncludePath);C:\Program Files\OpenSSL-Win64\include;$(includePath)
    ```
    
- 라이브러리 디렉터리 :
    
    ```
    $(VC_LibraryPath_x64);$(WindowsSDK_LibraryPath_x64);C:\Program Files\OpenSSL-Win64\lib\VC;$(LibraryPath)
    ```
    

**프로젝트 → 속성 → 링커 → 입력**

- 추가종속성 :
    
    ```
    $(CoreLibraryDependencies);%(AdditionalDependencies);libcrypto64MD.lib;libcrypto64MT.lib;libssl64MT.lib;libssl64MD.lib;
    ```
    

#### 2. MAKE 파일 (VS code)

```
CC		= gcc
LDFLAGS =-lcrypto
LDFLAGS +="-L/usr/local/opt/openssl@3/lib"
CPPFLAGS ="-I/usr/local/opt/openssl@3/include"

SOURCES= file_name.c
HEADERS= file_name.h

PQCgenKAT_pke: $(HEADERS) $(SOURCES)
    $(CC) -o $@ $(SOURCES) $(LDFLAGS) $(CPPFLAGS)

clean:
    @rm -rf *.o program_name
```

*~~이게 안 될 수 있으니까 상황에 맞춰서 검색해보자....~~*




### 2. VS code 

#### 0. 설치를 위한 사전 환경 설정

1) Perl 설치 (오래 걸림)

간단한 스크립트 작성에 적합한 유닉스 계열 운영체제용 프로그래밍 언어

[https://strawberryperl.com/](https://strawberryperl.com/)

2) visual studio *(최신 버전)* 설치

스튜디오를 사용하는 것이 아닌, VS에서 제공하는 lib 파일과 prompt를 사용하기 위한 목적임

[https://visualstudio.microsoft.com/ko/downloads/](https://visualstudio.microsoft.com/ko/downloads/)

#### 1. OpenSSL tar.gz 파일 다운로드

아래 링크로 들어가서 PC 버전에 맞는 openssl을 다운받고 설치한다. windows의 경우 역시 exe 파일로 설치하는 게 편하다.

[https://www.openssl.org/source/](https://www.openssl.org/source/)

[http://slproweb.com/products/Win32OpenSSL.html](http://slproweb.com/products/Win32OpenSSL.html)




<img src="{{ '/assets/img/post/windows_vs_code/image.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![image.png](image.png) -->

최신 버전으로 다운로드하여 압축 풀고 C드라이브로 이동

#### 2. Visual studio prompt 관리자 권한으로 실행

<img src="{{ '/assets/img/post/windows_vs_code/Untitled.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled.png) -->

#### 3. perl로 openssl build *(C:\openssl-3.1.1)*

1) configure

```
C:\openssl-3.1.1>perl Configure VC-WIN64I --openssldir=C:\OpenSSL-x64-debug no-shared no-asm threads
```

2) make *(이후 ‘nmake test’로 test 가능)*

```
nmake
```

3) install

```
nmake install
```

#### 4. 환경 변수 추가

(사진과 입력해야 하는 위치 다르므로 위치는 코드 블록 참조)

(1) windows 검색창에 

‘고급 시스템 설정 보기’ 검색

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%201.png) -->

(2) 고급 → 환경변수

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_2.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%202.png) -->

(3) 사용자 변수 → Path → 편집

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_3.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%203.png) -->

(4) 새로 만들기 → OpenSSL\bin 위치 추가

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_4.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%204.png) -->

```
C:\Program Files\OpenSSL\bin
```

(5) 시스템 변수 → Path → 편집

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_5.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%205.png) -->

(6) 새로 만들기 → bin, include, lib 위치 추가

<img src="{{ '/assets/img/post/windows_vs_code/Untitled_6.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled%206.png) -->

```
C:\Program Files\OpenSSL\bin
C:\Program Files\OpenSSL\lib
C:\Program Files\OpenSSL\include
```

#### 5. makefile에 flag 추가

```
CC=gcc
CFLAGS += -Wall -Wextra -O3 -I"C:/Program Files/OpenSSL/include"
LDFLAGS = -L"C:/Program Files/OpenSSL/lib"
LDFLAGS+= -L"C:/Program Files/OpenSSL-Win64/bin" -lcrypto-3-x64
```
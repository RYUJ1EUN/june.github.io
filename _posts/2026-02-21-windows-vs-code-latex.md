---
layout: post
title: "(Windows) VS code LaTeX"
date: 2023-01-30
description: "Windows에서 VS code로 오프라인 latex 문서 작업을 위한 환경 구축하기"
tags: [Windows, LaTeX, VScode]
categories: [Tool]
---



Overleaf같은 온라인 툴을 이용하면 LaTeX 문서를 쉽게 편집할 수 있지만, 가독성이 정말이지 답도 없어서 VS code를 사용하기로 결정했다. LaTeX 오프라인 프로그램들을 그대로 사용해도 되지만 익숙한 테마에 익숙한 툴로 작업하려는 욕심이 크게 작용했다.

인터넷에서 서치한 내용들을 따라 했는데 원하는 대로 굴러가기까지 예상보다 시간이 걸렸다. 나중에 또 환경을 구축하려면 그 자체로 일이지 싶다.

---

#### 1. Visual Studio Code (VScode) 설치

우선 아래 링크에서 VS code를 설치한다.

[https://code.visualstudio.com/](https://code.visualstudio.com/)

#### 2. VScode 확장 어플리케이션 설치

<img src="{{ '/assets/img/post/windows_vs_code_latex/image.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![image.png](image.png) -->

<img src="{{ '/assets/img/post/windows_vs_code_latex/image_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![image.png](image%201.png) -->

LaTeX Workshop과 Code Spell Checker를 설치한다. LaTeX Workshop은 VS code에서 TeX를 편리하게 사용하도록 돕는다. Code Spell Checker는 프로그램 이름에서 알 수 있듯 코드 오류를 확인해주는 프로그램으로 환경 구축에 필수는 아니다.   사실 여기까지 하면 tex 문서를 열어서 빌드 할 때 나오는 오류 메시지나 로그만 봐도 어찌어찌 환경 구축을 마무리할 수 있다.

#### 3. TeX Live 설치

LaTeX 컴파일 프로그램이다. 아래 링크로 들어가면 본문 첫 문단 첫 줄에 install-tl-windows.exe라는 하이퍼링크가 있다.

[https://tug.org/texlive/acquire-netinstall.html](https://tug.org/texlive/acquire-netinstall.html)

다운받고 설치하면 된다. 가급적 full package로 받아야 나중에 빠진 패키지 채워 넣는다고 신경 쓰지 않을 수 있다. 다만 설치 시간이 정말 오래 걸리니 install 버튼을 누른 뒤 느긋하게 밥 먹고 커피 마시고 돌아오게 식사 시간 직전에 설치하길 권한다.

#### 4. Perl 설치

프로그래밍 언어 중 하나로 설치하지 않으면 다른 프로그램 다 깔아도 빌드가 안 된다. 이걸 설치하지 않으면 아래 설치할 MiKTeX 프로그램이 있으나 마나여서 먼저 설치하는 편이 정신 건강에 좋다.

[https://strawberryperl.com/](https://strawberryperl.com/)

위 링크로 들어가서 컴퓨터 사양에 맞춰 msi 파일을 다운받고 설치하면 된다. CMD 창에서 "Perl -v"를 입력하여 버전 정보가 출력되면 정상적으로 설치된 것이다.

#### 5. MiKTeX 설치

LaTeX 작업 흐름 동기화 (Perl script) 프로그램 latexmk의 윈도우 버전이다. 이 프로그램은 설치만 하면 끝이었던 이전 프로그램들과 달리 추가 작업이 조금 필요하다.

[https://miktex.org/download](https://miktex.org/download)

프로그램 설치가 끝나면 MiKTeX Console을 열어서 다음을 진행한다.

1. Updates - Update now
2. Packages - latexmk 검색 - 결과 선택 후 + 버튼을 눌러 install


<img src="https://www.notion.so/icons/attachment_gray.svg" alt="https://www.notion.so/icons/attachment_gray.svg" width="20px" /> 'MiKTeX Console is already running'이라는 오류 메시지만 뜨고 프로그램 실행이 안 될 수 있다. 내 경우 이때 프로그램 설치 경로로 들어가다 보면 찾을 수 있는 lock 파일을 삭제하니 열렸다.

프로그램 설치 경로는 C:\Users\user\AppData\Local 인데, lock 파일은 C:\Users\user 에 있었다.

+) 연구실 피드백

옆 사진처럼 작업표시줄의 활성화 프로그램 목록에 MiKTeX이 있으면 더블클릭해서 열 수 있다. 

<img src="{{ '/assets/img/post/windows_vs_code_latex/Untitled.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">
<!-- ![Untitled](Untitled.png) -->



latexmk 설치가 완료되면 윈도우 검색 기능에 고급 시스템 속성을 검색하여 시스템 속성 창을 열어 다음을 진행한다.

1. 환경 변수 - 시스템 변수 - Path - 편집 - 찾아보기 - MiKTeX 설치 경로 추가

#### 6. VS code 실행

latexmk 프로그램을 여러 개 설치하고 환경 변수 변경도 했으니 재부팅을 하고 tex 문서를 편집하길 권장한다. 여튼, 4번까지 잘 진행했으면 VS code로 편집할 tex 문서를 열고 문서 작업 후 저장한다. 저장(Ctrl + S)만 해도 2에서 설치한 LaTeX Workshop이 자동으로 pdf 문서까지 컴파일해 준다.

문서 경로에 한글이나 특수문자가 섞여 있으면 빌드 오류가 발생하니 주의해야 한다. 빌드 결과는 미리보기 창에 자동 반영된다.

---

마지막으로 설치를 위해 참고한 글을 아래 달아둔다.

- 환경 구축 : [https://shakeratos.tistory.com/92](https://shakeratos.tistory.com/92)
- path 설정 : [https://rootblog.tistory.com/206](https://rootblog.tistory.com/206)




---
layout: post
title: "Coding Theory"
date: 2026-03-20
last_modified_at: 2026-04-03
description: "with the Code-based cryptography"
tags: [Cryptography]
categories: [Study]
---


### 0320

- $\mathbb{F}\_2^{n\times n}$의 $k$차원 부분 공간을 코드로 사용
  → $k$차원 부분 공간의 개수가 매우 많아야 함

- 벡터 공간: 집합은 연산에 관련 없이 정의 가능하지만 체는 두 개의 연산이 필요함
  - 모듈: 체 대신 환을 사용하여 공간을 구성

- metric: norm으로 거리를 정의
  - 코딩 이론에서는 hamming distance를 사용
    $$
    d_H = \mathbb{F}_2^n \times \mathbb{F}_2^n \to \mathbb{Z}_{\ge 0}; ({\bf u}, {\bf v}) \mapsto |\text{supp}({\bf u} - {\bf v})|
    $$


- 오류 : bit flip or 비트 누락오류가 있을 때 
- correction은 어떻게 하는가?
  - codeword : 정보 + 추가 정보
    - decoder는 received vector에 오류가 있을 때 이를 정정하고 $k$ 비트 original data로 변환함
    - decoder는 부호 기반 암호에서 sk
- error correcting code로 모든 error를 잡을 수 있는 것은 아님
  - 오류가 너무 많으면 오류를 정정할 수 없음
  - 대신 오류 발생을 탐지하면 재전송을 요청

- 부호 기반 암호에서 pk가 큰 이유 
  - sk를 추정할 수 없도록 랜덤해 보여야 함
    $\rightarrow$ 압축할 수 없어야 함
    * HQC는 압축률이 높지만 가정을 믿고 씀
      Reed-Solomon code:
      $$m \rightarrow m\|m\|\dots\|m \xrightarrow{\text{add error}} m\|m\|\dots\|m'\|\dots\|m \rightarrow m$$


- 길이가 $n$인 code $C$는 벡터 공간 $\mathbb{F}\_q^{n}$의 subset 또는 subspace이다.
  - subspace이려면 $C$가 linear code여야 함
  - $d\_H = 1$인 codeword의 수:
  $$|\{a\in \mathbb{F}_q^n: d_H(c,a)=1\}| = n(q-1)$$
    - $n$: 가능한 $c_i$의 위치 $i=0,...,q-1$
    - $q-1$: 가능한 $c_i$의 값 $c_i\in\mathbb{F}_q^n$

- sphere가 안 겹치게 잡는 이유는 에러를 한 점에 대응시키기 위해
  - sphere 밖에 있는 값은 decoding에 실패함
    $\rightarrow$ 존재하지 않는 경우가 있음  
    $\Rightarrow$ perfect code = Hamming codes
- 암호에서는 최대 가능 error 거리를 고정시키고 오류 주입 수행


### 0327

| message | $\rightarrow$ | [ encoder ] | $\rightarrow$ | codeword |
| $k$-bit | | $[n, k]\_2$ code $k \xrightarrow{\text{linear}} n$ | | $n$-bit$|
| | | $C[n, k]$: linear codeword | | $\downarrow\leftarrow$ error|
| message | $\leftarrow$ | [ decoder ] | $\leftarrow$ | Vector |
| $k$-bit | | | | $n$-bit |

- $k < n$: 오류를 정정하기 위함
- 통신 효율성을 고려하면 $\frac{k}{n} \approx 1$ 이길 바람 (good code)

$$\frac{k}{n} \in \{0.5 \sim 0.7\}$$

- 오류 발생 확률이 낮으면 $\frac{k}{n} \approx 1$ 가능
- 오류 발생 확률이 높으면 $\frac{k}{n} \rightarrow 0$ 이 됨

* 암호에서는 $\frac{k}{n}$이 통신만큼 중요하지는 않은데 $n$과 $k$가 커야 함
    * $n$을 정하고 good code가 되는 $k$를 찾음 (minimum dist를 찾기 위함)

Encode : $\mathcal{M} \rightarrow \mathcal{C}$ (message space $\rightarrow$ codeword space)
- $\mathbb{F}\_2^k \rightarrow \mathbb{F}\_2^n$
- $$|C| = 2^k \qquad \because$$ 
encode; linear $1-1$(복원해야 하므로) function

Efficient decoder 발전 흐름
1. Reed-Solomon $\mathbb{F}\_{2^m}$
2. GRS 
3. Alternate code $\mathbb{F}\_{2^m} \rightarrow \mathbb{F}\_2$
4. Goppa code $\mathbb{F}\_2$

linear code: $\mathbb{F}\_2^n$의 subspace (Vector space $\mathbb{F}\_2^n$의 연산에 대해 닫혀있음)
* $k$개의 벡터를 뽑을 때 순서를 고려해야 함 (Span을 위한 선행 기저가 필요)
    - 모든 벡터에 $v\_1, v\_2, \dots, v\_{2^n-1}$ 이라고 ordering이 되어있을 때 $(v\_1, v\_2, \dots, v\_k)$와 $(v\_1, v\_5, \dots, v\_2)$를 구별해서 뽑고 분모에 같은 공간을 이루는 경우를 나눠줌으로써 벡터 순서에 대한 문제를 해결함

- linear code $C$가 이루는 subspace에 대하여 같은 space를 이루는 codeword가 있음
- 서로 다른 space가 codeword가 됨
- code를 랜덤하게 선택할 때 후보군이 많아야 전수조사 공격에 안전함


- $[n, k, d]\_q$: $C$에 대한 minimal $d_H$가 $d$인 subspace
- linear code는 $$\min_{u \neq v} d_H(u, v) = \min_{u \neq v} w_H(u - v) = \min_{u \in C \setminus \{0\}} w_H {\bf u}$$
- $C$의 codeword에 대한 minimum dist = $d$라는 것은 
_Sphere 그림 참고_

$$r = \lfloor \frac{d-1}{2} \rfloor$$ 
개의 오류를 정정할 수 있음
- $r$이 같을 때 $k$가 커야 good code: $\because$ 통신 효율 (더 많은 데이터를 보낼 수 있음)
+ $r$이 작아야 code의 크기가 ($k$가) 커짐 

$r=1$ 일 때 Sphere 내의 code 개수: $\frac{(1+n)2^k}{2^n}$ ($=2^n$ 이면 perfect code)
- $n$은 거리가 1인 (즉 1비트 오류가 발생한) 벡터에 의한 변수

$$\begin{cases} a_{11}x_1 + \dots + a_{1n}x_n = 0 \\ \qquad\qquad\vdots \\ a_{m1}x_1 + \dots + a_{mn}x_n = 0 \end{cases}$$ 

- 연립 동차 선형 방정식의 해 $\rightarrow$ vector space를 이룸
- 연립 동차 선형 방정식으로 codeword를 정의함
    $$\begin{pmatrix} a_{11} & \dots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \dots & a_{mn} \end{pmatrix} \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix} = \begin{pmatrix} 0 \\ \vdots \\ 0 \end{pmatrix}$$
    
    - $A$: parity check matrix (1비트 오류를 잡을 수 있음)
    - $x$: codeword

※ 파라미터 설정 순서: $d \rightarrow n \rightarrow k$ ($d$를 구하는 것이 어렵기 때문에 target $d$를 먼저 결정)


$c = (c\_1, \dots, c\_n), \quad e = (e\_1, \dots, e\_n)$에 대해 패리티 체크행렬 $H$를 사용하면 $Hc=0$이므로

$$H(c+e) = He$$ 

- $He$: 신드롬

$\Rightarrow$ 오류가 발생한 비트의 위치를 찾을 수 있음


$H = (h\_1, h\_2, \dots, h\_n) = (1^T, 2^T, \dots, n^T)$ 이라고 하면 
- 이러한 $H$의 구성 방식을 따르면 행의 중복 없이 $n$비트 codeword와 연산 가능한 가장 작은 크기의 행렬을 구성할 수 있음
- 신드롬: $x = \begin{pmatrix} x\_1, \dots, x\_n \end{pmatrix}^T$ 에 대하여 $i$ index에 오류가 발생한 것을 알 수 있는 벡터

* $H$ 생성
    - 오류가 발생하면 반응하는 행(오류 위치)을 신드롬으로 보여줌 (오류가 하나 발생한다고 보기 때문에 사용 가능함)
    
    $$(h_1, h_2, \dots, h_n) \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}= x_1 h_1 + x_2 h_2 + \dots + x_n h_n$$
    
    - $x\_i \in \{0, 1\}$ 이므로 오류 발생 시 $h\_i$ 만큼 신드롬이 나타남 ($Hx + h\_i = h\_i$)


### 0403

- Subspace
  - 연립 선형 방정식의 해들의 집합
  - $\text{span}(\cdot)$
    
$$C = \{ v \in \mathbb{F}_2^n \mid Hv = 0^k \}$$
    
- $H$: parity-check matrix.
- 이때, $$v_1, v_2 \in C \Rightarrow v_1 + v_2 \in C$$

Hamming code $H$: 1-bit 오류를 탐지할 수 있음

| Alice |  | $e$ |  | Bob |
| | | $\downarrow$ | | |
| $c$ | ———— | $\oplus$ | ————> | $c+e$ |

1. Find error with Syndrome $H(c+e)$
2. Remove error

| $m$ | $\longrightarrow \boxed{\text{Enc}} \longrightarrow$ | Codeword |
| | | $\downarrow$ |
| | | $\oplus \longleftarrow$ error |
| | | $\downarrow$
| $m$ | $\longleftarrow \boxed{\begin{matrix} \text{Codeword} \\ \text{Dec} \end{matrix}} \longleftarrow$ | vector |

- $H$는 vector에서 codeword를 만드는 데 사용됨

$$G: \mathcal{M} \longrightarrow \mathcal{C} = \mathbb{F}_2^k \longrightarrow \mathbb{F}_2^n; (\alpha, \beta, \gamma) \mapsto (\alpha u_1 + \beta u_2 + \gamma u_3)$$

Generator matrix (생성행렬) 

$$G^T = \begin{pmatrix} \mid & \mid & \mid \\ u_1 & u_2 & u_3 \\ \mid & \mid & \mid \end{pmatrix}$$ 

i.e., 

$$H G^T \begin{pmatrix} \alpha \\ \beta \\ \gamma \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} \Rightarrow H G^T = 0$$

#### Special case

$$H = [M \mid I_{n-k}]_{n \times n-k} \Rightarrow G^T = \begin{bmatrix} I_k \\ -M \end{bmatrix}, G = [I_k \mid -M^T]$$

- $G$의 $I_k$는 $m$을 그대로 유지함
  - Vector로부터 codeword를 찾으면 뒤의 $n-k$개 원소만 날리면 디코딩 완료

- Hamming code $\rightarrow$ cyclic code $\rightarrow$ polynomial로 연산할 수 있음
  - cyclic code는 행렬을 통으로 저장하지 않고 순환하는 행만 저장하면 됨

* $\mathbb{F}_q$에서 Hamming code $[\frac{q^r-1}{q-1}, \frac{q^r-1}{q-1} - r, 3]$
  - $d=3$이므로 1개의 오류가 존재할 때만 오류 정정 가능
  - 실제 환경에서는 오류가 몰려서 발생하므로 $q$를 키워서 한 블록을 잡아내는 것이 유리함
  * 암호에서는 오류를 uniform하게 뿌리기 때문에 이를 고려하지 않아도 됨

$d \le n - k + 1$ 이고 $d = n - k + 1$ 이면 MDS 부호라고 함 (AES MixCol)

$\mathbb{F}_q^* = \langle \alpha \rangle = \{ \alpha^0, \alpha^1, \dots, \alpha^{q-2} \}$

$$A = \{ (f(\alpha^0), f(\alpha^1), \dots, f(\alpha^{q-2})) : f(x) \in \mathbb{F}_q[x] \text{ and } \deg(f) < k \} \subseteq \mathbb{F}_q^{q-1}$$

- $u_1 = (f_1(\alpha^0), f_1(\alpha^1), \dots, f_1(\alpha^{q-2})) \in A$
- $u_2 = (f_2(\alpha^0), f_2(\alpha^1), \dots, f_2(\alpha^{q-2})) \in A$ 
→ $u_1 + u_2 \in A$ $\because f_1(x) + f_2(x) \in \mathbb{F}_q(x)$

$$w_H(u_1) = |\text{supp}(u_1)| = |\text{supp}(f_1(\alpha^0), \dots, f_1(\alpha^{q-2}))|$$

$$\begin{aligned}
\# \text{ non-zero} &= (q-1) - \underbrace{\# \text{ zeros of } f}_{\downarrow \# \text{해} \le k-1}\quad(\because \deg f \le k-1)\\
& \ge (q-1) - (k-1)
& = q - k
\end{aligned}$$

For $n = q-1$, $d \le n - k + 1$ ($d \overset{?}{=} w_H$)
---
layout: post
title: "ARX-WBC Cryptanalysis"
date: 2025-04-02
last_modified_at: 2025-12-09 04:30:00
description: "Biryukov arx-based white-box 분석 논문 리뷰"
tags: [WBC, MATH, Cryptanalysis]
categories: [Study]
---



📚 **[MAIN]** Alex Biryukov, Baptiste Lambin, and Aleksei Udovenko.
”Cryptanalysis of arx-based white-box implementations.”
IACR Transactions on Cryptographic Hardware and Embedded Systems, 2023(3):97135, 2023.

📚 **[Sub 1]** Adrián Ranea, Joachim Vandersmissen, and Bart Preneel.
”Implicit white-box implementations: White-boxing arx ciphers.”
In Annual International Cryptology Conference, pages 3363. Springer, 2022.

📚 **[Sub 2]** Adrián Ranea and Bart Preneel.
”On self-equivalence encodings in white-box implementations.”
Cryptology ePrint Archive, Paper 2020/1325, 2020.

---


### Intro.

#### 구현 방식 비교 (CEJO vs Self-equivalence)

##### CEJO WBC

테이블로 저장 (입력 $n$-bit, 출력 $n$-bit)  :  공간 복잡도: $2^n \times n \;(\gg\sum_{i=0}^n \binom{n}{i}= 2^n)$

→ 인코딩을 크게 적용할 수 없음

##### Self-equivalence 구현

다항식으로 저장  :  공간 복잡도: $\sum \binom{n}{k}\cdot n$

→ 인코딩을 크게 생성·적용할 수 있음

- 인코딩 차수가 높아지면 저장 공간 문제가 발생함 *(참고: 테이블 방식보단 효율적)*
- 저차 인코딩은 가우스 소거법으로 쉽게 풀 수 있음
    - 사용자와 공격자 모두 가우스 소거법을 사용해야 함
- (가우스 소거법을 적용하려면) 상대적으로 공격하기 어려운 방식으로 **음함수 기반 구현 제안**

##### Implicit WBC 구현

CEJO 또는 SE(self-equivalence) 구현 방식에 적용되었던 공격의 기반인 인코딩이 상쇄되는 문제를 극복하기 위한 방식으로 음함수 기반 구현 제시

|  | 기존 (CEJO, SE) | 개선 (Implicit) |
| --- | --- | --- |
| 인코딩 특성 | 2개 라운드에 다른 인코딩 상쇄 | 3개 라운드를 통한 인코딩 상쇄 |
| 공격 지점 | 3 라운드 이상이 주어질 때, 공격자도 인코딩 상쇄 가능 |  |

Affine SE를 가지면서 암호에 사용 가능한 연산은 고차 함수이므로 다항식으로 저장하기에 부적합함

→  **음함수를 사용하면 저차함수로 표현 가능함**

- 기본 함수: $y = x^{n}\; (\Leftrightarrow x^n+y=0)$
- 음함수 표현: $(x(xy+1), y(xy+1)) = (0,0)$ 
- 화이트박스 구현 기술의 흐름 (Motivation Flow)
    초기 WB 구현 아이디어: 키를 보호하기 위한 인코딩을 붙여서 Table로 저장  
    →  Table 저장에 필요한 메모리 크기 문제: $2^n \cdot n$  
    →  작은 비선형 인코딩을 붙이는 작은 Table 구현 (CEJO)  
    →  비선형 인코딩을 선형 인코딩으로 바꾸는 공격  
    →  큰 인코딩을 적용 가능한 SE 구현 방식 차용  
    →  Table 보단 낫지만 여전히 메모리 문제 (큰 인코딩을 쓰는) 발생  
    →  음함수 기반 구현 사용  
    - 음함수 방정식을 사용하면 고차 양함수 방정식을 저차로 표현 가능함  
        - $y=x^n$에 대하여
        - ($n+1$차) $x \cdot x^n = xy$ (2차)
    - 인코딩 상쇄 문제 해결을 위해
        - 두 라운드 단위 cancellation rule의 성립이 아닌
        - 세 라운드 단위 cancellation rule의 성립을 꾀함
        
        $$
        \begin{matrix}
        \text{Modular Addition: }n\text{차}
        &
        \overset{\text{CCZ-equiv} }{\leftrightarrow}
        &
        2\text{차 함수 }Q
        \\
        \boxplus\text{의 그래프}
        &
        \overset{\text{affine-permutation} }{\leftrightarrow}
        &
        Q\text{의 그래프}
        \end{matrix}
        $$
        
        그래프:  함수 관계를 만족하는 $(x, y)$의 집합          
        - CCZ-equivalence: 그래프가 affine-permutation으로 관계됨
            
            <img src="{{ '/assets/img/post/arx_wbc_1/boxplus_ccz.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="boxplus_ccz">
            <!-- ![boxplus_ccz.png](boxplus_ccz.png) -->
            
        - $\boxplus$ (S-layer)는 $Q$와 CCZ-equiv
        - $n$차 $\boxplus$ 를 2차 함수 $Q$의 음함수로 표현
        
        ⇒  음함수로 표현하기에 좋은 조건          
        ⇒  ARX Cipher의 S-layer($\boxplus$)를 음함수로 표현
        

#### Ranea’s ARX-WBC Implicit Implementation

##### 라운드 함수와 Self-Equivalence 유도

임의의 라운드 함수

$$
E^{(i)} = L^{(i)} \circ S
$$

($L^{(i)}$는 라운드 키 $k^{(i)}$를 포함함)

비선형 함수 $S$는 affine-quadratic self-equivalence $(A^{(i)}, B^{(i)}) \in SE(S)$를 가짐

$$
S = B^{(i)} \circ S \circ A^{(i)}
$$

- $A^{(i)}$: affine right SE
- $B^{(i)}$: quadratic left SE

<img src="{{ '/assets/img/post/arx_wbc_1/basic_attack_structure.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="basic_attack_structure">
<!-- ![basic_attack_structure.png](basic_attack_structure.png) -->

그리고 $\|SE(E^{(i)})\| = \|SE(S)\|$이므로 $E^{(i)}$의 self-equivalence는 다음과 같이 표현 가능함

$$
\begin{aligned}
E^{(i)} &= L^{(i)} \circ S \\
&= L^{(i)} \circ B^{(i)} \circ S \circ A^{(i)} \\
&= L^{(i)} \circ B^{(i)} \circ (L^{(i)})^{-1} \circ L^{(i)} \circ S \circ A^{(i)} \\
&= L^{(i)} \circ B^{(i)} \circ (L^{(i)})^{-1} \circ E^{(i)} \circ A^{(i)}
\end{aligned}
$$

$$
\therefore (A^{(i)}, L^{(i)} \circ B^{(i)} \circ (L^{(i)})^{-1}) \in SE(E^{(i)})
$$

Let $\hat{A}^{(i)} = A^{(i)},\; \hat{B}^{(i)}= L^{(i)}\circ B^{(i)}\circ (L^{(i)})^{-1}$

Then

$$
E^{(i)} = \hat{B}^{(i)} \circ E^{(i)} \circ \hat{A}^{(i)}
$$

한편, $C^{(i+1)}$ : affine permutation에 대하여,

$$
E^{(i)} = \hat{B}^{(i)} \circ E^{(i)} \circ \hat{A}^{(i)} = \hat{B}^{(i)} \circ (C^{(i+1)})^{-1} \circ C^{(i+1)} \circ E^{(i)} \circ \hat{A}^{(i)}
$$

이고, 연속된 두 라운드에 대하여 다음이 성립함

$$
E^{(i)} \circ E^{(i-1)} = 
\left( \hat{B}^{(i)} \!\circ\! (C^{(i+1)})^{-1} \circ\! \right.
\underset{\color{blue}\overline{E}^{(i)}}{\color{blue}\underbrace{
\color{blue}\left[ \color{black}
C^{(i+1)} \!\circ E^{(i)} \!\circ\! \hat{A}^{(i)} \right) \color{black}  \;\circ\;
\left( \hat{B}^{(i-1)} \!\circ\! (C^{(i)})^{-1}\color{blue} \right] \!\color{black}}}  \left.
\circ\, C^{(i)} \!\circ E^{(i-1)} \circ \hat{A}^{(i-1)} \right)
$$

인코딩된 라운드 함수를 다음과 같이 정의하면

$$
\bar{E}^{(i)} = C^{(i+1)} \circ E^{(i)} \circ \hat{A}^{(i)} \circ \hat{B}^{(i-1)} \circ (C^{(i)})^{-1}
$$

따라서 인코딩된 암호화 함수는

$$
\begin{aligned}
\bar{E}_k 
&= \bar{E}^{(r)} \circ \bar{E}^{(r-1)} \circ \dots \circ \bar{E}^{(2)} \circ \bar{E}^{(1)}\\[.7em]
&= \left[ C^{(r+1)} \circ E^{(r)} \circ \hat{A}^{(r)} \circ 
\color{red}
\hat{B}^{(r-1)} \circ (C^{(r)})^{-1} \right]\\
{\color{red} (E^{(r-1)\;}\rightarrow)} & \;\quad\color{red} \circ 
\left[ C^{(r)} \circ E^{(r-1)} \circ \hat{A}^{(r-1)} 
\color{black}
\circ \hat{B}^{(r-2)} \circ (C^{(r-1)})^{-1} \right] \\
&\quad\; \circ\; \cdots \\
&\quad\;\circ \left[ C^{(3)} \circ E^{(2)} \circ \hat{A}^{(2)} \circ \hat{B}^{(1)} \circ (C^{(2)})^{-1} \right]\\
&\quad\; \circ \left[ C^{(2)} \circ E^{(1)} \circ \hat{A}^{(1)} \circ \hat{B}^{(0)} \circ (C^{(1)})^{-1} \right]\\[1em]
& = C^{(r+1)} \circ E^{(r)} \circ \hat{A}^{(r)} \circ E^{(r-1)} \circ \dots \circ E^{(2)} \circ E^{(1)} \circ \hat{B}^{(0)} \circ (C^{(1)})^{-1}\\[.7em]
&= \left[ \hat{B}^{(r)} \circ (C^{(r+1)})^{-1} \right]\circ \left[ \hat{B}^{(r)} \circ (C^{(r+1)})^{-1} \right]^{-1} \circ C^{(r+1)} \circ E^{(r)} \circ \hat{A}^{(r)}\\
&\quad\; \circ\dots \circ E^{(1)} \circ \left[ \hat{B}^{(0)} \circ (C^{(1)})^{-1} \right]\\[.7em]
&= \left[ \hat{B}^{(r)} \circ (C^{(r+1)})^{-1} \right]\circ E^{(r)}\circ \dots \circ E^{(1)} \circ \left[ \hat{B}^{(0)} \circ (C^{(1)})^{-1} \right]\\[1em]
& = O_{ext} \circ E_k \circ I_{ext}
\end{aligned}
$$

이때 

$$
O_{ext} = C^{(r+1)} \circ (\hat{B}^{(r)})^{-1} \qquad\text{and}\qquad
I_{ext} = \hat{B}^{(0)} \circ (C^{(1)})^{-1}
$$

##### 인코딩된 암호화 함수에 대한 음함수 구현

앞서 정리한 인코딩된 암호화 함수는

$$
\begin{aligned} 
\bar{E}^{(i)} & = C^{(i+1)} \circ E^{(i)} \circ \hat{A}^{(i)} \circ \hat{B}^{(i-1)} \circ (C^{(i)})^{-1} \\[.5em]
& = C^{(i+1)} \circ L^{(i)} \circ S \circ \hat{A}^{(i)} \circ \hat{B}^{(i-1)} \circ (C^{(i)})^{-1}
\end{aligned}
$$

이를 음함수로 구현하면 

$T$를 $S$의 음함수라고 할 때, $\bar{E}^{(i)}$의 음함수 $P^{(i)}$는

$$
P^{(i)} = T \circ \left(Id, (L^{(i)})^{-1}\right) \circ \left(\hat{A}^{(i)}, Id\right) \circ \left(\hat{B}^{(i-1)}, Id\right) \circ \left((C^{(i)})^{-1}, (C^{(i+1)})^{-1}\right)
$$

나아가 $(U^{(i)}, V^{(i)})$가 $T$의 SE라 하면

$$
P^{(i)} = V^{(i)} \circ T \circ U^{(i)} \circ \dots \circ ((C^{(i)})^{-1}, (C^{(i+1)})^{-1})
$$

CEJO나 SE 구현에 수반된 일반적인 공격들에 저항성을 가짐

**Explicit과 Implicit의 관계**

<img src="{{ '/assets/img/post/arx_wbc_1/ARX_explicit_implicit.png' | relative_url }}" style="max-width: 80%; height: auto; display: block; margin: 0 auto;" alt="ARX_explicit_implicit">
<!-- ![ARX_explicit_implicit.png](ARX_explicit_implicit.png) -->

$$
E^{(i)} = \hat{B}^{(i)} \circ (C^{(i+1)})^{-1} \circ C^{(i+1)} \circ E^{(i)} \circ \hat{A}^{(i)}
$$

$$
\bar{E}^{(i)} = \underbrace{C^{(i+1)} \circ L^{(i)}}_{\text{affine}} \circ \underbrace{S}_{\substack{ \!\!\!\!\!\text{주요 음함수}\!\!\!\!\! \\[.2em] \!\!\!\!\!\text{변환 대상}\!\!\!\!\!}} \circ \underbrace{\hat{A}^{(i)} \circ \hat{B}^{(i-1)} \circ (C^{(i)})^{-1}}_{\text{quadratic}}
$$

### Birykov’s Attack

#### External encoding 상쇄

$$
\begin{aligned}
\bar{E}_K &= O_{ext} \circ E_K \circ I_{ext} \\[.5em]
&= \left( C^{(r+1)} \circ (\hat{B}^{(r)})^{-1} \right) \circ E_K \circ \left( \hat{B}^{(0)} \circ (C^{(1)})^{-1} \right)
\end{aligned}
$$

##### 1. $O_{ext}$가 없는 경우

$$
\bar{E}_K = \bar{E}^{(r)} \circ \bar{E}^{(r-1)} \circ \dots \circ \bar{E}^{(1)}
$$

마지막 라운드 $\bar{E}^{(r)}$ 분석

$$
\begin{aligned}
\qquad\quad \bar{E}^{(r)} 
&= C^{(r+1)} \circ 
E^{(r)} \circ \underbrace{\; \hat{A}^{(r)}}_{\substack{ \!\!\!\!\!\!\!\!\!\!\text{먼저 없앨 대상}\!\!\!\!\!\!\!\!\!}} 
\circ \hat{B}^{(r-1)} \circ (C^{(r)})^{-1}\\[1em]

&= C^{(r+1)} \circ \underbrace{(\hat{B}^{(r)})^{-1} \circ \hat{B}^{(r)}}_{\substack{ \Rightarrow\text{ 추가}}} \circ E^{(r)} \circ \hat{A}^{(r)} \circ \hat{B}^{(r-1)} \circ (C^{(r)})^{-1} \\

&= E^{(r)} \circ \hat{B}^{(r-1)} \circ (C^{(r)})^{-1} 

\qquad\qquad

(O_{ext}\text{가 없으므로, } C^{(r+1)} \!\circ\! (\hat{B}^{(r)})^{-1} = Id)\\[1em]

&= E^{(r)} \circ Q^{(r)}

\qquad\qquad\qquad\qquad\quad\;

(\text{Let } \hat{B}^{(r-1)} \circ (C^{(r)})^{-1} = Q^{(r)})\\
\end{aligned}
$$

⇒  화이트박스 공격자는 $\bar{E}_K$의 방정식만 가지고 있으므로 공격 대상 라운드 함수를

$$
F = \bar{E}^{(r)} = E^{(r)} \circ Q^{(r)}
$$

<img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_1">
<!-- ![no_in_encoding_attack_structure_1.png](no_in_encoding_attack_structure_1.png) -->

$$
\downarrow
$$

<img src="{{ '/assets/img/post/arx_wbc_1/no_out_encoding_attack_structure_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="no_out_encoding_attack_structure_1">
<!-- ![no_out_encoding_attack_structure_1.png](no_out_encoding_attack_structure_1.png) -->


이라고 하면, 구현 함수의 입출력은 모르고 라운드 전체에 대한 입출력을 알 수 있음 (오라클)

**공격 전략**

$Q^{(r)}$를 linear로 변환시켜 이전 라운드와 상쇄되도록 하고 $E^{(r)}$의 키를 구함

⇒  $Q$와 동치인 $M$을 찾아야 함

<img src="{{ '/assets/img/post/arx_wbc_1/no_out_encoding_attack_structure_2.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="no_out_encoding_attack_structure_2">
<!-- ![no_out_encoding_attack_structure_2.png](no_out_encoding_attack_structure_2.png) -->

$$
\begin{aligned}
x &= (x_{N-1}, x_{N-2}, \dots, x_1, x_0) \\
&\Downarrow \\
\tilde{x} &= (x_{N-1}x_{N-2}, x_{N-1}x_{N-3}, \dots,  x_2x_1, x_2x_0, x_1x_0, \\
&\qquad\! x_{N-1}, x_{N-2}, \dots, x_1, x_0, \\
&\qquad\! 1)
\end{aligned}
$$

$$
Q(x) = M(\tilde{x})
$$

공격을 위한 구조화

- 공격 입출력 정의
    - $(x^{(i)}, y^{(i)})$ : $i$번째 공격 입출력 쌍 ($y^{(i)}$가 오라클의 출력은 아님)
        
        $$
        y^{(i)}=G^{-1}(F(x^{(i)}))
        $$
        
    - $z^{(i)}$ : $(x^{(i)}, y^{(i)})$에 대한 중간값

<img src="{{ '/assets/img/post/arx_wbc_1/no_out_encoding_attack_structure_3.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="no_out_encoding_attack_structure_3">
<!-- ![no_out_encoding_attack_structure_3.png](no_out_encoding_attack_structure_3.png) -->

$k_0$부터 상위 비트로 순차 공격 진행

$$
(z^{(i)}_0 \boxplus y^{(i)}_0) \oplus k_0 = y^{(i)}_n\\[.7em]

\implies y^{(i)}_n = z^{(i)}_0 \oplus y^{(i)}_0 \oplus k_0
$$

$\because$  0번째 비트에 대해서는 $\boxplus$가 $\oplus$와 같음

$$
z^{(i)}_0 = \underset{\text{known}}{\underbrace{\ y^{(i)}_n \oplus y^{(i)}_0}} \oplus \underset{\!\!\!\!\text{guessing}\!\!\!\!}{\underbrace{k_0}}
$$

$k_0$를 추측하면 $z_0^{(i)}$를 구할 수 있음

$L+\epsilon$개 입출력 쌍에 의한 $z^{(i)}$에 대하여 $k_0$에 대한 추측을 반복하여 구한 $z_0^{(i)}$로 다음을 확인

$$
(z^{(1)}_0, \dots, z^{(N+\epsilon)}_0) = M_n (\tilde{x}^{(1)} \dots \tilde{x}^{(N+\epsilon)})
$$

위 식이 성립하면 $k_0$를 옳게 추측한 것

문제는 아직 $M_n$을 모름

$Z_{\cdot 0} = (z^{(1)}_0, z^{(2)}_0, \dots, z^{(N+e)}_0)$가 $\hat{x}^{(i)}$들로 만든 행렬 $\tilde{X}$의 행공간(Column Space)에 속하는지 확인

- $z_0$가 $\hat{x}^{(i)}$의 선형 결합이므로
- $\tilde{X}$ 생성에는 $L=O(N^2)$개 입력 필요
    
    실제 생성 가능한 입력은 $2^N$개이므로 full-rank matrix 생성 가능
    

⇒  ${x}^{(i)}$의 parity check 행렬 $H$로 효율적인 확인 가능

$H$는 $\tilde{X}$의 열공간과 직교하는 행렬

$$
\begin{pmatrix} | & & | \\[.4em] \tilde{x}^{(1)} &\cdots & \tilde{x}^{(L+e)} \\ | & & | \end{pmatrix} 
= \tilde{X}_{L \times (L+\epsilon)} 
\;\xrightarrow{RREF\,}\; (I \mid P) 
\;\xrightarrow{\text{gen }H}\; 
H = \begin{pmatrix}-P^T \mid I\end{pmatrix}
$$

$k_0$를 옳게 추측한 경우 $H z_{0} = 0$

잘못 추측해도 $H z_{0} = 0$일 수 있음

→  오판은 공격의 점진적 진행 과정을 통해 수정

$\therefore H z_{0} \neq 0$이면 $k_0$를 잘못 추측했다고 판단

- 이러한 방식은 일부 $k_j$에 대하여, 어떤 값으로 추측하든 $z_j$가 열 공간에 속하는 경우가 발생할 수 있음
    
    그러나 다음 키 비트를 추측하는 과정에서 $k_{j+1}$를 어떤 값으로 설정하든 $z_{j+1}$이 $\tilde{X}$의 열공간에 속하지 않으면, $k_1,\,...,\,k_{j}$를 잘못 구했다고 판단할 수 있음
    
    →  각 비트에 대하여 확인할 값이 둘 뿐이므로 현실적인 연산 가능
    
- 또한, $k_{n-1}$에 대해 결정하지 못할 경우, 이후 $r-1$ 번째 라운드의 라운드 키를 복구하는 과정에서 $r$ 라운드의 키를 하나로 특정 가능

$k_0$를 구하고 검증을 하면 $z_0 \boxplus y_0$에 따른 carry($c_1$)를 구할 수 있음

$$
(z^{(i)} \boxplus y^{(i)}) \oplus k_1 = y^{(i)}_{n+1}\\[1em]

\Rightarrow y^{(i)}_{n+1} = z^{(i)}_1 \oplus y^{(i)}_1 \oplus c^{(i)}_1 \oplus k_1\\[1em]

\therefore z^{(i)}_1 = \underbrace{y^{(i)}_{n+1} \oplus y^{(i)}_1 \oplus c^{(i)}_1}_{\text{known}} \oplus \underbrace{k_1}_{\!\!\!\!\text{guessing}\!\!\!\!}
$$

같은 과정 반복  ⇒  라운드 키 $k^{(r)}$ 복구

<img src="{{ '/assets/img/post/arx_wbc_1/no_out_encoding_attack_structure_4.png' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="no_out_encoding_attack_structure_4">
<!-- ![no_out_encoding_attack_structure_4.png](no_out_encoding_attack_structure_4.png) -->

라운드 $r$의 키를 알았으므로 해당 라운드를 벗겨내고 이전 라운드($r-1$)를 공격

$$
\begin{aligned}
\bar{E}^{(r)} \circ \bar{E}^{(r-1)} 

&= E^{(r)} \circ \underset{\bar{E}^{(r-1)}}{\underbrace{\;Q^{(r)} \circ \left[ C^{(r)} \circ E^{(r-1)} \circ \hat{A}^{(r-1)} \right.}}
\left.\circ\ \hat{B}^{(r-2)} \circ (C^{(r-1)})^{-1} \right] \\[2em]

&= E^{(r)} \circ E^{(r-1)} \circ B^{(r-2)} \circ (C^{(r-1)})^{-1} \\

&= E^{(r)} \circ E^{(r-1)} \circ Q^{(r-1)}
\end{aligned}
$$

⇒  $r$ 라운드와 같은 방식으로 $r-1$ 라운드 공격

⇒  첫 번째 라운드까지 공격 수행

Speck의 마스터 키 길이는 $4n$이므로 4개 라운드의 라운드 키를 찾으면 마스터 키를 복구 가능

⇒  $r$부터 $r-4$ 번째 라운드까지 최대 5개 라운드에 대하여 위 공격 과정을 수행하면 마스터 키를 복구

마스터 키를 복구하지 않고 모든 라운드에 대하여 라운드 키를 구하는 공격도 가능

**공격에 필요한 연산량**

- Parity check matrix 생성 : $O(L^3)=O((n^2)^3)$
    - 단, 여러 라운드를 공격하더라도 $x^{(i)}$를 반복해서 사용할 수 있으므로 한 번만 수행하면 됨
- $x^{(i)}$로 $y^{(i)}$를 구하기 위한 $G^{-1}(F(x^{(i)}))$ 연산 : $O(n^2)$
    - $L$번 $\times$ (오라클 질의 + $G^{-1}$ 연산)  $=$  오라클 질의 $O(L) = O(n^2)$
- $k_j$를 추측한 뒤, $z_j$가 맞게 나오는지 확인하기 위한 $H z_j$ 연산 : $O(n^5)$
    
    $n$개의 $k_j$ $\times$ $z_j^{(i)}$ 곱셈 연산 $O(n^2)$ $\times$ $z_j$의 크기 $O(n^2)$  $=$  $O(n^5)$
    

##### 2. $I_{ext}$가 없는 경우

Input external encoding이 없는 경우에 대한 공격을 위해 다음을 가정

$$
I_{\text{ext}} = B^{(0)}\circ \left(C^{(1)}\right)^{-1} = Id
$$

즉,

$$
\overline{E_k} = O_{\text{ext}}\circ E_k \circ I_{\text{ext}}        = \left( C^{(r+1)}\circ \left(B^{(r)}\right)^{-1} \right)\circ             E_k\circ \left( B^{(0)}\circ \left(C^{(1)}\right)^{-1} \right)
$$

이를 적용하면 어떤 quadratic function $Q^{(1)}$가 $Q^{(1)} = C^{(2)} \circ \left( B^{(1)} \right)^{-1}$라고 할 때, 첫 번째 라운드 함수 $E^{(1)}$을 다음과 같이 표현 가능

$$
\begin{aligned}            \qquad\qquad            \overline{E}^{(1)} &                 = C^{(2)} \circ E^{(1)} \circ A^{(1)} \circ                    \underset{=\,Id}{\underbrace{B^{(0)} \circ \left( C^{(1)} \right)^{-1} }} \\ & = \left[ C^{(2)} \circ ( B^{(1)} )^{-1} \right] \circ \left[ B^{(1)} \right. \circ \underset{=\,Id}{\underbrace{ \left. ( C^{(2)} )^{-1} \right] \circ C^{(2)}}} \circ E^{(1)} \circ A^{(1)} \\ &                 = \left[ C^{(2)} \circ ( B^{(1)} )^{-1} \right] \circ                     \underset{=\,E^{(1)}}{\underbrace{\ B^{(1)} \circ E^{(1)} \circ A^{(1)}}} \\ & = Q^{(1)}\circ E^{(1)} \end{aligned}
$$

<img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_1_1.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_1">
<!-- ![no_in_encoding_attack_structure_1.png](no_in_encoding_attack_structure_1%201.png) -->

암호 알고리즘이 Speck이라는 점을 고려하면, 첫 라운드의 구조를 오른쪽 그림과 같이 표현 가능

위 모델에 대한 공격은 output encoding이 없는 경우와 비슷하게 수행되지만, 라운드 키 연산 결과가 $Q$에서 비선형으로 섞여 한 비트씩 추측 불가능하다는 차이가 있음

⇒  input encoding이 없는 경우에 대한 첫 라운드의 키 추출 공격은 처음 두 라운드를 기준으로 수행

$$
\begin{aligned} \qquad            \overline{E}^{(2)} \circ \overline{E}^{(1)} & = \left[ C^{(3)} \circ E^{(2)} \circ A^{(2)} \circ B^{(1)} \circ ( C^{(2)})^{-1} \right] \circ \left[ C^{(2)} \circ E^{(1)} \circ A^{(1)} \right] \\[1em] &            = \; C^{(3)}\circ \left[ (B^{(2)})^{-1} \right. \circ                 \underset{=\, E^{(2)}}{\underbrace{\ \left. B^{(2)}\right] \circ                 E^{(2)} \circ A^{(2)} }} \circ \underset{=\, E^{(1)}}{\underbrace{\                 B^{(1)} \circ E^{(1)} \circ A^{(1)}}} \\  & = Q^{(2)} \circ E^{(2)} \circ E^{(1)}         \end{aligned}
$$

이때, $Q^{(r)} = C^{(r+1)} \circ (B^{(r)} )^{-1}$

<img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_2.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_2">
<!-- ![no_in_encoding_attack_structure_2.png](no_in_encoding_attack_structure_2.png) -->

그 뒤, 공격자가 접근 가능한 인코딩된 처음 두 라운드 함수를 $F$라고 정의 (오라클)

$$
\begin{aligned}            F & = \overline{E}^{(2)} \circ \overline{E}^{(1)} \\            & = Q^{(2)} \circ E^{(2)} \circ E^{(1)}.        \end{aligned}
$$

공격자는 자신이 선택한 입력 $x$에 대한 함수 $F$의 값을 출력으로 얻을 수 있는 오라클 $\mathbb{O}$에 접근 가능

단, 공격자는 여전히 $E^{(1)}, E^{(2)}$를 모름

$F$로부터 첫 번째 라운드의 키 $k$를 구하기 위한 재정의

두 번째 라운드의 키는 이차 함수 $Q$에 포함시키고 첫 번째 라운드 키를 구할 때는 무시

$$
Q^{(2)} = C^{(3)} \circ \left( B^{(2)} \right)^{-1} \circ B^{(2)} \circ L^{(2)}
$$

$L^{(2)}$는 $E^{(2)}$의 비선형 레이어 $S^{(2)}$ 이후 연산되는 선형 레이어

⇒  $S = S^{(1)} = S^{(2)} = \cdots = S^{(r)}$

$$
\begin{aligned}            (z_{n-1},\,...,\,z_0,\, w_{n-1},\,...,\,w_0) & = \left( Q^{(2)} \right)^{-1}(y) \\ &            = \left( Q^{(2)} \right)^{-1}(F(x)) \\ &            = \left( Q^{(2)} \right)^{-1} \circ \left( Q^{(2)}                 \circ S^{(2)} \circ E^{(1)} \right) (x) \\ &            = \left( S^{(2)} \circ E^{(1)} \right) (x)        \end{aligned}\\[1em]
F = \overline{E}^{(2)} \circ \overline{E}^{(1)} = Q^{(2)} \circ S^{(2)} \circ E^{(1)}
$$


<div style="text-align: center;">
    <img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_3.png' | relative_url }}" style="width: 25%; display: inline-block; margin: 0 5px;" alt="no_in_encoding_attack_structure_3">
    <img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_5.png' | relative_url }}" style="width: 25%; display: inline-block; margin: 0 5px;" alt="no_in_encoding_attack_structure_5">
</div>


<!-- <img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_3.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_3"> -->
<!-- ![no_in_encoding_attack_structure_3.png](no_in_encoding_attack_structure_3.png) -->

<!-- <img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_5.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_5"> -->
<!-- ![no_in_encoding_attack_structure_5.png](no_in_encoding_attack_structure_5.png) -->

Output external encoding이 없는 case에서와 비슷하게, quadratic encoding을 제거하기 위하여 $y$를 가능한 모든 이차 항으로 표현한 $\tilde{y}$로 변환하여 선형 함수 $M$을 구하는 구조로 전환

$$
(z_{n-1},\,...,\,z_0,\, w_{n-1},\,...,\,w_0)= \left( S^{(2)} \circ E^{(1)} \right) (x) = \left( Q^{(2)} \right)^{\!\!-1}\!\!(y)= M^{(2)}(\tilde{y}) 
$$

<img src="{{ '/assets/img/post/arx_wbc_1/no_in_encoding_attack_structure_4.png' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="no_in_encoding_attack_structure_4">
<!-- ![no_in_encoding_attack_structure_4.png](no_in_encoding_attack_structure_4.png) -->

오라클 $\mathbb{O}$에 대한 $L = N(N-1)/2 + N + 1$개의 입출력 쌍 $(x, y)$에 대하여 $y$를 벡터 $\tilde{y}$로 변환

$$
y = (y_{N-1}, y_{N-2},\, ...,\, y_0) \;\to \; \tilde{y} = (y_{N-1}y_{N-2},\, ...,\, y_1 y_0, y_{N-1}, y_{N-2},\, ...,\, y_0, 1)
$$

$Q$가 2차 함수이므로 $\tilde{y}$의 선형 조합으로 $Q^{-1}$의 결과를 만들 수 있음

⇒  다음을 만족하는 어떤 unknown matrix $M$이 존재

$$
Q^{-1}(y) = M\tilde{y}
$$

(Output external encoding이 없던 경우와 유사하게)
$k$를 추측하여 $z$를 구하고, $M$의 패리티 체크 행렬 $H$를 사용하여 $k$를 올바르게 추측했는지 확인

$$
\begin{aligned}z_0 & = \left[k'_8 \boxplus w_0 \right]_0   \\[.5em] &=  \left[k'_8 \boxplus (k'_0 \oplus x_{n-3}) \right]_0 \\[.5em] &= [ (\;\underset{\text{known}}{\underbrace{x'_8}} \oplus \underset{\text{guess}}{\underbrace{k_8 }}\;) \boxplus ( (\;\underset{\text{known}}{\underbrace{x'_0}} \oplus \underset{\text{guess}}{\underbrace{k_0 }}\;) \oplus \underset{\text{known}}{\underbrace{x_{n-3}}} \;) ]_0 .\end{aligned}
$$

$k_0$과 $k_8$을 옳게 추측했을 경우, $z_0$이 옳게 계산됨

→  $z_0$가 $\tilde{y}$의 선형 결합

- $z_0$가 $\tilde{Y}$의 열공간에 속함
- $H z_0 = 0$

⇒  $H z_0 \neq 0$이면, $k_0$를 잘못 추측했다고 판단

$z_0$를 구하면 $z_1$에 영향을 미치는 carry $c_1 = \left[k'_8 \boxplus w_0 \right]_1$이 계산되므로,

$$
z_1=  k'_9 \oplus w_1 \oplus c_1=  (\;\underset{\text{known}}{\underbrace{x'_9}} \oplus \underset{\text{guess}}{\underbrace{k_9 }}\;) \oplus ( (\;\underset{\text{known}}{\underbrace{x'_1}} \oplus \underset{\text{guess}}{\underbrace{k_1 }}\;) \oplus \underset{\text{known}}{\underbrace{x_{n-2}}} \;) \oplus c_1 .
$$

로부터 $z_1$을 구할 수 있음

비슷하게 $z_{n-1}$까지 반복하여 라운드 키 $k$를 복구

- 한 라운드에 대하여 해당 공격을 수행했을 때, 4개의 라운드 키 후보를 얻게 되며, 다음 라운드에 대한 공격을 수행하면서 이전 라운드의 키 후보를 하나로 특정할 수 있음
- 어떤 $k_j, k_{j+8}$을 선택해도 모두 $M$의 행공간에 속할 수 있음

Speck의 마스터 키 길이는 $4n$이므로 4개 라운드의 라운드 키를 찾으면 마스터 키 복구 가능

⇒  첫 번째부터 다섯 번째 라운드까지 5개 라운드에 대하여 위 공격 과정을 수행하면 마스터 키 복구 가능

마스터 키를 복구하지 않고 모든 라운드에 대하여 라운드 키를 구하는 공격도 가능

**공격에 필요한 연산량**: 비트 연산 $O(n^6)$회, 오라클 호출 $O(n^2)$회

- output external encoding이 없을 때와 동일
- 오라클 연산이 두 라운드 연산을 수행하므로, 오라클 호출 연산량 자체가 이전 공격보다 더 큼



#### ARX 라운드의 Black-box Decomposition

##### 1. with Affine Encodings

<iframe src="https://docs.google.com/viewer?url={{ '/assets/pdf/ARX_WBC_Decomp_Affine.pdf' | absolute_url }}&embedded=true" style="width:100%; height:800px;" frameborder="0"></iframe>

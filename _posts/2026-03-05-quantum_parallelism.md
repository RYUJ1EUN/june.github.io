---
layout: post
title: "Quantum Parallelism"
date: 2026-03-02
last_modified_at: 2026-03-03
description: "A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings"
tags: [QUANTUM]
categories: [Study, Class]
---


📚 [MAIN] 배준호. (2023). 양자 컴퓨팅과 양자 알고리즘 개론.
📚 [SUB] Marion, J. B. (2013). Classical dynamics of particles and systems. Academic Press.
📚 [SUB] Griffiths, D. J., & Schroeter, D. F. (2018). Introduction to quantum mechanics. Cambridge university press.
📚 [SUB] Nielsen, M. A., & Chuang, I. L. (2010). Quantum computation and quantum information. Cambridge university press.


### INTRO

#### 목표: 양자 병렬성 이해

- 양자 알고리즘의 동작과 양자 컴퓨팅의 병렬화 원리 이해

<div class="video-container">
    <iframe src="https://www.youtube.com/embed/0_bskJkJCZQ?si=MK6KiAACkBH3WDRv" frameborder="0" allowfullscreen></iframe>
</div>

#### 주요 내용
- 고전역학부터 양자역학까지의 발전 과정
- 양자역학의 기본 개념
- 슈뢰딩거 방정식
- 양자 알고리즘(쇼어, 그로버)과 암호의 안전성


### Classical Dynamics

#### Newton's Law
1. 관성의 법칙 (Law of Inertia)
2. 가속도의 법칙 (Law of Acceleration)
    힘의 합 $F = ma$
3. 작용-반작용의 법칙 (Law of Action-Reaction)
    <div class="row align-items-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        <img src="{{ '/assets/img/post/quantum_parallelism/0305_1.png' | relative_url }}" class="img-fluid rounded z-depth-1" alt="0306-1"> 
        - $N$: 수직항력, 책이 책싱을 미는 힘
    </div>
    
    <div class="col-sm-2 mt-3 mt-md-0">
        <img src="{{ '/assets/img/post/quantum_parallelism/0305_2.png' | relative_url }}" class="img-fluid rounded z-depth-1" alt="0306-2">
    </div>
</div>


#### Harmonic Oscillation: Hooke's Law

<img src="{{ '/assets/img/post/quantum_parallelism/0305_3.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">

- 평형 상태: 스프링에 질량이 있는 물체가 매달려 정지해 있는 상태
- 변위(Displacement): $x$
- 탄성력, 복원력: $F = -kx \quad (k > 0, x > 0)$
- $k$: 용수철 상수
- $-$ 부호는 '돌아가려는 힘'을 의미

뉴턴의 법칙에 의해 $ma = -kx$  
이때 $a = \frac{d^2x}{dt^2} = \ddot{x}$이므로 $\ddot{x} + \frac{k}{m}x = 0$  
    $\dot{x} := \frac{dx}{dt} = v, \ddot{x} := \dot{v} = \frac{dv}{dt} = a$  
    즉, dot은 '시간'에 대한 미분을 의미  
${\omega\_0} = \sqrt{\frac{k}{m}}$라고 하면 $\ddot{x} + {\omega\_0}^2x = 0$ (미분방정식의 해 $x(t)$를 구하는 문제가 됨)  
$$
\begin{aligned}
x(t) & = c_1 \cos \omega_0 t + c_2 \sin \omega_0 t \\
& = \sqrt{c_1^2 + c_2^2}(\frac{c_1}{\sqrt{c_1^2 + c_2^2}} \cos \omega_0 t + \frac{c_2}{\sqrt{c_1^2 + c_2^2}}\sin \omega_0 t)\\
& = \sqrt{c_1^2 + c_2^2}(\cos \delta \cos \omega_0 t + \sin \delta \sin \omega_0 t)\\
& = A \cos (\omega_0 t +\delta)
\end{aligned}
$$
for $\cos \delta = \frac{c\_1}{\sqrt{{c\_1}^2 + {c\_2}^2}}, \sin \delta = \frac{c\_2}{\sqrt{{c\_1}^2 + {c\_2}^2}}, A = \sqrt{{c\_1}^2 + {c\_2}^2}$  
마지막 줄의 cos 덧셈 법칙은 $x(t)$의 $\cos \omega\_0 t, \sin \omega\_0 t$의 주기가 같기 때문에 적용 가능

#### Damped Harmonic Motion

<img src="{{ '/assets/img/post/quantum_parallelism/0305_4.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">

- Damping force (마찰력): $f = -bv \quad (b > 0)$ 진행의 역방향으로 작용 (벡터 성분이 있음)

$$
ma = m\ddot{x} = -kx - b\dot{x}
$$
$$
\implies m\ddot{x} + b\dot{x} + kx = 0 \implies \ddot{x} + 2\beta\dot{x} + \omega_0^2x = 0 \quad \left(\beta = \frac{b}{2m}\right)
$$

- 2차 미분 방정식 (상수 계수, 우변=0) 형태: $ay'' + by' + c = 0$
- 감쇠 진동 방정식의 판별식 적용방정식
    - $\ddot{x} + 2\beta\dot{x} + \omega\_0^2x = 0$에 대한 판별식 
    $$
    D/4 = \beta^2 - \omega_0^2
    $$
- 판별식 결과에 따른 해의 종류
    - $\beta^2 > \omega_0^2$: 해 2개 이상 (Overdamping, 과감쇠)
    - $\beta^2 = \omega_0^2$: 해 1개 (Critical damping, 임계 감쇠)
    - $\beta^2 < \omega_0^2$: 해 없음/복소수해 (Underdamping, 저감쇠)
    - 판별식은 $b$ (감쇠 계수)와 $k$ (용수철 상수)에 의해 결정됨.


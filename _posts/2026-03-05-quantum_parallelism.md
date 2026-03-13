---
layout: post
title: "Quantum Parallelism"
date: 2026-03-05
last_modified_at: 2026-03-12
# description: ""
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
        <img src="{{ '/assets/img/post/quantum_parallelism/0305_1.png' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="image">
        - $N$: 수직항력, 책이 책싱을 미는 힘
    </div>
    
    <div class="col-sm-2 mt-3 mt-md-0">
        <img src="{{ '/assets/img/post/quantum_parallelism/0305_2.png' | relative_url }}" style="max-width: 90%; height: auto; display: block; margin: 0 auto;" alt="image">
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
($\dot{x} := \frac{dx}{dt} = v, \ddot{x} := \dot{v} = \frac{dv}{dt} = a$, 
dot은 '시간'에 대한 미분을 의미)  
${\omega\_0} = \sqrt{\frac{k}{m}}$라고 하면 $\ddot{x} + {\omega\_0}^2x = 0$ (미분방정식의 해 $x(t)$를 구하는 문제가 됨)  

$$
\begin{aligned}
x(t) & = c_1 \cos \omega_0 t + c_2 \sin \omega_0 t \\
& = \sqrt{c_1^2 + c_2^2}(\frac{c_1}{\sqrt{c_1^2 + c_2^2}} \cos \omega_0 t + \frac{c_2}{\sqrt{c_1^2 + c_2^2}}\sin \omega_0 t)\\
& = \sqrt{c_1^2 + c_2^2}(\cos \delta \cos \omega_0 t + \sin \delta \sin \omega_0 t)\\
& = A \cos (\omega_0 t +\delta)
\end{aligned}
$$

for 

$$
\cos \delta = \frac{c_1}{\sqrt{c_1^2 + c_2^2}}, \sin \delta = \frac{c_2}{\sqrt{c_1^2 + c_2^2}}, A = \sqrt{c_1^2 + c_2^2}
$$

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



##### Theorem

선형 미분 방정식(HDE ; homogeneous) $y'' + p(x)y' + q(x)y = 0$

[Thm] (Superposition) Let $y_1, y_2$ be solutions of HDE. 
Then $c\_1 y\_1 + c\_2 y\_2$ is a sol, too. 

[Thm] (IVP; initial value problem) 
$$
\begin{cases} y'' + p(x)y' + q(x)y = 0 \cdots \text{(DE)} \\ 
y(a) = b_0, y'(a) = b_1 \cdots \text{(IC; initial condition)} \end{cases}
$$
where, $p, q$ are continuous on $a \in I$ (interval).
Then there is a "unique" sol. of (IVP) $I$.

[Thm] (General sol. of HDE) (HDE) $y'' + p(x)y' + q(x)y = 0$ always has two linearly independent solutions; 즉, $y\_1 = c y\_2$를 만족하는 상수 $c$가 존재하지 않음.

[Thm] (General solution) 미분연산자 $L[y] := y'' + p(x)y' + q(x)y = f(x) \cdots \text{(DE)}$  
The general sol. of (DE) is of the form $y(x) = c\_1 y\_1(x) + c\_2 y\_2(x) + y\_p(x) = y\_h(x) + y\_p(x)$; $y\_h(x)$ : HDE의 해, $L[y\_p] = f(x)$ where $y\_1, y\_2$ are two linearly independent solutions of $L[y]=0$ and $y\_p$ is a sol. of $L[y]=f(x)$ (즉, NDE의 해)

[Thm] (DE with constant coefficients) $ay'' + by' + cy = 0 \quad (a \neq 0)$ for constant $a, b, c$  
Characteristic eq : $ar^2 + br + c = 0$  
Discriminant : $D = b^2 - 4ac$

1. $D > 0$; $r\_1, r\_2$ are two distinct real roots,  

$$
y_1 = e^{r_1x}, \quad y_2 = e^{r_2x}
$$

2. $D < 0$; $r\_1 = \alpha + i\beta, \quad r\_2 = \alpha - i\beta \quad (\alpha, \beta \in \mathbb{R}, \beta \neq 0)$

$$
[y_1 = e^{(\alpha + i\beta)x}, \quad y_2 = e^{(\alpha - i\beta)x}]
$$

$$
y_1 = e^{\alpha x} \cos\beta x, \quad y_2 = e^{\alpha x} \sin\beta x
$$

3. $D = 0$; $r$ be a double roots.

$$
y_1 = e^{rx}, \quad y_2 = xe^{rx}
$$

###### Example

1. $$2y'' - 7y' + 3y = 0 \longrightarrow 2r^2 - 7r + 3 = 0$$

    $$
    (r - 3)(2r - 1) = 0
    $$

    $$
    r_1 = 1/2, \quad r_2 = 3
    $$

    $$
    y_1 = e^{1/2 x}, \quad y_2 = e^{3x}, \quad y = c_1 e^{1/2 x} + c_2 e^{3x}
    $$

    check ; 대입

2. $$y'' + 2y' + y = 0 \longrightarrow r^2 + 2r + 1 = 0$$

    $$
    (r + 1)^2 = 0 \quad \therefore r = -1
    $$

    $$
    y_1 = e^{-x}, \quad y_2 = xe^{-x}
    $$

    check ;

3. $$y'' - 4y' + 5y = 0 \longrightarrow r^2 - 4r + 5 = 0$$

    $$
    r_1 = 2 + i, \quad r_2 = 2 - i \quad \text{(근의 공식)}
    $$

    $$
    y_1 = e^{2x} \cos x, \quad y_2 = e^{2x} \sin x
    $$

    check ;



##### 조화 진동자

당겼다가 손을 놓아서 돌아가는 중인 어느 시점

$m\ddot{x} = F + f = -kx - b\dot{x}$
$m\ddot{x} + b\dot{x} + kx = 0$
$\Rightarrow \ddot{x} + 2\beta\dot{x} + \omega_0^2 x = 0$
$\beta = \frac{b}{2m}, \quad \omega_0 = \sqrt{\frac{k}{m}}$
$\rightarrow \lambda^2 + 2\beta\lambda + \omega_0^2 = 0$
$D/4 = \beta^2 - \omega_0^2$

1. $D < 0 \quad \omega\_0^2 - \beta^2 > 0$

    Let $$\omega_1 = \sqrt{\omega_0^2 - \beta^2}  (> 0)$$

    $$
    \lambda^2 + 2\beta\lambda + \omega_0^2 = 0 \Rightarrow \lambda_1 = -\beta + \omega_1 i, \quad \lambda_2 = -\beta - \omega_1 i
    $$

    $$
    x(t) = c_1 e^{-\beta t} \cos\omega_1 t + c_2 e^{-\beta t} \sin\omega_1 t
    = A e^{-\beta t} \cos(\omega_1 t - \delta)
    $$

    $t$가 커질수록 $x(t)$는 $0$으로 수렴함.
    특히, 마찰력과 관련된 $\beta$가 클수록 빠르게 $0$으로 수렴함.
    (진동 O)

2. $D = 0

    $$
    x(t) = c_1 e^{-\beta t} + c_2 t e^{-\beta t} = (c_1 + c_2 t) e^{-\beta t}
    $$

    critical damping (진동 X, 그냥 감소)

3. $D > 0, \quad \omega\_2 \equiv \sqrt{\beta^2 - \omega\_0^2}$
    
    $$
    x(t) = c_1 e^{-\beta t + \omega_2 t} + c_2 e^{-\beta t - \omega_2 t} = e^{-\beta t} (c_1 e^{\omega_2 t} + c_2 e^{-\omega_2 t})
    $$
    
    $\beta > \omega\_2$이므로 $t$가 커지면 $e^{-\beta t}$에 의해 $0$으로 감소함 (진동 X)
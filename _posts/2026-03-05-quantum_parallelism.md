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


### Snell's law

_빛도 매질에 따라 속도가 다름 (파동의 성질)_

Snell의 법칙: 입사각 = 반사각

<img src="{{ '/assets/img/post/quantum_parallelism/0312_1.png' | relative_url }}" style="max-width: 25%; height: auto; display: block; margin: 0 auto;" alt="image">

$$\frac{\sin\theta_1}{\sin\theta_2} = \frac{v_1}{v_2}$$

- 최소시간의 원리 (Fermat); 빛 = 파동. 가장 빨리 갈 수 있는 길을 거쳐 감.

<img src="{{ '/assets/img/post/quantum_parallelism/0312_2.png' | relative_url }}" style="max-width: 35%; height: auto; display: block; margin: 0 auto;" alt="image">


$$A \xrightarrow{t_{AP}} P \xrightarrow{t_{PB}} B$$

$$t_{AB} = t_{AP} + t_{PB}$$

$$
\begin{aligned}
\overline{AP} & = \sqrt{x^2+a^2} = v_1 t_{AP}\\
\overline{PB} &= \sqrt{(d-x)^2+b^2} = v_2 t_{PB}\\
t_{AB} &= \frac{\sqrt{x^2+a^2}}{v_1} + \frac{\sqrt{(d-x)^2+b^2}}{v_2}
\end{aligned}
$$

$t\_{AB}$가 최소인 $x$의 선택: 
$$\frac{dt_{AB}}{dx} = 0$$

$$
\begin{aligned}
\frac{dt_{AB}}{dx} = \frac{x}{v_1 \sqrt{x^2+a^2}} &+ \frac{-(d-x)}{v_2 \sqrt{(d-x)^2+b^2}} = 0\\
\frac{x}{v_1 \sqrt{x^2+a^2}} &= \frac{d-x}{v_2 \sqrt{(d-x)^2+b^2}}\\
\Rightarrow \frac{\sin\theta_1}{v_1} &= \frac{\sin\theta_2}{v_2}
\qquad \text{(Snell's rule)}
\end{aligned}
$$

$\rightarrow$ 이를 만족하는 $x$를 택함.



### 에너지 (Energy)

##### 포텐셜 에너지 (potential energy)

- (위치 에너지) $V(x)$ ; 위치 $x$ 외 시간 같은 다른 요인이 작용하지 않음

- (힘) $F(x) = -\frac{dV}{dx}$ (1-Dim)  
    $\qquad = -\nabla V$ (3-dim, gradient) 

- $$V(x) = -\int_{p_1}^{p_2} F(x) dx = -\int_{p_1}^{p_2} \frac{dV}{dx} dx = -V(p_2) + V(p_1)$$

##### 보존장 (conservative vector field)

$$\vec{F} : \mathbb{R}^3 \rightarrow \mathbb{R}^3$$

$$(x,y,z) \mapsto \vec{F}(x,y,z)$$

$\Rightarrow$ 각 점마다 벡터와 대응되고, 1 또는 2 성립 (1과 2 동치)

1. 경로와 무관한 적분 결과  
    $$\int_{C_1} \vec{F} \cdot d\vec{r} = \int_{C_2} \vec{F} \cdot d\vec{r}$$

2. potential func의 존재  
    $\exists f : \mathbb{R}^3 \rightarrow \mathbb{R}$  
    s.t. $\vec{F} = \nabla f$ (적분의 기본 정리: 부정적분 = 정적분)

$$\int_C \vec{F} \cdot d\vec{r} = \int_C \nabla f \cdot d\vec{r} = f(Q) - f(P)$$

에너지를 다룰 것인가 
$$\frac{1}{2}mv^2 = \frac{1}{2}m\dot{x}^2$$
? 힘을 다룰 것인가
$$F = ma = m\ddot{x}$$
?
$\Rightarrow$ 에너지를 다룸 ($v$가 $a$보다 미분 1회 덜함)

_(시간에 대한 미분은 일반적으로 편미분을 잘 고려하지 않고, 시간을 파라미터로 갖는 map들을 독립변수로 바라봄)_

- 운동에너지 (Kinetic Energy) : $T = \frac{1}{2}mv^2$
- 총 에너지 (닫힌 계) $E = T + V$

##### 에너지 보존 법칙

$\dot{E} = 0$ ; 시간의 흐름에 따른 에너지 변화량이 없음

$$
\begin{aligned}
\frac{dT}{dt} &= \dot{T} = \frac{1}{2}m 2v \dot{v} = mv\dot{v} = mva\\
\frac{dV}{dt} &= \dot{V} = \frac{dV}{dx} \dot{x} = \frac{dV}{dx} v (\because V=V(x))
\end{aligned}
$$  
_($t$는 식에 나타나지 않음)_

$$\therefore \dot{E} = \dot{T} + \dot{V} = mva + \frac{dV}{dx} v = (ma + \frac{dV}{dx}) v = (ma - F) v = 0$$

$\Rightarrow ma = F$ 일 때 보존력


##### 운동량 (momentum) $p := mv$

- 속도보다 근본적인 물리량에 가까움

- 계의 모든 힘을 더하면 0인 고립계에서 보존되는 성질이 있음

    $$
    \begin{aligned}
    F &= \sum_{i,j} F\_{ij} = 0\\
    &= \sum_j F_j \qquad (F_j = \sum_i F_{ij}: j\text{가 받는 알짜힘})
    \end{aligned}
    $$

    $$
    F_j = m_j a_j = \frac{d}{dt}(m_j v_j) = \frac{d}{dt} p_j = \dot{p}_j
    $$

    i.e. $F_j$는 운동량의 미분

    $$\therefore F = \sum_j F_j = \sum_j \dot{p}_j = \frac{d}{dt} \sum_j p_j = 0$$

    $$\Rightarrow \sum_j p_j$$
    는 시간에 대한 상수

    $$\Rightarrow$$ 
    운동량 보존 법칙 (고립계에서 운동량 총합은 바뀌지 않음)

- 질량의 합이나 속도의 합은 보존되지 않음

**Example**

작용-반작용의 법칙 
$$F_{12} = -F_{21}$$

탄성충돌 

그림: $m(v_1) \rightarrow M(v_2=0) \Rightarrow m(\tilde{v}_1) \rightarrow M(\tilde{v}_2)$)

$$
\begin{cases}
E = \frac{1}{2}mv_1^2\\
p = mv_1
\end{cases}
$$

$$
\begin{cases}
\tilde{E} = \frac{1}{2}m\tilde{v}_1^2 + \frac{1}{2}m\tilde{v}_2^2\\
\tilde{p} = m\tilde{v}_1 + m\tilde{v}_2
\end{cases}
$$

$$\Rightarrow E = \tilde{E} \ \& \ p = \tilde{p}$$

$$
\begin{cases}
v_1^2 = \tilde{v}_1^2 + \tilde{v}_2^2\\
v_1 = \tilde{v}_1 + \tilde{v}_2
\end{cases}
$$

$$\Rightarrow v_1^2 + 2\tilde{v}_1\tilde{v}_2 + \tilde{v}_2^2 = \tilde{v}_1^2 + \tilde{v}_2^2$$

$$\therefore 2\tilde{v}_1\tilde{v}_2 = 0 \Rightarrow \tilde{v}_1= 0, \tilde{v}_2=v_1$$

$B$가 $A$의 앞에 있으므로 둘이 부딪힌 후 $\tilde{v}\_1>0$이면서 $\tilde{v}\_2 = 0$인 상황은 불가능함


**역학 발전 과정**

Newtonian $\rightarrow$ Lagrangian
$\rightarrow$ Hamiltonian
$\rightarrow$ Schrödinger
$\rightarrow$ Quantum computer


##### Lagrangian Dynamics

- Principle of Least Action: "입자의 경로는 작용 (action) 이 정상값 (최솟값) 이 되는 경로이다."

- Minimum Principles
    - Fermat's principle (1657): least time
    - Hamilton's principle (1834): "Of all the possible paths along which a dynamical system may move from one point to another within a specified time interval, the actual path followed is that which minimizes the time integral of the difference between the kinetic and potential energies."
        
        $$\Rightarrow \delta \left( \int_{t_1}^{t_2} (T - V) dt \right) = 0$$

        $\delta$ : 기호적 함수 (변분)


### Calculus of variation

Action 

$$S := \int_{t_1}^{t_2} L(x, \dot{x} ; t) dt$$ 

($x, \dot{x}$는 독립변수(편미분 할 때 독립적인 변수로 봄), $t$는 파라미터)

Let $x(t\_1) = x\_1$, $x(t\_2) = x\_2$

$S$를 최소화하는 함수 $x_0(t)$는 

$$\frac{d}{dt}(\frac{\partial L}{\partial \dot{x}_0}) = \frac{\partial L}{\partial x_0}$$

를 만족한다. 
($x\_a(t)$는 임의의 경로 함수)

<img src="{{ '/assets/img/post/quantum_parallelism/0312_3.png' | relative_url }}" style="max-width: 25%; height: auto; display: block; margin: 0 auto;" alt="image">

$x\_0(t)$가 $S$의 정상값을 준다고 할 때, 임의의 다른 경로는 

$$x_\alpha(t) := x_0(t) + \alpha \beta(t) \qquad \alpha \in \mathbb{R}, \beta(t_1) = \beta(t_2) = 0$$

$$\Rightarrow S[x_0] \le S[x_\alpha]\qquad \forall \alpha, \beta$$

pf) $x\_0(t)$가 $S$의 정상값을 준다고 하자.
    임의의 
    $$x_\alpha(t) := x_0(t) + \alpha \beta(t), \beta(t_1) = \beta(t_2) = 0, \alpha \in \mathbb{R}$$
    에 대하여 작용 
    $$S[x_\alpha(t)]$$
    를 생각하면,
    $\alpha = 0$에서 
    $$\frac{\partial}{\partial \alpha} S[x_\alpha(t)] = 0$$
    을 만족할 것이다. ($\alpha=0$일 때 정상값이므로)  
    $$
    \begin{aligned}
    \frac{\partial}{\partial \alpha} S[x_\alpha(t)] 
    &= \frac{\partial}{\partial \alpha} \int_{t_1}^{t_2} L dt \\
    &= \int_{t_1}^{t_2} \frac{\partial L}{\partial \alpha} dt\\
    &= \int_{t_1}^{t_2} \frac{\partial L}{\partial x_\alpha} \frac{\partial x_\alpha}{\partial \alpha} + \frac{\partial L}{\partial \dot{x}_\alpha} \frac{\partial \dot{x}_\alpha}{\partial \alpha} dt (\because L = L(x_\alpha, \dot{x}_\alpha ; t))\\
    &= \int_{t_1}^{t_2} \frac{\partial L}{\partial x_\alpha} \beta + \frac{\partial L}{\partial \dot{x}_\alpha} \dot{\beta} dt (\because x_\alpha(t) = x_0(t) + \alpha \beta(t))\\
    &= \int_{t_1}^{t_2} \frac{\partial L}{\partial x_\alpha} \beta dt + \left[ \frac{\partial L}{\partial \dot{x}_\alpha} \beta \right]_{t_1}^{t_2} - \int_{t_1}^{t_2} \frac{d}{dt} \left( \frac{\partial L}{\partial \dot{x}_\alpha} \right) \beta dt\\
    &= \int_{t_1}^{t_2} \left( \frac{\partial L}{\partial x_\alpha} - \frac{d}{dt} \frac{\partial L}{\partial \dot{x}_\alpha} \right) \beta dt
    \qquad(\because \left[ \frac{\partial L}{\partial \dot{x}_\alpha} \beta \right]_{t_1}^{t_2} = 0)
    \end{aligned}
    $$



We want to check

$$\frac{\partial}{\partial \alpha} S[x_\alpha(t)] = \int_{t_1}^{t_2} \left[ \frac{\partial L}{\partial x_\alpha} - \frac{d}{dt} \frac{\partial L}{\partial \dot{x}_\alpha} \right] \beta dt = 0$$

for all $\beta(t)$, $\alpha=0$.

$$\therefore \frac{\partial L}{\partial x_0} = \frac{d}{dt} \frac{\partial L}{\partial \dot{x}_0}$$ 

for $\alpha=0$ (Euler-Lagrangian Eq)

**Example of Lagrangian $L := T - V$**

탄성력에 대하여,

$$T = \frac{1}{2}m\dot{x}^2,\; V = \frac{1}{2}kx^2.$$

$$L(x, \dot{x} ; t) = \frac{1}{2}m\dot{x}^2 - \frac{1}{2}kx^2$$

$$\frac{d}{dt} \frac{\partial L}{\partial \dot{x}} = \frac{\partial L}{\partial x}$$ 
가 되는 $x$는

$$\frac{\partial L}{\partial \dot{x}} = m\dot{x} \ , \ \frac{\partial L}{\partial x} = -kx$$

$$\therefore m\ddot{x} = -kx$$ 
를 만족하는 $x$이다.


<br>
$D_1, D_2$: 첫 번째, 두 번째 component로 미분한다는 표현.

$$\frac{\partial L}{\partial x} = D_1 L$$  
$$\frac{\partial L}{\partial \dot{x}} = D_2 L$$

$t \mapsto (x\_1(t), x\_2(t))$ : Curve

$$f(x, y) = x^2 y^2 \quad f: \mathbb{R}^2 \to \mathbb{R}$$  
$$f(x_1(t), x_2(t))$$  
$$\frac{\partial f}{\partial x_1} = D_1 f(x_1, x_2)$$

$$y = f(x)$$  
$$w = g(y) = g(f(x))$$  
$$\frac{dw}{dx} = g'(f(x)) f'(x)$$  
$$\frac{dw}{dx} = \frac{dw}{dy} \frac{dy}{dx} = \frac{dw}{df} \frac{df}{dx}$$

#### Lagrangian Eq. 

$$L := T - V = L(x, \dot{x}, t)$$
(여기서 $T$는 운동 에너지, $V$는 위치 에너지)

오일러-라그랑주 방정식
$$\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{x}} \right) = \frac{\partial L}{\partial x}$$  
왜? $\longrightarrow$ Hamilton의 원리

1. 뉴턴 역학의 외력($F$)을 고려하지 않고,
2. 에너지의 특징으로부터 물체의 운동을 기술할 수 있다.

$\Rightarrow$ 1.과 2.는 동치: 1.로 알고 있었지만 2.로 접근해야 함  
1.은 벡터(Vector) 2.는 스칼라(Scalar): 2.가 계산이 훨씬 쉬움

##### Generalized Coordinates

Any set of quantities that completely specifies the state of a system.

$$\begin{cases} 
x = x(q_1, \dots, q_n, t) \\
\dot{x} = \dot{x}(\dot{q}_1, \dots, \dot{q}_n, t) 
\end{cases}
\longrightarrow \text{Action } S = \int_{t_1}^{t_2} L \, dt$$

$\Rightarrow$ $x$를 찾는 문제가 $(q\_1, \dots, q\_n)$을 찾는 문제가 됨


**Example: Pendulum**

<img src="{{ '/assets/img/post/quantum_parallelism/0316_1.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="image">


$$l^2 = x^2 + y^2$$

$$x = l \sin\theta, y = -l \cos\theta$$

$$\dot{x} = l \cos\theta \cdot \dot{\theta}, \dot{y} = l \sin\theta \cdot \dot{\theta}$$

$$
T = \frac{1}{2}m(\dot{x}^2 + \dot{y}^2), V = mgy
$$

$$
\begin{aligned}
L = T - V &= \frac{1}{2}m\dot{x}^2 + \frac{1}{2}m\dot{y}^2 - mgy\\
L(\theta, \dot{\theta}, t) &= \frac{1}{2}m(l^2 \cos^2\theta \cdot \dot{\theta}^2 + l^2 \sin^2\theta \cdot \dot{\theta}^2) + mgl \cos\theta\\
&= \frac{1}{2}ml^2\dot{\theta}^2 + mgl \cos\theta
\end{aligned}$$


$$\frac{\partial L}{\partial \theta} = -mgl \sin\theta, \frac{\partial L}{\partial \dot{\theta}} = ml^2\dot{\theta}$$

(EL-Eq) 
$$
\begin{aligned}
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}}\right) &= \frac{\partial L}{\partial \theta}\\
\frac{d}{dt}(ml^2\dot{\theta}) &= -mgl \sin\theta\\
&= ml^2\ddot{\theta}
\end{aligned}$$


$$\ddot{\theta} + \frac{g}{l} \sin\theta = 0$$
Equation of motion: If $\theta$ is small, $\sin\theta \approx \theta$.
Then: $\ddot{\theta} + \frac{g}{l}\theta = 0$



|Newtonian|Lagrangian |
|-|-|
|Outside force acting on a body |(energy) quantity associated with body|
|Force: vector|Lagrangian fn: scalar(invariant to coordinate transformation)|
|Cause (force) $\Rightarrow$ effect (motion)|Purpose (minimization) $\Rightarrow$ motion|

_패러다임의 변화_


**Example**

<img src="{{ '/assets/img/post/quantum_parallelism/0316_2.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="image">

$q\_1(t), q\_2(t)$ : generalized coordinates

- 초기 조건
    $q_1(0) = l$, $\dot{q}_1(0) = 0$  
    $q_2(0) = 0$, $\dot{q}_2(0) = 0$

- 시간이 지난 후
    $$\tan \alpha = \frac{h - y_m}{x_m - q_1}$$

$x_m = q_1 + q_2 \cos \alpha$
$y_m = (h - q_2) \sin \alpha$
$\dot{x}_m = \dot{q}_1 + \dot{q}_2 \cos \alpha$
$\dot{y}_m = -\dot{q}_2 \sin \alpha$


$$
\begin{aligned}
T &= \frac{1}{2} m (\dot{x}_m^2 + \dot{y}_m^2) + \frac{1}{2} M \dot{q}_1^2\\ 
&= \frac{1}{2} m (\dot{q}_1^2 + \dot{q}_2^2 + 2\dot{q}_1 \dot{q}_2 \cos \alpha) + \frac{1}{2} M \dot{q}_1^2
\end{aligned}$$

$$V = mgy_m = mg(h - q_2) \sin \alpha$$

$$L = T - V$$

$$\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{q}_1} \right) - \frac{\partial L}{\partial q_1} = 0$$


$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_2} - \frac{\partial L}{\partial q_2} =0$$


<br>


$$T = \frac{1}{2}m(\dot{q}_1^2 + \dot{q}_2^2 + 2\dot{q}_1\dot{q}_2 \cos \alpha) + \frac{1}{2}M\dot{q}_1^2$$ 
(generalized coordinate의 2차 동차식)

$$L = T - mg(h - q_2 \sin \alpha)$$ 
($V$는 위치에만 관련됨)

$$\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_1}\right) = \frac{\partial L}{\partial q_1} \Rightarrow \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_1}\right) = m\ddot{q}_1 + m\ddot{q}_2 \cos \alpha + M\ddot{q}_1 = 0 = \frac{\partial L}{\partial q_1}$$

$$\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_2}\right) = \frac{\partial L}{\partial q_2} \Rightarrow \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_2}\right) = m\ddot{q}_2 + m\ddot{q}_1 \cos \alpha = mg \sin \alpha = \frac{\partial L}{\partial q_2}$$

$$(M+m)\ddot{q}_1 = -m \cos \alpha \ddot{q}_2 \Rightarrow \ddot{q}_1 = -\frac{m \cos \alpha}{M+m}\ddot{q}_2$$

$$m\ddot{q}_2 - \frac{(m \cos \alpha)^2}{M+m}\ddot{q}_2 = mg \sin \alpha$$

$$\left(1 - \frac{m \cos^2 \alpha}{M+m}\right)\ddot{q}_2 = g \sin \alpha$$

$$\therefore\; \ddot{q}_2 = \frac{g \sin \alpha}{1 - \frac{m \cos^2 \alpha}{M+m}}$$ 

($\ddot{q}_2$가 constant $\rightarrow$ 등가속도 운동)



### Hamiltonian

Newtonian $\rightarrow$ Lagrangian $\rightarrow$ Hamiltonian


$L = L(q, \dot{q}, t)$  
($x$$와 $\dot{x}$가 들어감 -> 둘 사이의 dependency는?)

$H = H(q, p, t)$  
($p = m\dot{x}$ 보존량을 사용함)

<br>

$\frac{\partial L}{\partial t} = 0$ (고립계, closed system; 시간이 명시적으로 수식에 나타나지 않음)

Total derivative of $L$ wrt $t$ ($F=T+V$ 보존, $L=T-V$ 비보존)

$$\frac{dL}{dt} = \frac{\partial L}{\partial q}\dot{q} + \frac{\partial L}{\partial \dot{q}}\ddot{q} = \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}}\right)\dot{q} + \frac{\partial L}{\partial \dot{q}}\ddot{q}$$ 
(By Lagrange Eq)

$$\frac{dL}{dt} = \frac{d}{dt}\left[\frac{\partial L}{\partial \dot{q}}\dot{q}\right] \Rightarrow \frac{d}{dt}\left[\frac{\partial L}{\partial \dot{q}}\dot{q} - L\right] = 0$$

_이때 $[*]$ 안의 값은 시간 변화에 대한 불변량(constant)임_

해밀토니안 정의: 

$$H := \dot{q}\frac{\partial L}{\partial \dot{q}} - L$$

<br>

Potential energy $V = V(q)$ i.e. $\frac{\partial V}{\partial \dot{q}} = 0$

$$\frac{\partial L}{\partial \dot{q}} = \frac{\partial(T - V)}{\partial \dot{q}} = \frac{\partial T}{\partial \dot{q}}$$

$$\Rightarrow \frac{d}{dt} \left[ \dot{q} \left( \frac{\partial T}{\partial \dot{q}} \right) - (T - V) \right] = 0$$

$$T = \frac{1}{2} m \dot{x}^2 \longrightarrow T(\dot{q}) = a \dot{q}^2$$

즉, 

$$T(\dot{q}_1, \dot{q}_2) = a \dot{q}_1^2 + b \dot{q}_2^2 + c \dot{q}_1 \dot{q}_2$$ 
= homogeneous quadratic func of $(\dot{q}_1, \dot{q}_2)$

$$\dot{q} \left( \frac{\partial T}{\partial \dot{q}} \right) = 2 a \dot{q}^2 = 2 T$$

$$\Rightarrow \frac{d}{dt} [2T - T + V]= \frac{d}{dt} (T + V) = \frac{dE}{dt} = 0$ $

많은 경우에 Hamiltonian = energy ($H$ : 보존됨)
1. $T$ : homogeneous quadratic func of $\dot{q}$
2. $V$ : $\frac{\partial V}{\partial \dot{q}} = 0$


#### Hamiltonian Dynamics


EL-Eq $L = T - V$

$$\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{x}} \right) = \frac{\partial L}{\partial x} \quad \quad \text{momentum 운동량 } p = m\dot{x} \text{ (보존량)}$$

$$T = \frac{1}{2} m\dot{x}^2 \Rightarrow \frac{\partial T}{\partial \dot{x}} = m\dot{x} = p$$

$$\frac{\partial L}{\partial \dot{x}} = \frac{\partial T}{\partial \dot{x}} = p \Rightarrow \text{Define generalized momentum} p := \frac{\partial L}{\partial \dot{q}} \cdots \text{(1)}$$

$$\frac{\partial L}{\partial q} = \frac{d}{dt} \left( \frac{\partial L}{\partial \dot{q}} \right) = \dot{p} \quad \Rightarrow \quad \dot{p} = \frac{\partial L}{\partial q} \cdots \text{(2)}$$


Hamiltonian 
$$H = \dot{q} \frac{\partial L}{\partial \dot{q}} - L = p\dot{q} - L \quad \text{by (1)}$$

Let
$$\dot{q} = \dot{q}(q, p, t)$$ 
then 
$$(q, \dot{q}, t) \longrightarrow (q, p, t)$$
즉,
$$L(q, \dot{q}, t) \longrightarrow H(q, p, t)$$  
_위치와 운동량을 정확히 측정할 수 있다 — 불확정성의 원리_

$$\left( \frac{1}{2} m\dot{q}^2 = \frac{p^2}{2m} \right)$$


Total differential of $H(q, p, t)$

$$dH = \frac{\partial H}{\partial q} dq + \frac{\partial H}{\partial p} dp + \frac{\partial H}{\partial t} dt \cdots \text{(a)}$$

Since,
$H = p\dot{q} - L,$

$$\begin{aligned} dH &= \dot{q} dp + p d\dot{q} - \frac{\partial L}{\partial q} dq - \frac{\partial L}{\partial \dot{q}} d\dot{q} - \frac{\partial L}{\partial t} dt \\ 
&= \dot{q} dp + p d\dot{q} - \dot{p} dq - p d\dot{q} - \frac{\partial L}{\partial t} dt \quad \text{by (1), (2)} \\ 
&= \dot{q} dp - \dot{p} dq - \frac{\partial L}{\partial t} dt \cdots \text{(b)} \end{aligned}$$

$\text{(a) = (b)}$ 여야 하므로,

$$\frac{\partial H}{\partial q} = -\dot{p} \quad , \quad \frac{\partial H}{\partial p} = \dot{q} \quad \text{; Hamilton's eqs of motion (canonical eqs of motion)}$$




$$\left[ \frac{\partial H}{\partial t} = -\frac{\partial L}{\partial t} \right] \quad$$ 

_증명 생략_

(입자) $H \quad \rightarrow$ wave $\rightarrow$
Schrödinger Eq : $H\psi = E\psi$

- $E$: eigenvalue of $\psi$
- $\psi$: 파동함수

이때, $H$는 $L$을 더 엄밀하게(새로운 식이 아닌 변형) 표현하지만, action $S$를 구할 때는 $L$을 사용함
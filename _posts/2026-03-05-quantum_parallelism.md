---
layout: post
title: "Quantum Parallelism"
date: 2026-03-05
last_modified_at: 2026-05-11
# description: ""
tags: [QUANTUM]
categories: [Study, Class]
---


📚 [MAIN] Griffiths, D. J., & Schroeter, D. F. (2018). Introduction to quantum mechanics. Cambridge university press. 
📚 [SUB] 배준호. (2023). 양자 컴퓨팅과 양자 알고리즘 개론.
📚 [SUB] Marion, J. B. (2013). Classical dynamics of particles and systems. Academic Press.
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
($x$와 $\dot{x}$가 들어감 -> 둘 사이의 dependency는?)

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

$$\Rightarrow \frac{d}{dt} [2T - T + V]= \frac{d}{dt} (T + V) = \frac{dE}{dt} = 0$$

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


### Black body radiation

- 흑체 : 모든 전자기파를 흡수 ($a=1$)
    - 복사 (방출) = 흡수 인 상태 : 흑체 복사
    - 흑체 복사에서 복사 에너지의 세기는 온도와 파장의 관계됨

    <img src="{{ '/assets/img/post/quantum_parallelism/0323_1.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">

* 온도: 열에너지 = 분자의 움직임

<img src="{{ '/assets/img/post/quantum_parallelism/0323_0.png' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="image">

_[그림 출처](https://ko.wikipedia.org/wiki/%ED%9D%91%EC%B2%B4#/media/%ED%8C%8C%EC%9D%BC:Black_body.svg)_


##### Wien의 공식

$$u_{\nu}(T) = C_1 e^{-C_2 \frac{\nu}{T}}$$ 
for large $\nu$

##### Rayleigh-Jeans 공식

$$u_{\nu}(T) = \frac{8\pi \nu^2}{c^3} kT$$ 
for small $\nu$

**Rayleigh-Jeans 유도**

정상파의 파장 $\lambda = \frac{2a}{n}$ ($n=1, 2, 3 \dots$)


3차원 공간(x, y, z)에서의 입방체와 벡터 $\vec{k}$ 기하학적 분석

<img src="{{ '/assets/img/post/quantum_parallelism/0323_2.png' | relative_url }}" style="max-width: 60%; height: auto; display: block; margin: 0 auto;" alt="image">

<img src="{{ '/assets/img/post/quantum_parallelism/0323_3.png' | relative_url }}" style="max-width: 35%; height: auto; display: block; margin: 0 auto;" alt="image">

<img src="{{ '/assets/img/post/quantum_parallelism/0323_4.png' | relative_url }}" style="max-width: 95%; height: auto; display: block; margin: 0 auto;" alt="image">

$$
\begin{cases}
\lambda_x \cos\alpha = \lambda\\
\lambda_y \cos\beta = \lambda\\
\lambda_z \cos\gamma = \lambda
\end{cases}
\implies
\begin{cases}
\lambda_x = \frac{\lambda}{\cos\alpha} = \frac{2a}{\cos\alpha}\\
\lambda_y = \frac{\lambda}{\cos\beta} = \frac{2a}{\cos\beta}\\
\lambda_z = \frac{\lambda}{\cos\gamma} = \frac{2a}{\cos\gamma}
\end{cases}
\quad
(\text{for } n=1, 2, 3 \dots)
$$

* 벡터 $\vec{\lambda}$가 $x, y, z$축과 이루는 각이
$\alpha, \beta, \gamma$이면, 
$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$

$$
\begin{aligned}
\cos^2\alpha + \cos^2\beta + \cos^2\gamma 
& = (\frac{\lambda}{2a} n_x)^2 + (\frac{\lambda}{2a} n_y)^2 + (\frac{\lambda}{2a} n_z)^2 = 1\\
\implies
n_x^2 + n_y^2 + n_z^2 
& = (\frac{2a}{\lambda})^2
& = (\frac{2a}{c}\nu)^2
\qquad (\because \lambda\nu = c)
\end{aligned}
$$

- $N(\nu)$: 진동수가 $\nu$보다 작은 정상파의 개수
    $$N(\nu) \approx |\{(n_x, n_y, n_z) : n_x^2 + n_y^2 + n_z^2 \leq (\frac{2a\nu}{c})^2, n_x, n_y, n_z\ge 0\}|$$

    <img src="{{ '/assets/img/post/quantum_parallelism/0323_5.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">

    - 구의 $\frac{1}{8}$ 부피: 
        $$\frac{1}{8} \cdot \frac{4\pi}{3} \cdot (\frac{2a\nu}{c})^3$$
    
    - $n\_x, n\_y, n\_z\ge 0$인 양자 상태 개수: 
    $$N(\nu) = 2 \cdot \frac{1}{8} \cdot \frac{4\pi}{3} (\frac{2a\nu}{c})^3 = \frac{8\pi L^3}{3c^3}\nu^3$$
    
    - 부피 $V = a^3$
    - 진동수 $\nu$와 $\nu + \Delta\nu$ 사이의 정상파 개수:
        $$\Delta N(\nu) = \frac{N(\nu+\Delta\nu) - N(\nu)}{\Delta\nu} \Delta\nu \approx (\frac{dN}{d\nu})\Delta\nu \qquad(\nu\to\infty)$$ 
        
        - 이때, $\frac{dN}{d\nu}$는 밀도
    
    - 단위 부피당 에너지 밀도는 다음의 정상파 밀도에 비례함
        $$
        n(\nu) = \frac{1}{V}\cdot \frac{dN(\nu)}{d\nu} = \frac{1}{a^3}\cdot \frac{8\pi a^3}{c^3} \nu^2 = \frac{8\pi}{c^3}\nu^2
        $$
    
    - **Boltzmann factor**: $e^{-E/kT}$ 
        - $E$: 에너지 (실수; 연속)
        - $k$: 상수
        - $T$: 온도

        - 온도 $T$에서 에너지 $E$인 상태에 있을 확률 밀도 $\propto e^{-E/kT}$
        - 평균 에너지 = $\langle E \rangle$ = 에너지의 합 / 확률 합 = 
        $$\int_0^{\infty} E e^{-E/kT} dE / \int_0^{\infty} e^{-E/kT} dE = kT$$
            * $\langle \,\cdot\, \rangle$: 물리에서 평균을 의미

    - $\nu$와 $\nu + \Delta\nu$ 사이의 에너지 밀도
        $$u(\nu) = n(\nu) \cdot \langle E \rangle = \frac{8\pi \nu^2}{c^3} kT$$

        $$\Rightarrow u_{\nu}(T) = \frac{8\pi \nu^2 kT}{c^3}\qquad\text{(Rayleigh-Jeans)}$$ 
        
    
- Planck의 양자론 "에너지가 불연속적인 값을 가진다."
    $$E_n = nh\nu \quad(n=0, 1, 2, \dots)$$

|Boltzmann 분포| $\rightarrow$ |이산 확률 분포|
|$P(E) = e^{-E/kT}$ | | $P(E=E\_n) = \frac{e^{-nh\nu/kT}}{\sum\_{n=0}^{\infty} e^{-nh\nu/kT}}$ |
|($E \in [0, \infty)$)| |($E_n = 0, h\nu, 2h\nu, \dots$) |
|확률 밀도 함수 | | |




### Planck의 양자설

$$P(E = E_n) = \frac{e^{-nh\nu/kT}}{\sum_{n=0}^{\infty} e^{-nh\nu/kT}}$$ 
확률 질량 함수 (연속 X)

$$\langle E \rangle = \sum_{n=0}^{\infty} E_n P(E = E_n) = \frac{\sum_{n=0}^{\infty} nh\nu \cdot e^{-nh\nu/kT}}{\sum_{n=0}^{\infty} e^{-nh\nu/kT}}$$

Let 
$$\beta = \frac{1}{kT},$$ 
then 

$$\begin{aligned}
\langle E \rangle 
& = \frac{\sum_{n=0}^{\infty} nh\nu \cdot e^{-nh\nu\beta}}{\sum_{n=0}^{\infty} e^{-nh\nu\beta}}\\
& = \frac{-\sum_{n=0}^{\infty} \frac{d}{d\beta} (e^{-nh\nu\beta})}{\sum_{n=0}^{\infty} e^{-nh\nu\beta}}\\
& = -\frac{d}{d\beta} [\ln(\sum_{n=0}^{\infty} e^{-nh\nu\beta})]\\
& = -\frac{d}{d\beta} \ln \frac{1}{1-e^{-h\nu\beta}} \qquad(\because \text{등비급수})\\
& = \frac{d}{d\beta} \ln(1-e^{-h\nu\beta})\\
& = \frac{h\nu e^{-h\nu\beta}}{1-e^{-h\nu\beta}}
\end{aligned}$$

Planck에 의해 에너지 평균 계산이 연속에서 불연속에 대한 값으로 변화

$$\langle E \rangle = \begin{cases} kT & \text{, if 연속} \\ \frac{h\nu e^{-h\nu/kT}}{1 - e^{-h\nu/kT}} & \text{, if 불연속} \end{cases}$$

$\Rightarrow$ Rayleigh-Jeans 공식에서 $kT$ 대신 불연속 $\langle E \rangle$ 대입하면, 

$$\begin{aligned}
\qquad\qquad u_{\nu}(T) 
& = \frac{8\pi\nu^2}{c^3}\cdot \frac{h\nu}{e^{h\nu/kT} - 1}\\
& = \frac{8\pi h\nu^3}{c^3} \cdot \frac{1}{e^{h\nu/kT} - 1}\\
& \approx \frac{8\pi h\nu^3}{c^3} \cdot \frac{1}{1 + \frac{h\nu}{kT} - 1} \qquad (\because e^{h\nu/kT} \approx 1 + \frac{h\nu}{kT}\;\text{ for small }\nu)\\
& = \frac{8\pi\nu^2}{c^3} kT
\end{aligned}$$ 

* Planck 공식을 사용할 때, 여전히 small $\nu$에서 Rayleigh-Jeans 공식이 잘 맞는 것을 확인할 수 있음

#### Wien의 공식

$$e^{\frac{h\nu}{kT}} - 1 \approx e^{h\nu/kT}\qquad\text{for large }\nu$$

$$u_{\nu}(T) = \frac{8\pi h\nu^3}{c^3} \cdot e^{-h\nu/kT} \propto e^{-h\nu/kT}$$

|Rayleigh-Jeans | | Planck | | Wien|
|$\frac{kT}{h\nu}$ | $\xleftarrow{\text{small } \nu}$ | $\frac{1}{e^{h\nu/kT}-1}$ | $\xrightarrow{\text{large } \nu}$ | $e^{-\frac{h\nu}{kT}}$|


### 파동의 이해

$$\begin{aligned}
\Psi(x, 0) &= \Psi_0 \sin(kx + \phi)\\
\Psi(x, t) &= A \cos k(x - vt) \quad\cdots (*)
\end{aligned}$$


<img src="{{ '/assets/img/post/quantum_parallelism/0326_1.png' | relative_url }}" style="max-width: 40%; height: auto; display: block; margin: 0 auto;" alt="image">

- 물질은 움직이지 않고 에너지만 이동함
    - 입자 : $x(t)$에 관심

<img src="{{ '/assets/img/post/quantum_parallelism/0326_2.png' | relative_url }}" style="max-width: 35%; height: auto; display: block; margin: 0 auto;" alt="image">

$$\Psi(x, t) = A \cos k(x - vt)$$

- $x - vt = 0$  또는 constant라면 특정 점을 표시할 수 있음

$$x - vt = 0 \Rightarrow v = \frac{x}{t}$$

<img src="{{ '/assets/img/post/quantum_parallelism/0326_3.png' | relative_url }}" style="max-width: 70%; height: auto; display: block; margin: 0 auto;" alt="image">

주기
1. 시간 주기 $T$: 
$$\Psi(x, t+T) = \Psi(x, t)$$
2. 위치 주기 (파장) $\lambda$: 
$$\Psi(x+\lambda, t) = \Psi(x, t)$$

* 파동이 $\cos / \sin$ 함수로 표현될 때가 많음이 알려짐  
$\Rightarrow$ 이를 통해 고전적인 파동방정식의 구성을 보임. (
$$\frac{\partial^2 u}{\partial t^2} - \Delta u = 0$$ 
type의 미분방정식 풀이)

#### $T$와 $\lambda$의 관계 $\lambda = vT$

1. $$A \cos k(x - v(t+T)) = A \cos k(x - vt)$$
    $kvT = 2\pi$ (smallest $k$)  
    $\therefore T = \frac{2\pi}{kv}$
2. $$A \cos k((x+\lambda) - vt) = A \cos k(x - vt)$$
    $k\lambda = 2\pi$ (smallest $k$)  
    $\therefore \lambda = \frac{2\pi}{k}$    
by 1., 2., 
$$T = \lambda/v$$

- 진동수 $\nu := \frac{1}{T}$
- 각진동수 $\omega := \frac{2\pi}{T} = 2\pi\nu$

$$\Psi(x, t) = A \cos k(x - vt) = A \cos(kx - kvt)$$

By 1., $$kv = \frac{2\pi}{T} = \omega$$

$$\begin{aligned}
\therefore \Psi(x, t) 
&= A \cos(kx - \omega t) \quad\cdots (**)\\
&= Ae^{i(kx - \omega t)}
\end{aligned}$$

$$\begin{aligned}
\frac{\partial \Psi}{\partial x} & = -kA \sin(kx - \omega t) &
\frac{\partial \Psi}{\partial t} &= \omega A \sin(kx - \omega t)\\
\frac{\partial^2 \Psi}{\partial x^2} &= -k^2 A \cos(kx - \omega t) &
\frac{\partial^2 \Psi}{\partial t^2} &= -\omega^2 A \cos(kx - \omega t)
\end{aligned}$$

$$\Rightarrow \frac{\partial^2 \Psi}{\partial x^2} = (-k^2) \frac{1}{\omega^2} \frac{\partial^2 \Psi}{\partial t^2} = (\frac{k}{\omega})^2 \frac{\partial^2 \Psi}{\partial t^2}$$

Since, $k = \frac{2\pi}{\lambda}, \omega = \frac{2\pi}{T}$ and $(\frac{k}{\omega} =) \frac{T}{\lambda} = \frac{1}{v}$,

$$\qquad\frac{\partial^2 \Psi}{\partial x^2} = \frac{1}{v^2} \frac{\partial^2 \Psi}{\partial t^2} \quad\cdots\text{ wave equation}$$

* 3차원 : 
$$\frac{\partial^2 \Psi}{\partial x^2} + \frac{\partial^2 \Psi}{\partial y^2} + \frac{\partial^2 \Psi}{\partial z^2} = \Delta \Psi = \nabla \cdot (\nabla \Psi)$$
    ($\Delta \Psi$ : Laplacian, $\nabla \cdot$ : div, $\nabla \Psi$ : grad)
    
#### Schrödinger Equation

$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V\Psi\qquad(\hbar = \frac{h}{2\pi})$$

(Potential energy $V$와 풀고자 하는 함수 $\Psi$를 제외한 변수는 상수)

_2차 미분방정식 풀이 문제_


<img src="{{ '/assets/img/post/quantum_parallelism/0330_1.png' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="image">


$$\Psi(x, t) = A \cos(kx - \omega t),$$
파장(공간) $\lambda = vT$ 속도 $\cdot$ 주기(시간)

de Broglie 물질파  
("입자도 파동으로 해석할 수 있다")

에너지 (Einstein-Planck)

$E = nh\nu$ ($n=0, 1, 2, \dots$)  
$\quad = nhf$ ($\nu=f$, $\nu$: 진동수)

Maxwell 전자기파의 운동량

$p = \frac{E}{c}$ ($\because p = mv$ for 입자, $E = mc^2$)

$n=1$ 일 때,

$$\begin{aligned}
p = \frac{E}{c} = \frac{hf}{c} = \frac{\frac{1}{2\pi} h 2\pi f}{c} 
& = \frac{\hbar 2\pi f}{c} (\omega\text{: 각진동수, }\omega = 2\pi f)\\
& = \frac{\hbar 2\pi}{c} \cdot \frac{c}{\lambda} (\because f = \frac{1}{T} = \frac{c}{\lambda})\\
& = \hbar k (\because \lambda = \frac{2\pi}{k})
\end{aligned}$$

에너지 $E = KE + PE$

$$KE = \frac{1}{2} mv^2 \overset{p=mv}{=} \frac{p^2}{2m} = \frac{\hbar^2 k^2}{2m} \quad(\because p = \hbar k)$$

$$PE = V$$

$$\begin{cases} E = \frac{\hbar^2 k^2}{2m} + V \\ E = \hbar \omega \quad(\text{or } hf) \end{cases}\dots \text{(1)}$$

$$\Psi(x, t) = A \cos(kx - \omega t) = Ae^{i(kx - \omega t)}$$ 
속도: $$kx - \omega t = 0 \rightarrow \frac{x}{t} = \frac{\omega}{k} = v$$

$$\frac{\partial \Psi}{\partial t} = -i \omega \Psi,\quad  \frac{\partial \Psi}{\partial x} = ik \Psi,\quad \frac{\partial^2 \Psi}{\partial x^2} = -k^2 \Psi$$

$$\omega = \frac{i}{\Psi} \frac{\partial \Psi}{\partial t},\quad k^2 = -\frac{1}{\Psi} \frac{\partial^2 \Psi}{\partial x^2}\dots \text{(2)}$$

By (1), (2), 

$$E = \hbar \omega = \frac{i \hbar}{\Psi} \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{1}{\Psi} \frac{\partial^2 \Psi}{\partial x^2} + V$$

$$i \hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V \Psi$$ (Schrödinger Equation) 

- $E \Psi = i \hbar \frac{\partial \Psi}{\partial t}$
- $-\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} = KE \Psi$


$KE = \frac{p^2}{2m}$ 관계로부터:

$$p^2 = -\hbar^2 \frac{\partial^2}{\partial x^2}$$
$$p = -i \hbar \frac{\partial}{\partial x}$$

운동량 $p = mv$ (입자) $\rightarrow p = \frac{E}{c}$ (전자기파) $\rightarrow p = -i \hbar \frac{\partial}{\partial x}$ (미분연산자)



#### 파동함수의 규격화

Schrodinger Equation $\longleftrightarrow$ wave $\Psi(x, t) = Ae^{i(kx - \omega t)}$

$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V\Psi$$ 
편미분 방정식

- $\Psi(x, 0)$ : 초기 조건

[초기 조건] + [Sch. Eq] $\Rightarrow$ 파동함수 $\Psi(x, t)$ 확률 분포 결정

- 파동이 움직인다고 보지 않고, 파동 함수 해석에만 초점을 맞춤

해석 : 
$$\int_{a}^{b} |\Psi(x, t)|^2 dx =$$ 
시각 $t$에서 입자가 $a$와 $b$ 사이에 관측될 확률

* 복소함수 
$$|f|^2 = f \cdot \bar{f}$$

<img src="{{ '/assets/img/post/quantum_parallelism/0402_1.png' | relative_url }}" style="max-width: 80%; height: auto; display: block; margin: 0 auto;" alt="image">


$$\begin{cases} x \text{의 평균 } \langle x \rangle := \int_{-\infty}^{\infty} x \cdot \rho(x) dx, & \rho(x) : \text{ 확률밀도함수, } \rho(x) = |\Psi(x, t)|^2 \\ \text{표준편차 } \sigma = \sqrt{\langle x^2 \rangle - \langle x \rangle^2} & \text{(표준 편차가 크다는 것을 오차가 크다고 볼 수 있음)} \end{cases}$$

$$\Delta x \Delta p = \sigma \cdot \Delta p \ge \hbar / 2 \Rightarrow$$ 
오차를 0으로 만들 수 없음



예제.

<img src="{{ '/assets/img/post/quantum_parallelism/0402_2.png' | relative_url }}" style="max-width: 70%; height: auto; display: block; margin: 0 auto;" alt="image">

$$x(t) = \frac{1}{2}gt^2$$  
$$\frac{1}{2}gT^2 = h \Rightarrow T = \sqrt{\frac{2h}{g}}$$

$[0, T]$ 중 임의의 시간을 선택 $\Rightarrow x$를 측정  
$\langle x \rangle$의 기댓값은? 
($\langle x \rangle = \frac{h}{3}$)

$$\langle x \rangle = \int_{0}^{h} x [x\text{에 대한 확률밀도함수}] dx$$



#### Wave func $\Psi(x, t)$ 규격화 (normalization)

$$\int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx = 1\quad$$ 
( $$\because |\Psi(x, t)|^2;$$ 
확률밀도함수)

##### 규격화의 필요성

$$\begin{matrix} y'' - 2y' + y = 0 & \text{homogenous eq. (해를 구하면 상수배로 함)} \\ y'' - 2y' + y = e^x & \text{non-homo. eq. (구한 해의 상수배는 해가 아닐 수 있음)} \end{matrix}$$

$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V\Psi$$

- $\Psi$가 Sch. Eq의 해이면, $a\Psi$도 해가 됨
- 규격화 조건을 추가하면 $a$가 유일하게 결정됨 $\Rightarrow$ 유일해를 구하는 문제로 바뀜



##### $t$에 대한 종속성

Q: $t=0$에서 
$$\int_{-\infty}^{\infty} |\Psi(x, 0)|^2 dx = 1$$ 
이면,
(초기조건이 주어지면 $\longrightarrow \Psi(x, t)$가 유일하게 결정됨)  
임의의 $t$에 대해 
$$\int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx = 1$$ 
일까? ($t$에 영향을 받지 X)

$$\iff \frac{d}{dt} \int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx = 0$$ 

$$\begin{aligned}
\frac{d}{dt} \int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx \overset{\text{가능}}{=} \int_{-\infty}^{\infty} \frac{\partial}{\partial t} |\Psi(x, t)|^2 dx
& = \int_{-\infty}^{\infty} \frac{\partial}{\partial t} \Psi^*(x, t) \Psi(x, t) dx \\
& = \int_{-\infty}^{\infty} \frac{\partial \Psi^*}{\partial t} \Psi(x, t) + \Psi^*(x, t) \frac{\partial \Psi}{\partial t} dx
\end{aligned}$$

Since 
$$\frac{\partial \Psi}{\partial t} = \frac{i\hbar}{2m} \frac{\partial^2 \Psi}{\partial x^2} - \frac{i}{\hbar} V\Psi,\qquad \frac{\partial \Psi^*}{\partial t} = -\frac{i\hbar}{2m} \frac{\partial^2 \Psi^*}{\partial x^2} + \frac{i}{\hbar} V\Psi^*,$$ 

$$\begin{aligned}
\int_{-\infty}^{\infty} \frac{\partial \Psi^*}{\partial t} \Psi(x, t) + \Psi^*(x, t) \frac{\partial \Psi}{\partial t} dx 
& = \int_{-\infty}^{\infty} \left( -\frac{i\hbar}{2m} \frac{\partial^2 \Psi^*}{\partial x^2} + \cancel{\frac{i}{\hbar} V\Psi^*} \right) \Psi(x, t) + \Psi^*(x, t) \left( \frac{i\hbar}{2m} \frac{\partial^2 \Psi}{\partial x^2} - \cancel{\frac{i}{\hbar} V\Psi} \right) dx\\
& = \int_{-\infty}^{\infty} -\frac{i\hbar}{2m} \frac{\partial^2 \Psi^*}{\partial x^2} \Psi + \frac{i\hbar}{2m} \frac{\partial^2 \Psi}{\partial x^2} \Psi^* dx\\
& = \frac{i\hbar}{2m} \int_{-\infty}^{\infty} \frac{\partial}{\partial x} \left( -\Psi \frac{\partial \Psi^*}{\partial x} + \Psi^* \frac{\partial \Psi}{\partial x} \right) dx\\
& = \frac{i\hbar}{2m} \left[ \Psi^* \frac{\partial \Psi}{\partial x} - \Psi \frac{\partial \Psi^*}{\partial x} \right]_{-\infty}^{\infty}\\
& = \frac{i\hbar}{2m} (0 - 0) = 0 \qquad \because \Psi, \Psi^* \rightarrow 0 \text{ as } x \rightarrow \pm\infty\\
\therefore \frac{d}{dt} \int_{-\infty}^{\infty} |\Psi(x, t)|^2 dx = 0
\end{aligned}$$

##### 위치 $x$와 운동량 $p$

$$\langle x \rangle = \int_{-\infty}^{\infty} x |\Psi(x, t)|^2 dx$$ 

(측정하면 붕괴되는데 평균을 어떻게 구함? 똑같은 파동함수 $\Psi(x, t)$를 가지는 입자가 여러 개 있다고 하고 각각을 측정)

##### 평균 속도 

$$\begin{aligned}
\frac{d\langle x \rangle}{dt} = \int_{-\infty}^{\infty} x \frac{\partial}{\partial t} |\Psi|^2 dx
& = \int_{-\infty}^{\infty} x \cdot \frac{\partial}{\partial x} \cdot \frac{i\hbar}{2m} \left( -\Psi \frac{\partial \Psi^*}{\partial x} + \Psi^* \frac{\partial \Psi}{\partial x} \right) dx\\
& = \frac{i\hbar}{2m} \int_{-\infty}^{\infty} x \frac{\partial}{\partial x} \left( \Psi^* \frac{\partial \Psi}{\partial x} - \Psi \frac{\partial \Psi^*}{\partial x} \right) dx\\
& = \frac{i\hbar}{2m} \underbrace{\left[ x \left( \Psi^* \frac{\partial \Psi}{\partial x} - \Psi \frac{\partial \Psi^*}{\partial x} \right) \right]_{-\infty}^{\infty}}_{0} - \frac{i\hbar}{2m} \int_{-\infty}^{\infty} \Psi^* \frac{\partial \Psi}{\partial x} - \Psi \frac{\partial \Psi^*}{\partial x} dx\\
& = -\frac{i\hbar}{2m} \int_{-\infty}^{\infty} \Psi^* \frac{\partial \Psi}{\partial x} - \Psi \frac{\partial \Psi^*}{\partial x} dx\\
& = -\frac{i\hbar}{2m} \underbrace{[\Psi^* \Psi]_{-\infty}^{\infty}}_{0} - \frac{i\hbar}{m} \int_{-\infty}^{\infty} \Psi^* \frac{\partial \Psi}{\partial x} dx \qquad(- \Psi \frac{\partial \Psi^*}{\partial x} \text{에 대한 부분 적분을 수행하면})\\
& = -\frac{i\hbar}{m} \int_{-\infty}^{\infty} \Psi^* \frac{\partial \Psi}{\partial x} dx\\
\therefore \frac{d\langle x \rangle}{dt} = -\frac{i\hbar}{2m} \int_{-\infty}^{\infty} \Psi^* \frac{\partial \Psi}{\partial x} dx 
\end{aligned}$$

이제, (아직 맞는지 확인은 하지 않았지만)
$$\langle v \rangle = \frac{d\langle x \rangle}{dt}$$ 
라고 둠

##### 평균 운동량 

$p = mv$에서 
$$\langle p \rangle = m \langle v \rangle = m \frac{d\langle x \rangle}{dt} \quad (p = -i\hbar \frac{\partial}{\partial x})$$

$$\langle x \rangle = \int_{-\infty}^{\infty} x |\Psi(x, t)|^2 dx= \int_{-\infty}^{\infty} \Psi^* x \Psi dx$$

비슷하게, 
$$|\Psi|^2$$
을 확률밀도함수로 갖는 어떤 물리량 $Q(x,p)$에 대해 

$$\langle Q \rangle := \int_{-\infty}^{\infty} \Psi^*(x, t) Q \Psi(x, t) dx$$ 

라고 하면,

$$\frac{d\langle x \rangle}{dt} = -\frac{i\hbar}{m} \frac{\partial}{\partial x} \int_{-\infty}^{\infty} \Psi^* \cdot \Psi dx = \int_{-\infty}^{\infty} \Psi^* \left(-\frac{i\hbar}{m} \frac{\partial}{\partial x} \right) \Psi dx$$

$$m \frac{d\langle x \rangle}{dt} = \int_{-\infty}^{\infty} \Psi^* \underbrace{(-i\hbar \frac{\partial}{\partial x})}_{\text{운동량 연산자 }\langle p\rangle} \Psi dx = \langle p \rangle$$ 


##### 평균 운동에너지 

$T = \frac{p^2}{2m}$

$$\langle T \rangle = \frac{1}{2m} \langle p^2 \rangle = \int_{-\infty}^{\infty} \Psi^* \frac{1}{2m} \left( -\hbar^2 \frac{\partial^2}{\partial x^2} \right) \Psi dx$$


<br>
Sch. Eq.를 푸는 방법 
$$\begin{cases} \text{(1) 변수 분리법} \\ \text{(2) 연산자 방법} \end{cases}$$


$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V\Psi$$

연산자

$$\left.
\begin{array}{ll}
x \longrightarrow x \\
p \longrightarrow -i\hbar \frac{\partial}{\partial x}
\end{array}
\right\}
\Rightarrow Q(x,p) = Q\left(x, -i\hbar \frac{\partial}{\partial x}\right)$$

$$\langle Q(x,p) \rangle = \int_{-\infty}^{\infty} \Psi^*(x,t) Q(x,p) \Psi(x,t) dx$$

$V = V(x) \cdots$ 시간에 무관한 potential

변수분리법: $\Psi(x,t) = \psi(x) \cdot \varphi(t)$ 인 해를 찾아보자

$$\frac{\partial}{\partial t}\Psi = \psi(x) \frac{d\varphi(t)}{dt} , \quad \frac{\partial^2}{\partial x^2}\Psi = \frac{d^2\psi}{dx^2} \varphi(t)$$

$$i\hbar \psi \frac{d\varphi}{dt} = -\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} \varphi + V(x)\psi\varphi$$

$$\underbrace{i\hbar \frac{1}{\varphi} \frac{d\varphi}{dt} = }_{\text{(DE 1)}}\underbrace{E}_{\text{constant(에너지)}}\underbrace{ = -\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} \frac{1}{\psi} + V(x)}_{\text{(DE 2)}}$$

$$i\hbar \frac{d\varphi}{dt} = E\varphi , \quad \frac{d\varphi}{dt} = \underbrace{-i\frac{E}{\hbar}}_{\text{상수}}\varphi \Rightarrow \varphi = e^{-iEt/\hbar}$$

(계수 $A$ 생략: $\psi$ 에 곱해진다고 봄)

$$\Psi(x,t) = \psi(x) \cdot e^{-\frac{iE}{\hbar}t}$$


- (DE 2)에는 $i$가 없어서 $\psi(x)$는 실수함수 임
    $$|\Psi(x,t)|^2 = \Psi^* \Psi = \psi(x)e^{\frac{iE}{\hbar}t} \cdot \psi(x)e^{-\frac{iE}{\hbar}t} = |\psi(x)|^2$$
    
    $\Rightarrow |\psi(x)|^2$에 대해서 규격화를 하면 $|\Psi|^2$ 도 규격화됨
- $\Psi\_1(x,t)$ 와 $\Psi\_2(x,t)$가 Sch. Eq의 해이면(상수항이 없기 때문에 가능)
    $$\Psi(x,t) = a_1\Psi_1(x,t) + a_2\Psi_2(x,t)$$ 
    
    도 해가 됨
    - 이 해는 변수분리해가 아닐 가능성이 매우 높음
    - 변수분리해가 일반해를 구하는 데 도움이 됨을 알 수 있음 (모든 해를 표현할 수 있는 것은 아님)
- 분리 상수 $E = {E\_n} = {E\_1, E\_2, \dots }$일 때,
    해가 ${\Psi\_n} = {\Psi\_1, \Psi\_2, \dots }$이면  
    $\Psi\_n(x,t) = \psi\_n(x)\varphi\_n(t) = \psi\_n(x) \cdot e^{-\frac{iE_n}{\hbar}t}$ 의 선형 결합도 해가 됨
    
    즉, 
    
    $$\Psi(x,t) = \sum_{n=1}^{\infty} c_n \psi_n(x) e^{-\frac{iE_n}{\hbar}t} \cdots \text{(일반해)}$$
    
    - 초기 조건이 결정되면 $c\_n$이 결정됨

    - 일차결합으로 표현할 수 없는 해는?
        - Hilbert 공간 가정 : 공간 내에 일반해로 수렴하는 해가 존재
- 초기조건에서 $\Psi(x,0) = f(x)$ 에서 $c\_n$을 결정하면 $\Psi(x,t)$가 구해짐

[요약]
시간에 무관한 potential $V(x)$에 대한 Schrödinger Eq.의 초기값 문제

$$\begin{cases}
i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V(x) \Psi & \cdots \text{ (PDE)} \\
\Psi(x,0) = \psi(x) & \cdots \text{ (IC).}
\end{cases}$$

1. 변수 분리 : $\Psi(x,t) = \psi(x) \cdot \varphi(t)$
    $$\Rightarrow \begin{cases} i\hbar \frac{1}{\varphi} \frac{d\varphi}{dt} = E & \cdots \text{ (DE 1)} \\
    \underbrace{-\frac{\hbar^2}{2m} \frac{d^2 \psi}{dx^2} + V(x)\psi}_{\hat{H}\psi \ (\hat{H} = \frac{\hat{p}^2}{2m} + V)} = E\psi & \cdots \text{ (DE 2)}
    \end{cases}$$
    
    - $\hat{H}$: eigenfunction
    - $E$: eigenvalue
2. 분리 상수 $E = \{E\_1, E\_2, \dots \}$ 으로 가정하고
    $$\begin{cases}
    (\text{DE 1}) \Rightarrow \varphi_n(t) = e^{-\frac{iE_n}{\hbar}t}\\
    (\text{DE 2}) \Rightarrow \psi_n(x)
    \end{cases}$$
    
    - (DE 1), (DE 2)는 $E_n$ 으로부터 나옴
    - $\psi\_n(x)$를 풀려면 $V(x)$ 가 주어져야 함
3. 편미분방정식(PDE)의 해는
    $$\Psi_1(x,t) = \psi_1(x)\varphi_1(t) , \quad \Psi_2(x,t) = \psi_2(x)\varphi_2(t)$$
    
    의 선형결합으로 쓸 수 있음  
    즉,
    
    $$\Psi(x,t) = \sum_{n=1}^{\infty} c_n \psi_n(x) \varphi_n(t)$$
4. 초기 조건에서
    $$\psi(x) = \Psi(x,0) = \sum_{n=1}^{\infty} c_n \psi_n(x)$$

    인 
    $$\{c_n\}$$
    을 구함
    
    $$\Rightarrow \Psi(x,t) = \sum_{n=1}^{\infty} c_n \psi_n(x) e^{-\frac{iE_n}{\hbar}t}$$
$\therefore$ (DE 2)를 풀면 $\Psi(x,t)$를 구할 수 있음



#### Schrodinger Eq.의 해

##### [1] 무한한 사각형 우물

<img src="{{ '/assets/img/post/quantum_parallelism/0409_1.png' | relative_url }}" style="max-width: 80%; height: auto; display: block; margin: 0 auto;" alt="image">

$$V(x) = \begin{cases} 0, & 0 \le x \le a \\ \infty, & \text{otherwise} \end{cases}$$

- 입자는 $0 \le x \le a$ 에서만 발견됨: $\psi(x) \ge 0$
- $0 < x < a$ 에서는 자유 입자임 ($V=0$, 끌어당기는 힘이 작용하지 않음)
- $x < 0$, $x > 0$ 에서 $\psi(x) = 0$ (즉, 발견될 확률 
$$\int_{\alpha}^{\beta} |\psi(x)|^2 dx = 0$$
)

$$-\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} + V(x)\psi = E\psi$$

$0 \le x \le a$ 에서 $V(x) \equiv 0$ 이므로,

$$\begin{aligned}
-\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} &= E\psi\\
\frac{d^2\psi}{dx^2} &= -\frac{2mE}{\hbar^2}\psi
\end{aligned}$$

$k = \sqrt{\frac{2mE}{\hbar^2}}$ 이라고 하면, (상수, 에너지, 질량이라 음수가 아님)

$$\begin{aligned}
\frac{d^2\psi}{dx^2} &= -k^2\psi\\
\frac{d^2\psi}{dx^2} + k^2\psi &= 0 \quad (\text{스프링})
\end{aligned}$$

(초기 조건) 그리고 이때 $\quad \psi(0) = \psi(a) = 0$ 이므로

(Boundary Condition 구하기)

$$\begin{aligned}
\therefore \psi(x) &= A \sin kx + B \cos kx\\
\psi(0) &= B = 0\\
\psi(a) &= A \sin ka = 0\\
ka &= n\pi, \quad n=1, 2, \dots\\
k &= \frac{n\pi}{a}\\
k_n &= \sqrt{\frac{2mE_n}{\hbar^2}}
\end{aligned}$$

$$\Rightarrow E_n = \frac{\hbar^2 k_n^2}{2m} = \frac{\hbar^2}{2m} \left(\frac{n\pi}{a}\right)^2 \quad (\rightarrow \text{discrete})$$

미분방정식은 continuous한데 Energy는 discrete함 $\Rightarrow$ 경계조건에 의함



$$\int_0^a |\psi|^2 dx = 1 \Rightarrow \int_0^a |A|^2 \sin^2 kx \, dx = |A|^2 \frac{a}{2} = 1 \Rightarrow A = \sqrt{\frac{2}{a}}$$

$$\psi_n(x) = \sqrt{\frac{2}{a}} \sin \left(\frac{n\pi}{a}x\right)\qquad \begin{pmatrix} \Psi_n(x,t) = \psi_n(x) \varphi_n(t) \\ \Psi(x,t) = \sum_n c_n \Psi_n(x,t) \end{pmatrix}$$

$$\int \psi_m^* \psi_n = \delta_{mn} = \begin{cases} 1, & m=n \\ 0, & m \ne n \end{cases} \dots\text{ 직교성}$$

Because,

$$\begin{aligned}
A = A^T &\Rightarrow \begin{cases}A v_1 = \lambda_1 v_1\\ A v_2 = \lambda_2 v_2\end{cases},\\
\lambda_1 \ne \lambda_2 &\Rightarrow v_1 \perp v_2,\\ 
E_n \ne E_m &\Rightarrow \psi_n \perp \psi_m
\end{aligned}$$

$$\begin{aligned}
\int \psi_m^* \psi_n \, dx &= \int_0^a \sqrt{\frac{2}{a}} \sin\left(\frac{m}{a}\pi\right) \sqrt{\frac{2}{a}} \sin\frac{n}{a}\pi\\
\downarrow & (\because \sin \alpha \cdot \sin \beta = -\frac{1}{2} [\cos(\alpha+\beta) - \cos(\alpha-\beta)])\\
&= \dots = \delta_{mn}
\end{aligned}$$




##### Differential Operator $\quad D = \frac{d}{dx}$

[ex 1] $y'' + y' - 6y = 0$

$$\begin{aligned}
L[y] = 0 \dots \text{DE}, \quad L &= D^2 + D - 6 \dots \text{미분 연산자}\\ 
&= (D-2)(D+3)
\end{aligned}$$

$$\begin{aligned}
L[\psi] = 0 \Longleftrightarrow & (D-2)(D+3)\psi = 0 \\
\Longleftrightarrow & \begin{cases}(D-2)\psi_1 = 0 \quad(\text{i.e., }D\psi_1 = 2\psi_1) \quad \text{or}\\
(D+3)\psi_2 = 0 \quad(\text{i.e., } D\psi_2 = -3\psi_2) \quad (\because \text{ D.O의 순서를 바꿔도 되기 때문})\end{cases}\\
\therefore & \psi_1 = e^{2x}, \quad \psi_2 = e^{-3x}\\
\Longleftrightarrow & \text{general sol.} \quad \psi = c_1 e^{2x} + c_2 e^{-3x}
\end{aligned}$$

$$L_1 := D-2, \quad L_2 := D+3 \Rightarrow L = L_1 L_2 = L_2 L_1$$

[ex 2] Non-Commutative "operator"

$$L_1 = \frac{d}{dx} \quad L_2 = x$$
일 때,

Let 

$$L_{12} := L_1 L_2, \quad L_{21} := L_2 L_1$$

이 경우,

$$\begin{aligned}
L_{12}[\psi] & = \frac{d}{dx}(x\psi) = \psi + x\frac{d\psi}{dx} = \left(1 + x\frac{d}{dx}\right)\psi\\
L_{21}[\psi] & = x\left(\frac{d}{dx}\psi\right) = x\frac{d\psi}{dx} = \left(x\frac{d}{dx}\right)\psi
\end{aligned}$$

$$L_{12} = 1 + x\frac{d}{dx} \ne x\frac{d}{dx} = L_{21}$$

* 상수배, 미분 연산자만 있을 때, 교환법칙이 성립함

- Commutator (교환자) 
$$[A,B] := AB - BA$$
    [ex 2]에서 
    $$\quad [L_1, L_2] = \left[\frac{d}{dx}, x\right] = \left(1 + x\frac{d}{dx}\right) - \left(x\frac{d}{dx}\right) = 1 \ne 0$$

- Linear Differential Operator $L$
    $$L = \underline{a_n(x)}D^n + \underline{a_{n-1}(x)}D^{n-1} + \dots + \underline{a_1(x)}D^1 + \underline{a_0(x)}$$
    
    $$L[y] = 0 \quad \underline{y^{(n)}, y^{(n-1)}, \dots, y', y \text{ 의 1차식}}$$


[ex 3] $\quad [\hat{x}, \hat{p}] = i\hbar$ cannonical commutation relation

$$\begin{cases} \hat{x} = x \\ \hat{p} = -i\hbar\frac{d}{dx} \end{cases}\qquad 
\begin{aligned}
[\hat{x}, \hat{p}]\psi &= (\hat{x}\hat{p} - \hat{p}\hat{x})\psi\\
&= -x i\hbar \frac{d\psi}{dx} - \left( -i\hbar \frac{dx}{dx}\psi - i\hbar x \frac{d\psi}{dx} \right)\\
&= i\hbar\psi
\end{aligned}$$

##### [2] 조화진동자

<img src="{{ '/assets/img/post/quantum_parallelism/0305_3.png' | relative_url }}" style="max-width: 25%; height: auto; display: block; margin: 0 auto;" alt="image">

$F = -\frac{dV}{dx} \quad \left( V = \frac{1}{2}kx^2 \right)$

$m\frac{d^2x}{dt^2} = -kx \longrightarrow \ddot{x} + \omega^2 x = 0ㅇ\qquad(\omega := \sqrt{\frac{k}{m}})$

$$x(t) = A\cos\omega t + B\sin\omega t$$

이를 Schrödinger Eq.에 대입하면

$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + \underbrace{\frac{1}{2}kx^2}_{V(x)} \Psi$$

또한, $\Psi(x,t) = \psi(x)\varphi(t)$ 에 대하여

$$\begin{cases} \frac{d\varphi}{dt} = -\frac{iE}{\hbar}\varphi \\ -\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} + \frac{1}{2}kx^2 \psi = E\psi \quad (x^2\text{: 상수 계수가 아님}) \end{cases}$$

[푸는 방법]

1. power series method
2. Ladder Operator
    $$\begin{aligned}
    -\frac{\hbar^2}{2m} \frac{d^2\psi}{dx^2} + \frac{1}{2}m\omega^2x^2 \psi &= E\psi\\
    \frac{\hat{p}^2}{2m}\psi + \frac{1}{2}m\omega^2x^2\psi &= E\psi \quad \left(\because \hat{p} = -i\hbar\frac{\partial}{\partial x}\right)
    \end{aligned}$$
    
    $$\underset{\text{Hamiltonian operator, Differential operator}}{\underbrace{\frac{1}{2m} \left[ \hat{p}^2 + (m\omega x)^2 \right]}} \psi = E\psi$$

    - 이를 풀 때 다음과 같이 하면 안 됨
        $$\frac{1}{2m} \underline{(i\hat{p} + m\omega x)(-i\hat{p} + m\omega x)} \psi = E\psi$$
    - 다음과 같이 변형된 operator 사용
        Operator $\quad \hat{a}\_+, \quad \hat{a}\_-$
        
        $$\begin{aligned}
        \hat{a}_+ &:= \frac{1}{\sqrt{2\hbar m\omega}} (-i\hat{p} + m\omega x)\\       
        \hat{a}_- &:= \frac{1}{\sqrt{2\hbar m\omega}} (i\hat{p} + m\omega x)
        \end{aligned}$$
        
        $$\Longrightarrow \hat{H} = \hbar\omega \left( \hat{a}_- \hat{a}_+ - \frac{1}{2} \right) = \hbar\omega \left( \hat{a}_+ \hat{a}_- + \frac{1}{2} \right)$$

        이때, $\hbar\omega, \pm\frac{1}{2}$ 는 $\hat{a}\_- \hat{a}\_+$ 와 $\hat{a}\_+ \hat{a}\_-$ 의 차이를 보정하기 위함

 


**조화진동자(harmonic oscillator)의 파동함수**

- 시간에 무관한 Schrödinger 방정식의 대수적 해법(Algebraic Method)
    * 고전적으로 질량 $m$인 입자가 용수철 상수가 $k$인 용수철에서 진동하는 시스템을 조화진동자라고 함
    * 조화진동자에 대한 파동함수가 만족하는 Schrödinger 방정식은 다음과 같음
    
    $$i\hbar\frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2 \Psi}{\partial x^2} + \frac{1}{2}kx^2 \Psi$$
    
    1. $\omega = \sqrt{\frac{k}{m}}$라 하면 $V(x) = \frac{1}{2}m\omega^2 x^2$인 Schrödinger 방정식이 됨
        $\Psi(x, t) = \psi(x)\varphi(t)$를 가정하여 방정식의 해를 변수분리법으로 구하면, 분리상수를 $E$라고 할 때,
        
        $$i\hbar\frac{1}{\varphi}\frac{d\varphi}{dt} = E = -\frac{\hbar^2}{2m}\frac{1}{\psi}\frac{d^2\psi}{dx^2} + \frac{1}{2}m\omega^2x^2$$
        
        이는 다음과 같이 $\varphi(t)$에 대한 방정식 (DE1)과 $\psi(x)$에 대한 방정식 (DE2)로 분리할 수 있음
        - 시간에 대한 방정식 (DE1): 
        $$\frac{d\varphi}{dt} = -\frac{iE}{\hbar}\varphi$$
        - 공간에 대한 방정식 (DE2): 
        $$-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + \frac{1}{2}m\omega^2x^2\psi = E\psi$$

    2. **교환자(commutator)** 연산자 $A$, $B$의 교환자 $[A, B]$를 다음과 같이 정의함
        $$[A, B] = AB - BA$$

        - 연산자가 교환가능하면, $[A, B] = 0$ 이 됨 
        - 하지만, 위치 $x$와 운동량 
        $$\hat{p} = -i\hbar\frac{d}{dx}$$ 
        연산자는 교환 불가능함
    
    3. $[x, \hat{p}]$를 계산하기 위해 임의의 함수 $\psi$에 대하여 다음을 계산하면,
        
        $$[x, \hat{p}]\psi = x \left(-i\hbar\frac{d\psi}{dx}\right) - \left(-i\hbar\frac{d}{dx}\right)(x\psi) = i\hbar \psi$$

        이므로 $[x, \hat{p}] = i\hbar$ 이며, 이 식을 정준교환관계(canonical commutation relation)라 부름
    
    4. 퍼텐셜이 $V(x) = \frac{1}{2}m\omega^2x^2$인 경우, 시간에 무관한 Schrödinger 방정식 (DE2)는 다음과 같음

        $$\hat{H}\psi = \frac{1}{2m}[\hat{p}^2 + (m\omega x)^2]\psi = E\psi.$$
        
        $u^2 + v^2 = (iu + v)(-iu + v)$와 같이 $\hat{H}$를 연산자 분해하기 위해 $\hat{a}\_+$, $\hat{a}\_-$를 다음과 같이 정의함
        
        $$\hat{a}_+ = \frac{1}{\sqrt{2\hbar m\omega}} (-i\hat{p} + m\omega x), \quad \hat{a}_- = \frac{1}{\sqrt{2\hbar m\omega}} (+i\hat{p} + m\omega x).$$

        이제, $\hat{a}\_- \hat{a}\_+$ 와 $\hat{a}\_+ \hat{a}\_-$ 연산자가 $\hat{H}$와 얼마나 유사한지 확인함
        
        $$\begin{aligned}
        \hat{a}_-\hat{a}_+ &= \frac{1}{2\hbar m\omega} (i\hat{p} + m\omega x)(-i\hat{p} + m\omega x)\\
        &= \frac{1}{2\hbar m\omega} [\hat{p}^2 + (m\omega x)^2 - im\omega(x\hat{p} - \hat{p}x)] = \frac{1}{\hbar\omega}\hat{H} + \frac{1}{2},\\
        \hat{a}_+\hat{a}_- &= \frac{1}{2\hbar m\omega} (-i\hat{p} + m\omega x)(i\hat{p} + m\omega x)\\
        &= \frac{1}{2\hbar m\omega} [\hat{p}^2 + (m\omega x)^2 - im\omega(\hat{p}x - x\hat{p})] = \frac{1}{\hbar\omega}\hat{H} - \frac{1}{2}.
        \end{aligned}$$

        * 미분연산자처럼 
            
            $$\begin{aligned}
            (D-2)(D-3)y = 0 & \iff y'' - 5 y' + 6y = 0 \iff (D-3)(D-2)y = 0\\
            & \iff (D-3)y=0 \text{ or } (D-2)y=0
            \end{aligned}$$

            을 만족하면 좋지만, 이러한 교환 법칙은 연산자에 대하여 일반적으로 성립하지 않는다는 문제가 있음
        
    5. 이 결과로부터 교환자(commutator) $[\hat{a}\_-, \hat{a}\_+]$를 쉽게 계산할 수 있음 
        
        $$[\hat{a}_-, \hat{a}_+] = \hat{a}_-\hat{a}_+ - \hat{a}_+\hat{a}_- = \left(\frac{1}{\hbar\omega}\hat{H} + \frac{1}{2}\right) - \left(\frac{1}{\hbar\omega}\hat{H} - \frac{1}{2}\right) = 1$$

        비슷하게,

        $$[\hat{a}_+, \hat{a}_-] = -1$$
        
    6. 역으로 Hamiltonian $\hat{H}$를 $\hat{a}\_+$와 $\hat{a}\_-$로 표현하면,
        
        $$\hat{H} = \hbar\omega \left(\hat{a}_+\hat{a}_- + \frac{1}{2}\right) \quad \text{또는} \quad \hat{H} = \hbar\omega \left(\hat{a}_+\hat{a}_- - \frac{1}{2}\right)$$
        
    7. $\psi$가 에너지 $E$의 Schrödinger 방정식을 만족하면, $\hat{a}\_+\psi$는 에너지가 $E+\hbar\omega$ 인 Schrödinger 방정식을 만족함
        
        식으로 쓰면,
        
        $$\hat{H}\psi = E\psi \quad \Rightarrow \quad \hat{H}(\hat{a}_+\psi) = (E+\hbar\omega)(\hat{a}_+\psi)$$
        
        같은 방법으로 $\hat{a}\_-\psi$는 에너지가 $E-\hbar\omega$ 인 Schrödinger 방정식을 만족함
    
    8. 이 결과는 다음과 같이 확인 가능함
        
        $$\begin{aligned}
        \hat{H}(\hat{a}_+\psi) &= \hbar\omega\left(\hat{a}_+\hat{a}_- + \frac{1}{2}\right)(\hat{a}_+\psi) \\
        &= \hbar\omega\left(\hat{a}_+\hat{a}_-\hat{a}_+ + \frac{1}{2}\hat{a}_+\right)\psi\\
        &= \hbar\omega\hat{a}_+\left( \hat{a}_-\hat{a}_+ + \frac{1}{2} \right)\psi \\
        &= \hat{a}_+\left(\hat{H} + \hbar\omega \right)\psi\\
        &= \hat{a}_+(E + \hbar\omega )\psi \\
        &= \left(E + \hbar\omega \right)(\hat{a}_+\psi)
        \end{aligned}$$

    9. 조화진동자의 파동함수 $\psi$에 올림연산자 $\hat{a}\_+$와 내림연산자 $\hat{a}\_-$를 반복하여 적용해도 Schrödinger 방정식의 해가 되므로
        
        $$\hat{a}_+\psi, \quad \hat{a}_+^2\psi, \quad \hat{a}_+^3\psi, \dots, \quad \hat{a}_-\psi, \quad \hat{a}_-^2\psi, \quad \hat{a}_-^3\psi, \dots$$
        
        모두 해가 되며 대응되는 에너지는 연산자를 적용할 때마다 $\pm\hbar\omega$ 만큼 증감함
        
        - 파동함수 $\psi$에 연산자를 적용한 $(\hat{a}\_{\pm})^n\psi$는 Schrödinger 방정식의 해가 되지만, 항상 규격화를 만족한다는 보장은 할 수 없음
            * 따라서 적절한 상수를 붙여야 함
        
    10. 조화진동자의 파동함수 $\psi$에 $\hat{a}\_-$ 연산자를 계속 적용하면 대응되는 에너지도 계속 작아짐
        - 에너지는 0보다 크거나 같아야 하므로 가장 낮은 바닥상태 $\psi\_0$는 $\hat{a}\_- \psi\_0 = 0$을 만족함
        
        - 미분방정식으로 쓰면,

            $$\frac{d\psi_0}{dx} = - \frac{m\omega x}{\hbar} \psi_0$$
    
    11. 이 미분방정식을 풀면,

        $$\psi_0(x) = A \exp\left( - \frac{m\omega}{2\hbar} x^2 \right).$$
        
    12. 규격화를 적용하여 상수 $A$를 결정하면, 
        
        $$A = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4}$$



### Mach-Zehnder Interferomenter

<img src="{{ '/assets/img/post/quantum_parallelism/0423_1.png' | relative_url }}" style="max-width: 35%; height: auto; display: block; margin: 0 auto;" alt="image">


- 입자 하나만 던질 때
    - 관측하지 않으면 파동처럼 행동해서 어느 경로로 이동했는지 알 수 없음
    - 관측하면 delay가 있어도 50% 씩 나뉘고, 관측 안하면 파동처럼 간섭이 발생해서 비율이 바뀜



#### Formalism

- State (계의 상태) $\Psi$ ... represented by its wave func
- Observable (관측량) $\hat{Q}$ ... represented by an operator

|QM| | LA|
|wave func | $\longleftrightarrow$ | vector|
| operater | $\longleftrightarrow$ |linear transformation|

1. Finite dimensional vector space
    1. vector 
    $$\vec{x} = |\vec{x}\rangle = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$$
        ( 
        $$|\vec{x}\rangle$$: Dirac notation )
    2. Inner product of 
    $$|\alpha\rangle, |\beta\rangle$$
        
        $$\langle \alpha, \beta \rangle = \langle \alpha \mid \beta \rangle = \sum_i \alpha_i^* \beta_i$$
    3. Linear transf. $T$

        $$|\alpha\rangle \xrightarrow{T} |\beta\rangle$$
        
        $$\vec{\beta} = T\vec{\alpha} \iff |\beta\rangle = \hat{T}|\alpha\rangle$$

2. $\infty$-dimensional vector space

    규격화 
    $$\int |\psi|^2 = 1$$ 
    필요
    
    1. Inner product of $f, g$

        For 
        $$f, g \in L^2(\mathbb{R}) = \left\{ f : \int |f|^2 < \infty \right\},$$         
        
        $$\langle f | g \rangle := \int f^* g$$
    2. 규격화
        
        $$\langle f | f \rangle = 1 \quad (\text{normalized})$$
    3. 직교 규격화 (orthonormal)
        
        $$\{f_n\} : \text{orthonormal if } \langle f_n | f_m \rangle = \delta_{mn}$$
    4. 완비성 (completeness) (
    $$f_n \in \mathbb{R}$$
    의 limit가 
    $$\mathbb{R}$$
    에 속하는가)
        
        $$\{f_n\}$$ 
        is complete, if any $f$ can be expressed as
        
        $$f(x) = \sum_n c_n f_n(x)$$
        
        In addition, if 
        $$\{f_n\}$$ 
        is orthonormal,
        
        $$c_n = \langle f_n | f \rangle$$
        
        (
        $$f = c_1f_1 + c_1f_1 + \dots + c_nf_n + \dots \leftarrow$$ 
        완비성에 의해 가능)
        
$H$ : Hilbert Space 
$$\overset{\text{def}}{=}$$ 
complete inner product space : norm, dist 등을 정의할 수 있음
    complete: Every Cauchy seq. converges in $H$

- e.g. 
    - $L^2(\mathbb{R})$
    - 파동함수 $\Psi$는 Hilbert Space에 존재

#### Hermitian

1. Linear Algebra
    For 
    $$A \in M_{n \times n}(\mathbb{C}), \quad \langle \vec{u}, \vec{v} \rangle := u^H v, \quad u, v \in \mathbb{C}^n \quad (u^H := \bar{u}^T)$$
    
    $$A^H \overset{\text{def}}{=} \bar{A}^T$$ 
    is called Hermitian of $A$.
    
    If 
    $$A^H = A$$
    , $A$ is called a Hermitian matrix.
    
    **Thm (Hermitian matrix)**
    
    If 
    $$A^H = A$$
    , then
    1. Every eigenvalue is real $\mathbb{R}$ (관측 결과가 real인게 자연스러움)
    2. Eigenspaces are orthogonal
    $$(\lambda_i \neq \lambda_j \implies v_i \perp v_j)$$
    3. $\exists$ orthogonal basis consists of eigenvectors

2. Hermitian Operator
    1. 관측량 (observable) $Q \cdots$ Hermitian operator $\hat{Q}$
    2. 내적 (inner product) 
    $$\langle f \mid g \rangle := \int f^* \cdot g$$
    3. 기댓값 (expectation) 
    $$\langle Q \rangle := \int \psi^* \hat{Q} \psi = \langle \psi | \hat{Q} \psi \rangle$$ 
    (※ 기댓값: 앙상블, $\hat{Q}$: 실수)
    
    **Def.** $Q$ : Hermitian operator if 
    $$\langle f \mid \hat{Q}g \rangle = \langle \hat{Q}f \mid g \rangle, \quad \forall f, g.$$
    
    즉, 
    $$\int f^* (\hat{Q}g) = \int (\hat{Q}f)^* g$$
    
    e.g. 
    $$\hat{p} = -i\hbar \frac{d}{dx}$$
        $$\begin{aligned}
        \langle f \mid \hat{p}g \rangle 
        &= \int_{-\infty}^{\infty} f^*(x) \left(-i\hbar \frac{d}{dx}\right) g(x) dx\\
        &= \left[ f^*(x) (-i\hbar) g(x) \right]_{-\infty}^{\infty} - \int_{-\infty}^{\infty} \left(-i\hbar \frac{d}{dx}\right) f^*(x) \cdot g(x) dx \quad (\text{부분적분})\\
        &= 0 + \int_{-\infty}^{\infty} \left(i\hbar \frac{d}{dx}\right) f^*(x) \cdot g(x) dx\\
        &= \int_{-\infty}^{\infty} \left[ \left(-i\hbar \frac{d}{dx}\right) f(x) \right]^* \cdot g(x) dx\\
        &= \langle \hat{p}f \mid g \rangle
        \end{aligned}$$
        
    $$\hat{Q}^\dagger$$ 
    (Hermitian Conjugate of $\hat{Q}$)
    
    $$\hat{Q}^\dagger := \hat{Q}^*$$

##### Determined State: 항상 같은 결과를 주는 상태 (붕괴)

$$\text{Observable } Q \xrightarrow{\text{measurement}} \text{result } q \in \mathbb{R}$$

Determined state이면 항상 같은 결과 $q$를 얻음 (분산이 0)  
$$(\sigma^2 = E(X^2) - (E(X))^2 = E(X-E(X))^2)$$

분산 

$$\begin{aligned}
\sigma^2 = \langle (Q - \langle Q \rangle)^2 \rangle 
&= \langle \psi | (Q - \langle Q \rangle)^2 \psi \rangle\\
&= \langle (Q - \langle Q \rangle)\psi | (Q - \langle Q \rangle)\psi \rangle \quad (\because Q^H = Q, \langle Q \rangle \in \mathbb{R})\\
&= \langle (Q - q)\psi | (Q - q)\psi \rangle \quad (\because \langle Q \rangle = q)\\
&= 0 \quad (\text{이 되어야 함})
\end{aligned}$$

$$\begin{aligned}
\therefore (Q - q)\psi &= 0 \qquad \because \langle f, f \rangle = 0 \implies f = 0\\
\implies \underset{\text{관측량}}{Q}\underset{\text{파동함수}}{\psi} &= \underset{\text{실수 상수 }}{q}\psi
\end{aligned}$$


(관측량 $Q =$ Hermitian op. $\hat{Q}$) 

즉, 

$$\underset{\matrix{\text{observable}\\ \text{(eigenvector)}}}{\hat{Q}}\underset{\matrix{\text{wave func}\\ \text{(eigenfunc)}}}{|\psi\rangle} = \underset{\matrix{\text{measure result}\\ \text{(eigenvalue)}}}{q}|\psi\rangle$$

"The eigenfuncs of an observable operator are complete."

Any func (in Hilbert space) can be expressed as a linear combination of the eigenfuncs.

$$\Psi = \sum_n c_n \psi_n\quad \rightarrow$$
관측을 하면 특정 
$$\psi_n$$
으로 붕괴함



- operator : system을 벗어나지 않음
- transform : system을 벗어날 수 있음. (linear transf. : 잘 정의하면 system을 벗어나지 않음)

$$Q\Psi \approx \hat{Q} |\Psi\rangle$$

- $\hat{Q}$ : Hermitian operator
- Determined state : 파동이 중첩되지 않고 하나인 상태 $\rightarrow$ 측정 시 매번 같은 결과가 나옴
    
    $$\Psi = \sum c_n \psi_n$$

통계적 해석 (확률적 해석); 가정 (공리) 앙상블
- $\Phi(x, t)$ 상태의 입자에 대하여, 관측량 $Q$로 측정하면, Hermitian 연산자 $Q$의 고윳값을 얻는다.
- $\Psi = \sum c\_n f\_n, f\_n : Q$의 고유함수, $q\_n : Q$의 고윳값 ; 
$$\hat{Q}f_n = q_n f_n \quad(A\vec{v_i} = \lambda_i \vec{v_i})$$
    $Q$가 hermitian 일 때 항상 real
- $$c_n = \langle f_n | \Psi \rangle$$
- $\therefore \Psi$의 규격화 
$$\iff \sum |c_n|^2 = 1$$

$Q$ (operator), $q\_n$ (eigenvalue), $f\_n$ (eigenfunc)

$$\Psi = \sum_n c_n f_n$$ 
($n$: countable) 이면, 관측 ($Q$) $\rightarrow$ 결과 ($q\_n$)가 확률 $|c\_n|^2$으로 얻어짐

규격화 : 
$$\langle \Psi | \Psi \rangle = 1 = \langle \sum_n c_n f_n | \sum_m c_m f_m \rangle = \sum_n \sum_m c_n^* c_m \langle f_n | f_m \rangle = \sum_n c_n^* c_n = \sum_n |c_n|^2$$

$Q$의 기댓값 
$$E(Q) = \sum_n q_n \cdot P(Q=q_n) = \sum_n q_n |c_n|^2$$

한편, 

$$\begin{aligned}
\langle Q \rangle := \langle \Psi | \hat{Q} \Psi \rangle 
& = \langle \sum_n c_n f_n | \hat{Q} \sum_m c_m f_m \rangle\\
& = \sum_n \sum_m c_n^* \langle f_n | \sum_m q_m c_m f_m \rangle\\
& = \sum_n \sum_m c_n^* c_m q_m \langle f_n | f_m \rangle\\
& = \sum_n c_n^* c_n q_n = \sum_n q_n |c_n|^2
\end{aligned}$$

### Uncertainty Principle (불확정성의 원리)

$$\sigma_A^2 \sigma_B^2 \ge \{ \frac{1}{2i} \langle [A, B] \rangle \}^2\quad (= \{ \frac{1}{2i} \langle AB - BA \rangle \}^2)$$

pf) 먼저 Cauchy-Schwarz 부등식

$$(\int f^* g)^2 \le (\int |f|^2)(\int |g|^2)\iff \langle f|g \rangle^2 \le \langle f|f \rangle \langle g|g \rangle$$

임을 상기한다.
분산 $\sigma\_A^2,\sigma\_B^2$은

$$\begin{aligned}
\sigma_A^2 &= \langle (A - \langle A \rangle)^2 \rangle\quad (= E[(A - \langle A \rangle)^2])\\
&= \langle \Psi | (A - \langle A \rangle)^2 \Psi \rangle\\
&= \langle (A - \langle A \rangle) \Psi | (A - \langle A \rangle) \Psi \rangle\quad (\because A\text{: hermitian operator})\\
&:= \langle f | f \rangle\quad\text{ for }\quad f := (A - \langle A \rangle) \Psi\\
\sigma_B^2 &= \langle g | g \rangle$ for $g := (B - \langle B \rangle) \Psi
\end{aligned}$$

또한, 다음 사실

$$\begin{aligned}
z \in \mathbb{C} , |z|^2 &= [Re(z)]^2 + [Im(z)]^2\\
&\ge [Im(z)]^2 = [\frac{1}{2i}(z - \bar{z})]^2
\end{aligned}$$

에 의해

$z = \langle f \mid g \rangle$ 라고 하면, 

$$\langle f \mid f \rangle \langle g \mid g \rangle \ge \langle f | g \rangle =|z|^2 \ge [\frac{1}{2i}(z - \bar{z})]^2$$

따라서,

$f = (A - \langle A \rangle) \Psi, g = (B - \langle B \rangle) \Psi$

$$\begin{aligned}
\langle f | g \rangle &= \langle (A - \langle A \rangle) \Psi | (B - \langle B \rangle) \Psi \rangle\\
&= \langle \Psi | (A - \langle A \rangle)^{\dagger} (B - \langle B \rangle) \Psi \rangle\\
&= \langle \Psi | (A - \langle A \rangle) (B - \langle B \rangle) \Psi \rangle\quad (\because A - \langle A \rangle\text{: Hermitian operator})\\
&= \langle \Psi | (AB - \langle A \rangle B - A \langle B \rangle + \langle A \rangle \langle B \rangle) | \Psi \rangle\\
&= \langle \Psi | AB | \Psi \rangle - \langle A \rangle \langle \Psi | B | \Psi \rangle - \langle B \rangle \langle \Psi | A | \Psi \rangle + \langle A \rangle \langle B \rangle \langle \Psi | \Psi \rangle\\
&= \langle AB \rangle - \langle A \rangle \langle B \rangle - \langle B \rangle \langle A \rangle + \langle A \rangle \langle B \rangle\\
&= \langle AB \rangle - \langle A \rangle \langle B \rangle \\
\langle g | f \rangle
&= \langle BA \rangle - \langle A \rangle \langle B \rangle
\end{aligned}$$

Therefore,

$$\begin{aligned}
\langle f | f \rangle \langle g | g \rangle = \sigma_A^2 \sigma_B^2 \ge |\langle f | g \rangle|^2 &\ge [\frac{1}{2i}(\langle f | g \rangle - \langle g | f \rangle)]^2\\
&= [\frac{1}{2i} (\langle AB \rangle - \langle A \rangle \langle B \rangle - \langle BA \rangle + \langle A \rangle \langle B \rangle)]^2\\
&= [\frac{1}{2i} \langle AB - BA \rangle]^2\\
&= [\frac{1}{2i} \langle [A, B] \rangle]^2
\end{aligned}$$

$\therefore [x, p] = i\hbar$ 에 대하여

$$\sigma_x^2 \sigma_p^2 \ge \{ \frac{1}{2i} \langle [x, p] \rangle \}^2 = \{ \frac{1}{2i} i\hbar \}^2 = (\frac{\hbar}{2})^2 \Rightarrow \sigma_x \sigma_p \ge \frac{\hbar}{2}$$

- If $A, B$ : Commute $\Rightarrow AB = BA$ i.e. $[A, B] = 0$ ($x, p$는 commute 하지 않음)
- In matrix theory, $AB = BA$ (& some condition) $\Rightarrow \exists$ Common eigenvectors
    i.e. 
    $$\exists |\Psi\rangle$ s.t. $A|\Psi\rangle = \lambda_A |\Psi\rangle \Rightarrow B|\Psi\rangle = \lambda_B |\Psi\rangle$$

### Qubit

- 바닥 상태: $|0\rangle$ 
- 들뜬 상태: $|1\rangle$

(general) Qubit
- 양자 상태 (중첩) 
$$|\Psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle$$ 
(다른 상태가 중첩되지 않도록 control)
- 측정 가설 (붕괴) 
$$|\Psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle
\begin{matrix}\xrightarrow{\text{확률 } |\alpha_0|^2} |0\rangle\\
\xrightarrow{\text{확률 } |\alpha_1|^2} |1\rangle
\end{matrix}\text{ for }|\alpha_0|^2 + |\alpha_1|^2 = 1$$
    (Collapse $\Rightarrow$ "$|\Psi\rangle$에 어떤 연산자를 걸지." $\rightarrow$ 물리량의 eigenvalue 중 하나로 결정됨)

#### 중첩과 얽힘 (Superposition & Entanglement)

##### 중첩 2-qubit system

$$|\Psi_A\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle, |\Psi_B\rangle = \beta_0 |0\rangle + \beta_1 |1\rangle$$

$$|\Psi_{AB}\rangle = C_0 |0\rangle|0\rangle + C_1 |0\rangle|1\rangle + C_2 |1\rangle|0\rangle + C_3 |1\rangle|1\rangle$$

##### $n$-qubit system

$$|\Psi\rangle = C_0 |0\dots0\rangle + \dots + C_{2^n-1} |1\dots1\rangle$$ 
($2^n$개 상태가 중첩)

##### 얽힘

$$|\Psi_A\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle, |\Psi_B\rangle = \beta_0 |0\rangle + \beta_1 |1\rangle$$

(흔들기? $C\_1, C\_2 = 0$으로 만듦 $\rightarrow$ 하나를 측정할 때 다른 하나의 상태가 고정되도록 조정)

$$|\Psi_{AB}\rangle = C_0 |0\rangle|0\rangle + C_3 |1\rangle|1\rangle$$

$\alpha = 0$ 이면 $\beta = 0$, $\alpha = 1$ 이면 $\beta = 1$

#### Dirac Notation

- $\langle \text{ } \rangle$ ... bracket
- $\mid \beta\rangle$ ... ket vector
    * $\mid f\rangle = f(x)$ 함수
- $\langle \alpha \mid $ ... bra vector
    - $\rightarrow$ functional(벡터를 내적값($\mathbb{C}$)으로 보냄) $\Rightarrow \langle f \mid  g \rangle = \int f^* g$
    * $\langle f \mid  = \int f^* \square$ : linear functional
        함수 $\rightarrow$ 실수(복소수) : $g \mapsto \int f^* g$

##### Dual space (space of bra vectors) : linear functional

$$\Phi : \text{vector, func} \rightarrow \mathbb{R}, \mathbb{C}; |f\rangle \xmapsto{\quad} \langle \Phi | f \rangle = \int \Phi^* f$$

##### Projection

$$\begin{aligned}
l &= |\vec{\beta}| \cos\theta = |\vec{\beta}| \frac{\vec{\alpha} \cdot \vec{\beta}}{|\vec{\alpha}| |\vec{\beta}|} = \frac{\vec{\alpha} \cdot \vec{\beta}}{|\vec{\alpha}|}\\
\pi_\alpha(\vec{\beta}) &= l \frac{\vec{\alpha}}{|\vec{\alpha}|} = \frac{\vec{\alpha} \cdot \vec{\beta}}{|\vec{\alpha}|^2} \vec{\alpha}
\end{aligned}$$

$|\vec{\alpha}| = 1$ 이면, 
$$\pi_\alpha(\vec{\beta}) = (\vec{\alpha} \cdot \vec{\beta}) \vec{\alpha}$$

$$|\beta\rangle \xrightarrow{\hat{P}} C_{\beta} |\alpha\rangle : \hat{P}:$$ 
operator ; 
$$\hat{P} = |\alpha\rangle\langle\alpha|$$ 
if 
$$||\alpha\rangle|| = 1$$

$$\Rightarrow \hat{P}|\beta\rangle = (|\alpha\rangle\langle\alpha|)|\beta\rangle = |\alpha\rangle\langle\alpha|\beta\rangle = \langle\alpha|\beta\rangle |\alpha\rangle$$

$\{\mid e\_n\rangle\} :$ 정규직교 기저 (O-N basis) $\rightarrow \sum\_n \mid e\_n\rangle\langle e\_n\mid  = 1$ (operator)

$\because$ 임의의 
$$|\alpha\rangle = \sum \alpha_n |e_n\rangle$$

$$\begin{aligned}
(\sum_n |e_n\rangle\langle e_n|)|\alpha\rangle &= |e_1\rangle\langle e_1|\alpha\rangle + \dots + |e_n\rangle\langle e_n|\alpha\rangle + \dots\\
&= |e_1\rangle \alpha_1 + \dots + |e_n\rangle \alpha_n + \dots = \sum_n \alpha_n |e_n\rangle = |\alpha\rangle
\end{aligned}$$

##### Spectral Decomposition

e.g.) 

$$A = \begin{pmatrix} 10 & 6 \\ 6 & 1 \end{pmatrix} \quad \begin{cases} \lambda_1 = 13 \dots v_1 = \frac{1}{\sqrt{5}} \begin{pmatrix} 2 \\ 1 \end{pmatrix} \\ \lambda_2 = -2 \dots v_2 = \frac{1}{\sqrt{5}} \begin{pmatrix} 1 \\ -2 \end{pmatrix} \end{cases} \{v_1, v_2\} : \text{O.N. basis}$$

$$A = VDV^T \quad V = [v_1 \text{ } v_2], V^T = \begin{bmatrix} v_1^T \\ v_2^T \end{bmatrix} = V^{-1}, D = \begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix}$$

$$\begin{aligned}
A &= [v_1 \text{ } v_2] \begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_2 \end{bmatrix} \begin{bmatrix} v_1^T \\ v_2^T \end{bmatrix} = [v_1 \text{ } v_2] \begin{bmatrix} \lambda_1 v_1^T \\ \lambda_2 v_2^T \end{bmatrix}\\
&= v_1 (\lambda_1 v_1^T) + v_2 (\lambda_2 v_2^T)\\
&= \lambda_1 (v_1 v_1^T) + \lambda_2 (v_2 v_2^T)
\end{aligned}$$

$$\{|e_1\rangle, \dots, |e_n\rangle, \dots\} :$$ 
Eigenvectors of $\hat{Q}$ (O.N. basis, Hermitian operator)

$$\hat{Q}|e_n\rangle = q_n |e_n\rangle$$ 
(eigenvalue)

S.D. of 
$$\hat{Q} \Rightarrow \hat{Q} = \sum_n q_n |e_n\rangle\langle e_n|$$

proof) 임의의 
$$|\alpha\rangle = \sum \alpha_n |e_n\rangle$$ 
에 대해
1. $$\hat{Q}|\alpha\rangle = \hat{Q}(\sum \alpha_n |e_n\rangle) = \sum \alpha_n \hat{Q}|e_n\rangle = \sum \alpha_n q_n |e_n\rangle,$$

2. $$(\sum_n q_n |e_n\rangle\langle e_n|)|\alpha\rangle = \sum_n q_n |e_n\rangle\langle e_n|\alpha\rangle = \sum_n \alpha_n q_n |e_n\rangle$$

$\therefore$ 1. = 2.




### Qubit

$$|\Psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle \quad (|\alpha_0|^2 + |\alpha_1|^2 = 1)$$

Di Vincenzo의 조건 (Q.C.를 구현하기 위한 7가지 조건)
- 양자 계산 (ALU)
1. Qubit (Hamiltonian이 잘 정의된) 구현 (Hamiltonian: 에너지를 나타냄)
2. 원하는 상태로 qubit을 초기화 $\rightarrow \alpha\_0, \alpha\_1$ 값
3. 충분히 긴(유효한 양자 계산 시간) 결맞음 (coherent) 상태 ($\longleftrightarrow$ decoherent)
4. 양자 게이트 (universal gate : 원하는 연산이 가능한 gates)
5. 측정 능력 (특정 qubit을 선택적으로 측정하는 능력)
- 양자 통신
6. 정적 상태 $\longleftrightarrow$ 동적 상태 전환
7. 동적 상태 qubit을 전송하는 능력

양자 컴퓨터(HW) = Qubit + Quantum Gates

**공준 (postulate)**

물리계 (physical system) — 
$$\begin{cases} \text{상태함수 (state func)} \\ \text{상태벡터 (state vector)} \end{cases}$$

$|\Psi\rangle$에 모든 정보가 담겨 있다.

$$\begin{cases} \Psi \in H \text{ (Hilbert space) } \dots \text{함수 · 벡터} \\ \uparrow \\ \Psi^\dagger \in H^* \text{ (Dual space, 쌍대공간) } \dots \text{(linear) functional} \end{cases}$$

**Bracket notation**

$$\begin{cases} |\Psi\rangle & \text{ket vector } \in H \\ \langle\Psi| & \text{bra vector } \in H^* \end{cases} \quad \langle\Psi|\Psi\rangle = 1$$

**기저 (변환)** 
$|p\rangle \longleftrightarrow |x\rangle$

변환 
$$\begin{cases} |\Psi\rangle = a_1|\alpha_1\rangle + \dots + a_n|\alpha_n\rangle & \{|\alpha_1\rangle, \dots, |\alpha_n\rangle\} \\ |\Psi\rangle = b_1|\beta_1\rangle + \dots + b_n|\beta_n\rangle & \{|\beta_1\rangle, \dots, |\beta_n\rangle\} \end{cases}$$

**내적** 

$$|\alpha\rangle \langle\beta| = \langle\alpha|\beta\rangle \in \mathbb{C} \quad (\text{내적도 } \in H^*)$$

**직교** 

$$|\alpha\rangle \perp |\beta\rangle \iff \langle\alpha|\beta\rangle = 0$$

**크기** 

$$\| |\alpha\rangle \| = \sqrt{\langle\alpha|\alpha\rangle}$$



Bloch Sphere : (Qubit) 
$$|\Psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle, \quad \alpha_0, \alpha_1 \in \mathbb{C}\quad(|\alpha_0|^2 + |\alpha_1|^2 = 1)$$

* 4 차원

    $$\begin{cases} \alpha_0 = x_0 + y_0 i \in \mathbb{C} \\ \alpha_1 = x_1 + y_1 i \in \mathbb{C}, \quad x_0, x_1, y_0, y_1 \in \mathbb{R} \end{cases}$$

    - $$|\Psi\rangle$$
    를 표현하려면 4개의 차원 필요
    - $$|\alpha_0|^2 + |\alpha_1|^2 = 1$$ 
    조건이 있으므로 3차원으로 표현 가능

* 3 차원 (변수 3개로 표현 가능)
    
    $$|\Psi\rangle = e^{i\phi} [c_0 |0\rangle + c_1 |1\rangle],$$ 
    
    - $$|c_0|^2, |c_1|^2$$
    의 확률로 $\mid 0\rangle$ 또는 $\mid 1\rangle$이 됨
    - $e^{i\phi}$: global phase $\rightarrow$ 크기가 1이고 확률에 기여 X $\rightarrow$ 2 차원

#### Qubit 
$$|\Psi\rangle = \alpha_0 |0\rangle + \alpha_1 |1\rangle, \quad |\alpha_0|^2 + |\alpha_1|^2 = 1$$

- $n$개 qubit에 대하여 임의의 $i$ 번째 qubit 상태가
$$|\Psi_n\rangle = \alpha_{n0}|0_n\rangle + \alpha_{n1}|1_n\rangle$$
라고 하면, $N = 2^n$에 대하여
$$\begin{aligned}
|\Psi\rangle =\; &|\Psi_1\rangle \dots |\Psi_n\rangle\\
=\; &(\alpha_{10} \dots \alpha_{n0}) |0_1\rangle|0_2\rangle \dots |0_n\rangle + (\alpha_{11} \alpha_{20} \dots \alpha_{n0}) |1_1\rangle|0_2\rangle \dots |0_n\rangle \\
&+ \dots + (\alpha_{11} \dots \alpha_{(n-1)1} \alpha_{n0}) |1_1\rangle \dots |1_{n-1}\rangle|0_n\rangle + (\alpha_{11} \alpha_{21} \dots \alpha_{n1}) |1_1\rangle|1_2\rangle \dots |1_n\rangle
\end{aligned}$$



2-qubit system 기저 $|0\rangle|0\rangle, |0\rangle|1\rangle, |1\rangle|0\rangle, |1\rangle|1\rangle$

$$|\Psi_1\rangle = a_0|0\rangle + a_1|1\rangle, \quad |\Psi_2\rangle = b_0|0\rangle + b_1|1\rangle$$

$$\begin{aligned}
|\Psi\rangle = |\Psi_1\rangle |\Psi_2\rangle 
&= (a_0|0\rangle + a_1|1\rangle) \otimes (b_0|0\rangle + b_1|1\rangle)\\
&= a_0b_0|0\rangle \otimes |0\rangle + a_0b_1|0\rangle \otimes |1\rangle + a_1b_0|1\rangle \otimes |0\rangle + a_1b_1|1\rangle \otimes |1\rangle
\end{aligned}$$

- 텐서곱 $\otimes$ : 기저의 차원을 늘리는 방법

$$\{0, 1, 2, 3\} = \{|00\rangle, |01\rangle, |10\rangle, |11\rangle\} = \{|0\rangle \otimes |0\rangle, |0\rangle \otimes |1\rangle, |1\rangle \otimes |0\rangle, |1\rangle \otimes |1\rangle\}$$

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix},\quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix},\quad |0\rangle \otimes |1\rangle = \begin{pmatrix} 1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} \\ 0 \begin{pmatrix} 0 \\ 1 \end{pmatrix} \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}$$

※ 주의 
$$V_1 = \mathbb{R}^2 (\text{basis } \{v_{11}, v_{12}\}), V_2 = \mathbb{R}^2 (\text{basis } \{v_{21}, v_{22}\})$$
    $$\Rightarrow V = V_1 \times V_2 = \mathbb{R}^2 \times \mathbb{R}^2 = \mathbb{R}^4 (\text{basis } \{v_{11}, v_{12}, v_{21}, v_{22}\}) : 2+2$$
    개 기저  
    한편 
    $$V_1 \otimes V_2 = \mathbb{R}^2 \otimes \mathbb{R}^2 \approx \mathbb{R}^4(\text{basis } \{v_{11} \otimes v_{21}, v_{11} \otimes v_{22}, v_{12} \otimes v_{21}, v_{12} \otimes v_{22}\}) : 2 \times 2$$
    개 기저  
    그러나 $V\_1 = \mathbb{R}^3$ 이면 두 곱이 다르게 작용함


##### 연산자 = 양자 게이트

$$\begin{pmatrix} X: \text{연산자} \\ |\alpha\rangle: \text{양자 상태} \end{pmatrix} \xrightarrow{Q \text{ 연산}} X|\alpha\rangle = |\beta\rangle : \text{새로운 양자 상태}$$

※ 연산자 = 선형함수 (유니타리 변환)

1. $2$-qubit system
    $$|\alpha\rangle = a_0|0\rangle + a_1|1\rangle = a_0 \begin{pmatrix} 1 \\ 0 \end{pmatrix} + a_1 \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} a_0 \\ a_1 \end{pmatrix}$$

    $$X = \begin{pmatrix} x_{00} & x_{01} \\ x_{10} & x_{11} \end{pmatrix}$$
    
    $$|\beta\rangle = X|\alpha\rangle = (x_{00}a_0 + x_{01}a_1)|0\rangle + (x_{10}a_0 + x_{11}a_1)|1\rangle$$

2. $n$-qubit system
    $$|\alpha\rangle = \begin{pmatrix} a_0 \\ \vdots \\ a_{2^n-1} \end{pmatrix}$$

    $$|\beta\rangle = [ \quad ]_{2^n \times 2^n} \begin{pmatrix} a_0 \\ \vdots \\ a_{2^n-1} \end{pmatrix} = X|\alpha\rangle$$

**Dual conjugate $X^\dagger$**

$$|\beta\rangle = X|\alpha\rangle \longleftrightarrow \langle\beta| = \langle X\alpha| = \langle\alpha|X^\dagger$$

$$\langle\alpha|\beta\rangle := a_1^*\beta_1 + \dots + a_n^*\beta_n \Rightarrow \langle\alpha|\alpha\rangle = |a|^2$$

$$\Rightarrow \langle\alpha|\beta\rangle = \langle\beta|\alpha\rangle^*$$

$$\begin{aligned}
\langle r | (X|\alpha\rangle) &= r_1^* (X|\alpha\rangle)_1 + \dots + r_n^* (X|\alpha\rangle)_n\\
&= (X^\dagger r_1)^* |\alpha\rangle_1 + \dots + (X^\dagger r_n)^* |\alpha\rangle_n\\
&= (\langle r|X^\dagger) |\alpha\rangle
\end{aligned}$$

$\Rightarrow \mathbb{R}$에서 
$$\langle\beta|X\alpha\rangle := \beta^T X \alpha = (X^T \beta)^T \alpha = \langle X^T\beta|\alpha\rangle$$

$\mathbb{C}$에서 
$$\langle\beta|X\alpha\rangle = (\beta^*)^T X \alpha = (X^* \beta)^* \alpha = \langle X^* \beta|\alpha\rangle = \langle X^H \beta|\alpha\rangle = \langle\beta|X^H|\alpha\rangle$$


### Bloch Sphere

1. $$(r_\alpha, \phi_\alpha, r_\beta, \phi_\beta) \approx (x_\alpha, y_\alpha, x_\beta, y_\beta):$$
4차원

    극좌표로 ($x+iy = re^{i\theta}$ 이므로)

    $$\alpha = r_\alpha e^{i\phi_\alpha}, \quad \beta = r_\beta e^{i\phi_\beta}$$

    $|$\alpha|^2 + |\beta|^2 = 1 \rightarrow$$ 
    3차원(Bloch sphere의 표면) $\rightarrow$ 2차원

2. $$(\phi, r_\alpha, r_\beta):$$
3차원
    $|\Psi\rangle = e^{i\gamma} |\Psi\rangle = e^{i\gamma} (\alpha|0\rangle + \beta|1\rangle)$

    global phase $e^{i\gamma}$:측정 결과에 대한 확률에 영향 거의 X

    $$\begin{aligned}
    \therefore |\Psi\rangle &= r_\alpha e^{i\phi_\alpha} |0\rangle + r_\beta e^{i\phi_\beta} |1\rangle\\
    &= \underbrace{e^{i\phi_\alpha}}_{\rightarrow 1} [r_\alpha |0\rangle + r_\beta e^{i(\phi_\alpha - \phi_\beta)} |1\rangle]\\
    &\approx r_\alpha |0\rangle + r_\beta e^{i\phi} |1\rangle
    \end{aligned}$$

3. $(\theta, \phi):$ 2차원
    $|\alpha|^2 + |\beta|^2 = 1$
    $\Rightarrow z^2 + |x+iy|^2 = 1$
    $\therefore x^2 + y^2 + z^2 = 1$
    
    Let 
    $$r_\alpha = z \in \mathbb{R}, \quad x, y \in \mathbb{R},\quad r_\beta e^{i\phi} = x+iy\in\mathbb{C}$$
    
    $$|\Psi\rangle = r_\alpha |0\rangle + r_\beta e^{i\phi} |1\rangle = z |0\rangle + (x+iy) |1\rangle$$
    
    Then, 

    $$\begin{cases} x = r \sin\theta \cos\phi \\ y = r \sin\theta \sin\phi \\ z = r \cos\theta \end{cases} \Rightarrow \text{ 3차원 }(r, \theta, \phi)$$
    
    If $r=1 \Rightarrow$ (Unit sphere, Normalization), 2차원 
    $r = x^2 + y^2 + z^2 = 1$ 이므로
    최종적으로 $(\theta, \phi)$로 나타낼 수 있음
    
    $$\begin{aligned}
    \therefore |\Psi\rangle &= z|0\rangle + (x+iy)|1\rangle\\
    &= \cos\theta |0\rangle + \sin\theta(\cos\phi + i\sin\phi)|1\rangle\\
    &= \cos\theta |0\rangle + e^{i\phi} \sin\theta |1\rangle
    \end{aligned}$$

4. Bloch Sphere: 2차원 Half-angle (대칭점 고려)
    $|\Psi\rangle = \cos\theta |0\rangle + e^{i\phi} \sin\theta |1\rangle$
    
    $$P(r, \theta, \phi) \xrightarrow{\text{opposite point}} P'(r, \pi-\theta, \phi)\xrightarrow{\text{opposite point}}-P(r, \pi-\theta, \phi+\pi)$$
    
    $$\begin{matrix}P \longleftrightarrow -P\\
    |\Psi\rangle \longleftrightarrow -|\Psi\rangle \end{matrix}$$

    ($-1 = e^{-i\pi}$은 global phase $\Rightarrow$ 측정결과에 영향 X)
    
    - Upper hemisphere와 Lower hemisphere 중 대칭점에 해당하는 Lower hemisphere 버림 (같은 측정 결과를 주므로)
    
    $$\begin{aligned}
    |\Psi\rangle &= \cos\theta |0\rangle + e^{i\phi} \sin\theta |1\rangle \quad (0 \le \theta \le \pi/2, 0 \le \phi \le 2\pi)\\
    &= \cos\frac{\theta}{2} |0\rangle + e^{i\phi} \sin\frac{\theta}{2} |1\rangle \quad (0 \le \theta \le \pi, 0 \le \phi \le 2\pi)
    \end{aligned}$$

    <img src="{{ '/assets/img/post/quantum_parallelism/0511_1.png' | relative_url }}" style="max-width: 80%; height: auto; display: block; margin: 0 auto;" alt="image">

    
    - $$|0\rangle$$ 
    ($z$축)
    - $$|1\rangle$$ 
    ($-z$축)
    - $$|+\rangle$$ 
    ($x$축)
    - $$|-\rangle$$ 
    ($-x$축)
    - $$|i\rangle$$ 
    ($y$축)
    - $$|o\rangle$$ 
    ($-y$축)
    
    - $$|\Psi\rangle = |0\rangle \quad \text{if } \theta = 0$$
    (North pole)
    - $$|\Psi\rangle = |1\rangle \quad \text{if } \theta = \pi$$
    (South pole)
    - $$|\Psi\rangle = |+\rangle = \frac{1}{\sqrt{2}} (|0\rangle + |1\rangle) \quad \text{if } \theta = \frac{\pi}{2}, \phi = 0$$
    ($\mid 0\rangle + \mid 1\rangle$)
    - $$|\Psi\rangle = |-\rangle = \frac{1}{\sqrt{2}} (|0\rangle - |1\rangle) \quad \text{if } \theta = \frac{\pi}{2}, \phi = \pi$$
    ($\mid 0\rangle - \mid 1\rangle$)
    - $$|\Psi\rangle = |i\rangle = \frac{1}{\sqrt{2}} (|0\rangle + i|1\rangle) \quad \text{if } \theta = \frac{\pi}{2}, \phi = \frac{\pi}{2}$$ 
    (inner: $y$축을 향하여)
    - $$|\Psi\rangle = |-i\rangle = \frac{1}{\sqrt{2}} (|0\rangle - i|1\rangle) \quad \text{if } \theta = \frac{\pi}{2}, \phi = \frac{3}{2}\pi$$ 
    (outer: $y$축의 반대로)

Bloch Sphere의 성질
1. orthogonality of opposite points: 반대 점은 수직 ($\frac{\theta}{2}$ 를 두 배로 늘려서)
    $$\begin{aligned}
    |\Psi_1\rangle &= \cos\frac{\theta}{2} |0\rangle + e^{i\phi} \sin\frac{\theta}{2} |1\rangle\\
    \downarrow &\text{opposite point } (\theta \rightarrow \pi-\theta, \phi \rightarrow \phi+\pi)\\
    |\Psi_2\rangle &= \cos\frac{\pi-\theta}{2} |0\rangle + e^{i(\phi+\pi)} \sin\frac{\pi-\theta}{2} |1\rangle
    \end{aligned}$$
    
    $$\begin{aligned}
    \langle\Psi_1|\Psi_2\rangle &= \cos\frac{\theta}{2} \cos\frac{\pi-\theta}{2} + \underbrace{e^{i\pi}}_{=-1} \sin\frac{\theta}{2} \sin\frac{\pi-\theta}{2}\\
    &= \cos\frac{\theta}{2} \sin\frac{\theta}{2} - \sin\frac{\theta}{2} \cos\frac{\theta}{2} = 0
    \end{aligned}$$
2. Rotation with Pauli matrices $X, Y, Z$
    (gate)
    $$\begin{cases} X = \sigma_x = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} & \text{x축 기준 }\pi\text{ 회전} \\ Y = \sigma_y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix} & \text{y축 기준 }\pi\text{ 회전} \\ Z = \sigma_z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} & \text{z축 기준 }\pi\text{ 회전} \end{cases}$$
    
    Unitary matrix
    $$X^2 = Y^2 = Z^2 = I$$
    
    e.g. 
    $$X|\Psi\rangle = X(\alpha|0\rangle + \beta|1\rangle) = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} \alpha \\ \beta \end{pmatrix} = \begin{pmatrix} \beta \\ \alpha \end{pmatrix} \Rightarrow X|0\rangle = |1\rangle, \quad X|1\rangle = |0\rangle $$
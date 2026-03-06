---
layout: post
title: "Linear Algebra"
date: 2020-08-05
# description: ""
tags: [MATH]
categories: [Study, Class]
---


📚 [MAIN] Deisenroth, Marc Peter, A. Aldo Faisal, and Cheng Soon Ong. *Mathematics for machine learning*. Cambridge University Press, 2020.
📚 [SUB] Strang, Gilbert. *Linear algebra and its applications*. 2012.


##### 


### Preliminary

#### Vector

$(x_1, x_2,\ ...\, ,\ x_n)\in \mathbb{R}^n$

#### A system of linear eqs.

$$
\begin{aligned}&  \left\{ \begin{matrix} a_{11} x_1\ + &\!\!\!\!\cdots\!\!\!\! & +\ a_{1n}x_n &\!\! =\!\! & b_1 \\ \vdots & \!\!\!\!\ddots\!\!\!\! & \vdots & & \vdots \\ a_{m1} x_1\ + &\!\!\!\!\cdots\!\!\!\!& +\ a_{mn}x_n & \!\!=\!\! & b_m \end{matrix} \right. \\& \iff\quad A\vec{x} = \vec{b} \\ & \iff\quad \left( \begin{matrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{m1} & \cdots & a_{mn} \end{matrix} \right) \left( \begin{matrix} x_1 \\ \vdots \\ x_n \end{matrix} \right) = \left( \begin{matrix} b_1 \\ \vdots \\ b_m \end{matrix} \right) \\ & \iff \quad x_1 \left( \begin{matrix} a_{11} \\ \vdots \\ a_{m1} \end{matrix} \right) + \cdots + x_n \left( \begin{matrix} a_{1n} \\ \vdots \\ a_{mn} \end{matrix} \right) = \left( \begin{matrix} b_{1} \\ \vdots \\ b_{m} \end{matrix} \right) \end{aligned}
$$

→ linear combination of column vectors $\left( \begin{matrix} a_{11} \\ \vdots \\ a_{m1} \end{matrix} \right) ,\ \ldots\,,\ \left( \begin{matrix} a_{1n} \\ \vdots \\ a_{mn} \end{matrix} \right)$

#### Matrix operations on $n\times n$ matrices

$(AB)C=A(BC)$

$(A+B)C=AC+BC$

$A^T = (a^T_{ij})$ where $a^T_{ij}=a_{ji}$ for all $i, j$ with $A=(a_{ij})$

$AA^{-1} = I = A^{-1}A$

$(AB)^{-1} = B^{-1}A^{-1}$

$(A+B)^T = A^T+B^T$

$(AB)^T = B^T A^T$

$A^T = A$ then $A$ is called symmetric

$(A^T)^{-1} = (A^{-1})^T =: A^{-T}$

$(\lambda_1 \lambda_2)A = \lambda_1 (\lambda_2 A)$

$(\lambda_1 +\lambda_2)A = \lambda_1 A + \lambda_2 A$

$\lambda(A+B) = \lambda A+ \lambda B$

##### example

$$
\begin{aligned} & \begin{pmatrix}  1 & 0 & 8 & -4 \\  0 & 1 & 2 & 12\end{pmatrix} ( x_1 \;\;  x_2 \;\;  x_3 \;\;   x_4)^T=\begin{pmatrix}  42 \\  8\end{pmatrix}\\ &\qquad
\iff
x_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} +x_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix} +x_3 \begin{pmatrix} 8 \\ 2 \end{pmatrix} +x_4 \begin{pmatrix} -4 \\ 12 \end{pmatrix}=\begin{pmatrix} 42 \\ 8 \end{pmatrix} \end{aligned}
$$

the # of unknowns: 4, eqs: 2

A particular solution: $x_1 = 42, x_2 = 8, x_3 = x_4 = 0$

→ $x_1, x_2$만으로 해를 구한 이유: $x_3, x_4$는 $x_1, x_2$로 표현 가능(종속)

##### FACT

$A\vec{x} = \vec{b}$ 이고, $\vec{x_p}$가 particualr solution 일 때

⇒ Any solution of this $\vec{x_s}$ can be written as $\vec{x_s}=\vec{x_p}+\vec{x_h}$, where $\vec{x_h}$ is a solution of homogeneous equation $A \vec{x}=\vec{0}$

**[proof]**

$A\vec{x_s}=\vec{b}, A\vec{x_p}=\vec{b}$ 이므로 $A(\vec{x_s}-\vec{x_p})=\vec{0}$

$\vec{x_h}:=\vec{x_s}-\vec{x_p}$ is a solution of $A(\vec{x_s}-\vec{x_p})=\vec{0}$.

$\therefore \vec{x_h}=\vec{x_p}+\vec{x_s}$

##### example

$$
x_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} +x_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix} +x_3 \begin{pmatrix} 8 \\ 2 \end{pmatrix} +x_4 \begin{pmatrix} -4 \\ 12 \end{pmatrix}=\begin{pmatrix} 42 \\ 8 \end{pmatrix}
$$

$x_1 = 42, x_2 = 8, x_3 = x_4 = 0$

$\vec{x_p}=(42\;\;8\;\;0\;\;0)^T$

$$
x_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} +x_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix} +x_3 \begin{pmatrix} 8 \\ 2 \end{pmatrix} +x_4 \begin{pmatrix} -4 \\ 12 \end{pmatrix}=\begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$

을 만족하는 해는

$$
x_1 \begin{pmatrix} 1 \\ 0 \end{pmatrix} +x_2 \begin{pmatrix} 0 \\ 1 \end{pmatrix} +x_3 (8x_1 + 2x_2) +x_4 ( -4 x_1 + 12 x_2)=\begin{pmatrix} 0 \\ 0 \end{pmatrix}
$$

를 만족하는 해를 구하면 얻을 수 있음

$x_4 = 0$ 일 때 $x_3=-1$이면, $x_1=8, x_2=2$

$x_3=0$ 일 때 $x_4=-1$이면, $x_1=-4, x_2=12$

즉, $\vec{x_h}=\lambda_1(8\;\;2\;\;-1\;\;0)^T \;+\;\lambda_2(-4\;\;12\;\;0\;\;-1)^T$  for $\lambda_1, \lambda_2\in\mathbb{R}$



### Elementary transformation

- Exchange two rows
- Multiplication of a row wiath a constant
- Addition of two rows

##### example

$$
\left\{\begin{aligned}-2x_1 + 4x_2 - 2x_3 - 4x_4 + 4x_5 &= -3 \\4x_1 - 8x_2 + 3x_3 - 3x_4 +\;\ x_5 &= 2 \\x_1 - 2x_2 +\;\ x_3 -\;\, x_4 +\;\ x_5 &= 0 \\x_1 - 2x_2 \quad\quad\;\;\, - 3x_4 + 4x_5 &= a\end{aligned}\right.
$$

$$
\Longrightarrow \quad\begin{aligned}x_1 - 2x_2 + x_3 - x_4 +\;\ x_5 &= 0 \\\quad\quad\quad x_3 - x_4 + 3x_5 &= -2 \\\quad\quad\quad\quad\quad\quad x_4 - 2x_5 &= 1 \\0 &= a + 1\end{aligned}
$$

Particular solution

$$
 
\begin{aligned}a=-1.\quad&\text{Set } x_5 = 0, \quad x_4 = 1 \\&\Rightarrow\ x_3 = -1 \\&\text{Set } x_2 = 0, \quad x_1 = 2 \end{aligned} \qquad\Longrightarrow\quad\text{particular sol. } = \begin{bmatrix}2 \\ 0 \\ -1 \\ 1 \\ 0\end{bmatrix}
$$

General solution

$$
\begin{aligned} x_1 - 2&x_2 = 0 \\&x_1 = 2x_2, \\\text{Let }\quad & x_2 = \lambda_1\\ \Rightarrow\; & x_1 = 2\lambda_1 \end{aligned} \quad\implies\quad\! \lambda_1 \begin{bmatrix} 2 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}
$$

$$
\begin{aligned}&\text{Set }\; x_5 = \lambda_2, \ x_2 = 0 \end{aligned} \quad\implies\quad\! \lambda_2 \begin{bmatrix} 2 \\ 0 \\ -1 \\ 2 \\ 1 \end{bmatrix}\;\;\;\;
$$

$$
\text{The general sol.} = \left\{ \vec{x} \in \mathbb{R}^5 \; \middle| \; \vec{x} = \begin{pmatrix} 2 \\ 0 \\ -1 \\ 1 \\ 0 \end{pmatrix} + \lambda_1 \begin{pmatrix} 2 \\ 1 \\ 0 \\ 0 \\ 0 \end{pmatrix} + \lambda_2 \begin{pmatrix} 2 \\ 0 \\ -1 \\ 2 \\ 1 \end{pmatrix}, \; \lambda_1, \lambda_2 \in \mathbb{R} \right\}
$$

#### REF(Row-Echelon Form)

- Pivot: the leading coefficient of a row
- Basic variable: REF matrix A의 pivot 행과 연산되는 variable (in x)
- Free variable: non-pivot 행과 연산되는 variable

##### example

$$
\begin{aligned}
&\left[\begin{array}{ccccc|c}  1 & -2 & 1 & -1 & 1 & 0 \\  0 & 0 & 1 & -1 & 3 & -2 \\  0 & 0 & 0 & 1 & -2 & 1 \\  0 & 0 & 0 & 0 & 0 & 0\end{array}\right]\\& \qquad\qquad\qquad\qquad\qquad P_1 \qquad\;\; P_2\quad P_3 \qquad\;   \qquad\qquad \leftarrow \text{Pivot Columns}
\and{aligned}
$$

$$
\lambda_1 P_1 + \lambda_2 P_2 + \lambda_3 P_3 = \vec{b} \;\;\iff\; \begin{pmatrix} | & | & | \\ P_1 & P_2 & P_3 \\ | & | & | \end{pmatrix} \begin{pmatrix} \lambda_1 \\ \lambda_2 \\ \lambda_3 \end{pmatrix} = \vec{b}
$$

$$
\begin{pmatrix}1 & 1 & -1 \\0 & 1 & -1 \\0 & 0 & 1 \\0 & 0 & 0\end{pmatrix}\begin{pmatrix} \lambda_1 \\ \lambda_2 \\ \lambda_3 \end{pmatrix}=\begin{pmatrix} 0 \\ -2 \\ 1 \\ 0 \end{pmatrix}\quad \Longrightarrow \quad\lambda_1 = 2, \;\; \lambda_2 = -1,\;\; \lambda_3 = 1
$$

(all-zero row는 생략 가능)

#### RREF(Reduced REF)

- REF
- Every pivot = 1
- Pivot is the only nonzero entry in its column

Guassian Elimination: Linear system ⇒ RREF

##### example

$$
\begin{bmatrix}1 & 3 & 0 & 0 & 3 \\0 & 0 & 1 & 0 & 9 \\0 & 0 & 0 & 1 & -4\end{bmatrix}\begin{pmatrix}x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5\end{pmatrix}= 0 \quad (\text{Reduced REF})
$$

$$
x_1 \underset{=\ C_1}{\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}} +x_2 \underset{=\ C_2}{\begin{pmatrix} 3 \\ 0 \\ 0 \end{pmatrix}} +x_3 \underset{=\ C_3}{\begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}} +x_4 \underset{=\ C_4}{\begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}} +x_5 \underset{=\ C_5}{\begin{pmatrix} 3 \\ 9 \\ -4 \end{pmatrix}}= \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}
$$

Pivot columns: $\{C_1, C_3, C_4\}$

Non-pivot columns: $\{C_2, C_5\}$

Non-pivot columns can be expressed as linear combinations of pivot columns

$$
C_2 = 3C_1, \quad C_5 = 3C_1 + 9C_3 - 4C_4
$$

$$
\begin{aligned} & \text{(i)} C_2 = 3C_1
\\ &\quad
\begin{pmatrix} C_1 & C_2 & \dots & C_5 \end{pmatrix}\begin{pmatrix} 3 \\ -1 \\ 0 \\ 0 \\ 0 \end{pmatrix}= 3C_1 - C_2 = \vec{0}& \implies
\lambda_1 \begin{pmatrix} 3 \\ -1 \\ 0 \\ 0 \\ 0 \end{pmatrix}
\\ \
\\ &

\text{(ii)} C_5 = 3C_1 + 9C_3 - 4C_4 \; (3C_1 + 9C_3 - 4C_4 - C_5 = 0)

\\ &\quad

\begin{pmatrix} C_1 & C_2 & \dots & C_5 \end{pmatrix}
\begin{pmatrix} 3 \\ 0 \\ 9 \\ -4 \\ -1 \end{pmatrix}
= 0
& \implies
\lambda_2 \begin{pmatrix} 3 \\ 0 \\ 9 \\ -4 \\ -1 \end{pmatrix}
\end{aligned}
$$

$$
\text{The general sol.} = \left\{ \vec{x} \in \mathbb{R}^5 \; \middle| \; \vec{x} = \lambda_1 \begin{pmatrix} 3 \\ -1 \\ 0 \\ 0 \\ 0 \end{pmatrix} + \lambda_2 \begin{pmatrix} 3 \\ 0 \\ 9 \\ -4 \\ -1 \end{pmatrix}, \; \lambda_1, \lambda_2 \in \mathbb{R} \right\}
$$

#### Minus-1 Trick

Get general solutions for $A\vec{x} = \vec{0}$.

$$
\begin{array}{c}
A\vec{x} = \vec{0}, \quad A = \begin{bmatrix}1 & 3 & 0 & 0 & 3 \\0 & 0 & 1 & 0 & 9 \\0 & 0 & 0 & 1 & -4\end{bmatrix}
\\\Downarrow\\
\tilde{A} =\begin{bmatrix}1 & 3 & 0 & 0 & 3 \\0 & \color{red}{-1} & 0 & 0 & 0 \\0 & 0 & 1 & 0 & 9 \\0 & 0 & 0 & 1 & -4 \\0 & 0 & 0 & 0 & \color{red}{-1}\end{bmatrix}\\ \qquad\qquad\! \downarrow \qquad\qquad\;\;\; \downarrow\\ \qquad\!\qquad \lambda_1 \qquad\qquad \lambda_2
\end{array}
$$

$$
\vec{x} = \lambda_1 \begin{pmatrix} 3 \\ -1 \\ 0 \\ 0 \\ 0 \end{pmatrix} + \lambda_2 \begin{pmatrix} 3 \\ 0 \\ 9 \\ -4 \\ -1 \end{pmatrix}
$$

#### Calculating the inverse

$$
AX = I_n \iff X = A^{-1}
\\
X = \begin{bmatrix} | & | & & | \\ \vec{x}_1 & \vec{x}_2 & \cdots & \vec{x}_n \\ | & | & & | \end{bmatrix}
$$

$$
AX = [A] \begin{bmatrix} | & | & & | \\ \vec{x}_1 & \vec{x}_2 & \cdots & \vec{x}_n \\ | & | & & | \end{bmatrix} = \begin{bmatrix} | & | & & | \\ A\vec{x}_1 & A\vec{x}_2 & \cdots & A\vec{x}_n \\ | & | & & | \end{bmatrix}= \begin{bmatrix} 1 & & 0 \\ & \ddots & \\ 0 & & 1 \end{bmatrix}
\\
\iff A\vec{x}_1 = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \dots, \quad A\vec{x}_n = \begin{bmatrix} 0 \\ \vdots \\ 0 \\ 1 \end{bmatrix}
$$

$$
\begin{align*}
A\vec{x}_j & = \vec{e}_j = 
\begin{bmatrix} 
0 \\ \vdots \\ 1 \\ \vdots \\ 0 
\end{bmatrix} 
\leftarrow j\text{-th}

\\ \text{Gaussian Elimination} \;\;
\Downarrow \;\; &
\\

R\vec{x}_j & = \vec{b}_j  
\quad (R : \text{Reduced-REF})
\end{align*}
$$

$R={\rm RREF}(A)$를 구하는 과정에서 $b$가 변하기는 하지만, $b$는 $R$을 구하는 데 영향을 주지 않음

$$
[A|\vec{e}_j] \implies [R|\vec{b}_j] \qquad \text{for all }j
$$

모든 $j$에 대하여 $R$은 동일함

$$
\begin{align*}
\therefore\ [A|\vec{e}_1 \cdots \vec{e}_n]=[A|I_n] \implies & [R|\vec{b}_1\cdots \vec{b}_n] 
\\ & = [I_n|A^{-1}]\qquad \text{if }\exist A^{-1}
\end{align*}
$$

### Solving a system of linear eqs

$A$: $(n\times n)$ invertible matrix

$A\vec{x} = \vec{b} \quad\implies\quad \vec{x} = A^{-1}\vec{b}$

$A$: $(n\times k)$ non-square matrix

if $n<k$ (i.e. #eqs < #unknowns)

$$
\begin{bmatrix}
 \quad A\quad 
\end{bmatrix}
\begin{bmatrix} \ \\
\vec{x}\\ \
\end{bmatrix} 
=
\begin{bmatrix}
 \vec{b}
\end{bmatrix}
$$

⇒ underdefined: non unique solution ($\infty$-many sol) or not

if $n>k$ (i.e. #eqs > #unknowns)

$$
\begin{bmatrix}\ \\
 \;\; A\;\;   \\ \
\end{bmatrix}
\begin{bmatrix} 
\vec{x}
\end{bmatrix} 
=
\begin{bmatrix} \ \\
 \vec{b} \\ \
\end{bmatrix}
$$

⇒ overdefined: no solution, unique solution, or $\infty$-many sol

Random하게 생성한 $A$가 invertible일 확률은 매우 낮음

→ 역행렬을 구하지 않고 $\vec{x}$를 구해야 함

##### Idea (least square solution)

$$
A^T A = 
\begin{bmatrix} \quad\;
A^T \quad\,
\end{bmatrix}
\begin{bmatrix}\ \\
 \;\; A\;\;   \\ \
\end{bmatrix}
=
\begin{bmatrix} \,
A^T A \;
\end{bmatrix}
$$

$$
A\vec{x} = \vec{b} \quad \implies \;\; A^T\!A\ \vec{x} = A^T\ \vec{b}
$$

$$
\vec{x} = (A^T\!A)^{-1}A^T\ \vec{b} \qquad\text{if } A^T\!A\text{: invertible}
$$

물론, invertible하지 않을 경우 다른 방법으로 구해야 함 (근사적인 방법으로 구할 수 있는지 검토)

##### Tools

- Gaussian elimination
- Jacobi iteration *(iteration method)*
- Gauss-Seidel method *(iteration method)*
- Conjugate gradient method *(iteration method)*



### Vector Space

Group → Ring → Field

#### Group

$G:=({\cal G},\oplus)$ is a group if $\oplus:{\cal G}\times {\cal G}\to {\cal G}$ where $g$ is set and $\oplus$ is operation

1. closed: $x,y\in {\cal G} \implies x\oplus y\in {\cal G}$
2. associativity: $(x\oplus y)\oplus z = x\oplus(y\oplus z)$
3. identity (neutral elemenet): $e\in {\cal G}$  s.t.  $x\oplus e = e\oplus x,\quad\forall x\in{\cal G}$
4. inverse element: for any $x\in{\cal G},\ \exists y\in{\cal G}$  s.t.  $x\oplus y = y\oplus x = e$

##### example

- $(\mathbb{Z}, +)$: Abelian group ($x+y = y+ x,\quad\forall x,y\in \mathbb{Z}$)
- $GL(n,\mathbb{R})$: general linear group consist $n\times n$ invertible matrices with matrix multiplication

#### Vector Space

$\mathcal{V}:=(V, +, \cdot)$ : real or complex-valued vector space over $\mathbb{R}$ or $\mathbb{C}$

- vector addition:  $+: V+V\to V\ ;\ \vec{x}+\vec{y}\mapsto\vec{x}+\vec{y}\in V$
- scalar multiplication:  $\cdot:\mathbb{R}\times V\to V\ ;\ \alpha\cdot\vec{v}\mapsto \alpha\vec{v},\quad\alpha\in\mathbb{R}$

##### example

$(V, +)$ : Abelian group

- distributive law: $\lambda \cdot (\vec{x} + \vec{y}) = \lambda \vec{x} + \lambda \vec{y} ,\quad (\lambda + \mu) \cdot \vec{x} = \lambda \cdot \vec{x} + \mu \cdot \vec{x}$
- associativity: $(\lambda \mu)\vec{x} = \lambda (\mu \vec{x})$
- neutral element: $1 \cdot \vec{x} = \vec{x}, \quad \forall \vec{x} \in V$

$V := \mathbb{R}^n$ : vector

$V := \mathbb{R}^{n \times n}$ : matrix (w/o matrix multiplication)

#### Subspace

$V$ : Vector space
$U := (U, +, \cdot)$ is called a subspace of $V$ 
if $U \subseteq V$ and $U \neq \emptyset$  (as a set) closed under the operations i.e.

$\lambda\vec{x} \in U$  for all  $\vec{x} \in U$  and  $\lambda \in \mathbb{R}$

$\vec{x}+\vec{y}\in U$  for any  $\vec{x},\vec{y}\in U$

##### example

$$
\vec{x} \in U \implies A(\lambda \vec{x}) = \lambda (A\vec{x}) = \lambda \vec{0} = \vec{0}
$$

$U=\{\vec{x}\in\mathbb{R}^n\ \mid \ A\vec{x}=\vec{0}$, for some $A\in\mathbb{R}^{n\times n}\}$: null-space

⇒ 즉, $\lambda\vec{x}\in U$

$$
\vec{x},\vec{y} \in U \implies A(\vec{x}+ \vec{y}) = A\vec{x} + A\vec{y} = \vec{0}+\vec{0} = \vec{0}
$$

⇒ 즉, $\vec{x}+ \vec{y}\in U$

##### Definition

$$
x_1, x_2, \dots, x_k \in V, \quad \lambda_1, \dots, \lambda_k \in \mathbb{R} \\\implies \vec{v} = \lambda_1 \vec{x}_1 + \dots + \lambda_k \vec{x}_k \;\text{ is called a linear combination of }\; \vec{x}_1, \dots, \vec{x}_k.
$$

##### Definition

For  ${x_1, \dots, x_k} \in V$ ,

- linearly dependent if $\exists$non-trivial linear combination s.t. $\lambda_1 \vec{x}_1 + \dots + \lambda_k \vec{x}_k = \vec{0}$
- linearly independent : if $\lambda_1 \vec{x}_1 + \dots + \lambda_k \vec{x}_k = \vec{0} \quad \implies \quad \lambda_1 = \dots = \lambda_k = 0$
- 이 외의 경우는 존재하지 않음

##### Remark

1. $\{ \vec{x}_1, \vec{x}_2,\ ...\,,\ \vec{x}_k \}$ are linearly dependent $\Leftrightarrow$  (at least) one of them is a linear combination of the others
    
    $$
    \underline{\lambda_1} \vec{x}_1 + \dots + \underset{\neq 0}{\underline{\lambda_k} } \vec{x}_k = \vec{0} \quad \implies \quad \vec{x}_k = \frac{1}{\lambda_k} (\ \cdots )
    $$
    
2. In Gaussian elimination (until in REF)
    1. Pivot columns are linearly independent
        
        $$
        \begin{array}{c}
        \begin{cases}\begin{aligned}-2x_1 + 4x_2 - 2x_3 \;&-\;\ x_4 + 4x_5 = -3 \\4x_1 - 8x_2 + 3x_3 \;&- 3x_4 +\;\ x_5 = 2 \\x_1 - 2x_2 +\;\ x_3 \;&-\;\ x_4 + \;\ x_5 = 0 \\x_1 - 2x_2 \quad \quad\;\;\, \;&- 3x_4 + 4x_5 = -1\end{aligned}\end{cases}\\[1em]\Bigg\Downarrow \quad \text{Gaussian elimination}\\[1em]
        \left[
        \begin{array}{ccccc|c}
        \color{red}1 & -2 & 1 & -1 & 1 & 0 \\
        0 & 0 & \color{red}1 & -1 & 3 & -2 \\
        0 & 0 & 0 & \color{red}1 & -2 & 1 \\
        0 & 0 & 0 & 0 & 0 & 0
        \end{array}
        \right]
        \\[0.5em]
        \text{Pivot columns } \begin{bmatrix} \color{red}1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 1 \\ \color{red}1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} -1 \\ -1 \\ \color{red}1 \\ 0 \end{bmatrix} 
        \text{ are linearly independent.}
        \end{array}
        $$
        

#### Span

Let $V=({\cal V},+,\cdot)$ be a vector space.

$\mathcal{A}:=\{\vec{x}_1, ...,\vec{x}_k\}\subseteq V$ is a generating set of $V$ if every $\vec{v}\in V$ can be expressed as a linear combination of vectors in $\cal A$

##### example

$$
\mathcal{A} := \{ (1,0), (0,1) \} \subseteq \mathbb{R}^2
$$

The set of all linear combinations of vectors in $\mathcal{A}$ is called the span of $\mathcal{A}$.

$$
\text{span}\langle \vec{x}_1, \dots, \vec{x}_k \rangle \quad \text{or} \quad \langle \vec{x}_1, \dots, \vec{x}_k \rangle
$$

$\mathcal{A}$ is a basis of $V$ if $\mathcal{A}$ spans $V$ (i.e. generating set of $V$) and there exists **no** smaller set $\widetilde{\mathcal{A}} (\subsetneq \mathcal{A} \subseteq V)$  that spans $V$.

$\cal A$: basis of $V \iff \cal A$: minimally spans $V$.

##### Theorem

Let $V = (V, +, \cdot)$ be a vector space and $\mathcal{B} \subseteq V\ (\mathcal{B} \neq \emptyset)$ be a set.
TFAE (The Following Are Equivalent)

1. $\mathcal{B}$ is a basis of $V$.
2. $\mathcal{B}$ is a **minimal generating** set.
3. $\mathcal{B}$ is a maximal linearly independent set of $V$.
4. For every $\vec{x} \in V$, $\vec{x}$  is a linear combination of vectors in $\mathcal{B}$ and it is unique.

#### Rank

The number of basis vectors of $V$ is called $\dim(V)$.

$A \in \mathbb{R}^{m \times n}$:  matrix

##### Definition

$\text{rank}(A) = \text{rk}(A)$ : the rank of $A$ is the number of linearly independent columns.

##### Remark

1. Transpose $\text{rank}(A) = \text{rank}(A^T)$
2. Let $A = [ \vec{c}_1 \; \vec{c}_2 \; \dots \; \vec{c}_n ]$
    
    The columns of $A$ span a subspace $\mathcal{U} \subseteq \mathbb{R}^m$
    
    $\dim(\mathcal{U}) = \text{rank}(A) = \text{span}\langle \vec{c}_1, \dots, \vec{c}_n \rangle$ ( $\mathcal{U}$: image or range)
    
3. The rows of $A$ span a subspace $W \subseteq \mathbb{R}^n$ with $\dim(W) = \text{rank}(A)$.
4. $A\vec{x} = \vec{b}$  can be solved iff $\text{rank}(A) = \text{rank}[A\mid\vec{b}]$
    
    i.e., $\vec{b}$ is linearly dependent on columns of $A$.
    
5. The subspace of solution of $A\vec{x} = \vec{0}$ has dimension $\color{red} n-\text{rank}(A)$.
    
    ; pivot이 없는 column들로 $A\vec{x} = \vec{0}$의 해를 구할 수 있음 (minus-1 trick)
    
    $\iff$전체 행의 수 - pivot columns의 수
    
6. $A \in \mathbb{R}^{m \times n}$ has full-rank if $\text{rank}(A)=\min(m,n)$.




### Linear mappings

$V, W$ : vector spaces, $\Phi : V \to W$ : linear mapping if 

$$
\Phi(\alpha \vec{x} + \beta \vec{y}) = \alpha \Phi(\vec{x}) + \beta \Phi(\vec{y}) \;\text{for all}\; \vec{x}, \vec{y} \in V \text{ and } \alpha, \beta \in \mathbb{R}.
$$

$\Phi : V \to W$ is

1. injective if $\Phi(\vec{x}) = \Phi(\vec{y}) \implies \vec{x} = \vec{y}$
2. surjective if $\Phi(V) = W$
3. bijective if  1. & 2.

##### Remark

1. Isomorphism if $\Phi:V\to W$ is bijection.
2. Endomorphism if $\Phi:V\to V$
3. Automorphism if $\Phi:V\to V$ is isomorphism

##### Theorem

Finite-dimensional vector spaces $V$ and $W$ are isomorphic if and only if $\dim V = \dim W$.

※ 차원이 같으면 isomorphic. 차원을 결정하면 vector space가 결정됨.

#### Matrix

$\{\vec{b}_1, ... , \vec{b}_n\}$: basis of $n$-dim vector space $V$.

- $B:=(\vec{b}_1, ... , \vec{b}_n)$: ordered basis
- $B:=[{b}_1 \ ...  \ {b}_n]$ : matrix whose columns are $\vec{b}_1, ... , \vec{b}_n$.

##### Definition

$V$: vector space of dim $n$.

$B=(\vec{b}_1, ... , \vec{b}_n)$ ordered basis of $V$.

For any $\vec{x}\in V$, we have a unique representation $\vec x = \alpha_1\vec{b}_1 + \cdots+ \alpha_n\vec{b}_n$ , $\alpha_1,...,\alpha_n$ are coordinates of $\vec x$ w.r.t. (with respect to) $B$.

$$
\vec{\alpha}=\begin{pmatrix}
\alpha_1\\ \vdots \\ \alpha_n
\end{pmatrix}
\text{ is the coordinate vector of }
\vec{x} \text{ w.r.t. } B.
$$

##### example

standard basis : $\vec e_1=(1,0), \vec e_2=(0,1) , B=(\vec e_1, \vec e_2)$.

$B=(\vec e_1, \vec e_2)$ : ordered basis of $\mathbb{R}^2$.

$\vec x = (2,3) = 2\vec e_1+3\vec e_2$,  $\vec x =\begin{pmatrix}
2 \\ 3
\end{pmatrix}$ w.r.t. $B$.

another basis : $\vec b_1 = (1,-1), \vec b_2 = (1,1), \tilde{B}=(\vec b_1, \vec b_2)$.

$\vec x = (2,3) = -\dfrac{1}{2}\vec b_1 + \dfrac{5}{2}\vec b_2$,  $\vec x =\begin{pmatrix}
-1/2 \\ 5/2
\end{pmatrix}$ w.r.t. $\tilde{B}$.

⇒ $\vec x =\begin{pmatrix}
2 \\ 3
\end{pmatrix}(\text{w.r.t. }B)=\begin{pmatrix}
-1/2 \\ 5/2
\end{pmatrix}(\text{w.r.t.} \tilde{B})$

#### Linear Map $\leftrightarrow$ Matrix

$V\cdots B=(\vec b_1, ...,\vec b_n)$ ; $\vec v=x_1 \vec b_1+\cdots +x_n\vec b_n$.

$W\cdots C=(\vec c_1, ..., \vec c_m)$ ; $\vec w = y_1\vec c_1+\cdots +y_m\vec c_m$.

$\Phi:V\to W$  ; basis가 어떻게 변환되는지 알면 다른 벡터는 변환한 basis로 표현 가능

$\Phi$가 linear map이기 때문에 가능

For all  $j=1,...,n$,  $\Phi(\vec b_j)=\alpha_{1j}\vec c_1 +\cdots+ \alpha_{mj}\vec c_m = \sum_{i=1}^m \alpha_{ij}\vec c_i \in W$

Let $A_\Phi (i,j)=(\alpha_{ij})$ be a transformation matrix of $\Phi$.

$$
\begin{aligned}
\hat{x} &:= (x_1, \dots, x_n) \quad : \text{coordinate vector of } \vec x \in V \text{ w.r.t. } B. \\
&= x_1 \vec{b}1 + \dots + x_n \vec{b}n = \sum{j=1}^n x_j b_j
\end{aligned}
$$

$$
\begin{aligned}
\hat{y} &= (y_1, \dots, y_m) \quad : \text{coordinate vector of } \vec y \in W \text{ w.r.t. } C \\
&= \sum{i=1}^m y_i c_i
\end{aligned}
$$

$$
\begin{aligned}
\Phi(\vec{x}) &= \vec{y} \quad &\Longrightarrow \quad \hat{y} =& A_\Phi \hat{x}\\[-.5em]
\vdots\;\ & \quad\;\vdots && (\alpha_{ij})\\[-.5em]
\hat{x}\;\,&\quad\;\hat{y}&\\
B\;\ & \quad\ C
\end{aligned}
$$

$$
\left\{
\begin{aligned}
\vec{b}_1 &\,\xrightarrow{\Phi\,}\; \alpha_{11} \vec{c}_1 + \dots + \alpha_{m1} \vec{c}_m \\
\vec{b}_2 &\,\xrightarrow{\Phi\,}\; \alpha_{12} \vec{c}_1 + \dots + \alpha_{m2} \vec{c}_m \\
&\quad\vdots \\[.7em]
\vec{b}_n &\,\xrightarrow{\Phi\,}\; \alpha_{1n} \vec{c}_1 + \dots + \alpha_{mn} \vec{c}_m
\end{aligned}
\right.
$$

$$
\begin{aligned}
\Phi(x_1 \vec{b}_1 + \dots + x_n \vec{b}_n) &= x_1 \Phi(\vec{b}_1) + \dots + x_n \Phi(\vec{b}_n) \\
&= x_1 \begin{pmatrix} \alpha_{11} \\ \vdots \\ \alpha_{m1} \end{pmatrix} + x_2 \begin{pmatrix} \alpha_{12} \\ \vdots \\ \alpha_{m2} \end{pmatrix} + \dots + x_n \begin{pmatrix} \alpha_{1n} \\ \vdots \\ \alpha_{mn} \end{pmatrix} \\
&= \begin{pmatrix} \alpha_{11} & \alpha_{12} & \dots & \alpha_{1n} \\ \vdots & \vdots & \ddots & \vdots \\ \alpha_{m1} & \alpha_{m2} & \dots & \alpha_{mn} \end{pmatrix} \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}
\end{aligned}
$$

즉, linear map에 의한 basis 변환은 행렬 연산으로 표현할 수 있음

$\begin{pmatrix} \alpha_{11} \; \cdots  \;\alpha_{m1} \end{pmatrix}$: $\vec b_1$을 $C$ 좌표계로 표현한 것

즉, matrix $A$는 $B$의 기저 벡터에 대한 $C$ 좌표계로의 표현을 행으로 가지는 행렬

⇒ coordinate vector의 계수인 $x_i$가 coordinate의 변환 시 함께 따라가도록 함

#### example

 

$$
\begin{aligned}
& V = \mathbb{R}^2 &
& W = \mathbb{R}^2\\
& B = ( \underbrace{(1,1)}_{\vec{b}_1}, \underbrace{(1,-1)}_{\vec{b}_2} ) &
&C = ( \vec{e}_1, \vec{e}_2 )
\end{aligned}\\[1em]
\left\{
\begin{aligned}
\vec{b}_1 &\xrightarrow{\Phi}\ \vec{e}_1 + \vec{e}_2 \quad (1,1) \\
\vec{b}_2 &\xrightarrow{\Phi}\ \vec{e}_1 - \vec{e}_2 \quad (1,-1)
\end{aligned}
\right.\implies
A_\Phi = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}
$$

$$
\hat{x} = (1, 2)_B = 1 \cdot \underbrace{\begin{pmatrix} 1 \\ 1 \end{pmatrix}}_{\vec{b}_1} + 2 \cdot \underbrace{\begin{pmatrix} 1 \\ -1 \end{pmatrix}}_{\vec{b}_2}=\underbrace{\begin{pmatrix} 3 \\ -1 \end{pmatrix}}_{\text{w.r.t. }(\vec e_1, \vec{e}_2)}
$$

$$
\begin{aligned}
\hat{y} &= A_\Phi \hat{x}\\
& = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} \begin{pmatrix} 1 \\ 2 \end{pmatrix}_B\\
& = \begin{pmatrix} 3 \\ -1 \end{pmatrix}_C
\end{aligned}
$$

#### Basis Change: Coordinate Change

$\Phi : V \longrightarrow W$

$$
\left\{
\begin{aligned}
B &= (b_1, \dots, b_n), \quad \tilde{B} = (\tilde{b}_1, \dots, \tilde{b}_n) \quad\; : \text{bases of } V \\
C &= (c_1, \dots, c_m), \quad \tilde{C} = (\tilde{c}_1, \dots, \tilde{c}_m) \quad : \text{bases of } W
\end{aligned}
\right.
$$

$A_\Phi$: transformation matrix of $\Phi$ w.r.t. $B$ and $C$ ; $\Phi_{[CB]}:V_{[B]}\to W_{[C]}$

$\tilde{A}\_\Phi$: transformation matrix of $\Phi$ w.r.t. $\tilde{B}$ and $\tilde{C}$ ; $\Phi_{[\tilde C\tilde B]}:V\_{[\tilde B]}\to W\_{[\tilde C]}$

$S:\tilde{B}\to B$

$$
\left\{
\begin{aligned}
\tilde{b}_1 &= s_{11}b_1 + \dots + s_{n1}b_n = \sum_{i=1}^n s_{i1}b_i \\[-1em]
&\;\vdots \\[-1em]
\tilde{b}_j &= s_{1j}b_1 + \dots + s_{nj}b_n = \sum_{i=1}^n s_{ij}b_i \\[-1em]
&\;\vdots \\[-1em]
\tilde{b}_n &= s_{1n}b_1 + \dots + s_{nn}b_n = \sum_{i=1}^n s_{in}b_i
\end{aligned}
\right.
$$

$$
S = (S_{ij}) = \begin{bmatrix} s_{11} & s_{12} & \dots & s_{1n} \\ \vdots & \vdots & \ddots & \vdots \\ s_{n1} & s_{n2} & \dots & s_{nn} \end{bmatrix}_{[B]}
= \begin{bmatrix} | & | & & | \\[.3em] \tilde b_{1} & \tilde b_{2} & \dots & \tilde b_{n} \\ | & | & & |  \end{bmatrix}_{[B]}
$$

$T:\tilde{C}\to C$

$$
\left\{
\begin{aligned}
\tilde{c}_1 &= t_{11}c_1 + \dots + t_{m1}c_m = \sum_{i=1}^m c_{i1}t_i \\[-1em]
&\;\vdots \\[-1em]
\tilde{c}_j &= t_{1j}c_1 + \dots + t_{mj}c_m = \sum_{i=1}^m t_{ij}c_i \\[-1em]
&\;\vdots \\[-1em]
\tilde{c}_m &= t_{1m}c_1 + \dots + t_{mm}c_m = \sum_{i=1}^m t_{im}c_i
\end{aligned}
\right.
$$

$$
T = (T_{ij}) = \begin{bmatrix} t_{11} & t_{12} & \dots & t_{1m} \\ \vdots & \vdots & \ddots & \vdots \\ t_{m1} & t_{m2} & \dots & t_{mm} \end{bmatrix}_{[C]}
= \begin{bmatrix} | & | & & | \\[.3em] \tilde c_{1} & \tilde c_{2} & \dots & \tilde c_{m} \\ | & | & & |  \end{bmatrix}_{[C]}
$$

##### $\implies {\tilde{A}\_\Phi}\_{[\tilde{C}\tilde{B}]} = (T^{-1})\_{[\tilde{C}C]} {A\_\Phi}\_{[{C}{B}]} S\_{[B\tilde{B}]}$

$$
\begin{aligned}
A_\Phi (x_{[B]}) &= \begin{bmatrix}
| & | & & | \\[.2em]
\Phi(b_1) & \Phi(b_2) & \cdots & \Phi(b_n) \\
| & | & & | 
\end{bmatrix}_{[CB]}
\begin{pmatrix}
x_1\\ x_2\\ \vdots\\ c_n 
\end{pmatrix}
\\[3em] &
=
x_1\Phi(b_1) + x_2\Phi(b_2) +\cdots + x_n\Phi(b_n) 
\\[.5em] &=
\Phi(x_1 b_1 + x_2 b_2 +\cdots + x_n b_n) 
\end{aligned}
$$

Goal.

$$
\tilde{A}_\Phi = \begin{bmatrix}
| & | & & | \\[.2em]
\Phi(\tilde b_1) & \Phi(\tilde b_2) & & \Phi(\tilde b_n) \\
| & | & & | 
\end{bmatrix}_{[\tilde{C}\tilde{B}]} 

= (\tilde{a}_{ij})_{\tilde{C}\tilde{B}}
$$

1. $[\tilde{C}\tilde{B}]\to [C\tilde{B}]$

$$
\begin{aligned}
\Phi(\tilde{b}_j) &= \sum_{k=1}^m \tilde{a}_{kj} \tilde{c}_k \\
&= \sum_{k=1}^m \tilde{a}_{kj} \sum_{l=1}^m t_{lk} c_l \\
&= \sum_{l=1}^m \left( \sum_{k=1}^m t_{lk} \tilde{a}_{kj} \right) c_l &(c_l\text{: basis of }\Phi(*))\\
&= \sum_{l=1}^m T\tilde{A}_\Phi c_l &(T\tilde{A}_\Phi\text{ w.r.t. }C\tilde{B})\\
T\tilde{A}_\Phi 
&={A_\Phi}_{[C\tilde{B}]}&(\text{transf.\; w.r.t. }C \& \tilde{B})
\end{aligned}
$$

1. $[C\tilde{B}]\to [CB]$

$$
\begin{aligned}
\Phi(\tilde{b}_j) &= \Phi \left( \sum_{i=1}^n s_{ij} b_i \right) = \sum_{i=1}^n s_{ij} \Phi(b_i) \\
&= \sum_{i=1}^n s_{ij} \left(\sum_{l=1}^m a_{li} c_l\right)\\
&= \sum_{l=1}^m \left( \sum_{i=1}^n a_{li}s_{ij} \right) c_l &({A}_\Phi S\text{ w.r.t. }C\tilde{B})
\end{aligned}
$$

1. $\tilde{A}\_\Phi = T^{-1}A\_\Phi S$

$$
\begin{aligned}
A_\Phi S &\;\;=\;\; A_{\Phi_{C\tilde{B}}} =&& T \tilde{A}_\Phi\\
|\;&&& |\\
(\tilde{B} \rightarrow B) &&&(\tilde{C} \rightarrow C)
\end{aligned}
$$

<br>

$$
\begin{aligned}
T^{-1}A_\Phi S &\quad=&& \tilde{A}_\Phi\\
|\quad & && \;\;|\\
(C \rightarrow \tilde{C})\leftarrow (B\rightarrow C)\leftarrow (\tilde{B} \rightarrow B) & && (\tilde{B} \rightarrow \tilde{C})
\end{aligned}
$$

- $\tilde{A}_\Phi$ : matrix w.r.t. $\tilde{B} \& \tilde{C}$
- $A_\Phi$  : matrix w.r.t. $B \& C$

즉,

$\psi_{[B\tilde B]} : V_{[\tilde B]}\to V_{[B]}$,  $\tilde B$ : basis of $V_{[\tilde B]}$,  $B$ : basis of $V_{[B]}$

$\tilde b_j = \sum_{i=1}^n s_{ij} b_i$  for $j=1,2,\,...\,,n$ : linear combination of $\{b_1, \,...\,,b_n\}$

일 때

$$
\tilde b_j =(0\;\; ...\; \underbrace{1}_{j\text{-th}} \;...\;\; 0)^T_{[\tilde B]}
\quad \mapsto\quad (s_{1j}\; ...\; s_{ij} \; ... \; s_{nj})^T_{[B]}
$$

따라서

$$
S:= \text{mat}(\psi_{[B\tilde B]})=\begin{pmatrix}
| &  & | \\
\psi({\tilde b_1}_{[\tilde B]})_{[B]} & \cdots & \psi({\tilde b_n}_{[\tilde B]})_{[B]}\\
| &  & |
\end{pmatrix}
$$

$$
\begin{aligned}
V_{[B]} &\;\;\;\xrightarrow{\Phi_{[CB]}}_A & W_{[C]}\\
\psi_{[B\tilde B]}\uparrow\;& \\[-.7em] 
|_S\! & \qquad\angle\Phi_{[C\tilde B]}\!\!\!\!\!\!\!\!\! &\\
V_{[\tilde B]} &&
\end{aligned}
\qquad\qquad
\begin{aligned}
V_{[B]} &\;\;\;\xrightarrow{\Phi_{[CB]}}_A & W_{[C]}\qquad\\
& & \uparrow \Theta_{[C\tilde C]}\\[-.7em] 
& \Phi_{[\tilde CB]}\setminus &|_T \qquad\,\\
 &&W_{[\tilde C]}\qquad\!
\end{aligned}
$$

$$
\Phi_{[C\tilde B]}=\Phi_{[CB]}\circ\psi_{[B\tilde B]}\qquad\quad
\Phi_{[\tilde CB]}=(\Theta_{[C\tilde C]})^{-1}\circ\Phi_{[CB]}
$$

$$
\begin{aligned}
V_{[B]} &\;\;\;\xrightarrow{\Phi_{[CB]}}_A & W_{[C]}\qquad\\
\psi_{[B\tilde B]}\uparrow\;& &\uparrow \Theta_{[C\tilde C]}
$$

$$
|_S\! &  &|_T \qquad\,\\
V_{[\tilde B]} & \;\;\;\,\xrightarrow{\Phi_{[\tilde C\tilde B]}}_{\tilde A} &W_{[\tilde C]}\qquad\!
\end{aligned}
\\[1em]

\quad\tilde A=\Phi_{[\tilde C\tilde B]}=(\Theta_{[C\tilde C]})^{-1}\circ\Phi_{[CB]}\circ\psi_{[B\tilde B]}=T^{-1}\circ A\circ S
$$

Def. $A, \tilde A\in\mathbb{R}^{m\times n}$ are equivalent if $\exists$ regular matrices $S\in\mathbb{R}^{n\times n}$, $T\in\mathbb{R}^{m\times m}$ s.t. $\tilde A = T^{-1}AS$.

Def. $A, \tilde A\in\mathbb{R}^{n\times n}$ (square matrices) are similar if $\exists$ regular matrix $S\in\mathbb{R}^{n\times n}$, $T\in\mathbb{R}^{m\times m}$ s.t. $\tilde A = S^{-1}AS$.

$$
\begin{aligned}
V_{[B]} &\;\;\;\xrightarrow{\Phi_{[BB]}}_A & V_{[B]}\\
\uparrow\,\;\;& &\uparrow\;\; \\[-.7em] 
|_S\; &  &|_S \,\\
V_{[\tilde B]} & \;\;\;\,\xrightarrow{\Phi_{[\tilde B\tilde B]}}_{\tilde A} &V_{[\tilde B]}
\end{aligned}
\\[1em]
$$

- $A= \Phi_{[BB]}:V_{[B]}\to V_{[B]}$
- $\tilde A = \Phi_{[\tilde B\tilde B]}:V_{[\tilde B]}\to V_{[\tilde B]}$

### Image & Kernel

Linear Map $\Phi : V \to W$

##### **Definitions**

- Kernel:  $\ker(\Phi) := \Phi^{-1}(0_W) = \{ v \in V \mid \Phi(v) = 0_W \}$
- Image :  $\text{Im}(\Phi) := \Phi(V) = \{ w \in W \mid \exists v \in V \text{ s.t. } \Phi(v) = w \}$

##### **Remark**

1. $\ker(\Phi)$ is not empty $\quad (\because \Phi(0_V) = 0_W, \text{ i.e. } 0_V \in \ker(\Phi))$
2. $\text{Im}(\Phi)$ is a subspace of $W$
3. $\ker(\Phi)$ is a subspace of $V$
4. $\Phi$ is injective $\iff \ker(\Phi) = \{0_V\}$
    
    Definition: $\Phi(v_1) = \Phi(v_2) \implies v_1 = v_2$
    
    $$
    \Phi(v_1) = \Phi(v_2) \implies v_1 = v_2 \\ \iff \Phi(v_1 - v_2) = 0\qquad\qquad
    $$
    

#### **Column Space**

$$
A = \begin{bmatrix} a_1 & a_2 & \dots & a_n \end{bmatrix} \in \mathbb{R}^{m \times n}
$$

$$
\begin{aligned} \text{Im}(\Phi) &= \{ Ax \mid x \in \mathbb{R}^n \} \\ &= \{ x_1 \vec{a}_1 + \dots + x_n \vec{a}_n \mid x_i \in \mathbb{R} \} \\ &= \text{span} \langle \vec{a}_1, \dots, \vec{a}_n \rangle \subseteq \mathbb{R}^m \end{aligned}
$$

##### **Remark**

1. $\text{rank}(A) = \dim(\text{Im}(\Phi))$
2. $\text{null-space} : \ker(\Phi) = \{ x \mid Ax = 0 \}$

##### **example**

$$
\Phi : \mathbb{R}^4 \to \mathbb{R}^2
$$

$$
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} \longmapsto
\begin{pmatrix} 1 & 2 & -1 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix}
= x_1 \begin{pmatrix} 1 \\ 1 \end{pmatrix} + x_2 \begin{pmatrix} 2 \\ 0 \end{pmatrix} + x_3 \begin{pmatrix} -1 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} 0 \\ 1 \end{pmatrix}
$$

$$
\text{Im}(\Phi) = \text{span} \left\langle \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 2 \\ 0 \end{pmatrix}, \begin{pmatrix} -1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\rangle = \mathbb{R}^2
$$

$$
\dim(\text{Im}(\Phi)) = 2 = \text{rank}(A)
$$

$\ker(\Phi)$: Find solution space of $A\vec{x} = 0$

$$
\begin{pmatrix} 1 & 2 & -1 & 0 \\ 1 & 0 & 0 & 1 \end{pmatrix}
\xrightarrow{\quad \text{RREF} \quad}
\begin{pmatrix} 1 & 0 & 0 & 1 \\ 0 & 1 & -1/2 & -1/2 \end{pmatrix}
$$

$$
(0,-1/2.-1.0)^T, (1,-1/2,0,-1)^T\in\ker(\Phi)\\[.5em]
\text{i.e., } \ker(\Phi)=\text{span}\left< (0,-1/2.-1.0)^T, (1,-1/2,0,-1)^T \right>
$$

$$
\implies \dim(\ker\Phi) = 2
$$

##### Thm. (Rank-Nullity Theorem) Fundamental Theorem of Linear Mapping

Let $\Phi : V \to W$ be a linear mapping. Then:

$$
\dim(\ker(\Phi)) + \dim(\text{Im}(\Phi)) = \dim(V)
$$

**의미:** (커널의 차원) + (상의 차원) = (정의역의 차원)

- $\dim(\text{Im}(\Phi)) = \text{rank}$
- $\dim(\ker(\Phi)) = \text{nullity}$

##### **Remark (Consequences of Rank-Nullity)**

1. $\dim(\text{Im}(\Phi)) \le \dim(V)$
2. $\dim(\text{Im}(\Phi)) < \dim(V)$
$\implies \ker(\Phi)\text{ is nontrivial}$  $(\text{i.e. } \dim(\ker(\Phi)) > 0)$
3. Condition: $\dim(V) = \dim(W)$ (Finite Dimensional Vector Space)
    
    **TFAE** (The Following Are Equivalent):
    
    1. $\Phi$ is **injective** (1:1)
    2. $\Phi$ is **surjective** (onto)
    3. $\Phi$ is **bijective** (invertible)

#### Affine space

(not a linear subspace)

##### Def.

$V$ is a vector space, $U$ is a subspace of $V$, $x_0 \in V$.

$$
\begin{aligned}
L &= x_0 + U := \{ x_0 + u \mid u \in U \} \quad (\text{hyperplane})\\
&= \{ v \in V \mid v = x_0 + u \text{ for some } u \in U \} \subseteq V
\end{aligned}
$$

<img src="{{ '/assets/img/post/linear_algebra/image1.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">


$x_0$: support vector

$L$ is called affine subspace (linear manifold) of $V$.

$U$: direction (direction space)

##### **Remark**

1. Let $L = x_0 + U$ and $\tilde{L} = \tilde{x}_0 + \tilde{U}$ be affine subspaces.
    
    $$
    L \subseteq \tilde{L} \iff U \subseteq \tilde{U} \quad \text{and} \quad x_0 - \tilde{x}_0 \in \tilde{U}
    $$
    
    Here, $U$ and $\tilde{U}$ are subspaces (vector spaces).
    
2. If $(b_1, \dots, b_k)$ is an ordered basis of $U$, then any $x \in L (= x_0 + U)$ can be uniquely described as
    
    $$
    x = x_0 + \underbrace{\lambda_1 b_1 + \dots + \lambda_k b_k}_{\in\ U}
    $$
    

##### **Inhomogeneous System and Affine Subspace**

$$
\begin{aligned}
Ax=b &\iff \begin{bmatrix} a_1 & \cdots & a_n \end{bmatrix} \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix} = \vec{b}\\[2em]
&\iff x_1 \vec{a}_1 + \cdots + x_n \vec{a}_n = \vec{b}
\end{aligned}
$$

The solution of $Ax=b$ is

- either empty $(\text{if } \vec{b} \notin \text{span}\langle a_1, \dots, a_n \rangle)$
- or an affine subspace of $\dim(\ker(Ax=0))$.

##### **Affine Mapping**

$$
\phi : V \to W ;\ x \longmapsto a + \Phi(x)
$$




### Analytic Geometry



##### Def. (Norm)

norm on a vector space $V$

$$
\| \cdot \| : V \longrightarrow \mathbb{R};\ x \longmapsto \|x\| \quad (\text{length of } x)
$$

1. Homogeneous
    
    $$
    \| \lambda \vec{x} \| = |\lambda| \| \vec{x} \|
    $$
    
2. Triangle Inequality
    
    $$
    \| \vec{x} + \vec{y} \| \le \| \vec{x} \| + \| \vec{y} \|
    $$
    
3. Positive Definite
    
    $$
    \| \vec{x} \| \ge 0 \quad \text{and} \quad \| \vec{x} \| = 0 \iff \vec{x} = \vec{0}
    $$
    

##### Def. Euclidean Norm

$$
\|\vec{x}\|_2 := \sqrt{\sum x_i^2} = \sqrt{x^T x} = \sqrt{\begin{pmatrix} x_1 & \cdots & x_n \end{pmatrix} \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix}}
$$

#### General Inner Product

##### Def. Bilinear mapping

$\Omega: V\times V\to \mathbb{R}$ if

1. Linear in the first argument
    
    $$
    \Omega(\lambda x + \psi y, z) = \lambda \Omega(x, z) + \psi \Omega(y, z)
    $$
    
2. Linear in the second argument

$$
\Omega(x, \lambda y + \psi z) = \lambda \Omega(x, y) + \psi \Omega(x, z)
$$

For $\Omega$: bilinear mapping

- $\Omega$ is symmetric if
    
    $$
    \Omega(x, y) = \Omega(y, x) \quad \forall x, y \in V
    $$
    
- $\Omega$ is positive definite if
    
    $$
    \begin{cases} \Omega(x, x) > 0 & \text{for all } x \neq 0 \\ \Omega(0, 0) = 0 \end{cases}\quad
    \iff \quad \left( \begin{aligned} &\Omega(x, x) \ge 0 \\ &\Omega(x, x) = 0 \iff x = 0 \end{aligned} \right)
    $$
    

**Definition: Inner Product**

A positive definite, symmetric bilinear mapping

$$
\Omega : V \times V \to \mathbb{R}
$$

is called an inner product on $V$.

$$
\langle x, y \rangle := \Omega(x, y)
$$

##### Example

1. **Dot Product (Usual Inner Product)**
    
    $$
    \langle x, y \rangle := \vec{x} \cdot \vec{y} = x^T y = \sum_{i=1}^n x_i y_i
    $$
    
2. **Example on $V = \mathbb{R}^2$**
    - $x = (x_1, x_2), \ y = (y_1, y_2)$
    - Ordered Basis**:** $(\vec{e}_1=(1,0), \vec{e}_2=(0,1))$
    
    $$
    \begin{aligned}
    \langle x, y \rangle :=&\ x_1 y_1 - (x_1 y_2 + x_2 y_1) + 2 x_2 y_2 \\[1em]
    =& \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \end{pmatrix}
    \end{aligned}
    $$
    
    $$
    \begin{aligned}
    \langle x, x \rangle &= \Omega(x, x) = \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} \\
    &= x_1^2 - 2x_1 x_2 + 2x_2^2 \\
    &= (x_1 - x_2)^2 + x_2^2 \ge 0
    \end{aligned}
    $$
    
    $$
    \implies \langle x, x \rangle = 0 \iff x_1 = x_2 = 0 \quad (\text{i.e. } x = 0)
    $$
    

$$
\begin{cases} \hat{x} = (\psi_1, \dots, \psi_n)^T \\ \hat{y} = (\lambda_1, \dots, \lambda_n)^T \end{cases}
$$

$$
A = (A_{ij}) = (\langle \vec{b}_i, \vec{b}_j \rangle)
$$

$$
\implies \langle \vec{x}, \vec{y} \rangle = \hat{x}^T A \hat{y} = (\psi_1 \dots \psi_n) \begin{pmatrix}  \\ & A_{ij} & \\ \ \end{pmatrix} \begin{pmatrix} \lambda_1 \\ \vdots \\ \lambda_n \end{pmatrix}
$$

→ $(A_{ij})$를 결정하면 inner product가 결정됨

- Inner product는 positive, symmetric bilinear map이므로 matrix로 표현 가능함

##### Remark

$A$ is symmetric:  $A_{ij}=\left< b_i,b_j \right> \overset{\text{symmetric}}{=}\left< b_j,b_i \right> =A_{ji}$

##### Def.

A symmetric matrix $A$ is called positive-definite if

$$
x^T A x \ge 0 \quad \text{and} \quad x^T A x = 0 \iff x = 0
$$

##### Example

1. $A_1 = \begin{pmatrix} 9 & 6 \\ 6 & 5 \end{pmatrix}$ is positive-definite
    
    Let $\vec{x} = (x_1, x_2)^T$.
    
    $$
    \begin{aligned}
    x^T A_1 x &= (x_1, x_2) \begin{pmatrix} 9 & 6 \\ 6 & 5 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} \\
    &= (x_1, x_2) \begin{pmatrix} 9x_1 + 6x_2 \\ 6x_1 + 5x_2 \end{pmatrix} \\
    &= 9x_1^2 + 12x_1 x_2 + 5x_2^2 \\
    &= \{ 9x_1^2 + 2(3x_1)(2x_2) + 4x_2^2 \} + x_2^2 \\
    &= (3x_1 + 2x_2)^2 + x_2^2 \ge 0
    \end{aligned}
    $$
    
    $$
    \therefore x^T A_1 x = 0 \iff x_1 = x_2 = 0
    $$
    
2. $A_1 = \begin{pmatrix} 9 & 6 \\ 6 & 3 \end{pmatrix}$ is not positive-definite
    
    Let $\vec{x} = (x_1, x_2)^T$.
    
    $$
    \begin{aligned}
    x^T A_1 x &= (x_1, x_2) \begin{pmatrix} 9 & 6 \\ 6 & 3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} \\
    &= (x_1, x_2) \begin{pmatrix} 9x_1 + 6x_2 \\ 6x_1 + 3x_2 \end{pmatrix} \\
    &= 9x_1^2 + 12x_1 x_2 + 3x_2^2 \\
    &= \{ 9x_1^2 + 2(3x_1)(2x_2) + 4x_2^2 \} - x_2^2 \\
    &= (3x_1 + 2x_2)^2 - x_2^2 \ge 0
    \end{aligned}
    $$
    
    $$
    \exists  x = (2, -3) \quad\text{s.t.}\quad x^T A_2 x = -9 < 0
    $$
    

$\left< \cdot,\cdot \right>$: inner product $\iff$ symmetric, positive-definite matrix

$V\times V\to\mathbb{R}$

   $\left< \vec x,\vec y \right> = \vec x A \vec y$  ($A$: symmetric, positive)

##### Remark

Let $A \in \mathbb{R}^{n \times n}$ be a symmetric, positive-definite matrix.

1. The null space (kernel) of $A$ contains only the zero vector
    
    $$
    \ker(A) = \{ x \in V \mid Ax = 0 \} = \{ 0 \}
    $$
    
    $$
    \ker(A) = \{0\} \iff \dim(\ker(A)) = 0\\ \iff \dim(\text{Im}(A)) = n \iff \text{rank}(A) = n
    $$
    
    ⇒ $A$ is invertible
    
2. The diagonal element $a_{ii}$ of $A$ are positive.
    
    $$
    A = \begin{pmatrix}
    \color{green}{a_{11}} & \color{orange}{a_{12}} & \cdots & a_{1n} \\
    \color{orange}{a_{12}} & \color{green}{a_{22}} & \cdots & a_{2n} \\
    \vdots & \vdots & \ddots & \vdots \\
    a_{1n} & a_{2n} & \cdots & \color{green}{a_{nn}}
    \end{pmatrix}
    $$
    
    pf)  $e_i=(0,...,\underset{i-\text{th}}{1\ },...,0)_{[B]}$
    
    $$
    \begin{aligned}
    e_i^T A e_i &= \begin{pmatrix} 0 & \cdots & 1 & \cdots & 0 \end{pmatrix} A \begin{pmatrix} 0 & \cdots & 1 & \cdots & 0 \end{pmatrix}^T \\
    &= \begin{pmatrix} 0 & \cdots & 1 & \cdots & 0 \end{pmatrix} \begin{pmatrix} a{1i} & \cdots & a_{ii} & \cdots & a_{ni} \end{pmatrix}^T\\
    &= a_{ii}\gneq0
    \end{aligned}
    $$
    
    $e_i=(0,...,\underset{i-\text{th}}{1\ },...,0)_{[B]}\neq0$
    

#### Norm induced by the inner product

$$
\|x\| = \sqrt{\langle x, x \rangle}
$$

Not every norm is induced by an inner product.

##### Cauchy-Schwarz inequality

For all $x, y \in V$,

$$
|\langle x, y \rangle| \le \|x\| \|y\|
$$

- $(ax+by)^2 \le (a^2+b^2)(x^2+y^2)$
- $(\vec{x} \cdot \vec{y})^2 \le \|\vec{x}\|^2 \|\vec{y}\|^2$

##### Def. Distance

$d: V \times V \longrightarrow \mathbb{R}$

$d$ is called a distance function if

1. Positive Definite:
    1. $d(x, y) \ge 0 \quad \text{for all } x, y \in V$
    2. $d(x, y) = 0 \iff x = y$
2. Symmetric:
    
    $d(x, y) = d(y, x) \quad \text{for all } x, y \in V$
    
3. Triangle inequality
    
    $$
    d(x, z) \le d(x, y) + d(y, z) \quad \text{for all } x, y, z \in V
    $$
    

※ inner product $\langle x, y \rangle$ ⇒ norm $\|x\|=\sqrt{\langle x, x \rangle}$ ⇒ distance $d(x,y)=\|x-y\|$.

$(\vec{x} \cdot \vec{y} = \|\vec{x}\| \|\vec{y}\| \cos \theta)$

#### Angle between two vectors

$$
- \|x\| \|y\| \le|\langle x, y \rangle| \le \|x\| \|y\|
$$

$$
- 1 \le \frac{|\langle x, y \rangle|}{\|x\| \|y\|} \le 1
\quad\text{for }\ x,y\neq 0
$$

$$
\cos \omega = \frac{\langle x, y \rangle}{\|x\| \|y\|} \quad \omega \in [0, \pi]\text{ : angle}
$$

##### Def.

1. Orthogonal
    
    $x, y$ are orthogonal if
    
    $$
    \langle x, y \rangle = 0 \quad \left( \omega = \frac{\pi}{2} \right)
    $$
    
2. Orthonormal
    
    $x, y$ are orthonormal if
    
    $$
    \langle x, y \rangle = 0 \quad \text{and} \quad \|x\| = \|y\| = 1
    $$
    

##### Example

Vectors: $\vec{x} = (1, 1), \quad \vec{y} = (-1, 1)$

1. **Dot Product**
    
    $$
    \langle x, y \rangle = x^T y = (1, 1) \begin{pmatrix} -1 \\ 1 \end{pmatrix} = 0
    $$
    
    **Result:** Orthogonal.
    
2. **Using Inner Product defined by Matrix**
    
    $$
    \langle x, y \rangle = x^T \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix} y
    $$
    
    - **Inner Product Calculation**
        
        $$
        \langle x, y \rangle = (1, 1) \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} -1 \\ 1 \end{pmatrix} = (1, 1) \begin{pmatrix} -2 \\ 1 \end{pmatrix} = -1
        $$
        
    - **Norm Calculation**
        
        $$
        \|x\| = \sqrt{\langle x, x \rangle} = \sqrt{(1, 1) \begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 \\ 1 \end{pmatrix}} = \sqrt{3} = \|y\|
        $$
        
    - **Angle ($\cos \omega$) Calculation**
        
        $$
        \cos \omega = \frac{\langle x, y \rangle}{\|x\| \|y\|} = \frac{-1}{\sqrt{3}\sqrt{3}} = -\frac{1}{3}
        $$
        
    
    **Result:** NOT Orthogonal.
    

→ 즉, 각도는 inner product를 어떻게 정의하느냐에 따라 달라짐

##### Def. Orthogonal matrix

$A\in\mathbb{R}^{n\times n}$ is orthogonal iff $A^TA=AA^T=I\; (\text{i.e., }A^{-1}=A^T)$

With the dot product ($\left< x,y \right>:= x^T y$)

the transformations by orthogonal matrices are length preserving (norm preserving) : $\|x\| = \|Ax\|$

$$
\|Ax\|^2 = \langle Ax, Ax \rangle = (Ax)^T Ax = x^T \underbrace{A^T A}_{=I} x = x^T x = \|x\|^2
$$

##### Angle preserving

$$
\begin{aligned}\cos \omega &= \frac{\langle Ax, Ay \rangle}{\|Ax\| \|Ay\|} = \frac{(Ax)^T Ay}{\sqrt{\langle Ax, Ax \rangle} \sqrt{\langle Ay, Ay \rangle}} \\&= \frac{x^T A^T A y}{\sqrt{(Ax)^T Ax} \sqrt{(Ay)^T Ay}} \\&= \frac{x^T y}{\sqrt{x^T x} \sqrt{y^T y}}\end{aligned}
$$

$$
\cos \omega_{Ax, Ay} = \frac{\langle Ax, Ay \rangle}{\|Ax\| \|Ay\|} = \frac{\langle x, y \rangle}{\|x\| \|y\|} = \cos \omega_{x, y}
$$

##### Remark

1. Orthogonal matrices preserve angles and distances.
2. In fact, orthogonal transformations are rotations and reflections.

##### Def.

A basis $\{\vec{b}_1, \dots, \vec{b}_n\} \in V$ is an orthonormal basis if

$$
\begin{cases} \langle \vec{b}_i, \vec{b}_j \rangle = 0 & i \neq j \\ \langle \vec{b}_i, \vec{b}_i \rangle = 1 \end{cases}
$$

Using Kronecker Delta

$$
\delta_{ij} = \begin{cases} 1 & i=j \\ 0 & i \neq j \end{cases}
$$

then,

$$
\begin{cases} \langle \vec{b}_i, \vec{b}_j \rangle = 0 & i \neq j \\ \langle \vec{b}_i, \vec{b}_i \rangle = 1 \end{cases}
\iff \langle \vec{b}_i, \vec{b}_j \rangle = \delta_{ij}
$$

**$A^T A \overset{?}= I$**

Let columns $v_1, \dots, v_n$ be **orthonormal** (orthogonal & unit length).

$$
A^T A = \begin{pmatrix} -& v_1^T & - \\ & \vdots \\ - & v_n^T & - \end{pmatrix} \begin{pmatrix} | & & | \\ v_1 & \cdots & v_n \\ | & & | \end{pmatrix} = \begin{pmatrix} v_1^T v_1 & \cdots & v_1^T v_n \\ \vdots & v_i^T v_j & \vdots \\ v_n^T v_1 & \cdots & v_n^T v_n \end{pmatrix}
$$

$$
(A^T A)_{ij} = v_i^T v_j = \langle v_i, v_j \rangle = \vec{v}_i \cdot \vec{v}_j
$$

$$
\langle v_i, v_j \rangle = \delta_{ij} = \begin{cases} 1 & (i=j) \\ 0 & (i \neq j) \end{cases}
$$

$$
\implies A^T A = \begin{pmatrix} 1 & & 0 \\ & \ddots & \\ 0 & & 1 \end{pmatrix} = I
$$

Similar to $AA^T$

#### Orthogonal complement

$U$: subspace of $V$

$U$ has the $\vec 0$

$$
U^\perp := \{ v \in V \mid v \perp u \text{ for all } u \in U \}
$$

$U^\perp$ is a **subspace** of $V$

Check: For any $u_1, u_2 \in U^\perp$ and $\alpha, \beta \in \mathbb{R}$

$$
\implies \alpha u_1 + \beta u_2 \in U^\perp
$$

- dim $V$ = n,  dim $U$ = m  ⇒  dim $U^\perp$=n-m

$U\cap U^\perp = \{0\}$

##### **Unique Decomposition & Basis**

For any vector $\vec{x} \in V$, $\vec{x}$ can be uniquely decomposed into

$$
\vec{x} = \underbrace{\sum_{i=1}^{m} \lambda_i \vec{u}_i}_{\in U} + \underbrace{\sum_{j=1}^{n-m} \psi_j \vec{u}_j^\perp}_{\in U^\perp} \quad \lambda_i, \psi_j \in \mathbb{R}
$$

**Definitions**

$$
U = \text{span} \langle \vec{u}_1, \dots, \vec{u}_m \rangle, \quad U^\perp = \text{span} \langle \vec{u}_1^\perp, \dots, \vec{u}_{n-m}^\perp \rangle
$$

**Basis Construction**

$$
\{ \underbrace{\vec{u}_1, \dots, \vec{u}_m}_{U}, \underbrace{\vec{u}_1^\perp, \dots, \vec{u}_{n-m}^\perp}_{U^\perp} \} : \text{basis of } V
$$

#### Function space

**Inner Product $\langle \cdot,\cdot  \rangle$ of Functions**

$$
\langle u, v \rangle = \int_{a}^{b} u(x) v(x) \, dx
$$

##### Example

Set $a = -\pi, \; b = \pi$.

$$
\begin{aligned}
\langle \sin x, \cos x \rangle &= \int_{-\pi}^{\pi} \sin x \cos x \, dx \\
&= \frac{1}{2} \int_{-\pi}^{\pi} \underbrace{\sin 2x}_{\text{period } = \pi} \, dx = 0
\end{aligned}
$$

$$
\implies \sin x, \cos x \text{ are orthogonal.}
$$

$$
\langle \sin nx,\ \cos mx \rangle = 0
$$

### Projection

#### **Projection**

- $V$: vector space
- $U$: subspace of $V$
- $\pi$: linear mapping ($\pi: V \longrightarrow V$)
- $\pi$ is called a projection if
    
    $$
    \pi^2 = \pi \circ \pi = \pi
    $$
    
    (Projection matrix $P_\pi \implies P_\pi^2 = P_\pi$)
    

##### **Projection onto 1-Dim subspace (line)**

- $\pi_u$: projection onto $U$
- $U := \text{span} \langle \vec{b} \rangle$ ($\vec{b}$ is a basis)
- $\pi_u(\vec{x}) = \lambda \vec{b}$

The error vector $(\vec{x} - \pi_u(\vec{x}))$ must be orthogonal to the basis $\vec{b}$:

$$
\langle \vec{x} - \pi_u(\vec{x}), \vec{b} \rangle = 0
$$
$$
\implies \langle \vec{x} - \lambda \vec{b}, \vec{b} \rangle = \langle \vec{x}, \vec{b} \rangle - \lambda \|\vec{b}\|^2 = 0
$$

$$
\lambda = \frac{\langle \vec{x}, \vec{b} \rangle}{\|\vec{b}\|^2} 
$$

$$
\text{Note: } \langle \vec{x}, \vec{b} \rangle = \vec{x}^T \vec{b}
$$

$$
\begin{aligned}
\pi_u(\vec{x}) &= \lambda \vec{b} = \frac{\langle \vec{x}, \vec{b} \rangle}{\|\vec{b}\|^2} \vec{b} \\[5em]
&= \frac{\langle \vec{b}, \vec{x} \rangle}{\|\vec{b}\|^2} \vec{b} 
= \underbrace{\frac{\vec{b}^T\, \vec{x}}{\|\vec{b}\|^2}}_{\in\mathbb{R}}\; \vec{b} 
|= \underbrace{\frac{\vec{b}\, \vec{b}^T}{\|\vec{b}\|^2}}_{\in\mathbb{R}^{n\times n}}\; \vec{x}
\end{aligned}
$$

$$
\pi_u(\vec{x}) = P_\pi (\vec{x})\
$$

$$
P_\pi = \frac{1}{\|\vec{b}\|^2} \vec{b} \vec{b}^T
$$

##### Example

Projection onto a Line in $\mathbb{R}^3$

$$
V = \mathbb{R}^3, \quad U = \text{span}\langle \vec{b} \rangle = \langle (1, 2, 2)^T \rangle, \quad \vec{b} = \begin{pmatrix} 1 \\ 2 \\ 2 \end{pmatrix}
$$

$$
P_\pi = \frac{b b^T}{\|\vec{b}\|^2} \\[1em] \|\vec{b}\|^2 = 1^2 + 2^2 + 2^2 = 1 + 4 + 4 = 9
$$

$$
b b^T = \begin{pmatrix} 1 \\ 2 \\ 2 \end{pmatrix} \begin{pmatrix} 1 & 2 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 2 & 2 \\ 2 & 4 & 4 \\ 2 & 4 & 4 \end{pmatrix}
$$

$$
\pi_u(\vec{x}) = \frac{1}{9} \begin{pmatrix} 1 & 2 & 2 \\ 2 & 4 & 4 \\ 2 & 4 & 4 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}
$$

$$
P_\pi^2 = P_\pi
$$

Projection matrix는 rank가 full rank가 될 수 없음

#### Projection onto general subspaces

$$
V := \mathbb{R}^n
$$
$$
U = \text{span} \langle \vec{b}_1, \dots, \vec{b}_m \rangle, \quad \dim U = m
$$
$$
B := \begin{pmatrix} \vec{b}_1 & \cdots & \vec{b}_m \end{pmatrix}_{n\times m}, \quad \vec{\lambda} = \begin{pmatrix} \lambda_1 \\ \vdots \\ \lambda_m \end{pmatrix}
$$
$$
\text{rank}(B)=m
$$


<img src="{{ '/assets/img/post/linear_algebra/image2.png' | relative_url }}" style="max-width: 30%; height: auto; display: block; margin: 0 auto;" alt="image">

$$
\pi_u(\vec{x}) = \sum_{i=1}^{m} \lambda_i \vec{b}_i = \begin{pmatrix} \vec{b}_1 & \cdots & \vec{b}_m \end{pmatrix} \begin{pmatrix} \lambda_1 \\ \vdots \\ \lambda_m \end{pmatrix} = B \vec{\lambda}
$$

$$
\begin{cases}
\langle b_1, x - \pi_u(x) \rangle = b_1^T (x - \pi_u(x)) = b_1^T (x -B\lambda)  = 0 \\
\qquad\quad \vdots
\qquad\qquad\qquad\quad \vdots \\
\langle b_m, x - \pi_u(x) \rangle = b_m^T (x - \pi_u(x)) = b_m^T (x -B\lambda) = 0
\end{cases}
$$

$$
\iff \begin{pmatrix} b_1^T \\ \vdots \\ b_m^T \end{pmatrix}_{\!\!m\times n} (x - B\lambda)_{n\times 1} = \begin{pmatrix} 0 \\ \vdots \\ 0 \end{pmatrix}_{\!\!m\times 1} = 0
$$

$$
\begin{aligned}
&\iff B^T (x - B\lambda) = 0 \\
&\iff B^T x = B^T B \lambda \\
&\iff \vec{\lambda} = (\!\!\underbrace{\,B^T B\,}_{\text{Invertible?}}\!\!)^{-1} B^T x
\end{aligned}
$$

$$
B^T_{m \times n} B_{n \times m} : m\times m\;\text{full-rank matrix} \longrightarrow \text{invertible}
$$

$$
\pi_u(x) = B \underbrace{(B^T B)^{-1} B^T}_{P_\pi} x
$$

$$
P_\pi = B(B^T B)^{-1} B^T
\text{ (projection matrix)} \longleftrightarrow
P_\pi = \frac{bb^T}{\|b\|^2} = (\underbrace{b^T b}_{\in \mathbb{R}})^{-1} bb
$$

##### Example

$U = \text{span} \left\langle \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} \right\rangle \subset \mathbb{R}^3$ 

$\vec{b}_1 = (1, 1, 1)^T, \quad \vec{b}_2 = (0, 1, 2)^T$

$\vec{x} = \begin{pmatrix} 6 \\ 0 \\ 0 \end{pmatrix}$

$\pi_u(\vec{x}) = \lambda_1 \vec{b}_1 + \lambda_2 \vec{b}_2 = B\vec{\lambda}$

$$
B = (\vec{b}_1, \vec{b}_2) = \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix}
$$

$$
B^T B = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 1 & 1 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}
$$

$$
(B^T B)^{-1} = \begin{pmatrix} 3 & 3 \\ 3 & 5 \end{pmatrix}^{-1} = \frac{1}{6} \begin{pmatrix} 5 & -3 \\ -3 & 3 \end{pmatrix}
$$

$$
\vec{\lambda} = \underbrace{(B^T B)^{-1} B^T \vec{x}}_{\text{Normal Eq. Solution}}
$$

$$
B^T \vec{x} = \begin{pmatrix} 1 & 1 & 1 \\ 0 & 1 & 2 \end{pmatrix} \begin{pmatrix} 6 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 6 \\ 0 \end{pmatrix}
$$

$$
\lambda = (B^T B)^{-1} B^T \vec{x} = \frac{1}{6} \begin{pmatrix} 5 & -3 \\ -3 & 3 \end{pmatrix} \begin{pmatrix} 6 \\ 0 \end{pmatrix} = \begin{pmatrix} 5 \\ -3 \end{pmatrix} = \begin{pmatrix} \lambda_1 \\ \lambda_2 \end{pmatrix}
$$

$$
\pi_u(\vec{x}) = 5 \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} + (-3) \begin{pmatrix} 0 \\ 1 \\ 2 \end{pmatrix} = \begin{pmatrix} 5 \\ 2 \\ -1 \end{pmatrix}
$$

$$
P_\pi = B (B^T B)^{-1} B^T = \frac{1}{6} \begin{pmatrix} 5 & 2 & -1 \\ 2 & 2 & 2 \\ -1 & 2 & 5 \end{pmatrix}
$$

##### Remark

<img src="{{ '/assets/img/post/linear_algebra/image3.png' | relative_url }}" style="max-width: 85%; height: auto; display: block; margin: 0 auto;" alt="image">


$$
A = \begin{pmatrix} \vec{A}_1 & \vec{A}_2 & \cdots & \vec{A}_k \end{pmatrix}
$$
$$
Ax = \begin{pmatrix} \vec{A}_1 & \cdots & \vec{A}_k \end{pmatrix} \begin{pmatrix} x_1 \\ \vdots \\ x_k \end{pmatrix} = x_1 \vec{A}_1 + x_2 \vec{A}_2 + \cdots + x_k \vec{A}_k
$$
$$
U := \text{span} \langle \vec{A}_1, \dots, \vec{A}_k \rangle \subseteq \mathbb{R}^n
$$

$$
A\vec{x} = \vec{b} \quad \iff \quad \underbrace{x_1 \vec{A}_1 + \cdots + x_k \vec{A}_k}_{\in U} = \underset{\in \mathbb{R}^n}{\vec{b}}
$$

$$
U = \text{span} \langle \vec{A}_1, \dots, \vec{A}_k \rangle
$$
$$
\dim U \le k < n
$$

### Gram-Schmidt Orthogonalization

$$
(\vec{b}_1, \dots, \vec{b}_n) : \text{any basis of } n\text{-dimensional vector space } V
$$
$$
\downarrow \text{ Gram-Schmidt method}
$$
$$
(\vec{u}_1, \dots, \vec{u}_n) : \text{orthogonal basis (orthonormal basis)}
$$

$$
\begin{cases}\vec{u}_1 := \vec{b}_1 \\\vec{u}_2 := \vec{b}_2 - \pi_{\langle u_1 \rangle} (\vec{b}_2) \\\vec{u}_3 := \vec{b}_3 - \pi_{\langle u_1, u_2 \rangle} (\vec{b}_3) \\\qquad \vdots \\\vec{u}_k := \vec{b}_k - \pi_{\langle u_1, \dots, u_{k-1} \rangle} (\vec{b}_k)\end{cases}
$$

$$
\implies \text{span} \langle u_1, \dots, u_k \rangle = \text{span} \langle b_1, \dots, b_k \rangle
$$

: $(u_1, ..., u_k)$ are orthogonal

and $(v_1,...,v_k)$ are orthonomal if $v_i=\dfrac{u_i}{\|u_i\|}$ for all $i$.

#### Projection onto Affine subspace

$L=x_0 +U$

#### Rotation in $\mathbb{R}^2$

$$
R(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}
$$




### Matrix decomposition


Matrix $A$ → Spectral Decomposition (Eigen Decomp) → SVD (Singular Value Decomposition)

#### Definition

$$
\det : \mathbb{R}^{n \times n} \longrightarrow \mathbb{R} 
$$
$$A \longmapsto \det(A) = |A|
$$

$$
A = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \quad \longmapsto \quad \det(A) = ad - bc
$$

$$
\det(A) = \left| \begin{matrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{matrix} \right| \\= a_{11} \left| \begin{matrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{matrix} \right| - a_{12} \left| \begin{matrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{matrix} \right| + a_{13} \left| \begin{matrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{matrix} \right|
$$

#### Theorem

$$
A \in \mathbb{R}^{n \times n} \text{ is invertible} \quad \iff \quad \det(A) \neq 0
$$

$$
U: \text{upper triangular} \quad (\text{if } u_{ij} = 0 \text{ if } i > j)
$$

$$
L: \text{lower triangular} \quad (\text{if } l_{ij} = 0 \text{ if } i < j)
$$

##### Remark

1. $\det(AB) = \det(A) \det(B)$
2. $\det(A) = \det(A^T)$
3. $\det(A^{-1}) = \frac{1}{\det(A)} = [\det(A)]^{-1}$
    
    (Note: $\det(A) \in \mathbb{R}$)
    
4. If $A$ and $B$ are similar matrices ($B = S^{-1} A S$) then $\det(B) = \det(A)$

$$
\begin{aligned}
\det(B) &= \det(S^{-1} A S) \\
&= \det(S^{-1}) \det(A) \det(S) \\
&= \frac{1}{\det(S)} \det(A) \det(S) \\
&= \det(A)
\end{aligned}
$$

The determinant is invariant to the choice of basis.

##### Theorem

1. Swapping
    
    Swapping two rows/columns changes the sign $(+ / -)$ of $\det(A)$.
    
2. Row Addition
    
    Adding a multiple of a row/column to another one does not change $\det(A)$.
    
3. **Scalar Multiplication**
    
    $$
    \det(\lambda A) = \lambda^n \det(A) \quad \text{for } A \in \mathbb{R}^{n \times n}
    $$
    
    **Note:** Since $A$ has $n$ rows, factoring out $\lambda$ from each row results in $\lambda^n$.
    

##### Theorem

Let $A \in \mathbb{R}^{n \times n}$.

$$
\det(A) \neq 0 \quad \iff \quad \text{rank}(A) = n \quad (\text{full-rank})
$$

##### **Definition: Trace**

The trace of a matrix $A$ is the sum of its diagonal entries:

$$
\text{tr}(A) = \sum_{i=1}^{n} a_{ii}
$$

##### Theorem

1. $\text{tr}(A + B) = \text{tr}(A) + \text{tr}(B)$
2. $\text{tr}(\alpha A) = \alpha \text{tr}(A)$
3. $\text{tr}(AB) = \text{tr}(BA)$

#### Characteristic Polynomial

For a square matrix $A \in \mathbb{R}^{n \times n}$,

$$
\begin{aligned}
P_A(\lambda) &= \det(A - \lambda I) \\
&= \left| \begin{pmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & \ddots & \vdots \\ a_{n1} & \cdots & a_{nn} \end{pmatrix} - \begin{pmatrix} \lambda & & 0 \\ & \ddots & \\ 0 & & \lambda \end{pmatrix} \right| \\
&= c_0 + c_1 \lambda + c_2 \lambda^2 + \cdots + c_{n-1} \lambda^{n-1} + \underbrace{(-1)^n \lambda^n}_{\text{Leading Term}}
\end{aligned}
$$

is called the characteristic polynomial of $A$.

$$
\begin{cases}c_0 = \det(A) \\c_n = (-1)^n \\c_{n-1} = (-1)^n \text{tr}(A)\end{cases}
$$

##### Definition

For  $A \in \mathbb{R}^{n \times n}$,  $\lambda \in \mathbb{R}$  is an  eigenvalue  of  $A$  and  $\vec{x} \in \mathbb{R}^n \setminus\! \{0\}$  is the corresponding eigenvector of  $A$ if

$$
A\vec{x} = \lambda\vec{x} \quad (\text{eigenvalue equation})
$$
$$
\text{i.e., }
(A - \lambda I)\vec{x} = 0 \quad (\vec{x} \neq 0)
$$

$\lambda$ is solution of $A-\lambda I=0$

##### Theorem

For $A\in\mathbb{R}^{n\times n}$

1. $\lambda$ is an eigenvalue of $A$
2. $\exists \vec x \in \mathbb{R}^n \ (\vec x\neq 0)$ s.t. $A\vec x=\lambda \vec x$
3. $\text{rank}(A-\lambda I)<n$ : i.e., not a full rank
4. $\det (A-\lambda I)=0$ : charicteristic polynomial of $A$

##### Remark (Nonuniqueness of eigenvectors)

If $\vec{x}$ is an eigenvector of $A$ associated with eigenvalue $\lambda$ (i.e., $A\vec{x} = \lambda\vec{x}$), then $\vec{y} = c\vec{x}$ is an eigenvector, too.

$$
A\vec{y} = A(c\vec{x}) = c(A\vec{x}) = c(\lambda\vec{x}) = \lambda(c\vec{x}) = \lambda\vec{y}
$$

※ eigenvalue: unique

##### Theorem

$\lambda$ is an eigenvalue of $A$ iff $\lambda$ is a root of the characteristic polynomial $P_A(\lambda)$ of $A$.

$$
P_A(\lambda) = \det(A - \lambda I) = 0
$$

Consider the equation $(A - \lambda I)\vec{x} = 0$.

$$
\text{if }\det(A - \lambda I) \neq 0 \implies (A - \lambda I) \text{ is invertible} \implies \vec{x} = 0
$$

Since an eigenvector must be non-zero ($\vec{x} \neq 0$), the determinant **must be 0**.

##### Definition (Algebraic multiplicity of eigenvalues)

The algebraic multiplicity of an eigenvalue $\lambda_i$ of $A$ is the number of times the root appears in the characteristic polynomial.

##### Example

$P_A(\lambda) = (\lambda - 1)^2 (\lambda - 2) (\lambda - 3)^3$

$$
\begin{cases}\text{algebraic multiplicity of } \lambda = 1 \longrightarrow 2 \\\text{algebraic multiplicity of } \lambda = 2 \longrightarrow 1 \\\text{algebraic multiplicity of } \lambda = 3 \longrightarrow 3\end{cases}
$$

##### Definition (Eigenspace, Eigenspectrum)

The set $E_\lambda$ (or $C(\lambda)$) of all eigenvectors of $A$ associated with an eigenvalue $\lambda$ spans a subspace, called eigenspace of $A$ wrt. $\lambda$.

The set of all eigenvalues of $A$ is called the eigenspectrum of $A$.

##### Remark

1. $E_\lambda$ (or $C(\lambda)$) is a subspace of $\mathbb{R}^n$
2. $E_\lambda$ is the soultion space fo linear eq. $(A-\lambda I)\vec x=0$
3. The eigenvector is stretched by the linear mapping. The eigenvalue is the factor.


<img src="{{ '/assets/img/post/linear_algebra/image4.png' | relative_url }}" style="max-width: 80%; height: auto; display: block; margin: 0 auto;" alt="image">

##### Theorem

1. $A$ and $A^T$ have the same eigenvalues. But not necessarily the same eigenvectors.
2. Similar matrices ($A=S^{-1} B S$) have the same eigenvalues.
(Therefore, a linear mapping has eigenvalues that are independent of the choice of basis)
3. Symmetric Positive definite matrices always have positive (real) eigenvalues.

**pf**

1. $(A-\lambda I)^T=A^T-\lambda I$
    
    $\det(A^T-\lambda I)=\det((A-\lambda I)^T)=\det(A-\lambda I)$
    
    So, $A^T,A$ have same eigenvalues
    
2. $B=P^{-1}A P$ (similar matrices)
    
    $$
    \begin{aligned}
    B - \lambda I = P^{-1}AP - \lambda I &= P^{-1}AP - P^{-1}(\lambda I)P \\&= P^{-1}(AP - \lambda IP) = P^{-1}(A - \lambda I)P
    \end{aligned}
    $$
    
    $$
    \begin{aligned}\det(B - \lambda I) &= \det(P^{-1} (A - \lambda I) P) \\&= \det(P^{-1}) \det(A - \lambda I) \det(P) \\&= \det(A - \lambda I)
    \end{aligned}
    $$
    
3. $A: \text{Positive Definite} \iff (x^T A x \ge 0) \text{ and } (x^T A x = 0 \iff x=0)$
    
    Let $\lambda$ be an eigenvalue of $A$, and $v$ be the associated eigenvector ($v \neq 0$).
    
    i.e., $A\vec v=\lambda \vec v$.
    
    $$
    \vec{v}^T A \vec{v} = v^T (\lambda \vec{v}) = \lambda v^T v = \lambda \|\vec{v}\|^2 > 0 \quad (\because \vec{v} \neq 0)
    $$
    $$
    \lambda \|\vec{v}\|^2 > 0 \implies \lambda > 0
    $$
    

##### Example

Let 
$$
A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}.
$$

**1. Find Eigenvalues**

$$
\begin{aligned}
\det(A - \lambda I) &= \left| \begin{matrix} 4-\lambda & 2 \\ 1 & 3-\lambda \end{matrix} \right| \\
&= (4-\lambda)(3-\lambda) - 2 \\
&= \lambda^2 - 7\lambda + 10 \\
&= (\lambda - 2)(\lambda - 5)
\end{aligned}
$$

**Eigenvalues:**

$$
\lambda_1 = 2, \quad \lambda_2 = 5
$$

**2. Find Eigenvectors**

- **Case $\lambda_1 = 2$:**
    
    $$
    (A - \lambda_1 I)\vec{v}_1 = \begin{pmatrix} 2 & 2 \\ 1 & 1 \end{pmatrix} \vec{v}_1 = 0 \quad \implies \quad \vec{v}_1 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}
    $$
    
- **Case $\lambda_2 = 5$:**
    
    $$
    (A - \lambda_2 I)\vec{v}_2 = \begin{pmatrix} -1 & 2 \\ 1 & -2 \end{pmatrix} \vec{v}_2 = 0 \quad \implies \quad \vec{v}_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}
    $$
    

**3. Eigenspaces**

$$
\begin{cases}
E_2 = C(2) = \text{span} \left\langle \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\rangle \\
E_5 = C(5) = \text{span} \left\langle \begin{pmatrix} 2 \\ 1 \end{pmatrix} \right\rangle
\end{cases} \quad (\text{; eigen spaces})
$$

##### Remark

For $A \in \mathbb{R}^{n \times n}$

$\det(A - \lambda I) = 0$ : characteristic eq.

$\det(A - \lambda I)$ : poly. of deg.  $n$

1. $A, A^T$   have the same eigenvalues.
2. $B = P^{-1}AP$ : $A, B$  have the same eigenvalues.
3. $A$ :  symmetric, positive definite $\implies$ $\text{eigenvalue} > 0$

##### Definition (geometric multiplicity)

Let $\lambda_i$ be an eigenvalue of $A$. Then the geometric multiplicity of $\lambda_i$ is the number of linear independent eigenvectors associated with $\lambda_i$.

→ Eigenvalue와 관련된 eigenvector가 몇 개 존재하는가

##### Remark

1. We may have multiple identical eigenvalues and the eigenspace may have more than one dimension.
    
    Example
    
    $$
    A = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}
    $$
    
    $$
    
    |A - \lambda I| = \left| \begin{matrix} 2-\lambda & 0 \\ 0 & 2-\lambda \end{matrix} \right| = (\lambda - 2)^2 \implies \lambda_1 = 2
    $$
    
    $$
    (A - 2I)v = 0 \implies A - 2I=0
    $$
    
    $$
    v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}
    $$
    
    $$
    C(\lambda_1) = \left\langle \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\rangle
    $$
    
2. A specific eigenvalue's geometric multiplicity must be at least one.
    
    (Every eigenvalue has at least one eigenvector) ; $(A - \lambda I)v = 0 \quad (v \neq 0)$
    
3. An eigenvalue’s geometric multiplicity cannot exceed its algebraic multiplicity.
    
    $$
    GM\le AM
    $$
    
    Example $GM < AM$
    
    $$
    A = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}
    $$
    
    $$
    |A - \lambda I| = \left| \begin{matrix} 2-\lambda & 1 \\ 0 & 2-\lambda \end{matrix} \right| = (2-\lambda)^2 \implies \lambda = 2 \quad (AM = 2)
    $$
    
    $$
    (A - 2I)v = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} v = 0 \implies v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}
    $$
    
    $$
    C(\lambda) = \left\langle \begin{pmatrix} 1 \\ 0 \end{pmatrix} \right\rangle\implies GM = \dim(C(2)) = 1
    $$
    

##### Theorem

If $A\in\mathbb{R}^{n\times n}$  has $n$ disticnt eigenvalues $\lambda_1,...,\lambda_n$, then the eigenvectors $\vec v_1, ...,\vec v_n$ are linearly independent.

pf) For $n=2$

$$
c_1 \vec{v}_1 + c_2 \vec{v}_2 = \vec{0} \quad \cdots \text{①}
$$
$$
A(c_1 \vec{v}_1 + c_2 \vec{v}_2) = c_1 \lambda_1 \vec{v}_1 + c_2 \lambda_2 \vec{v}_2 = 0 \quad \cdots \text{②}
$$
$$
\text{Subtract ①} \times \lambda_1: c_2 (\lambda_2 - \lambda_1) \vec{v}_2 = 0
$$
$$
\text{Since } \lambda_1 \neq 0, \lambda_1 \neq \lambda_2 \text{ and } \vec{v}_2 \neq 0 \implies c_2 = 0
$$

$$
\text{Substitute } c_2=0 \text{ into ①:} 
$$
$$
c_1 \vec{v}_1 = 0 \implies c_1 = 0
$$
$$
\therefore c_1 = c_2 = 0 \quad (\text{Linearly Independent})
$$

For $n=n$ (induction)

Suppose that

$$
c_1 v_1 + \cdots + c_n v_n = 0 \quad \cdots \text{③}
$$

WTS (Want To Show): $c_1 = \cdots = c_n = 0$

$$
A(c_1 v_1 + \cdots + c_n v_n) = c_1 \lambda_1 v_1 + \cdots + c_n \lambda_n v_n = 0 \quad \cdots \text{④}
$$

WLOG (Without Loss of Generality): $\lambda_j \neq 0$

$$
\text{Subtract (③} \times \lambda_j \text{) from ④:}
$$

$$
\begin{aligned}
& (c_1 \lambda_1 v_1 + \cdots + c_n \lambda_n v_n) - (c_1 \lambda_j v_1 + \cdots + c_n \lambda_j v_n) = 0 \\
\implies & c_1 (\lambda_1 - \lambda_j) v_1 + \cdots + \underbrace{c_j (\lambda_j - \lambda_j) v_j}_{=0} + \cdots + c_n (\lambda_n - \lambda_j) v_n = 0
\end{aligned}
$$

$$
c_1 (\lambda_1 - \lambda_j) v_1 + \cdots + \hat{x} + \cdots + c_n (\lambda_n - \lambda_j) v_n = 0
$$

Assuming linear independence for $n-1$ vectors

$$
c_1 = c_2 = \cdots = \hat{c_j} = \cdots = c_n = 0
$$

$\hat{c_j}$ means except $c_j$

$$
c_j v_j = 0 \implies c_j = 0
$$
$$
\therefore c_1 = \cdots = c_n = 0
$$

##### Definition (defective)

$A \in \mathbb{R}^{n \times n}$ is called defective, if it has fewer than $n$ linearly independent eigenvectors.

(eigenvector로 만든 공간이 전체 공간을 만들지 못함 = basis가 아님)

##### Remark

1. $A$: not defective  $\underset{A=I (\text{counter ex.})}{\implies}$ $A$: $n$ distinct eigenvalues}
2. A defective matrix cannot have $n$ distinct eigenvalues.
3. $A \in \mathbb{R}^{n \times n}$ (defective)  $\implies$  the sum of the dimensions of eigenspaces $< n$
    
    $$
    \begin{aligned}
    \text{eigenvalues : } & \quad \lambda_1, \quad \lambda_2, \dots, \quad \lambda_m \quad (m \le n) \\
    & \quad \downarrow \qquad \downarrow \qquad \qquad \downarrow \\
    \text{eigenspace : } & \quad C(\lambda_1) \quad C(\lambda_2) \qquad C(\lambda_m) \\
    & \quad \parallel \qquad \quad \parallel \qquad \qquad \quad \parallel \\
    & \langle v_{1,1} \dots v_{1,k_1} \rangle \enspace \langle v_{2,1} \dots v_{2,k_2} \rangle \quad \langle v_{m,1} \dots v_{m,k_m} \rangle
    \end{aligned}
    $$
    
    $$
    \dim C(\lambda_1) = k_1, \quad \dim C(\lambda_2) = k_2, \quad \dots, \quad \dim C(\lambda_m) = k_m\\
    k_1 + k_2 + \cdots + k_m \le n
    $$
    
    $$
    \text{If defective, }k_1 + \cdots + k_m < n
    
    $$
    
    → Defective면 diagonal matrix를 만들 수 없음
    

##### Theorem

$A \in \mathbb{R}^{n \times n}$

$S = A^T A$  is symmetric, positive semidefinite. ($x^R S x\ge 0$)

If $\text{rank}(A) = n$, $S$  s positive definite. ($x^T S x\ge 0 \;\text{ and }\; x^T S x=0 \text{ iff } x=0$)

pf) 

$$
S^T = (A^T A)^T = A^T (A^T)^T = A^T A = S \quad (\text{symmetric})
$$
$$
\begin{aligned}
x^T S x &= x^T (A^T A) x = (x^T A^T)(Ax) = (Ax)^T (Ax) \\
&= \langle Ax, Ax \rangle
= \|y\|^2 \ge 0\; (\text{Let } y = Ax)
\end{aligned}
$$

$$
\text{rank}(A) = n : \quad y=0 \implies x=0
$$

##### Remark

$A$ is a symmetric, positive definite ⇒ $A=LL^T$

##### Example

1. general simple case
    
    $$
    \begin{aligned}
    A &= \begin{pmatrix} 4 & -5 \\ 2 & -3 \end{pmatrix}
    |A - \lambda I| = \left| \begin{matrix} 4-\lambda & -5 \\ 2 & -3-\lambda \end{matrix} \right| \\[.5em]
    &= \lambda^2 - \lambda - 2 = (\lambda + 1)(\lambda - 2) = 0
    \end{aligned}
    $$
    $$
    \implies \lambda_1 = -1, \quad \lambda_2 = 2
    $$
    $$
    \begin{pmatrix} 5 & -5 \\ 2 & -2 \end{pmatrix} v_1 = 0 \implies v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}
    
    v_2 = \begin{pmatrix} 5 \\ 2 \end{pmatrix}
    $$
    
2. $A\in\mathbb{R}^{n\times n}$ has complex eigenvalues and complex eigenvectors
    
    $$
    A = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}
    |A - \lambda I| = \left| \begin{matrix} -\lambda & 1 \\ -1 & -\lambda \end{matrix} \right| = \lambda^2 + 1 = 0
    \lambda_1 = i, \quad \lambda_2 = -i
    $$
    
3. $A \in \mathbb{C}^{2 \times 2}$: has real eigenvalues, complex eigenvectors
    
    $$
    A = \begin{pmatrix} 2 & 3-3i \\ 3+3i & 5 \end{pmatrix}
    $$
    
    $$
    \begin{aligned}
    |A - \lambda I| &= \left| \begin{matrix} 2-\lambda & 3-3i \\ 3+3i & 5-\lambda \end{matrix} \right| \\
    &= (2-\lambda)(5-\lambda) - (3-3i)(3+3i) \\
    &= (\lambda^2 - 7\lambda + 10) - (9 + 9) \\
    &= \lambda^2 - 7\lambda - 8 \\
    &= (\lambda - 8)(\lambda + 1) = 0
    \end{aligned}
    $$
    
    $$
    \implies \lambda_1 = 8, \quad \lambda_2 = -1
    $$
    
    For  $\lambda_1$
    
    $$
    
    \begin{pmatrix} -6 & 3-3i \\ 3+3i & -3 \end{pmatrix} v_1 = 0 \implies v_1 = \begin{pmatrix} 1 \\ 1+i \end{pmatrix}
    $$
    
    For $\lambda_2$
    
    $$
    \text{Similary, }
    v_2 = \begin{pmatrix} 1-i \\ -1 \end{pmatrix}
    $$
    
    : It can be for $A=(\bar A)^T$; complex-conjugate Similary
    
4. Block diagonal-matrices
    
    $$
    A = \begin{pmatrix} 4 & -5 & 0 \\ 2 & -3 & 0 \\ 0 & 0 & 3 \end{pmatrix}
    \left| \begin{matrix} 4-\lambda & -5 & 0 \\ 2 & -3-\lambda & 0 \\ 0 & 0 & 3-\lambda \end{matrix} \right| \\[.5em]
    = (3-\lambda)(\lambda-2)(\lambda+1) = 0
    $$
    
    $$
    \implies
    \lambda_1 = -1, \quad \lambda_2 = 2, \quad \lambda_3 = 3
    $$
    
    $$
    v_1 = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}, \quad v_2 = \begin{pmatrix} 5 \\ 2 \\ 0 \end{pmatrix}, \quad v_3 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}
    \dots \text{ basis of } \mathbb{R}^3
    $$
    
    → eigenvectors be the basis of $\mathbb{R}^3$
    
5. $A$: defective (Cannot be the basis)
    
    $$
    A = \begin{pmatrix} 2 & 1 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}
    \left| \begin{matrix} 2-\lambda & 1 & 0 \\ 0 & 2-\lambda & 0 \\ 0 & 0 & 3-\lambda \end{matrix} \right| = (3-\lambda)(2-\lambda)^2 = 0
    \implies
    \lambda_1 = 3, \quad \lambda_2 = 2
    $$
    
    $$
    \text{For } \lambda_1 = 3:\begin{pmatrix} -1 & 1 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = 0\\
    \implies v_1 = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}
    C(3) = \left\langle \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \right\rangle
    $$
    
    $$
    \text{For } \lambda_2 = 2:\begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \\ y_3 \end{pmatrix} = 0\\[.5em]
    \implies y_2 = 0, \; y_3 = 0\\[.5em]
    \implies v_2 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}
    C(2) = \left\langle \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} \right\rangle
    $$
    

#### Complex Matrices

##### Definition (Complex vector)

Complex vector  $\vec{w} \in \mathbb{C}^n \vec{w} = (w\_1, \dots, w\_n)$,

$$
w_j = x_j + i y_j \quad (x_j, y_j \in \mathbb{R})
$$

norm : $\|\vec{w}\|^2 = |w\_1|^2 + \cdots + |w\_n|^2$

$$
|w_j|^2 = w_j \overline{w}_j = x_j^2 + y_j^2
$$

$\|\vec{w}\|^2 = \langle \vec{w}, \vec{w} \rangle$  (compatible)

For $u, v \in \mathbb{C}^n$

$$
\vec{u} = (u_1, \dots, u_n)^T, \quad \vec{v} = (v_1, \dots, v_n)^T
$$

$$
\begin{aligned}
\langle u, v \rangle &= \bar{u}^T v \\
&= (\bar{u}_1, \dots, \bar{u}_n) \begin{pmatrix} v_1 & \cdots & v_n \end{pmatrix}^T \\
&= \bar{u}_1 v_1 + \cdots + \bar{u}_n v_n
\end{aligned}
$$

##### Definition (Hermitian)

$A \in \mathbb{C}^{n \times n}$

$A^H$ ($A$ Hermitian) :  conjugate, transpose of  $A$.

$$
A^H = (\overline{A})^T;\; (A^H)_{ij} = (\overline{A})_{ji}
$$

##### Example

$$
A = \begin{pmatrix} 1 & 1+i \\ 1-i & i \end{pmatrix}
$$

$$
A^H = \begin{pmatrix} 1 & 1-i \\ 1+i & -i \end{pmatrix}^T = \begin{pmatrix} 1 & 1+i \\ 1-i & -i \end{pmatrix} \neq A
$$

##### Definition

$A$ is a Hermitian matrix if $A=A^H$

##### Remark

1. For $A \in \mathbb{R}^{n \times n}$,
    
    $A^T = A \stackrel{\text{def }}{\implies} A$  is a symmetric matrix.
    
2. A real symmetric matrix is Hermitian.

##### Theorem

If $A \in \mathbb{C}^{n \times n}$ is Hermitian ($A^H = A$), then

$$
x^H A x \quad \text{is real for any } x \in \mathbb{C}^n
$$

pf) Let $y = x^H A x$.

(WTS) $\bar{y} = y \implies y \in \mathbb{R}$.

$$
\begin{aligned}
\bar{y} &= \bar{y}^T = y^H = (x^H A x)^H \\
&= x^H A^H (x^H)^H \\
&= x^H A x \quad (\because A^H = A) \\
&= y
\end{aligned}
$$
$$
\bar{y} = y \quad \therefore \;y \in \mathbb{R} \quad \square
$$

##### Theorem

If $A=A^H$, then every eigenvalue is real

pf) $A\vec v = \lambda \vec v$ ($\vec v$: eigenvalue)

$\vec v^H A\vec v\in \mathbb{R}$

→ $\vec v^H(\lambda \vec v) = \lambda(\vec v^H\vec v)=\lambda\|\vec v\|^2$

$\lambda = \dfrac{\vec v^H A\vec v}{\|\vec v\|^2}\in \mathbb{R}$

##### Remark

If $A\in\mathbb{R}^{n\times n}$ is symmetric, then every eigenvalues is real

##### Theorem

Let $A\in\mathbb{C}^{n\times n}$ be Hermitian.

Then two eigenvectors corresponding to different eigenvalues are orthogonal.

pf) Let $\lambda\_1, \lambda\_2 (\lambda\_1\neq \lambda\_2)$ be eigenvalues of $A$

and $\vec v\_1,\vec v\_2$ be eigenvectors s.t.

$$
A\vec{v}_1 = \lambda_1 \vec{v}_1, \quad A\vec{v}_2 = \lambda_2 \vec{v}_2
$$
$$
v_1^H A^H v_2 = (A v_1)^H v_2 = (\lambda_1 v_1)^H v_2 = \bar{\lambda}_1 v_1^H v_2 
=v_1^H (A v_2) = v_1^H (\lambda_2 v_2) = \lambda_2 v_1^H v_2
$$

$$
\implies (\bar{\lambda}_1 - \lambda_2) v_1^H v_2 = 0
$$

Since  $A=A^H$, $\lambda\_1, \lambda\_2 \in \mathbb{R}$ 

$$
(\lambda_1 - \lambda_2) v_1^H v_2 = 0
$$

Since  $\lambda\_1 \neq \lambda\_2$,  

$$
v_1^H v_2 = \langle v_1, v_2 \rangle = 0
$$
$$
\therefore v_1, v_2 \text{ are orthogonal.}
$$

※  $A=A^H \quad (A^H := (\bar{A})^T)$





### Spectral Theorem

$A\in\mathbb{R}^{n\times n}$: real symmetric transformation matrix of $\Phi_A :V\to V \;(V=\mathbb{R}^n)$

⇒  $\exists$ orthogonal basis of  $V$  s.t.

1. **consisting of eigenvectors of $A$.**
2. **each eigenvalues are real.**

pf)  2. is proved above thm.

 1.   (case 1)

    all eigenvalues are distinct.

    $$
    \underset{\text{eigenvalues}}{(\lambda_1, \dots, \lambda_n)} \longleftrightarrow \underset{\text{eigenvectors}}{(\vec{v}_1, \dots, \vec{v}_n)}
    $$

    By Theorem. 

    $$
    v_i \perp v_j \quad \text{if } \quad i \neq j
    $$

    $(\vec{v}_1, \dots, \vec{v}_n)$ : linearly independent $n$  vectors in  $V$

    $(\vec{v}_1, \dots, \vec{v}_n)$ forms an orthogonal basis of  $V$.

    (case 2)

    $\lambda_1, \dots, \lambda_k$  : distinct eigenvalues  $(k < n)$

    $C(\lambda_1), \dots, C(\lambda_k)$ :  eigenspaces  $\dim C(\lambda_i) = n_i$

    $$
    C(\lambda_i) = \text{span} \langle \underbrace{v_{i,1}, \dots, v_{i,n_i}}_{(n_i)} \rangle
    $$

    By Schur’s lemma, $\dim \underbrace{C(\lambda_1)}_{n_1} + \cdots + \dim \underbrace{C(\lambda_k)}_{n_k} = n$

    $$
    \begin{aligned}
    C(\lambda_i) &= \text{span} \langle v_{i,1}, \dots, v_{i,n_i} \rangle \quad (n_i \text{ dim'l space}) \\ \;
    \\
    &\downarrow\text{Gram-Schmidt process} \\ \;
    \\
    &= \langle \underbrace{w_{i,1}, \dots, w_{i,n_i}}_{\text{orthogonal}} \rangle
    \end{aligned}
    $$

    $$
    ( \underbrace{w_{1,1}, \dots, w_{1,n_1}}_{C(\lambda_1)}, \ \dots, \ \underbrace{w_{k,1}, \dots, w_{k,n_k}}_{C(\lambda_k)} )  \text{ forms an orthogonal basis of } V.
    $$

    $\implies w_{i_l}\perp w_{j_{l'}}\quad(i\neq j\text{ or }$ 

즉, real symmetric $A$가 존재하면 eigenvector들로 만들어진 orthogonal basis를 만들 수 있다.

⇒  $A$가 real matrix이지만, symmetric이 아닐 경우,

$B=A^TA$를 만들어서 real symmetric의 성질을 활용함

#### Spectral Decomposition

$A$: real symmetric matrix  $(A\in \mathbb{R}^{n\times n})$

then $A=PDP^T$  ($D$: diagonal matrix, $P$: orthogonal matrix)

$\|A - \lambda I\| = 0$  : char. eq. has solutions  $\lambda\_1, \dots, \lambda\_n$  (may not be distinct).

$\exists(v\_1, \dots, v\_n)$: corresponding eigenvectors.

→  which form an orthogonal basis of $\mathbb{R}^n$

$$
P := \begin{bmatrix} v_1 & \cdots & v_n \end{bmatrix} \quad (\implies P^{-1} = P^T)
$$

※ orthogonal matrix는 역행렬=전치행렬

$P$ is constructed using the eigenvectors as columns. The condition $P^{-1} = P^T$ implies that $P$ is an **orthogonal matrix** (assuming $v_i$ are orthonormal).

$$
\begin{aligned} [\;A\;] [v_1 \cdots v_n] &= [A v_1 \cdots A v_n] \\&= [\lambda_1 v_1 \cdots \lambda_n v_n] \\&= \underbrace{\begin{pmatrix} v_1 \cdots v_n \end{pmatrix}}_{P} \underbrace{\begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}}_{D}
\end{aligned}
$$

$$
AP = PD
D = \begin{pmatrix} \lambda_1 & 0 \\ 0 & \lambda_n \end{pmatrix}
A = PDP^T
$$

##### Remark (Decomposition)

$P$: orthogonal matrix ($PP^T=I$)

$$
\begin{aligned}
A=PDP^T&= \begin{pmatrix} v_1 \cdots v_n \end{pmatrix} \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix} \begin{pmatrix} v_1^T \\ \vdots\\  v_n^T \end{pmatrix}\\&=\begin{pmatrix} \\v_1\lambda_1 \cdots v_n \lambda_n \\\,\end{pmatrix} \begin{pmatrix} v_1^T \\ \vdots\\  v_n^T \end{pmatrix}\\&= \lambda_1 v_1 v_1^T+\lambda_2 v_2 v_2^T+\cdots+\lambda_n v_n v_n^T\quad(v_iv_i^T:n\times n\text{ matrix})
\end{aligned}
$$

$\text{rank}(v_iv_i^T)=1$

즉,

$$
A= \lambda_1 \begin{bmatrix}v_1 v_1^T\end{bmatrix}_{n\times n}+\lambda_2 \begin{bmatrix}v_2 v_2^T\end{bmatrix}_{n\times n}+\cdots+\lambda_n \begin{bmatrix}v_n v_n^T\end{bmatrix}_{n\times n}
$$

이고, 

특히, 이러한 decomposition을 거치면 $\|\lambda\_1\| \ge \|\lambda\_2\| \ge \dots \ge \|\lambda\_n\|$일 때 무시할 만큼 작은 값 $\lambda\_i, ...,\lambda\_n$에 대한 항을 제할 수 있음 → Approximation

##### Theorem

For $A \in \mathbb{R}^{n \times n}$

1. The determinant of $A$: $\det(A) = \|A\| = \prod\_{i=1}^n \lambda\_i$
    
    where $\lambda_i$ are (possibly repeated) eigenvalues of $A$.
    
2. The trace of $A \in \mathbb{R}^{n \times n}$ is 
    
    $$
    \text{tr}(A) = \sum_{i=1}^n \lambda_i
    $$
    

pf)  For $A = PDP^{-1}$. 

 1.  $\det(A) = \det(PDP^{-1}) = \det(P)\det(D)\det(P^{-1}) 
= \det(D) = \prod_{i=1}^n \lambda_i$

 2. $\text{tr}(A) = \text{tr}(PDP^{-1}) = \text{tr}(P^{-1}PD) 
= \text{tr}(D) = \sum_{i=1}^n \lambda_i$

    Note:  $\text{tr}(AB) = \text{tr}(BA)$

#### Cholesky Decomposition

$A$: symmetric, positive definite matrix

$\implies A=LL^T$  ($L$: lower triangular with positive diagonal element)

$L$: Cholesky factor (unique)

1. $A: \text{symmetric} \quad \xrightarrow[\text{Decomp}]{\text{Spectral}} \quad A = PDP^T$
    
    $$
    P = \begin{bmatrix} v_1 & \cdots & v_n \end{bmatrix} , \; D = \begin{bmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{bmatrix} \quad(\lambda_i >0)
    $$
    
2. Moreover, $A$: positive definite $\implies$ All eigenvalues are positive.
    
    ($\because (\text{for }v_i\neq 0)\; A v_i = \lambda_i v_i\implies v_i^T A v_i = v_i^T (\lambda_i v_i) = \lambda_i (v_i^T v_i) = \lambda_i \|v_i\|^2 > 0$)
    
    $$
    \sqrt{D} := \text{diag}(\sqrt{\lambda_1}, \dots, \sqrt{\lambda_n}) \quad (\sqrt{D}\sqrt{D}=D, \; \sqrt{D}=\sqrt{D}^T)
    $$
    
    $$
    A = PDP^T = P \sqrt{D} \sqrt{D}^T P^T = \underbrace{(P\sqrt{D}) }_L \underbrace{(P\sqrt{D})^T\!}_{L^T}
    $$
    
    ※ $P$를 만들 때, eigenvector를 lower triangular가 되도록 선택해야 함
    

※  일반적으로 주어지는 대상 행렬은 깔끔하지 않은 형태이므로 decomposition하기 어렵지만,

$A$가 symmetric positive definite인지 확인하면 eigenvalue를 구하지 않고도 decomposition할 수 있음

#### Story for the Cholesky Decomposition

$A\in\mathbb{R}^{n\times n}$

Characteristic poly. $f(\lambda)=\det(A-\lambda I)=\|A-\lambda I\|$: $n$차 다항식

Characteristic eq. $f(\lambda)=0\;\cdots$ 방정식의 해 = eigenvalues $\lambda\_1,...,\lambda\_k \;(k\le n)$

Eigenspace $C(\lambda_1),...,C(\lambda_k)$ = eigenvector $v_{i,1},...,v_{i,n_i}$로 이뤄진(span하는) 부분공간

$C(\lambda_i)=\langle \underbrace{v_{i,1},...,v_{i,n_i}}_{n_i\text{ 개}} \rangle$   $\dim C(\lambda_i)\ge 1$

$f(\lambda) = (\lambda - \lambda_1)^{n_1} \cdots (\lambda - \lambda_k)^{n_k}$

- $n_j :$ algebraic multiplicity (AM)
- $\dim C(\lambda_j):$ geometric multiplicity (GM)

 $1\le \dim C(\lambda_j)\le n_j$ 

$A$: defective ⇒ $\dim C(\lambda_1)+\cdots +\dim C(\lambda_k)\lneq n$ (즉, GM<AM)

→ eigenvalue가 vertorspace $\mathbb{R}^n$의 basis를 만들 수 없음

e.g., $$A=\begin{pmatrix}
1 & 1\\ 0 & 1
\end{pmatrix}$$

$$A \in \mathbb{R}^{n \times n} \text{ has } n \text{ distinct eigenvalues } \underbrace{\lambda_1}_{\rightarrow\  C(\lambda_1)}, \dots, \underbrace{\lambda_n}_{\rightarrow\  C(\lambda_n)}\implies A : \text{non-defective.}$$

$S = A^T A$ : symmetric, positive-semidefinite.

$x^T S x \ge 0 \quad \text{for all } x \in \mathbb{R}^n$

Hermitian : $A \in \mathbb{C}^{n \times n}, \quad A^H = (\overline{A})^T$

Hermitian matrix : $A^H = A \implies A$   →  all eigenvalues are real

$A : \text{real symmetric} \implies A^H = (\overline{A})^T = A$

⇒ $A$ : Hermitian & all eigenvalues are real

$A$ : Hermitian matrix but $\lambda_i\neq \lambda_j \implies v_i\perp v_j$

→ Spectral Decomposition

$A\in\mathbb{R}^{n\times n}$ : real symmetrix → Hermitian matrix

⇒ $\exists$ orthogonal basis $[B]$ of $mathbb{R}^n$ s.t. 

$$P=\begin{bmatrix}
\\
v_1 & \dots & v_n\\
\
\end{bmatrix}$$ where  $v_1 , \dots , v_n$ are eigenvectors

$A=PDP^T$ can be decomposed with $$D=\begin{pmatrix}
\lambda_1&&0\\
 & \ddots & \\
0&&\lambda_n
\end{pmatrix}$$

$$
\begin{aligned}
A&=\begin{bmatrix}
\\
v_1 & \dots & v_n\\
\
\end{bmatrix}\begin{pmatrix}
\lambda_1&&0\\
 & \ddots & \\
0&&\lambda_n
\end{pmatrix}\begin{bmatrix}
&v_1^T&\\
 & \vdots & \\
&v_n^T&
\end{bmatrix}\\&
=\begin{bmatrix}
\\
v_1 \lambda_1 & \dots & v_n \lambda_n\\
\
\end{bmatrix}\begin{bmatrix}
&v_1^T&\\
 & \vdots & \\
&v_n^T&
\end{bmatrix}\\[2em]&
=\lambda_1 \begin{bmatrix}
v_1 v_1^T \end{bmatrix}_{n\times n}+\cdots + \lambda_n \begin{bmatrix}
v_n v_n^T \end{bmatrix}_{n\times n}\quad\text{: Spectral Decomposition}
\end{aligned}
$$

$$
\implies A\approx\lambda_1 \begin{bmatrix}
v_1 v_1^T \end{bmatrix}_{n\times n}+\cdots + \lambda_i \begin{bmatrix}
v_i v_i^T \end{bmatrix}_{n\times n}\quad(i\ll n)
$$

Cholesky Decomposition (응용학에 유용)

$A$: real symmetric (⇒ Hermitian matrix)

and positive definite (⇒ all eigenvalues are positive)

⇒ $A=LL^T$  ($L$: lower triangular with positive diagonal elements)

$$
A = \begin{bmatrix}
l_{11} & \cdots && 0 \\
l_{21} & l_{22} && \vdots\\
\vdots & * & \ddots & \\
l_{n1} &\cdots & & l_{nn}
\end{bmatrix}
\begin{bmatrix}
l_{11} & l_{21} & \cdots & l_{n1} \\
\vdots & l_{22} & * & \vdots \\
 & & \ddots & \\
0 &&\cdots & l_{nn}
\end{bmatrix}
$$

1. $A$ : symmetric ⇒ $A=PDP^T$   by spectral decomposition
2. $A$ : positive definite matrix ⇒ all eigenvalues are positive
    
    $$
    A \vec{v}_i = \lambda_i \vec{v}_i \quad 
    $$
    $$
    \implies v_i^T (A v_i) = v_i^T (\lambda_i v_i) = \lambda_i \|v_i\|^2 > 0\quad
    \therefore \ \lambda_i > 0
    $$
    
3. 
    $$
    \begin{aligned}
    D &= \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}= \begin{pmatrix} \sqrt{\lambda_1} & & 0 \\ & \ddots & \\ 0 & & \sqrt{\lambda_n} \end{pmatrix}\begin{pmatrix} \sqrt{\lambda_1} & & 0 \\ & \ddots & \\ 0 & & \sqrt{\lambda_n} \end{pmatrix}\\[2em]
    &= \sqrt{D} \cdot \sqrt{D}
    (\lambda_i > 0)
    \end{aligned}
    $$

⇒ By 1.~3. $A=PDP^T=P(\sqrt{D}\sqrt{D})P^T=P\sqrt{D}\sqrt{D}^TP^T=(P\sqrt{D})(P\sqrt{D})^T=LL^T$

##### Example

$A\in\mathbb{R}^{3\times 3}$

$$
\begin{aligned}A &= [a_{ij}] = L L^T =\begin{bmatrix}l_{11} & 0 & 0 \\l_{21} & l_{22} & 0 \\l_{31} & l_{32} & l_{33}\end{bmatrix}\begin{bmatrix}l_{11} & l_{21} & l_{31} \\0 & l_{22} & l_{32} \\0 & 0 & l_{33}\end{bmatrix}\\[2em] &
= \begin{bmatrix}
l_{11}^2 & l_{11}l_{21} & l_{11}l_{31} \\[.5em]
l_{21}l_{11} & l_{21}^2 + l_{22}^2 & l_{21}l_{31} + l_{22}l_{32} \\[.5em]
l_{31}l_{11} & l_{31}l_{21} + l_{32}l_{22} & l_{31}^2 + l_{32}^2 + l_{33}^2
\end{bmatrix}
\end{aligned}
$$

For the first column

$$
\begin{cases}l_{11}^2 = a_{11} \implies l_{11} = \sqrt{a_{11}} \\[.7em]
l_{21}l_{11} = a_{21} \implies l_{21} = \dfrac{a_{21}}{l_{11}} = \dfrac{a_{21}}{\sqrt{a_{11}}} \\[1.2em] l_{31}l_{11} = a_{31} \implies l_{31} = \dfrac{a_{31}}{l_{11}}\end{cases}
$$

then the second column

$$
\begin{cases}
l_{22}^2 + l_{21}^2 = a_{22} \implies l_{22} = \sqrt{a_{22} - l_{21}^2}\\[.5em]
l_{31}l_{21} + l_{32}l_{22} = a_{32} \implies l_{32} = (a_{32} - l_{31}l_{21}) / l_{22}
\end{cases}
$$

last,

$$
l_{31}^2 + l_{32}^2 + l_{33}^2 = a_{33} \implies l_{33} = \sqrt{a_{33} - l_{31}^2 - l_{32}^2}
$$

⇒ 즉, column들에 대하여 순서대로 $l$을 결정하면 $A=LL^T$를 만족하는 $L$을 구할 수 있음

- Spectral decomposition은 eigenvalue들을 크기 순으로 정렬할 수 있는 경우 approximation에 유용함
- Cholesky decomposition은 $Ax=b$ 방정식을 풀어야 하는 경우에 유용함
    
    ($L$이 dinaonal matrix이기 때문에 $x_n$부터 $x_1$까지 순차적으로 결정해 나가기 쉬움)
    
    또한, eigenvalue나 eigenvector를 몰라도 numerical하게(대입하며) 풀 수 있음




#### Diagonalization

$A\in\mathbb{R}^{n\times n}$ is diagonalizable if it is similar to a diagonal matrix $D=P^{-1}AP$

$A$가 diagonalizable하다는 것은  
$$
\begin{matrix}
\mathbb{R}^n& \xrightarrow{\Phi_A} &\mathbb{R}^n\\
B=(v_1,...,v_n)& &(w_1,...,w_n)
\end{matrix}
$$ 
에서 $A_{[B]}$와 $\Phi_A(A_{[B]})$의 basis가 $(v_1,...,v_n)=(w_1,...,w_n)$으로 같음을 의미함

$$
D = P^{-1} A P,\qquad
D = \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}
$$
$$
Dx = D \begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix} = \lambda_1 \;\,\underbrace{\!\!\!\begin{pmatrix} x_1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}\!\!\!}_{x_1 v_1} + \dots + \lambda_n \;\,\underbrace{\!\!\!\begin{pmatrix} 0 \\ \vdots \\ 0 \\ x_n \end{pmatrix}\!\!\!}_{x_n v_n}
$$
$$
\begin{pmatrix} x_1 \\ \vdots \\ x_n \end{pmatrix} = x_1 \vec{v}_1 + \dots + x_n \vec{v}_n
$$

→  즉, $\Phi_A$는 basis는 바꾸지 않는 확대, 축소, 대칭 등의 사상임

##### Theorem

$A=PDP^{-1}$ (diagonalizable) $\iff$ $A$ is nondefective (: eigenvectors form a basis)

##### Theorem

If $A$ is real symmetric, then $A$ is diagonalizable

real symmetric ⇒ Hermitian matrix ⇒ eigenvectors are orthogonal ⇒ $\exists$ orthonomal basis ⇒ diagonalizable

##### Remark

1. In fact, if $A$ is normal$(\iff AA^H=A^HA)$, $A$ is diagonalizable
2. A real symmetric matrix is normal
3. What if $A$ is defective? (= $A$ is not diagonalizable)
    
    Instead, $A$ has the Jordan form (block diagonal and some blocks are diagonal)
    
    $$
    A = P J P^{-1} = P
    \begin{pmatrix}
    \boxed{\begin{matrix} \lambda_1 & \cdots \\ \vdots & \lambda_1 \end{matrix}} & & & 0 \\[-.5em]
    &  & \\
    &\boxed{\begin{matrix} \lambda_2\!\!\! & \!\!\!1& 0\\
    \!\!\!&\!\!\!\ddots\!\!\! &1 \\[-.7em] & &\!\!\! \lambda_2 \end{matrix}} & &  \\[2em]
    &  &\ddots & \\
    0 & & & \boxed{\begin{matrix} \lambda_k & \cdots \\ \vdots & \lambda_k \end{matrix}}
    \end{pmatrix}
    P^{-1}
    $$
    
    $C(\lambda_1): \text{GM}=\text{AM},\;C(\lambda_k): \text{GM}=\text{AM}$
    
    $$\implies\dim C(\lambda_1)=n_1$  where  $f(\lambda)=|A-\lambda I|=(\lambda-\lambda_1)^{n_1}(\lambda-\lambda_2)^{n_2}\cdots$$
    
    For some $\lambda_i$, e.g., $\text{GM}=\dim C(\lambda_2)\lneq n_2=\text{AM}$ (subdiagonal with “1”)
    

Suppose that $A$ is not defective (⇒ can be diagonalized ⇒ eigenvectors are a basis)

$$
\begin{matrix}
(\lambda_1,& \dots,& \lambda_n&\!\!\!\!\!\!) : & \text{eigenvalues (possibly repeated)} \\\updownarrow&&\updownarrow& \\(v_1,& \dots,& v_n&\!\!\!\!\!\!) : & \!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\text{eigenvectors}
\end{matrix}
$$

$$
P=\begin{pmatrix}\\
v_1&\cdots&v_n\\
\
\end{pmatrix}\quad\text{: ordered basis matrix}
$$

$$
\begin{aligned}
AP&=A\begin{pmatrix}\\
v_1&\cdots&v_n\\
\
\end{pmatrix}=\begin{pmatrix}\\
Av_1&\cdots&Av_n\\
\
\end{pmatrix}\\&=\begin{pmatrix}\\
\lambda_1v_1&\cdots&\lambda_n v_n\\
\
\end{pmatrix}\quad(\because A\vec v_j = \lambda_j \vec v_j)\\&=\begin{pmatrix}\\
v_1&\cdots& v_n\\
\
\end{pmatrix}\begin{pmatrix}
\lambda_1&&0\\
&\ddots& \\
0&&\lambda_n
\end{pmatrix}=PD\\[2em]
\therefore A&=PDP^{-1}
\end{aligned}
$$

### Eigendecomposition

$$
\begin{aligned}
A_{n\times n} &= PDP^{-1} = \begin{bmatrix} v_1 \cdots v_n \end{bmatrix}\begin{bmatrix} \lambda_1 & 0 \\ 0 & \lambda_n \end{bmatrix}\begin{bmatrix} w_1^T \\ \vdots \\ w_n^T \end{bmatrix}\\&
= \begin{bmatrix} \lambda_1 v_1 \cdots \lambda_n v_n \end{bmatrix}\begin{bmatrix} w_1^T \\ \vdots \\ w_n^T \end{bmatrix}\\&
= \lambda_1 [v_1 w_1^T]_{n\times n} + \dots + \lambda_n [v_n w_n^T]_{n\times n}
\end{aligned}
$$

Cholesky decomposition은 $Ax=b$를 푸는 데 도움이 됨

Eigendecomposition은 Spectral decomposition과 같이 approximation에 유용함

### SVD(Singular Value Decomposition)

$A$가 $n\times n$ matrix가 아닌 $m\times n$ matrix일 때도 똑같이 decomposition 가능한가?

$$
\begin{aligned}
&A \in \mathbb{R}^{m \times n} \quad \text{rectangular matrix of rank } r \quad (0 \le r \le \min(m, n))\\

&\text{Then SVD of A is of the form}
\end{aligned}
$$

$$
[A]_{m \times n} = [U]_{m \times m} [\Sigma]_{m \times n} [V^T]_{n \times n}
$$

$$
\begin{aligned}
\text{where} \quad &U : \text{orthogonal matrix} \quad U = [u_1 \dots u_m]\\
&V : \text{orthogonal matrix} \quad V = [v_1 \dots v_n]\\
&\Sigma_{m \times n} : \begin{cases}
\Sigma_{ii} = \sigma_i \ge 0 \quad (\text{called the singular values}) \\ 
\Sigma_{ij} = 0 \quad \text{if } i \neq j
\end{cases}\\
&\text{Convention : singular values are ordered by}\\
& \qquad\qquad\qquad \sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r \ge 0
\end{aligned}
$$

##### Remark

1. The singular value matrix $\Sigma$ is unique
2. $m>n$
    
    $$
    [A]_{m \times n} = [U]_{m \times m}
    [\Sigma]_{m \times n}
    [V^T]_{n \times n}
    $$
    $$
    \text{where } \Sigma=\left[\begin{array}{ccc}
    \sigma_1 & & 0 \\
    & \!\!\!\!\ddots\!\!\!\! & \\[-.6em]
    0 & & \sigma_n \\[.3em]
    \hline \\
    & \!\!\!\!0\!\!\!\! & \\ \
    \end{array}\right]_{m\times n}
    $$
    
3. $m<n$
    
    $$
    [A]_{m \times n} = [U]_{m \times m}
    [\Sigma]_{m \times n}
    [V^T]_{n \times n}
    $$
    $$
    \text{where } \Sigma=\left[\begin{array}{ccc|ccc}
    \sigma_1 & & 0 &&&\\
    & \!\!\!\!\ddots\!\!\!\! & &&0 \\[-.2em]
    0 & & \sigma_n 
    \end{array}\right]_{m\times n}
    $$
    
4. $m=n$
    
    $$
    [A]_{m \times n} = [U]_{m \times m}
    [\Sigma]_{m \times n}
    [V^T]_{n \times n}\\[1em]
    \text{where } \Sigma=\left[\begin{array}{ccc}
    \sigma_1 & & 0 \\
    & \!\!\!\!\ddots\!\!\!\!  \\[-.2em]
    0 & & \sigma_n 
    \end{array}\right]_{m\times n}
    $$
    
- Eigendecomposition $A=PDP^{-1}$에서는 $D$의 eigenvalue가 음수일 수 있음
- SVD에서는 $\Sigma$의 eigenvalue가 모두 양수이고 음수에 관련된 것들은 $U, V$로 보냄
1. $U$: orthogonal matrix ($UU^T=I$)
    
    ⇒  rotation/reflection 
    $$
    \begin{pmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{pmatrix}, \quad \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
    $$
    
    $$
    \mathbb{R}^n \xrightarrow[\text{(rotation)}]{V^T} \mathbb{R}^n \xrightarrow[\text{stretching}]{\Sigma} \mathbb{R}^m \xrightarrow[\text{(rotation)}]{U} \mathbb{R}^m
    $$
    $$
    \xrightarrow[\qquad\qquad\text{linear transformation}\qquad\qquad]{A}
    $$
    
    
    <div style="text-align: center;">
        <img src="{{ '/assets/img/post/linear_algebra/image5.png' | relative_url }}" style="width: 25%; display: inline-block; margin: 0 5px;" alt="no_in_encoding_attack_structure_3">
        <img src="{{ '/assets/img/post/linear_algebra/image6.png' | relative_url }}" style="width: 65%; display: inline-block; margin: 0 5px;" alt="no_in_encoding_attack_structure_5">
    </div>

    
    $\text{rank}\Sigma$ = #(nonzero $\sigma_i$)
    

#### Construction of SVD

$A^T_{n \times m} A_{m \times n} \in \mathbb{R}^{n \times n}$ :  Symmetric, Positive semidefinite

$$
A^T A = PDP^T
$$
$$
P = (v_1 \dots v_n) : \text{orthogonal matrix } (PP^T = I)
$$
$$
D = \begin{pmatrix} \lambda_1 & & 0 \\ & \ddots & \\ 0 & & \lambda_n \end{pmatrix}_{n \times n}\qquad (\lambda_i\ge 0)
$$

Assume that SVD of $A$ exists

Then 

$$
\begin{aligned}
A^T A &= (U \Sigma V^T)^T (U \Sigma V^T)\\&= V \Sigma^T (U^T U) \Sigma V^T\\&= V \Sigma^T \Sigma V^T = V
\begin{bmatrix}
\sigma_1^2 & & \\
& \ddots & \\
& & \sigma_n^2
\end{bmatrix}_{n \times n}
V^T
\end{aligned}
$$

Therefore

$$
\begin{aligned}
A^TA=PDP^{-1}&=P\begin{bmatrix}
\lambda_1 & & \\
& \ddots & \\
& & \lambda_n
\end{bmatrix}P^T\\&=V\begin{bmatrix}
\sigma_1^2 & & \\
& \ddots & \\
& & \sigma_n^2
\end{bmatrix}V^T=V\Sigma^T\Sigma V^T
\end{aligned}
$$
$$
\therefore\;
V^T=P^T,\; \sigma_i^2=\lambda_i
$$

$$
\begin{aligned}
A A^T &= (U \Sigma V^T) (U \Sigma V^T)^T\\&
= U \Sigma (V^T V) \Sigma^T U^T\\&
= U \Sigma \Sigma^T U^T \\&= U\begin{bmatrix}\sigma_1^2 & & & \\& \ddots & & \\& & \sigma_r^2 & \\& & & 0\end{bmatrix}_{m \times m}\!\!\!\!\!\!\!\!\!U^T
\end{aligned}
$$

$A A^T$ : Symmetric, positive semidefinite

$A A^T = S D S^T$

Note that $n \times n$ square matrix $B$ and $B^T$ have the same eigenvalues.

⇒ $AA^T,\; A^TA$ have the same eigenvalues

$V$: eigenvectors of $A^T A$,   $V=[v_1,...,v_n]$

⇒  $A_{v_i}\perp A_{v_j}$ if $i\neq j (i,j\le r)$

$(Av_i)^T A v_j = v_i^T (A^T A) v_j= v_i^T \lambda_j v_j= \lambda_j \underbrace{v_i^T v_j}_{0} = 0$  because $v_i\perp v_j$

$\\{ Av_1, Av_2, \dots, \underset{\substack{\;\;\;\uparrow \\\;\;\ \text{rank}}}{Av_r} \\}$ forms a basis of $r$-dimensional subspace of  $\mathbb{R}^m$

$A = U \Sigma V^T \quad \implies \quad A V = U \Sigma$    ($U$: orthogonal matrix)

- $AV = A [v_1 \dots v_n] = [Av_1 \dots Av_n]$
- 
    $$
    \begin{aligned}
    U \Sigma &= \begin{bmatrix} u_1 & \cdots & u_m \end{bmatrix}
    \begin{bmatrix}
    \sigma_1 & \cdots & 0 \\
    \vdots & \ddots & \vdots \\
    0 & \cdots & \sigma_m
    \end{bmatrix} \\
    &= \begin{bmatrix} \sigma_1 u_1 & \cdots & u_m \sigma_m \end{bmatrix}
    \end{aligned}
    $$  ($\sigma_r$ 까지만 유의미함)

$$
\implies \left\{
\begin{aligned}
A v_1 &= \sigma_1 u_1 \\
&\vdots \\
A v_r &= \sigma_r u_r
\end{aligned}
\right.\quad\begin{aligned}&\Rightarrow \; 
\begin{cases} 
u_i = \frac{1}{\sigma_i} A v_i \quad (i=1, \dots, r) \\ 
u_{r+1}, \dots, u_m \quad (\text{orthogonal condition (Gram-Schmidt)}) 
\end{cases} \\
&\Rightarrow \;\{ u_1, \dots, u_r, u_{r+1}, \dots, u_m \} : \text{orthonormal basis}
\end{aligned}
$$

$$
\begin{aligned}
\| A v_i \|^2 
&= (A v_i)^T (A v_i) \\
&= v_i^T A^T A v_i = \lambda_i \| v_i \|^2
\end{aligned}
$$

$$
\| A v_i \| = \sqrt{\lambda_i} = \sigma_i
$$
$$
u_i = \dfrac{A v_i}{\| A v_i \|} = \dfrac{A v_i}{\sigma_i}
$$

⇒ orthonormal  $\|u_i\|=1$

$$
\begin{aligned}
A &= \!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\underset{\substack{\uparrow \\\quad\quad\quad\quad\quad\quad\quad\quad (\text{rotations}) \implies \underline{\text{basis changes}\! \!\!\!\!\!\! \!\!\!\!\!\! \!\!\!\!\!\! \!\!\!\!\!\! \!\!\!\!\!}}}{U} {\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\!\! \underset{\substack{\text{stretching}}}\Sigma\! \!\!\!\!\!} \underset{\nearrow}{\;\;\;\;\;V^T}
\end{aligned}
$$

##### Example

$$
A = \begin{bmatrix} 2 & 2 \\ 1 & 1 \end{bmatrix} = 
\underbrace{\frac{1}{\sqrt{5}} \begin{bmatrix} 2 & 1 \\ -1 & 2 \end{bmatrix}}_{U \text{ (rotation)}} 
\underbrace{\begin{bmatrix} \sqrt{10} & 0 \\ 0 & 0 \end{bmatrix}}_{\Sigma} 
\underbrace{\frac{1}{\sqrt{2}} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}}_{V^T}
$$

*Note: The rotation matrix form is typically*
$$
\begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix}.
$$

$$
\begin{aligned}
A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} &= U(\theta_2) \cdot \Sigma(\sigma_1, \sigma_2) \cdot V^T(\theta_1)
$$
$$
(a, b, c, d) &\longleftrightarrow (\theta_1, \theta_2, \sigma_1, \sigma_2)
\end{aligned}
$$

##### Example

$$
\begin{aligned}
A &= \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} = U \Sigma V^T \\
A^T A &= \begin{bmatrix} -1 & 0 \\ 1 & -1 \\ 0 & 1 \end{bmatrix} \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} \\
&= \begin{bmatrix} 1 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 1 \end{bmatrix} = P D P^T = V \Sigma^T \Sigma V^T \\
\\
| A^T A - \lambda I | &= \left| \begin{matrix} 1-\lambda & -1 & 0 \\ -1 & 2-\lambda & -1 \\ 0 & -1 & 1-\lambda \end{matrix} \right| \\
&= (1-\lambda) \left| \begin{matrix} 2-\lambda & -1 \\ -1 & 1-\lambda \end{matrix} \right| + \left| \begin{matrix} -1 & -1 \\ 0 & 1-\lambda \end{matrix} \right| \\
&= (1-\lambda)(\lambda^2 - 3\lambda + 1) + (-1)(1-\lambda) \\
&= (1-\lambda)\lambda(\lambda-3) = 0
\end{aligned}
$$

$$
\lambda_1 = 3, \quad \lambda_2 = 1, \quad \lambda_3 = 0
$$
$$
\sigma_1 = \sqrt{3},\; \sigma_2 = \sqrt{1} = 1, \; \sigma_3 = \sqrt{0} 
$$
$$
\Sigma_{2\times 3}=\begin{bmatrix}
\sqrt{3} & 0 & 0\\
0 & 1 & 0
\end{bmatrix}
$$

For **$\lambda_1 = 3$**

$$
\begin{pmatrix} -2 & -1 & 0 \\ -1 & -1 & -1 \\ 0 & -1 & -2 \end{pmatrix} v_1 = 0 \quad \Rightarrow \quad v_1 = \frac{1}{\sqrt{6}} \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}
$$

For **$\lambda_2 = 1$**

$$
\begin{pmatrix} 0 & -1 & 0 \\ -1 & 1 & -1 \\ 0 & -1 & 0 \end{pmatrix} v_2 = 0 \quad \Rightarrow \quad v_2 = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}
$$

For $\lambda_3 = 0$

$$
\begin{pmatrix} 1 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 1 \end{pmatrix} v_3 = 0 \quad \Rightarrow \quad v_3 = \frac{1}{\sqrt{3}} \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}
$$

$$
V = [v_1, v_2, v_3] = \begin{pmatrix} 1/\sqrt{6} & -1/\sqrt{2} & 1/\sqrt{3} \\ -2/\sqrt{6} & 0 & 1/\sqrt{3} \\ 1/\sqrt{6} & 1/\sqrt{2} & 1/\sqrt{3} \end{pmatrix}, \quad
\begin{cases}
\sigma_1 = \sqrt{3} \\
\sigma_2 = 1
\end{cases}
$$

$$
u_1 = \frac{1}{\sigma_1} A v_1 = \frac{1}{\sqrt{3}} \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} \frac{1}{\sqrt{6}} \begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 1 \end{pmatrix}
$$

$$
u_2 = \frac{1}{\sigma_2} A v_2 = \begin{bmatrix} -1 & 1 & 0 \\ 0 & -1 & 1 \end{bmatrix} \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \end{pmatrix}
$$

$$
U = [u_1, u_2] = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 & 1 \\ 1 & 1 \end{pmatrix}
$$

$$
\implies A = \underbrace{\frac{1}{\sqrt{2}} \begin{bmatrix} -1 & 1 \\ 1 & 1 \end{bmatrix}}_{U}\;
\underbrace{\begin{bmatrix} \sqrt{3} & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}}_{\Sigma}
\underbrace{\begin{bmatrix} 1/\sqrt{6} & -2/\sqrt{6} & 1/\sqrt{6} \\ -1/\sqrt{2} & 0 & 1/\sqrt{2} \\ 1/\sqrt{3} & 1/\sqrt{3} & 1/\sqrt{3} \end{bmatrix}}_{V^T}
$$

#### SVD

$$
\begin{aligned}A_{m \times n} &= U \Sigma V^T = \underbrace{\begin{bmatrix} u_1 & \cdots & u_m \end{bmatrix}}_{m \times m} 
\underbrace{\begin{bmatrix} \sigma_1 & & 0 \\ & \ddots & \\ 0 & & 0 \end{bmatrix}}_{m \times n} 
\underbrace{\begin{bmatrix} v_1^T \\ \vdots \\ v_n^T \end{bmatrix}}_{n \times n}\\&
= \sigma_1 u_1 v_1^T + \sigma_2 u_2 v_2^T + \cdots + \sigma_r u_r v_r^T
\end{aligned}
$$

$u_i v_i^T$ : $n\times n$ matrix,  $\sigma_1 \ge \sigma_2 \ge \cdots \ge \sigma_r > 0$
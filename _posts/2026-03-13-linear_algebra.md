---
layout: post
title: "Algebra"
date: 2026-03-13
# last_modified_at: 2026-03-12
description: "Algebra: From Linear to Abstract"
tags: [MATH]
categories: [Study]
---


📖 [MAIN] 이인석, (개정판) 학부 대수학 강의 I 선형대수와 군, 2015, 서울대학교출판문화원
<!-- 📚 [SUB] Strang, Gilbert. *Linear algebra and its applications*. 2012. -->



### 선형대수학

#### 행렬과 Gauss 소거법

##### Matrix

<img src="{{ '/assets/img/post/algebra/260313_1.jpg' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="image">

_~이해하고 활용할 수 있는 연산은 선형 연산 뿐이다~_

- $A$의 대각성분의 합 trace 
$$\text{tr}(A) = \sum_{i=1}^n a_{ii}$$
가 무슨 의미가 있는지?
    - $2\times 2$ 행렬 $A$에 대하여 
    $$A^2 - \text{tr}(A)\cdot A + \det(A) = 0$$

- Invertible matrix $A$의 inverse는 유일하다
    - $2\times 2$ 행렬 $A$에 대하여 
    $$A^{-1} = \frac{1}{ad-bc} \begin{pmatrix} a_{22} & -a_{21} \\ -a_{12} & a_{11} \end{pmatrix}$$
    - $A$가 가역 $\iff$ $\det(A) \neq 0$
    15. 가역행렬은 행렬의 곱셈 구조에 관한 것이고, 덧셈과는 무관

- 가장 다루기 쉬운 행렬 = 대각 행렬 (행렬을 분해하는 이유)

##### Gaussian Elimination

- 행렬은 연립방정식의 'coefficient' matrix로 볼 수 있음

- $AX=B$의 해집합은 leading 1을 갖는 `선형 독립인 열에 대응되는` 미지수로 표현됨
    - $x\_1, x\_2, x\_3$이 leading 1을 가지고, 
    $x'\_1, x'\_2, x'\_3, x'\_4$가 leading 1을 가지지 못한다면, 해집합은

    $$
    \{(x_1, x_2, x_3,x'_1, x'_2, x'_3, x'_4):x_1 = \sum_i c_i, x'_i, x_2 = \sum_i c'_i, x_3 = \sum_i c''_i\}
    $$

    가 됨.
    $x\_1, x\_2, x\_3$는 $x'\_1, x'\_2, x'\_3, x'\_4$로 표현 가능하고,
    $x'\_1, x'\_2, x'\_3, x'\_4$가 임의의 값을 가질 수 있음
    ($x\_1, x\_2, x\_3$는 $x'\_1, x'\_2, x'\_3, x'\_4$에 의해 유일하게 결정됨)
    
    - 따라서, 해집합의 크기 = 선형 독립인 열의 개수

##### Elementary Matrix

- Gaussian elimination의 row operation은 `션형 연산이므로` 행렬로 표현 가능함
    - 이 row operation들은 가역이고, 역행렬도 이 row operation 중 하나임

    - 이 행렬을 곱해 얻은 행렬은 서로 동치임 (row-equivalent)

- Invertible RREF는 $I$ 뿐임
    - $A\sim I$이면, Gaussian elimination을 위한 행렬 $E$가 존재하는 것이므로 $A$는 가역

    - 한편, $AX=0$이 trivial solution $0$를 유일해로 가지면
    $A\sim I$
    - 따라서, $AX=0$이 trivial solution $0$를 유일해로 가지면 $A$는 가역
        - $BA=I$이고 $X$가 $AX=0$의 해면, 
        $X=IX=BAX=B0=0$이므로 $AX=0$이 trivial solution만을 가짐  
        즉, $A$가 가역이므로 $BA=I\implies B=A^{-1}$이고, $AB=I$임
    
    * $AX=0$이 trivial solution만 가질 때 $A$가 가역임을 추후 또 다른 방식으로 증명

<img src="{{ '/assets/img/post/algebra/260313_1.jpg' | relative_url }}" style="max-width: 50%; height: auto; display: block; margin: 0 auto;" alt="image">

_찜찜함을 느끼셨으면 다 써주시지,,, 제가 순수하지 못해서 이유가 와 닿지 않아요_ 🤣


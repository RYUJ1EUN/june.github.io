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

<img src="{{ '/assets/img/post/algebra/260313_1.png' | relative_url }}" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" alt="image">

_~이해하고 활용할 수 있는 연산은 선형 연산 뿐이다~_

- $A$의 대각성분의 합 trace 
$$\text{tr}(A) = \sum_{i=1}^n a_{ii}$$
가 무슨 의미가 있는지?
    - $2\times 2$ 행렬 $A$에 대하여 
    $$A^2 - \tr(A)\cdot A + \det(A) = 0$$

- Invertible matrix $A$의 inverse는 유일하다
    - $2\times 2$ 행렬 $A$에 대하여 
    $$A^{-1} = \frac{1}{ad-bc} \begin{pmatrix} a_{22} & -a_{21} \\ -a_{12} & a_{11} \end{pmatrix}$$
    - $A$가 가역 $\iff$ $\det(A) \neq 0$
---
layout: post
title: "Review: Paper on Graph-Based PK Cryptosystem"
date: 2026-03-02
last_modified_at: 2026-03-03
description: "A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings"
tags: [PQC]
categories: [Study]
---


📖 Cutinha, J. S., Nayak, S., & D'Souza, S. (2026). A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings. IEEE Access, 14, 6121-6135. DOI:10.1109/ACCESS.2026.3652142

> ABSTRACT. Cryptography serves as the backbone of modern digital security, protecting sensitive information across electronic communication and transactions. The rapid advancement of quantum computing poses a threat to classical cryptographic systems, necessitating the development of post-quantum alternatives. **We propose a novel graph-based public key encryption scheme that leverages the hardness of partitioning a 4-regular graph into four disjoint subsets, such that each induced subgraph is a perfect matching.** The scheme encodes plaintexts as multivariate polynomials over edge variables using a recursive encoding structure. **We provide a comprehensive security analysis demonstrating that the scheme achieves one-way security under chosen-plaintext attacks (OW-CPA) and is resilient against key recovery, ciphertext search, and plaintext search attacks.** We analyze the theoretical time and space complexities of the core algorithms and validate our results through experimental implementation. **The results demonstrate the practical feasibility of NIST (National Institute of Standards and Technology) Level I security parameters**, highlighting the potential of graph-theoretic problems as a foundation for secure and efficient cryptographic primitives.



### 제안 방식의 요약

##### 기반 문제 (NP-complete)
각 분할 집합(partite set)이 유도하는 부분 그래프를 완전 매칭(perfect matching)시킬 수 있는가에 대한 4-정규 그래프(regular graph) 분할 문제

_The central problem relevant to our scheme is ‘partitioning into perfect matching’ [15], defined as follows.  
그래프 $G$와 양의 정수 $Q \le \|V \|$가 주어졌을 때, 정점 집합 $V$를 $q \le Q$개의 서로소인 부분 집합 $P\_1, P\_2, ... , P\_q$로 분할하는 문제. 이때 각 유도된 부분 그래프 $G[P_i]$가 완전 매칭이 되어야 함. 즉, $G[P_i]$가 $K\_2$의 유한합(finite union)이 되어야 함(각 정점이 정확히 하나의 간선에 연결)_  

이 문제는 $Q = 2$이거나 그래프가 평면 3차(planar cubic) 그래프인 경우와 같이 강한 제약 조건 하에서도 NP-complete로 알려짐  

**Partitioning into Perfect Matching (PPM)**: 정점 집합이 완전 매칭을 유도하는 서로소인 부분 집합으로 분할 될 수 있는 그래프


##### 키 쌍
- 공개키: $n$개의 정점을 가지는 4-정규 그래프
- 개인키: 각 분할 집합을 완전 매칭시킬 수 있는 동일한 크기인 네 개의 (정점) 부분 집합

##### IPCC7과의 차이점
다항식 구성 시 정점(vertex) 변수를 사용하는 대신 간선(edge) 변수를 사용

- 분할 집합 내에서 생성한 내부 간선(intrapartition edges)들은 집합적으로 $\mathcal{G}$의 완전 매칭을 형성함
- $\mathcal{G}$의 각 정점은 자신의 분할 집합 내 정확히 한 정점과 인접하며, 다른 세 분할 집합의 정점 중 정확히 하나씩과 인접함
- 각 분할 집합은 $\mathcal{G}$에서 전체 지배 집합(total dominating set)을 형성함

간선 변수에 값을 대응시키는 함수는 다음과 같음  

$$
F(v_i, v_j) = \begin{cases} -1, & \text{if } (v_i, v_j) \in M \\ 0, & \text{if } (v_i, v_j) \text{ is an edge between } P_1 \text{ to } P_2 \\ & \text{or } P_3 \text{ to } P_4 \\ 1, & \text{otherwise.} \end{cases}
$$

### IPCC7 공격 기법에 대한 저항성 주장

##### IPCC7
IPCC7는 정점 집합을 네 개의 비밀 부분 집합 $P\_1, P\_2, P\_3, P\_4$로 분할하고, 모든 정점 $v\_i$에 대해 해당 정점의 닫힌 이웃 $\{i\} \cup N(i)$ 중 정확히 하나의 요소만이 $A$에 속하도록 공개 3-정규 그래프를 구성함. 
암호문 다항식은 정점 변수들로 표현되며, 여기서 각 변수 $\mathcal{X}_{v\_i}$는 정점 $v\_i$가 $P\_1$에 속하면 1의 값을, 그렇지 않으면 0의 값을 가짐  

이 시스템에 가우스 소거법을 적용함으로써, 공격자는 모든 $v\_i$를 몇 개의 독립 변수의 조합으로 표현할 수 있으며, 이를 통해 분할을 재구성하고 비밀 키를 복구할 수 있음.
이 공격은 높은 확률로 성공함

##### 제안 암호 기법
원칙적으로, 이와 유사한 선형 대수적 접근 방식이 위 연구의 체계에 대해서도 시도될 수 있으며, 다음과 같은 선형 시스템을 도출함

$$
\mathcal{I}_{n \times 2n}X_{2n \times 1} = J_{n \times 1}
$$  

여기서 $\mathcal{I}$는 공개 그래프의 정점-간선 근접 행렬을 나타내고, $X$는 간선 변수의 열 벡터이며, $J$는 모든 요소가 1인 열 벡터임.
공격자는 각 방정식에서 정확히 하나의 변수는 $-1$의 값을, 정확히 하나는 0의 값을, 그리고 정확히 두 개는 1의 값을 가진다는 점을 앎. 
본 연구의 구성에서 $-1$의 값이 할당된 간선들은 $\mathcal{G}$에서 완전 매칭(perfect matchings)을 형성하는 간선들에 대응됨

공격 목표는 함수 $F$ 아래의 모든 간선 매핑을 복구하는 것임. 
연결 그래프의 근접 행렬은 $n-1$의 계수(rank)를 가지므로, 가우스 소거법은 $2n - (n - 1) = n + 1$개의 자유 변수를 남기게 되어 부정(underdetermined) 상태가 되며, 결과적으로 공격자는 간선 변수를 고유하게 결정할 수 없음. 
선형 시스템의 해를 구하더라도, 공개키 그래프 $\mathcal{G}$의 구조적 속성을 만족하지 않는 한 반드시 유효한 분할에 대응하는 것이 아님

이 할당은 선형 방정식들을 만족하지만, 그래프에 대한 유효한 분할을 생성하는 데 실패함. 특정 해가 나오더라도 반드시 유효한 분할을 생성하는 것은 아니며, 이는 선형 대수적 키 복구 공격에 대한 본 체계의 저항성을 보여줌. 
복구 난이도가 그래프가 커질수록 증가함


### Lange 등의 공격 기법 분석

이 공격은 IPCC7이 정점 변수를 사용하고 특정한 닫힌 이웃(Closed neighborhood) 구조를 갖는다는 취약점을 이용하여 다항 시간 내에 비밀 키(부분 집합)를 복구함

1. 닫힌 이웃 행렬(Closed Neighborhood Matrix) 구성  
IPCC7의 구조적 특성상, 임의의 정점 $v_i$와 그 이웃 $N(v_i)$에 속한 정점들 중 정확히 하나만 비밀 부분 집합 $A$에 속함
$$
\mathcal{X}_{v_i} + \sum_{u \in N(v_i)} \mathcal{X}_u = 1
$$
공격 코드의 Mj 배열은 이 방정식의 좌변 계수를 나타냄.
$v$의 위치와 그 이웃 $w$들의 위치에 1을 채워 넣음으로써, $256 \times 256$ 크기의 인접 행렬(Adjacency Matrix)에 단위 행렬(Identity Matrix)을 더한 형태인 행렬 $M$을 생성함
2. 기약 행 사다리꼴(RREF) 변환 및 가우스 소거  
행렬 $M$을 유리수 체 위의 행렬로 정의한 뒤, 가우스 소거법을 적용하여 RREF로 변환.
정점 변수들 사이에 존재하는 선형 종속성을 찾아내고, 방정식을 풀기 위한 독립 변수와 종속 변수를 분리함
3. 피벗(Pivot) 추출 및 종속성 매핑  
공격 코드는 RREF로 변환된 행렬 $M$의 각 행을 순회하며 다음을 수행함
- 처음으로 0이 아닌 값(피벗)이 나오면 이를 1로 확인(assert row[j] == 1)
- 해당 행의 피벗 인덱스 $j$와, 피벗을 제외한 나머지 0이 아닌 열의 인덱스 및 계수를 묶어 todo 리스트에 저장  
이는 종속 변수 $\mathcal{X}_j$를 몇 개의 독립적인 자유 변수들의 선형 결합으로 표현하는 과정임
4. 자유 변수 기저(Basis)로의 투영 및 동치류 분류  
공격의 핵심 단계로 모든 정점에 대해 표준 기저 벡터 $c = e_v$(자신의 위치만 1이고 나머지는 0)를 생성함. 그리고 todo에 저장된 선형 관계식을 이용해 역대입(Back-substitution)을 수행함(c[i] -= cj*ri)  
IPCC7는 같은 부분 집합에 속한 정점들이 전체 그래프 내에서 동일한 지배(Domination) 특성을 띄기 때문에, 해당 단계를 거치면 같은 부분 집합에 속한 정점들이 동일한 벡터 값을 갖게 됨
5. 비밀 부분 집합(Secret Key) 복구  
4단계에서 각 정점마다 도출된 벡터 c를 기준으로 정점들을 그룹화함.
이로써 동일한 선형 종속성을 띄는 정점 집합이 형성됨. 
결과적으로 이 집합들이 4개의 비밀 부분 집합과 정확히 일치하게 됨


##### 제안된 기법에 대한 공격 적용 가능성 분석

가우스 소거법은 변수의 개수가 식의 개수보다 많은 선형시스템에서 -1+1과 0을 구별하지 못하므로 Lange 등의 공격을 적용하기 어려움

간선 변수는 기존 정점 변수 $n$개를 $2n$개로 증가시킴. 이는 대략적으로 안전성을 제곱하는 효과가 있을 것으로 예상함

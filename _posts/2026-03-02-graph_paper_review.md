---
layout: post
title: "Review: Paper on Graph-Based PK Cryptosystem"
date: 2026-03-02
description: "A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings"
tags: [PQC]
categories: [Study]
---


📖 Cutinha, J. S., Nayak, S., & D'Souza, S. (2026). A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings. IEEE Access, 14, 6121-6135. DOI:10.1109/ACCESS.2026.3652142

> ABSTRACT. Cryptography serves as the backbone of modern digital security, protecting sensitive information across electronic communication and transactions. The rapid advancement of quantum computing poses a threat to classical cryptographic systems, necessitating the development of post-quantum alternatives. **We propose a novel graph-based public key encryption scheme that leverages the hardness of partitioning a 4-regular graph into four disjoint subsets, such that each induced subgraph is a perfect matching.** The scheme encodes plaintexts as multivariate polynomials over edge variables using a recursive encoding structure. **We provide a comprehensive security analysis demonstrating that the scheme achieves one-way security under chosen-plaintext attacks (OW-CPA) and is resilient against key recovery, ciphertext search, and plaintext search attacks.** We analyze the theoretical time and space complexities of the core algorithms and validate our results through experimental implementation. **The results demonstrate the practical feasibility of NIST (National Institute of Standards and Technology) Level I security parameters**, highlighting the potential of graph-theoretic problems as a foundation for secure and efficient cryptographic primitives.



### 제안 방식의 요약

##### 기반 문제 (NP-complete)
각 분할 집합(partite set)이 유도하는 부분 그래프를 완전 매칭(perfect matching)시킬 수 있는가에 대한 4-정규 그래프(regular graph) 분할 문제

> The central problem relevant to our scheme is ‘partitioning into perfect matching’ [15], defined as follows.  
Given a graph $G$ and a positive integer $Q \le \|V \|$, the objective is to partition the vertex set $V$ into $q \le Q$ disjoint subsets $P\_1, P\_2, ... , P\_q$, such that each induced subgraph $G[P_i]$ is a perfect matching, that is each $G[P_i]$ is a finite union of $K_2$ (each vertex incident to exactly one edge). This problem is known to be NP-complete, even under strong constraints, such as when $Q = 2$ or when the graph is planar cubic.  
We refer to any graph that admits such a partitioning, that is whose vertex set can be partitioned into disjoint subsets inducing perfect matching, as a graph that satisfies Partitioning into Perfect Matching (PPM).

##### 키 쌍
- 공개키: $n$개의 정점을 가지는 4-정규 그래프
- 개인키: 각 분할 집합을 완전 매칭시킬 수 있는 동일한 크기인 네 개의 (정점) 부분 집합

##### IPCC7과의 차이점
다항식 구성 시 정점(vertex) 변수를 사용하는 대신 간선(edge) 변수를 사용


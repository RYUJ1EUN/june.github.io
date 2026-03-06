// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "ABOUT",
    section: "Navigation",
    handler: () => {
      window.location.href = "/june.github.io/";
    },
  },{id: "nav-blog",
          title: "BLOG",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/june.github.io/blog/";
          },
        },{id: "nav-til",
          title: "TIL",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/june.github.io/til/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "이상을 꿈꾸고 현실을 만들어 나가는, 류지은입니다.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/june.github.io/cv/";
          },
        },{id: "dropdown-books",
              title: "Books",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/june.github.io/books/";
              },
            },{id: "dropdown-exhibitions",
              title: "Exhibitions",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/june.github.io/exhibitions/";
              },
            },{id: "dropdown-interest",
              title: "Interest",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/june.github.io/interest/";
              },
            },{id: "post-quantum-parallelism",
        
          title: "Quantum Parallelism",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/quantum_parallelism/";
          
        },
      },{id: "post-nist-ir8446",
        
          title: "NIST IR8446",
        
        description: "NIST IR8446: Bridging the Gap Between Standards on Random Number Generation",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/nist-ir8446/";
          
        },
      },{id: "post-review-paper-on-graph-based-pk-cryptosystem",
        
          title: "Review: Paper on Graph-Based PK Cryptosystem",
        
        description: "A Graph-Based Public-Key Cryptosystem Using the NP-Complete Problem of Partitioning Into Perfect Matchings",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/graph_paper_review/";
          
        },
      },{id: "post-kpqc-특강-워크숍-정리",
        
          title: "KpqC 특강, 워크숍 정리",
        
        description: "&#39;2025년도 상반기 정보보호 전문가를 위한 암호교육&#39; 특강 내용 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/pqc/";
          
        },
      },{id: "post-secret-sharing",
        
          title: "Secret Sharing",
        
        description: "Paper review regarding the secret sharing",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/ss/";
          
        },
      },{id: "post-ais-31-version-3-0",
        
          title: "AIS 31 (version 3.0)",
        
        description: "Study note: AIS 31 (version 3.0)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2026/ais31/";
          
        },
      },{id: "post-ntt",
        
          title: "NTT",
        
        description: "NTT(Number Theoretic Transform) for ML-KEM, ML-DSA",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2025/ntt/";
          
        },
      },{id: "post-pqc-동향-39-24-10",
        
          title: "PQC 동향 (~ &#39;24.10)",
        
        description: "Study note: AIS 31 (version 3.0)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2025/pqc-updates/";
          
        },
      },{id: "post-nist-sp-800-90c",
        
          title: "NIST SP 800-90C",
        
        description: "NIST SP 800-90C: Recommendation for Random Bit Generator (RBG) Constructions",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2025/nist-90c/";
          
        },
      },{id: "post-arx-wbc-cryptanalysis",
        
          title: "ARX-WBC Cryptanalysis",
        
        description: "Biryukov arx-based white-box 분석 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2025/arx-wbc-analysis/";
          
        },
      },{id: "post-wbc-hw-binding",
        
          title: "WBC HW binding",
        
        description: "WBC HW binding 안전성 분석 모델 연구",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2025/wbc_hw_binding/";
          
        },
      },{id: "post-arx-wbc",
        
          title: "ARX-WBC",
        
        description: "Ranea ARX-WBC 구현 논문 리뷰",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2024/arx-wbc/";
          
        },
      },{id: "post-information-theory",
        
          title: "Information Theory",
        
        description: "Information theory: Probability and Entropy",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2024/information-theory/";
          
        },
      },{id: "post-ntt-ml-kem",
        
          title: "NTT ML-KEM",
        
        description: "NTT(Number Theoretic Transform) for ML-KEM, ML-DSA",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2023/ntt-ml-kem/";
          
        },
      },{id: "post-windows-openssl",
        
          title: "(Windows) OpenSSL",
        
        description: "Windows에서 OpenSSL 환경 구축",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2023/windows-openssl/";
          
        },
      },{id: "post-git-기초",
        
          title: "Git 기초",
        
        description: "Git 기초 실습 과정 정리",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2023/basic-git/";
          
        },
      },{id: "post-windows-vs-code-latex",
        
          title: "(Windows) VS code LaTeX",
        
        description: "Windows에서 VS code로 오프라인 latex 문서 작업을 위한 환경 구축하기",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2023/windows-vs-code-latex/";
          
        },
      },{id: "post-windows-vs-code",
        
          title: "(Windows) VS code",
        
        description: "Windows에서 VS code 컴파일 환경 구축",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2023/windows-vs-code/";
          
        },
      },{id: "post-linear-algebra",
        
          title: "Linear Algebra",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/june.github.io/blog/2020/linear_algebra/";
          
        },
      },{id: "books-빛의-제국-your-republic-is-calling-you",
          title: '빛의 제국 (Your Republic is Calling You)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/june.github.io/books/the_empire_of_light/";
            },},{id: "books-싯다르타-siddhartha",
          title: '싯다르타 (Siddhartha)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/june.github.io/books/the_empire_of_light%20copy/";
            },},{id: "interest-whale",
          title: 'Whale',
          description: "",
          section: "Interest",handler: () => {
              window.location.href = "/june.github.io/interest/2025-01-01";
            },},{id: "projects-인상주의에서-초기-모더니즘까지",
          title: '인상주의에서 초기 모더니즘까지',
          description: "260108 @국립중앙박물관 특별전시실 &quot;인상주의에서 초기 모더니즘까지, 빛을 수집한 사람들 - 메트로폴리탄박물관 소장 로버트 리먼 컬렉션&quot;",
          section: "Projects",handler: () => {
              window.location.href = "/june.github.io/exhibitions/260108";
            },},{id: "projects-",
          title: '',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/june.github.io/exhibitions/260208";
            },},{id: "til-devops-기초-1",
          title: 'DevOps 기초 - 1',
          description: "",
          section: "Til",handler: () => {
              window.location.href = "/june.github.io/til/2026-02-19-1";
            },},{id: "til-javacard-함수-시간-속도-측정",
          title: 'JavaCard 함수 시간 속도 측정',
          description: "",
          section: "Til",handler: () => {
              window.location.href = "/june.github.io/til/2026-02-19-2";
            },},{id: "til-devops-기초-2",
          title: 'DevOps 기초 - 2',
          description: "",
          section: "Til",handler: () => {
              window.location.href = "/june.github.io/til/2026-02-21";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/june.github.io/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/june.github.io/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

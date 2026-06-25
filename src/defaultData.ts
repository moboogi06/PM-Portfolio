import { BilingualPortfolioData } from "./types";

export const DEFAULT_PORTFOLIO_DATA: BilingualPortfolioData = {
  en: {
    hero: {
      title: "Esports Program & Partnership Portfolio",
      headline: "Esports Program Manager with 4 Years of Experience",
      subheadline: "Delivered large-scale esports tournaments, strategic partnership programs, live broadcasts, and fan engagement initiatives across Korea and regional markets."
    },
    kpis: [
      {
        id: "kpi-1",
        value: "₩1.65B+",
        label: "Managed Budget",
        sublabel: "3-Year Continuous Government Program"
      },
      {
        id: "kpi-2",
        value: "3 Years",
        label: "Program Ownership",
        sublabel: "End-to-End Campaign Execution"
      },
      {
        id: "kpi-3",
        value: "3.5M+",
        label: "Peak Event Viewership",
        sublabel: "Across Regional Broadcasts & Activations"
      },
      {
        id: "kpi-4",
        value: "25+",
        label: "Pro Players Managed",
        sublabel: "Direct Communication & Schedules"
      },
      {
        id: "kpi-5",
        value: "5 Teams",
        label: "LCK Organizations",
        sublabel: "Strategic Partnership Deliverables"
      },
      {
        id: "kpi-6",
        value: "1,600+",
        label: "Offline Viewer Attendance",
        sublabel: "Multi-city Viewer Activations"
      }
    ],
    about: {
      title: "Who I Am",
      description: "I specialize in esports program management, partnership operations, and live event execution. Over the last four years, I have successfully managed public esports initiatives, international esports events, broadcast operations, and partnership programs in collaboration with major game publishers, professional esports teams, government entities, and media agencies.",
      coreValues: [
        "End-to-End Ownership: From initial pitch and planning to operational execution, legal compliance, and financial settlement.",
        "Strategic Alliances: Aligning the interests of game publishers, professional organizations, broadcast production teams, and sponsors.",
        "Data-Driven Results: Maintaining a clear focus on actionable KPIs, viewership growth, audience retention, and sponsor ROI."
      ]
    },
    impact: {
      programManagement: {
        title: "Chungnam Esports Program",
        subtitle: "Public Regional Development Initiative",
        duration: "2023 - 2025",
        metricValue: "₩1.65 Billion",
        metricLabel: "Total Budget Managed",
        details: [
          "Led end-to-end program management and aligned multiple regional stakeholders",
          "Strategic deployment of public funds to build grassroots regional gaming ecosystems",
          "Spearheaded tournament architecture, broadcast schedules, and local academic leagues"
        ],
        stakeholders: [
          "Chungnam Content Agency",
          "Local Government Bodies",
          "Professional Teams & Academies",
          "Broadcast Vendors"
        ]
      },
      partnershipManagement: {
        title: "DouyuTV x LCK Partnership",
        subtitle: "Cross-Border Streaming & Marketing Operations",
        duration: "2020 - 2022",
        metricValue: "5 LCK Teams",
        metricLabel: "Active Organizations",
        details: [
          "Managed 25+ professional players' live broadcasting schedules and platform compliance",
          "Conducted performance audits, compiled KPI reports, and monitored stream quality",
          "Coordinated international financial settlements and multilingual translation operations"
        ],
        stakeholders: [
          "DouyuTV Streaming Platform",
          "5 LCK Organizations",
          "Professional Esports Players",
          "Agency Partners"
        ]
      },
      riotCollaboration: {
        title: "VALORANT Masters Bangkok KR Activation",
        subtitle: "Fan Engagement & Official KR Feed",
        duration: "2025",
        metricValue: "1,629 Pax",
        metricLabel: "Offline Viewer Attendance",
        details: [
          "Proposed and executed multi-city live viewing party activations across Korea",
          "Supported local broadcast production teams to meet publisher streaming standards",
          "Collaborated with agency partners to scale local fan engagement and peak viewership"
        ],
        stakeholders: [
          "Publisher Regional Offices",
          "PR Operating Partner",
          "Venue Partners in 3 Cities",
          "Production & Broadcast Crew"
        ]
      }
    },
    featuredProjects: {
      chungnam: {
        id: "proj-chungnam",
        title: "Chungnam Esports Development Program",
        subtitle: "Fostering sustainable grassroots talent and regional fanbases over 3 consecutive years.",
        challenge: "Developing a sustainable regional esports ecosystem while increasing amateur participation and community engagement.",
        solutionOrRole: "Program Lead. Oversaw all aspects of budget distribution, government contracts, tournament operations, broadcast production vendors, and professional team partnerships.",
        results: [
          { value: "₩1.65B", label: "Budget Managed" },
          { value: "4,500+", label: "Tournament Participants" },
          { value: "3.5M+", label: "Live Broadcast Views" },
          { value: "12,000+", label: "Offline Visitors" },
          { value: "3 Years", label: "Continuous Ownership" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "Official Arena & Stadium Center",
        tags: ["Program Management", "Government Stakeholders", "Broadcast Production"],
        youtubeLinks: {
          year2023: "https://www.youtube.com/watch?v=N4YvoogqiWU",
          year2024: "https://www.youtube.com/watch?v=zP_FS8uIE3w",
          year2025: "https://www.youtube.com/watch?v=pZq4ZJ8GrtI&t=8s"
        }
      },
      valorant: {
        id: "proj-valorant",
        title: "VALORANT Masters Bangkok KR Activation",
        subtitle: "Deploying high-impact physical touchpoints to amplify community excitement.",
        challenge: "Expanding localized fan engagement around international esports events and creating an immersive offline experience for local fans.",
        solutionOrRole: "Project Lead (PM). Proposed and executed multi-city viewing party activations in Korea, aligning publisher interests with premium venue partners and media agencies.",
        results: [
          { value: "1,629 Pax", label: "Offline Viewer Attendance" },
          { value: "379,920 Peak", label: "KR Feed Cumulative Concurrent Viewers" },
          { value: "3 Cities", label: "Activated Locations" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "Cross-Border Viewing Party Fanbase",
        stakeholderMap: {
          from: "Regional Publisher Office",
          me: "Project Lead (PM)",
          to: ["PR Operating Partner", "Venue Partners", "Production Team"]
        },
        tags: ["Publisher Collaboration", "Community Event", "Multi-City Activation"]
      },
      douyu: {
        id: "proj-douyu",
        title: "DouyuTV x LCK Partnership Program",
        subtitle: "Unlocking cross-border content rights and commercial streaming schedules for LCK stars.",
        challenge: "Streamlining contract fulfillment, player communications, and dynamic stream-time reporting for elite LCK teams on global media platforms.",
        solutionOrRole: "Partnership Operator. Spearheaded performance audits, direct player/management communications, stream setup compliance, and monthly revenue settlements.",
        results: [
          { value: "5 Elite Teams", label: "LCK Partners Involved" },
          { value: "25+ Players", label: "Professional Players Managed" },
          { value: "100%", label: "Contractual Delivery Rate" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "Elite Player Broadcast Hub Operations",
        reportImage1: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop",
        reportImage2: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        metrics: [
          { label: "Monthly Streaming Hours", value: "320+ Hours" },
          { label: "Audience Completion Rate", value: "94%" },
          { label: "Follower Growth", value: "+450,000" },
          { label: "Monthly Brand Activations", value: "15+" }
        ],
        tags: ["Partnership Operations", "LCK Teams", "Cross-Border Settlement"]
      }
    },
    skills: [
      { name: "Program Management", percentage: 95 },
      { name: "Partnership Management", percentage: 90 },
      { name: "Broadcast Operations", percentage: 90 },
      { name: "Stakeholder Management", percentage: 95 },
      { name: "Event Production", percentage: 90 },
      { name: "Data Reporting", percentage: 80 },
      { name: "Written Business English & Contract/Email Comms", percentage: 85 },
      { name: "English Speaking & Offline Communication", percentage: 50 }
    ],
    timeline: [
      {
        id: "time-1",
        year: "2020 - 2022",
        title: "DouyuTV Partnership Operations",
        subtitle: "Managed streaming contracts and direct collaborations with 5 LCK organizations and 25+ elite pro players.",
        description: "Established efficient cross-border communication systems, performed automated stream audits, and reported monthly performance metrics."
      },
      {
        id: "time-2",
        year: "2023 - 2025",
        title: "Chungnam Regional Program Leadership",
        subtitle: "Owned the ₩1.65 Billion regional development budget.",
        description: "Delivered regional tournaments, educational partnerships, and live-broadcast community events under direct government content agency funding."
      },
      {
        id: "time-3",
        year: "2025",
        title: "VALORANT Masters Bangkok Activation",
        subtitle: "Led multi-city viewing party activations in Korea.",
        description: "Drove local offline attendance and KR broadcast integration, proving localized campaign models for global publisher events."
      },
      {
        id: "time-4",
        year: "2025",
        title: "TEN (The Esports Night) Invitational Support",
        subtitle: "Coordinated live broadcast operations and player operations.",
        description: "Ensured precise scheduling and stakeholder coordination between team coaches, managers, and the broadcasting crew."
      },
      {
        id: "time-5",
        year: "Next Goal",
        title: "Esports Program Manager with Global Business & Data Strategy Expertise",
        subtitle: "Executing Strategies Satisfying Partners & Fans Based on Broadcast & Media Rights Domain Knowledge",
        description: "Beyond basic management, I bring outstanding global business fluency (English & Korean) and sharp analytical capabilities. Armed with deep domain knowledge of the Esports industry (broadcast and media rights), I am an experienced professional who executes precise strategies to satisfy both business partners and global fans, manages large-scale budgets efficiently, and delivers immediate value."
      }
    ],
    contact: {
      email: "moboogi0601@gmail.com",
      linkedin: "",
      github: "https://github.com/",
      resumeUrl: "#"
    }
  },
  kr: {
    hero: {
      title: "E스포츠 사업 & 파트너십 포트폴리오",
      headline: "글로벌 E스포츠 사업 및 파트너십 프로그램 매니저 (4년 차)",
      subheadline: "대규모 E스포츠 토너먼트의 사업 예산 집행, 글로벌 게임사 파트너십 구축, 생방송 제작 송출 총괄, 그리고 팬 중심의 온·오프라인 캠페인을 성공적으로 설계하고 성과를 입증해 왔습니다."
    },
    kpis: [
      {
        id: "kpi-1",
        value: "16.5억 원+",
        label: "총괄 사업 예산",
        sublabel: "3개년 연속 정부 공공 사업 전담 집행"
      },
      {
        id: "kpi-2",
        value: "3년",
        label: "사업 전 과정 주도",
        sublabel: "기획부터 최종 정산까지 사업 전 과정 총괄"
      },
      {
        id: "kpi-3",
        value: "3.5M+",
        label: "대회 누적 시청자 수",
        sublabel: "글로벌 송출 및 지역 활성화 캠페인 통합 기여"
      },
      {
        id: "kpi-4",
        value: "25+",
        label: "프로 선수단 소통 조율",
        sublabel: "방송 송출 이행 조율 및 커뮤니케이션 일원화"
      },
      {
        id: "kpi-5",
        value: "5개 팀",
        label: "LCK 파트너 구단",
        sublabel: "해외 스트리밍 파트너십 및 방송 품질 검수"
      },
      {
        id: "kpi-6",
        value: "1,600+",
        label: "오프라인 뷰어 모객",
        sublabel: "전국 멀티시티 라이브 뷰잉 파티 성공적 유치"
      }
    ],
    about: {
      title: "소개",
      description: "저는 E스포츠 비즈니스 프로그램 기획, 전략적 파트너십 운영, 실시간 라이브 중계 제작 및 대규모 이벤트 실행 분야를 모두 아우르는 올라운드 매니저입니다. 지난 4년 동안 글로벌 퍼블리셔, LCK 최정상급 프로 구단, 정부 산하 공공 기관 및 PR 운영사 등 다양한 핵심 이해관계자들과 협력하며 대규모 공공 E스포츠 인프라 조성 사업 및 크로스보더 파트너십 프로젝트를 주도해 왔습니다.",
      coreValues: [
        "비즈니스 전 과정 완벽 주도 (End-to-End Ownership): 제안서 기획 단계부터 파트너 협상, 계약 체결, 프로젝트 예산 집행, 최종 성과 공유 및 재무 정산까지 모든 단계를 빈틈없이 책임집니다.",
        "통합적 이해관계 조정 (Strategic Alignment): 글로벌 퍼블리셔, 프로 구단, 중계 프로덕션 및 후원 브랜드의 서로 다른 요구사항과 비즈니스 목표를 일치시켜 상생할 수 있는 최적의 결과물을 만듭니다.",
        "투명한 데이터 기반 성과 증명 (Data-Driven Excellence): 명확한 수치화 중심의 KPI 달성률 측정, 방송 누적 동시 시청률 추적, 정성적 팬 만족도 지표 정량화 등을 통해 사업의 실질적 가치를 입증합니다."
      ]
    },
    impact: {
      programManagement: {
        title: "충남도지사배 E스포츠 대회 총괄",
        subtitle: "공공 지역 E스포츠 인프라 및 생태계 활성화 사업",
        duration: "2023 - 2025",
        metricValue: "16.5억 원",
        metricLabel: "3개년 누적 관리 예산",
        details: [
          "정부 산하 진흥 기관 공식 예산 승인 및 연간 사업 기획/관리 프로세스 전담",
          "지방 자치 단체 및 협력 단체 간의 유기적인 비즈니스 소통 구조 확립",
          "토너먼트 구조 및 경기 규정 수립, 전문 중계 제작사 입찰 관리 및 편성"
        ],
        stakeholders: [
          "충남정보문화산업진흥원",
          "지방 자치 단체 및 협력처",
          "프로 게임단 및 아카데미",
          "방송 제작 협력사"
        ]
      },
      partnershipManagement: {
        title: "DouyuTV x LCK 글로벌 파트너십",
        subtitle: "크로스보더 미디어 권리 및 글로벌 마케팅 오퍼레이션",
        duration: "2020 - 2022",
        metricValue: "5개 LCK 구단",
        metricLabel: "협약 구단 파트너십 관리",
        details: [
          "LCK 탑티어 프로 게임단 및 25인 이상 핵심 선수들의 방송 스케줄 조율 및 계약 이행 관리",
          "정기적인 방송 송출 퀄리티 검수 및 규정 준수 먼슬리 리포트 발행",
          "다국어 실시간 라이브 중계 번역 지원 및 해외 파트너사 간의 무역 금융 정산 프로세스 완수"
        ],
        stakeholders: [
          "DouyuTV 스트리밍 플랫폼",
          "5개 LCK 프로 게임단",
          "프로 E스포츠 선수진",
          "글로벌 에이전시 파트너"
        ]
      },
      riotCollaboration: {
        title: "발로란트 마스터스 방콕 KR 오프라인 활성화",
        subtitle: "라이브 중계 제작 지원 및 전국 단위 팬 페스티벌",
        duration: "2025",
        metricValue: "1,629명",
        metricLabel: "오프라인 현장 총 참여 인원",
        details: [
          "글로벌 대회의 폭발적 흥행을 국내로 확산하기 위한 멀티시티 뷰잉 파티 기획 및 실행 주도",
          "국내 공식 중계 송출 팀 지원 및 글로벌 퍼블리셔의 방송 퀄리티 가이드라인 완벽 적용",
          "PR 대행사 및 대형 베뉴 파트너와의 소통을 총괄하여 국내 코어 팬덤의 만족도 향상 도모"
        ],
        stakeholders: [
          "퍼블리셔 지역 본부",
          "PR 운영사",
          "전국 주요 3개 도시 베뉴 파트너",
          "방송 프로덕션 및 중계진"
        ]
      }
    },
    featuredProjects: {
      chungnam: {
        id: "proj-chungnam",
        title: "충남도지사배 E스포츠 지원 프로그램",
        subtitle: "3년 연속 아마추어 선수 육성 및 지역 기반의 지속 가능한 팬덤 생태계 구축 사업 총괄.",
        challenge: "수도권 중심의 E스포츠 시장을 확장하고, 지방에서도 아마추어 선수들이 정기적으로 참여할 수 있는 양질의 문화 인프라를 조성하는 과제.",
        solutionOrRole: "프로그램 총괄 PM. 예산 배분 기획, 지방 정부 기관 공식 협약 관리, 연도별 대회 운영 가이드라인 제정 및 전문 방송 연출 외주사 총괄 감독.",
        results: [
          { value: "16.5억 원", label: "총괄 예산 규모" },
          { value: "4,500+", label: "대회 참가 신청자" },
          { value: "3.5M+", label: "누적 방송 조회수" },
          { value: "12,000+", label: "현장 오프라인 방문객" },
          { value: "3년 연속", label: "프로그램 연속 총괄" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "공식 E스포츠 경기장 및 전용 베뉴",
        tags: ["프로젝트 총괄", "공공 예산 사업", "방송 프로덕션"],
        youtubeLinks: {
          year2023: "https://www.youtube.com/watch?v=N4YvoogqiWU",
          year2024: "https://www.youtube.com/watch?v=zP_FS8uIE3w",
          year2025: "https://www.youtube.com/watch?v=pZq4ZJ8GrtI&t=8s"
        }
      },
      valorant: {
        id: "proj-valorant",
        title: "발로란트 마스터스 방콕 KR 오프라인 활성화",
        subtitle: "몰입감 높은 오프라인 공간 기획을 통해 글로벌 대회 열기를 로컬 팬덤으로 연결.",
        challenge: "해외에서 개최되는 대규모 E스포츠 이벤트를 국내 코어 팬들이 마치 현장에 있는 것처럼 생생하게 함께 즐길 수 있도록 다각화된 참여 기회 제공.",
        solutionOrRole: "프로젝트 총괄 (PM). 전국 주요 거점 도시 오프라인 라이브 뷰잉 파티를 선제안 및 성공적으로 완수. 글로벌 게임사, PR 운영사, 베뉴 대관 파트너의 비즈니스 이해관계 정렬 조율.",
        results: [
          { value: "1,629명", label: "현장 참석 관객" },
          { value: "379,920명", label: "KR 피드 중계 누적 동시 시청자 수" },
          { value: "3개 도시", label: "멀티시티 활성화" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "로컬 크라우드 뷰잉 활성화",
        stakeholderMap: {
          from: "글로벌 게임사 지역 본부",
          me: "프로젝트 총괄 (PM)",
          to: ["PR 운영사", "공식 대관 베뉴 파트너", "중계 연출 기술 프로덕션"]
        },
        tags: ["퍼블리셔 협업", "커뮤니티 이벤트", "멀티시티 활성화"]
      },
      douyu: {
        id: "proj-douyu",
        title: "DouyuTV x LCK 글로벌 파트너십 프로그램",
        subtitle: "LCK 명문 구단들과 글로벌 미디어 플랫폼 간의 해외 중계권 양수도 및 스트리밍 오퍼레이션.",
        challenge: "바쁜 정규 시즌 일정을 소화하는 LCK 프로 선수들의 원활한 방송 송출 일정 수립, 엄격한 가이드라인 준수 오딧 및 크로스보더 다자간 외환 정산 프로세스의 효율적 자동화.",
        solutionOrRole: "파트너십 전담 매니저. LCK 최정상 프로 구단 사무국 및 선수단과의 다이렉트 핫라인 채널 단일화, 데이터 중심의 실시간 감사 및 매끄러운 분기별 매출 정산 집행.",
        results: [
          { value: "5개 명문 구단", label: "LCK 핵심 파트너" },
          { value: "25명 이상", label: "선수단 직접 소통 관리" },
          { value: "100%", label: "글로벌 계약 완벽 이행률" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop",
        imageOverlayText: "정상급 프로 선수 스트리밍 허브 오퍼레이션",
        reportImage1: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop",
        reportImage2: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        metrics: [
          { label: "월간 송출 보장 시간", value: "320+ 시간" },
          { label: "방송 이행 완료율", value: "94%" },
          { label: "현지 팬덤 구독 증가", value: "45만+ 명" },
          { label: "월간 브랜드 활성화", value: "15+회" }
        ],
        tags: ["파트너십 실무", "LCK 구단 조율", "크로스보더 해외 정산"]
      }
    },
    skills: [
      { name: "E스포츠 프로그램 기획 및 총괄", percentage: 95 },
      { name: "글로벌 파트너십 매니지먼트", percentage: 90 },
      { name: "실시간 방송 프로덕션 & 연출", percentage: 90 },
      { name: "이해관계자 조정 및 얼라인먼트", percentage: 95 },
      { name: "오프라인 대형 이벤트 기획", percentage: 90 },
      { name: "데이터 분석 및 정량적 보고", percentage: 80 },
      { name: "글로벌 서면 소통 및 메일/계약 영어", percentage: 85 },
      { name: "영어 회화, 오프라인 커뮤니케이션", percentage: 50 }
    ],
    timeline: [
      {
        id: "time-1",
        year: "2020 - 2022",
        title: "DouyuTV 글로벌 파트너십 전담",
        subtitle: "5개 LCK 구단 및 25인 이상 프로 선수단의 해외 중계 송출 최적화 및 계약 실무 전담",
        description: "안정적인 글로벌 커뮤니케이션 허브 구축, 방송 규정 준수 정기 실사 시스템 도입 및 투명한 다자간 무역 정산 완수."
      },
      {
        id: "time-2",
        year: "2023 - 2025",
        title: "정부 공공 E스포츠 사업 총괄 PM",
        subtitle: "누적 16.5억 원 규모의 공공 E스포츠 육성 지원 사업 리드",
        description: "공공 진흥 기관 공식 예산 집행 기획, 지역 단위 아마추어 토너먼트 및 리그 설계, 중계 연출 프로덕션 선정 및 아카데미 구축 총괄."
      },
      {
        id: "time-3",
        year: "2025",
        title: "발로란트 마스터스 방콕 KR 활성화 전담",
        subtitle: "전국 멀티시티 오프라인 뷰잉 파티 및 한국 공식 송출 지원",
        description: "글로벌 대회의 폭발적인 현장 흥행을 지역 커뮤니티로 전파하고, 대규모 모객을 이끌며 브랜드 로열티와 시청률 성과 유도."
      },
      {
        id: "time-4",
        year: "2025",
        title: "TEN 인비테이셔널 방송 제작 서포트",
        subtitle: "실시간 프로덕션 및 참가 선수단 오퍼레이션 조율",
        description: "중계 연출 제작진과 프로 구단 감독/코칭스태프 간의 긴박한 현장 실시간 스케줄을 완벽히 매치하여 지연 없는 최고 수준의 생방송 제공."
      },
      {
        id: "time-5",
        year: "향후 커리어 목표",
        title: "글로벌 비즈니스 감각과 데이터 전략을 겸비한 E스포츠 프로그램 매니저",
        subtitle: "방송·미디어 판권 이해도를 기반으로 파트너와 팬을 모두 만족시킬 전략 실행",
        description: "단순한 관리를 넘어, 뛰어난 글로벌 비즈니스 감각(영어/한국어)과 철저한 데이터 분석력을 보유하고 있습니다. E스포츠 산업(방송/미디어 판권)에 대한 깊은 이해를 바탕으로 파트너와 글로벌 팬 모두를 만족시킬 최적의 실전 전략을 실행할 수 있는 노련한 직원입니다. 대규모 예산을 효율적으로 운용하며 귀사의 전략적 비전 실행에 즉시 기여할 준비가 되어 있습니다."
      }
    ],
    contact: {
      email: "moboogi0601@gmail.com",
      linkedin: "",
      github: "https://github.com/",
      resumeUrl: "#"
    }
  }
};

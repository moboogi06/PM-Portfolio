export interface YearHistory {
  year: string;
  main: string[];
  participated: string[];
}

export interface CareerHistoryLanguageData {
  title: string;
  buttonShow: string;
  buttonHide: string;
  mainLabel: string;
  participatedLabel: string;
  years: YearHistory[];
}

export const CAREER_HISTORY_DATA: { kr: CareerHistoryLanguageData; en: CareerHistoryLanguageData } = {
  kr: {
    title: "전체 프로젝트 수행 실적",
    buttonShow: "전체 경력사항 보기",
    buttonHide: "경력사항 상세 닫기",
    mainLabel: "메인 총괄 PM",
    participatedLabel: "참여 및 프로덕션 지원",
    years: [
      {
        year: "2026",
        main: [],
        participated: [
          "T1 홈그라운드 (2025.04)",
          "아시안게임 국가 대표 선발전 (2025.05)"
        ]
      },
      {
        year: "2025",
        main: [
          "발로란트 마스터스 방콕 KR 피드 제작",
          "충남 이스포츠 대회 운영",
          "광주 이스포츠 대회 운영 및 홍보",
          "GES ASIA 및 청소년 이스포츠 대회"
        ],
        participated: [
          "T1 홈그라운드 / T1 FAN MEET EVENT",
          "제17회 대통령배 아마추어 이스포츠 전국결선",
          "배틀그라운드 플레이어스 시리즈 1, 2",
          "2025 PUBGM 소셜 콘텐츠 제작 및 업로드 대행",
          "2025 KEL 지역리그",
          "2025 한화인 e스포츠 챔피언십",
          "2025 경기도 국제 스포츠 페스티벌 운영"
        ]
      },
      {
        year: "2024",
        main: [
          "배그모바일 클랜배틀",
          "충남 e스포츠 대회 운영",
          "광주 이스포츠 콘텐츠 운영 및 홍보",
          "모배러 연말 대전 기획 및 운영 대행"
        ],
        participated: [
          "T.E.N 24시즌 제작",
          "제16회 대통령배 아마추어 이스포츠 대회",
          "2024 안산 e스포츠 서머 페스티벌",
          "2024 배틀그라운드 글로벌 이스포츠 한국어 방송 제작",
          "2024 이스포츠 대학리그 운영 및 방송 제작",
          "2024 한화인 e스포츠 챔피언십"
        ]
      },
      {
        year: "2023",
        main: [
          "PGS 1, 2 / PGC 피드중계",
          "이스포츠 명예의 전당 영상 콘텐츠 제작",
          "충남 e스포츠 진흥 사업",
          "아시아 e스포츠 콘텐츠 행사 운영"
        ],
        participated: [
          "T.E.N 23시즌 제작",
          "2023 한중일 이스포츠 대회",
          "2023 한화인 e스포츠 챔피언십",
          "2023 이스포츠 대학리그 운영 및 방송 제작",
          "제15회 대통령배 아마추어 이스포츠 리그 (KeG 리그)",
          "아시아 스포츠 콘텐츠 행사 운영 (GES Fighter's Week)"
        ]
      },
      {
        year: "2022",
        main: [
          "도유TV LCK 스트리밍 사업",
          "삼성화재 e슈퍼레이스 운영",
          "광주 이스포츠 대회 및 운영",
          "e스포츠 명예의 전당 영상 콘텐츠 제작"
        ],
        participated: [
          "T.E.N 22시즌 제작",
          "제14회 대통령배 아마추어 이스포츠 전국결선",
          "2022 부산 이스포츠 대회 및 이벤트 프로그램 운영",
          "충남 글로벌 마케팅 지원사업",
          "PGC 2022 피드중계"
        ]
      }
    ]
  },
  en: {
    title: "Complete Project Track Record",
    buttonShow: "View Full Career History",
    buttonHide: "Hide Detailed History",
    mainLabel: "Lead PM / Main",
    participatedLabel: "Participated / Production Support",
    years: [
      {
        year: "2026",
        main: [],
        participated: [
          "T1 Home Ground (2025.04)",
          "Asian Games National Selection Tournament (2025.05)"
        ]
      },
      {
        year: "2025",
        main: [
          "VALORANT Masters Bangkok KR Feed Production",
          "Chungnam Regional Esports Tournament Operations",
          "Gwangju Esports Tournament Operations & PR",
          "GES ASIA & Youth Esports Tournament"
        ],
        participated: [
          "T1 Home Ground / T1 Fan Meet Event",
          "17th Presidential Cup Amateur Esports Championship National Finals",
          "PUBG Players Series 1, 2",
          "2025 PUBGM Social Content Production & Social Media Management Agency",
          "2025 KEL Regional League",
          "2025 Hanwhain Esports Championship",
          "2025 Gyeonggi-do International Sports Festival Operations"
        ]
      },
      {
        year: "2024",
        main: [
          "PUBG Mobile Clan Battle",
          "Chungnam Regional Esports Tournament Operations",
          "Gwangju Esports Content Operations & PR",
          "PUBG Mobile Year-End Match Planning & Operations Agency"
        ],
        participated: [
          "T.E.N (The Esports Night) 24 Season Production",
          "16th Presidential Cup Amateur Esports Championship",
          "2024 Ansan Esports Summer Festival",
          "2024 PUBG Global Esports Korean Broadcast Production",
          "2024 Esports College League Operations & Broadcast Production",
          "2024 Hanwhain Esports Championship"
        ]
      },
      {
        year: "2023",
        main: [
          "PGS 1, 2 / PGC Feed Broadcasting",
          "Esports Hall of Fame Video Content Production",
          "Chungnam Regional Esports Promotion Program",
          "Asian Esports Content Event Operations"
        ],
        participated: [
          "T.E.N (The Esports Night) 23 Season Production",
          "2023 Korea-China-Japan Esports Championships",
          "2023 Hanwhain Esports Championship",
          "2023 Esports College League Operations & Broadcast Production",
          "15th Presidential Cup Amateur Esports League (KeG League)",
          "Asian Sports Content Event Operations (GES Fighter's Week)"
        ]
      },
      {
        year: "2022",
        main: [
          "DouyuTV LCK Streaming Program Operations",
          "Samsung Fire eSuper Race Operations",
          "Gwangju Regional Esports Tournaments & Operations",
          "Esports Hall of Fame Video Content Production"
        ],
        participated: [
          "T.E.N (The Esports Night) 22 Season Production",
          "14th Presidential Cup Amateur Esports Championship National Finals",
          "2022 Busan Esports Championship & Event Programs Operations",
          "Chungnam Global Marketing Support Program",
          "PGC 2022 Feed Broadcasting"
        ]
      }
    ]
  }
};

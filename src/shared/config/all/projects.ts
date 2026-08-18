import { Bitcoin, BrainCircuit, Dumbbell, Music2, PawPrint } from "lucide-react";

export const projects = [
    {
        id: "mungpass",
        name: "Mungpass",
        projectType: "Personal Project",
        period: "2026.01 ~ 2026.05",
        category: "SIGNATURE PROJECT",
        summary:
            "회원·사장님·관리자를 연결하는 반려동물 시설 O2O · B2B 운영 플랫폼",
        description:
            "QR 체크인부터 실시간 이용 현황, 매출 관리, 관리자 운영 환경과 AI 매출 분석까지 하나의 서비스 흐름으로 구현했습니다.",
        icon: PawPrint,
        technologies: [
            "Next.js",
            "Supabase",
            "FSD",
            "Realtime",
            "Refine",
        ],
        highlights: [
            "QR 기반 O2O 이용 흐름",
            "B2B 운영 대시보드",
            "AI API 호출 약 67% 절감",
        ],
        metric: "67%",
        metricLabel: "AI API 호출 절감",
        theme: {
            icon: "bg-orange-500/10 text-orange-500",
            border: "hover:border-orange-500/40",
            text: "text-orange-500",
            glow: "bg-orange-500/10",
        },
        featured: true,
        link: '/mungpass'
    },
    {
        id: "fuelly",
        name: "Fuelly",
        projectType: "Personal Project",
        period: "2025.12 ~ 2026.01",
        category: "AI · HEALTH",
        summary:
            "AI 기반 개인 맞춤 영양 관리 서비스",
        description:
            "AI 응답 정형화와 JWT 인증, 토큰 재발급 동시성 제어를 중심으로 안정적인 데이터 흐름을 설계했습니다.",
        icon: BrainCircuit,
        technologies: [
            "Next.js",
            "Groq",
            "jose",
            "TanStack Query",
            "Zustand",
        ],
        highlights: [
            "AI JSON 응답 정형화",
            "Access / Refresh Token 인증",
            "Axios 재발급 Queue",
        ],
        metric: "70%↓",
        metricLabel: "인증 중복 코드",
        theme: {
            icon: "bg-emerald-500/10 text-emerald-500",
            border: "hover:border-emerald-500/40",
            text: "text-emerald-500",
            glow: "bg-emerald-500/10",
        },
        link: '/fuelly'
    },
    {
        id: "mingle",
        name: "Mingle",
        projectType: "Team Project",
        period: "2023.11 ~ 2023.11",
        category: "MUSIC SOCIAL",
        summary: "음악을 중심으로 사용자와 플레이리스트를 연결하는 서비스",
        description:
            "5인 팀 프로젝트에서 프론트엔드 개발을 담당하며 TanStack Query 기반 서버 데이터 관리 Recoil 상태 관리와 외부 API 연동을 경험했습니다.",
        icon: Music2,
        technologies: [
            "React",
            "TypeScript",
            "TanStack Query",
            "Recoil",
        ],
        highlights: [
            "5인 팀 협업",
            "플레이리스트 및 음악 인터랙션",
            "OpenWeather API 연동",
        ],
        metric: "CORS 해결",
        metricLabel: "외부 API 헤더 충돌",
        theme: {
            icon: "bg-violet-500/10 text-violet-500",
            border: "hover:border-violet-500/40",
            text: "text-violet-500",
            glow: "bg-violet-500/10",
        },
        link: "/mingle",
    },
    {
        id: "vc",
        name: "Virtual Coin(VC)",
        projectType: "Personal Project",
        period: "2025.03 ~ 2025.04",
        category: "REALTIME DATA",
        summary:
            "Upbit API 기반 실시간 모의 코인 투자 서비스",
        description:
            "REST와 WebSocket을 결합해 초기 시세 로딩과 실시간 데이터 동기화의 책임을 분리했습니다.",
        icon: Bitcoin,
        technologies: [
            "React",
            "WebSocket",
            "Recoil",
            "TanStack Query",
            "Lightweight Charts",
        ],
        highlights: [
            "REST + WebSocket 하이브리드",
            "실시간 렌더링 부하 제어",
        ],
        metric: "3.3s → 0.7s",
        metricLabel: "초기 시세 로딩",
        theme: {
            icon: "bg-red-500/10 text-red-500",
            border: "hover:border-red-500/40",
            text: "text-red-500",
            glow: "bg-red-500/10",
        },
        link: '/vc'
    },
    {
        id: "bnty",
        name: "BNTY",
        projectType: "Personal Project",
        period: "2024.09 ~ 2024.10",
        category: "REALTIME · O2O",
        summary:
            "트레이너와 회원을 연결하는 PT 관리 서비스",
        description:
            "QR 기반 출석과 PT 관리, Socket.IO 1:1 채팅을 구현하고 초기 렌더링 성능을 개선했습니다.",
        icon: Dumbbell,
        technologies: [
            "React",
            "Socket.IO",
            "MongoDB",
            "TanStack Query",
        ],
        highlights: [
            "QR 기반 PT 관리",
            "실시간 1:1 채팅",
            "한글 IME 중복 전송 대응",
        ],
        metric: "8.0s → 1.14s",
        metricLabel: "LCP",
        theme: {
            icon: "bg-blue-500/10 text-blue-500",
            border: "hover:border-blue-500/40",
            text: "text-blue-500",
            glow: "bg-blue-500/10",
        },
        link: '/bnty'
    },
];
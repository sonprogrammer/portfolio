import { ArchitectureItem } from "@/shared/model/types";
import {
  BrainCircuit,
  Database,
  Layers3,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

export const fuellyArchitecture: ArchitectureItem[] = [
  {
    icon: BrainCircuit,
    title: "AI 기반 영양 정보 처리 흐름",
    description:
      "AI 응답의 형식 편차로 인해 발생하는 파싱 오류를 줄이기 위해 응답 형식을 구조화하고 서버에서 데이터를 가공하도록 구성했습니다.",
    points: [
      "Groq AI API를 이용한 영양 정보 생성",
      "JSON Object 응답 형식을 이용한 응답 구조 통일",
      "서버에서 AI 응답을 파싱해 구조화된 영양 정보로 반환",
    ],

  },
  {
    icon: ShieldCheck,
    title: "jose 기반 JWT 인증 구조",
    description:
      "Next.js Middleware에서도 인증 토큰을 검증할 수 있도록 jose를 사용하고, Access Token과 Refresh Token의 역할과 저장 위치를 분리했습니다.",
    points: [
      "jose를 이용한 JWT 생성 및 검증",
      "Access Token을 클라이언트 메모리에서 관리",
      "Refresh Token을 HttpOnly Cookie로 관리",
      "Next.js Middleware에서 토큰을 검증해 보호 라우트 접근 제어",
    ],
  },
  {
    icon: Layers3,
    title: "서버 상태와 클라이언트 상태 분리",
    description:
      "서버에서 조회되는 데이터와 클라이언트 전역 상태의 책임을 React Query와 Zustand로 분리했습니다.",
    points: [
      "React Query를 이용한 서버 데이터 조회 및 캐싱",
      "Zustand를 이용한 클라이언트 전역 상태 관리",
      "서버 데이터와 UI 상태의 책임 분리",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Axios Interceptor 기반 토큰 재발급",
    description:
      "Access Token 만료 시 Refresh Token을 이용해 토큰을 재발급하고, 여러 요청이 동시에 실패하는 상황을 Queue로 제어했습니다.",
    points: [
      "Axios Interceptor를 이용한 인증 요청 처리",
      "Access Token 만료 시 Refresh Token 기반 재발급",
      "토큰 재발급 로직을 공통 인증 흐름으로 통합",
      "Queue를 이용한 동시 재발급 요청 제어",
    ],
  },
  {
    icon: Database,
    title: "MongoDB 기반 서비스 데이터 관리",
    description:
      "사용자와 식단 관련 데이터를 MongoDB에 저장하고 서버를 통해 조회·변경하도록 구성했습니다.",
    points: [
      "MongoDB를 이용한 서비스 데이터 저장",
      "사용자와 식단 데이터를 서버를 통해 조회 및 변경",
      "클라이언트에서 React Query를 통해 서버 데이터 동기화",
    ],
  },
];
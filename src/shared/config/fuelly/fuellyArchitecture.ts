import { ArchitectureItem } from "@/shared/model/types";
import {
  BrainCircuit,
  Database,
  Layers3,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export const fuellyArchitecture: ArchitectureItem[] = [
  {
    icon: BrainCircuit,
    title: "개인화 AI 추천 및 구조화 응답",
    description:
      "사용자의 신체 정보와 영양 목표뿐 아니라 알레르기, 비선호, 선호 음식, 추가 요청사항까지 AI 컨텍스트에 반영하고 구조화 응답과 런타임 검증으로 응답 안정성을 높였습니다.",
    points: [
      "사용자 설정과 영양 정보를 서버에서 AI 추천 컨텍스트로 구성",
      "고정 역할 및 규칙은 system, 사용자 정보와 질문은 user 메시지로 분리",
      "JSON Schema 기반 구조화 응답 적용",
      "AI 응답을 서버에서 런타임 검증한 뒤 클라이언트에 반환",
    ],
    update: '개선',

  },
  {
    icon: ShieldAlert,
    title: "외부 AI API 요청 안정화",
    description:
      "외부 AI API의 응답 지연과 일시적 장애에 대응하기 위해 공통 timeout 및 조건부 retry 로직을 구성했습니다.",
    points: [
      "AI 요청에 공통 timeout 로직 적용",
      "timeout, 429, 5xx 오류에 대해서만 조건부 재시도",
      "400, 401, 403 등 재시도로 해결되지 않는 오류는 즉시 실패 처리",
      "Vitest로 최초 성공, timeout 재시도 및 비재시도 오류 흐름 검증",
    ],
    update: '신규',
  },
  {
    icon: ShieldCheck,
    title: "jose 기반 JWT 인증 구조",
    description:
      "Next.js Middleware에서도 인증 토큰을 검증할 수 있도록 jose를 사용하고 Access Token과 Refresh Token의 역할과 저장 위치를 분리했습니다.",
    points: [
      "jose를 이용한 JWT 생성 및 검증",
      "Access Token을 브라우저 영구 저장소가 아닌 메모리에서 관리",
      "Refresh Token을 HttpOnly Cookie로 관리",
      "Next.js Middleware에서 토큰을 검증해 보호 라우트 접근 제어",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Axios Interceptor 기반 토큰 재발급",
    description:
      "Access Token 만료 시 Refresh Token을 이용해 토큰을 재발급하고 여러 요청이 동시에 실패하는 상황을 Queue로 제어했습니다.",
    points: [
      "Axios Interceptor를 이용한 인증 요청 처리",
      "Access Token 만료 시 Refresh Token 기반 재발급",
      "토큰 재발급 로직을 공통 인증 흐름으로 통합",
      "Queue를 이용한 동시 재발급 요청 제어",
    ],
  },
  {
    icon: Layers3,
    title: "서버 상태와 UI 로직의 책임 분리",
    description:
      "서버에서 조회되는 데이터와 클라이언트 전역 상태의 책임을 TanStack Query와 Zustand로 분리하고 반복되는 데이터 처리 로직은 Custom Hook으로 구성했습니다.",

    points: [
      "TanStack Query 기반 Custom Hook으로 서버 데이터 조회·변경 및 캐싱 관리",
      "Zustand를 이용한 클라이언트 전역 상태 관리",
      "반복되는 상태와 비즈니스 로직을 Custom Hook으로 분리해 컴포넌트의 UI 책임과 데이터 처리 책임 구분",

    ],
  },
  {
    icon: ShieldCheck,
    title: "Zod 기반 API 요청및 응답 검증",
    description:
      "TypeScript 타입만으로 보장할 수 없는 실제 요청·응답 데이터를 Zod로 검증하고, 검증된 데이터를 저장과 화면 처리에 사용하도록 구성했습니다.",
    points: [
      "서버에서 요청 데이터를 검증한 뒤 DB 저장, 수정에 사용",
      "클라이언트에서 API 응답을 검증한 뒤 상태, 캐시, 화면에 반영",
      "응답 스키마와 클라이언트 타입의 선택 필드 및 null 허용 여부 정리",
    ],
    update: "신규"
  },
  {
    icon: Database,
    title: "MongoDB 기반 사용자, 식단, AI 데이터 관리",
    description:
      "사용자와 식단 데이터뿐 아니라 AI 개인화 설정과 검색 기록을 사용자 계정 기준으로 저장하고 서버를 통해 관리하도록 구성했습니다.",
    points: [
      "사용자와 식단, AI 개인화 설정을 MongoDB에 저장",
      "AI 검색 결과를 사용자별 검색 기록으로 저장",
      "검색 기록 조회 및 삭제 API 구현",
      "TanStack Query 캐시 무효화를 통해 서버 상태와 UI 동기화",
    ],
    update: '개선',
  },
];
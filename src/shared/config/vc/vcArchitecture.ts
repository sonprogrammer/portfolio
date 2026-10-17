import { ArchitectureItem } from '@/shared/model/types'
import {
  Activity,
  Database,
  Layers3,
  Server,
  Wifi
} from 'lucide-react'


export const vcArchitecture: ArchitectureItem[] = [
  {
    icon: Wifi,
    title: 'REST + WebSocket 하이브리드 시세 수신',
    description:
      'REST API로 초기 시세를 조회하고 WebSocket으로 실시간 데이터를 수신합니다. 비동기 응답 순서로 인한 데이터 불일치를 방지하고, 연결 복구 시 시세를 재동기화하도록 구성했습니다.',
    points: [
      'REST API를 이용한 초기 시세 데이터 조회',
      'Upbit WebSocket을 통한 실시간 시세 수신',
      'timestamp 비교 및 요청 ID 검증으로 오래된 시세 반영 방지',
      '연결 복구 시 REST API 재조회로 시세 동기화',
    ],
    update: '개선'
  },
  {
    icon: Server,
    title: 'Node.js, Express 기반 중계 서버',
    description:
      'Node.js 중계 서버에서 Upbit REST API 및 WebSocket 연결을 관리하고, 실시간 시세를 클라이언트에 전달하도록 구성했습니다.',
    points: [
      'Node.js, Express 기반 REST API 및 WebSocket 중계 서버 구성',
      'CORS 및 Upbit Origin 기반 요청 제한 문제 해결',
      'Ping/Pong Heartbeat를 통한 연결 상태 감지',
      '지수 백오프 기반 자동 재연결 및 최대 30초 재시도 간격 적용',
    ],
    update: '개선'
  },
  {
    icon: Activity,
    title: '실시간 시세 데이터 시각화',
    description:
      '수신한 코인 데이터를 React 화면에 연결하고 Lightweight Charts를 이용해 시세 변화를 시각화했습니다.',
    points: [
      '실시간 수신 데이터를 React UI에 반영',
      'Lightweight Charts 기반 캔들 차트 구현',
      '시세 변경에 따른 차트 데이터 업데이트',
    ],
  },
  {
    icon: Layers3,
    title: '서버 데이터와 클라이언트 상태의 책임 분리',
    description:
      'TanStack Query와 Recoil로 데이터 관리 책임을 분리하고, WebSocket 시세는 Map 기반 배치 처리와 throttle을 적용해 전역 상태에 반영하도록 구성했습니다.',
    points: [
      'TanStack Query를 이용한 서버 데이터 조회 및 캐싱',
      'Recoil을 이용한 코인별 실시간 시세 전역 상태 관리',
      'Map 기반 코인별 최신 시세 수집 및 throttle(300ms) 적용',
      'localStorage 기반 사용자 정보 저장 제거 및 /me API를 통한 상태 복원',
      'Custom Hook을 통한 REST 조회 및 WebSocket 수신 로직 분리',
    ],
    update: '개선'
  },
  {
    icon: Database,
    title: 'MongoDB 기반 데이터 및 JWT 인증 관리',
    description:
      'MongoDB에 게스트와 카카오 사용자 데이터를 저장하고, JWT 기반 인증 구조를 통일했습니다. 서버에서 검증한 사용자 ID를 기준으로 데이터 접근을 처리하고 Refresh Token을 이용해 인증 상태를 복구하도록 개선했습니다.',
    points: [
      'MongoDB 기반 사용자 자산, 주문 및 관심 코인 데이터 관리',
      '게스트·카카오 로그인 공통 JWT 인증 구조',
      'Access Token 메모리 관리 및 Refresh Token의 HttpOnly Cookie 저장',
      'Axios Interceptor 기반 토큰 재발급 및 기존 요청 재시도',
      'JWT 사용자 ID 기반 서버 데이터 조회 및 변경 처리',
      'Refresh Token 재발급 및 API를 통한 사용자 정보 복원',
      '게스트, 카카오 공통 로그아웃 및 인증 상태 초기화',
    ],
    update: '개선'
  },
]
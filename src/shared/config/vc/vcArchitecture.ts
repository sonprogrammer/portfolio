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
      '초기 시세는 Upbit REST API로 먼저 불러오고 이후 WebSocket 연결을 통해 실시간 데이터로 전환하는 구조로 구성했습니다.',
    points: [
      'REST API를 이용한 초기 시세 데이터 조회',
      'Upbit WebSocket을 통한 실시간 시세 수신',
      '초기 데이터 로딩과 실시간 업데이트의 역할 분리',
    ],
  },
  {
    icon: Server,
    title: 'Node.js · Express 기반 중계 서버',
    description:
      '클라이언트에서 Upbit API를 직접 호출하지 않고 Node.js 서버를 중간 계층으로 두어 외부 API 요청을 관리했습니다.',
    points: [
      'Node.js · Express 기반 REST API 서버 구성',
      'Upbit API 요청을 서버에서 중계하도록 구성',
      'CORS 및 Upbit API 요청 제한 문제를 중계 서버를 통해 해결',
    ],
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
    title: '서버 상태와 클라이언트 상태 분리',
    description:
      '서버에서 조회하는 데이터와 클라이언트에서 관리해야 하는 상태의 책임을 TanStack Query와 Recoil로 분리했습니다.',
    points: [
      'TanStack Query를 이용한 서버 데이터 조회 및 캐싱',
      'Recoil을 이용한 클라이언트 전역 상태 관리',
      'Axios를 통한 REST API 요청 처리',
    ],
  },
  {
    icon: Database,
    title: 'MongoDB 기반 데이터 및 인증 관리',
    description:
      'MongoDB를 서비스 데이터 저장소로 사용하고 jsonwebtoken을 이용해 인증 토큰을 처리했습니다.',
    points: [
      'MongoDB 기반 서비스 데이터 저장',
      'Node.js 서버에서 데이터 조회 및 변경 처리',
      'jsonwebtoken을 이용한 인증 토큰 처리',
    ],
  },
]
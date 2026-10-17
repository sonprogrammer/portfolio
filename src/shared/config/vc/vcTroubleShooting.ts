import { TroubleshootingItem } from "@/shared/model/types";


export const vcTroubleShooting: TroubleshootingItem[] = [
    {
        title: "WebSocket 단독 수신으로 인한 초기 시세 로딩 지연",
        problem:
            "초기 시세 데이터를 WebSocket으로만 수신하면서 첫 화면의 코인 시세가 모두 표시되기까지 평균 약 4.68초가 소요되었습니다.",
        reason:
            "초기 화면 렌더링이 WebSocket 연결과 첫 데이터 수신 시점에 의존하고 있어 실시간 연결이 완료될 때까지 시세 표시가 지연되었습니다.",
        solution:
            "초기 시세는 REST API로 먼저 조회해 렌더링하고, 이후 WebSocket을 백그라운드에서 연결해 실시간 데이터로 동기화하는 하이브리드 방식으로 변경했습니다.",
        results: [
            "Production 환경 5회 측정 기준 첫 화면 시세 로딩 4.68초 → 0.9초로 약 81% 단축",
            "초기 데이터 표시와 실시간 시세 동기화의 역할 분리",
        ],
    },
    {
        title: "실시간 시세 수신으로 인한 과도한 상태 업데이트",
        update: "개선",
        tested: true,
        problem:
            "Upbit WebSocket에서 실시간 시세가 지속적으로 수신되면서 빈번한 전역 상태 업데이트가 발생할 수 있었습니다.",
        reason:
            "실시간 데이터를 수신할 때마다 Recoil 상태를 변경하면 불필요한 렌더링 부담이 증가할 수 있기 때문입니다.",
        solution:
            "기존 lodash throttle(300ms)을 유지하면서 코인별 WebSocket 시세를 Map에 누적하고, 주기적으로 Recoil 상태에 일괄 반영하도록 개선했습니다. 동일 코인의 시세는 timestamp를 비교해 최신 데이터만 유지하도록 구성했습니다.",
        results: [
            "기존 throttle(300ms)을 통한 Recoil 상태 업데이트 빈도 제한 유지",
            "Map을 이용한 코인별 시세 누적 및 일괄 상태 업데이트",
            "timestamp 비교로 순서가 뒤바뀐 시세의 덮어쓰기 방지",
            "시세 처리 로직에 대한 자동화 테스트 검증",
        ],
    },
    {
        title: "Upbit API CORS 및 요청 제한 문제",
        problem:
            "브라우저에서 Upbit API를 직접 호출하는 과정에서 CORS 오류와 429 Too Many Requests 문제가 발생했습니다.",
        reason:
            "브라우저 요청에 Origin 헤더가 포함되면서 Upbit의 Origin 기반 요청 제한이 적용되었고 REST API와 WebSocket 모두 10초당 1회의 제한을 받았습니다.",
        solution:
            "기존 브라우저에서 직접 요청하는 방식 대신 Node.js 백엔드에 중계 서버를 구축해 Upbit REST API와 WebSocket 연결을 서버에서 처리하도록 변경했습니다. 이를 통해 브라우저의 CORS 제약을 해결하고 Origin 기반 요청 제한 문제를 해결했습니다.",
        results: [
            "Upbit API 요청 구조를 서버 중계 방식으로 개선",
            "CORS 및 Origin 기반 요청 제한 문제 해결",
        ],
    },
    {
        title: "WebSocket 연결 장애 복구 및 REST·실시간 시세 동기화",
        update: "신규",
        tested: true,
        problem:
            "REST 초기 조회와 WebSocket 실시간 수신이 동시에 진행되면서 오래된 시세가 최신 데이터를 덮어쓸 가능성이 있었고, WebSocket 연결 장애 발생 시 누락된 시세를 복구할 필요가 있었습니다.",
        reason:
            "REST 응답과 WebSocket 메시지의 도착 순서가 시세 생성 순서와 일치하지 않을 수 있으며, 재연결만으로는 연결이 끊긴 동안의 데이터 누락을 해소할 수 없었습니다.",
        solution:
            "REST 요청 중 수신한 WebSocket 시세를 Map에 임시 저장하고 timestamp를 비교해 최신 데이터만 반영하도록 구성했습니다. syncRequestId로 오래된 REST 응답을 무효화하고, Ping/Pong Heartbeat 및 최대 30초 지수 백오프 재연결을 구현했습니다. 또한 연결 복구 후 REST 재조회로 시세를 다시 동기화하도록 개선했습니다.",
        results: [
            "timestamp 기반 비교 및 요청 ID 검증으로 오래된 시세 반영 방지",
            "Ping/Pong 미응답 감지와 지수 백오프 기반 자동 재연결 구현",
            "연결 복구 후 REST 재동기화 처리",
            "Vitest 단위 테스트 6개 및 훅 통합 테스트 7개 통과",
            "WebSocket 강제 종료, Pong 미응답 및 재연결 간격 시나리오 검증",
        ],
    },

]
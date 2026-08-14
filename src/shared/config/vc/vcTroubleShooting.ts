import { TroubleshootingItem } from "@/shared/model/types";


export const vcTroubleShooting: TroubleshootingItem[] = [
    {
        title: "WebSocket 단독 수신으로 인한 초기 시세 로딩 지연",
        problem:
            "초기 시세 데이터를 WebSocket으로만 수신하면서 사용자가 첫 시세를 확인하기까지 약 3.3초가 소요되었습니다.",
        reason:
            "초기 화면 렌더링이 WebSocket 연결과 첫 데이터 수신 시점에 의존하고 있어 실시간 연결이 완료될 때까지 시세 표시가 지연되었습니다.",
        solution:
            "초기 시세는 REST API로 먼저 조회해 렌더링하고, 이후 WebSocket을 백그라운드에서 연결해 실시간 데이터로 동기화하는 하이브리드 방식으로 변경했습니다.",
        results: [
            "초기 시세 로딩 시간 3.3초 → 0.7초로 단축",
            "초기 데이터 표시와 실시간 시세 동기화의 역할 분리",
        ],
    },
    {
        title: "실시간 시세 수신으로 인한 과도한 상태 업데이트",
        problem:
            "Upbit WebSocket에서 실시간 시세 데이터가 지속적으로 전달되면서 상태 업데이트가 빈번하게 발생했습니다.",
        reason:
            "수신되는 WebSocket 데이터를 그대로 상태에 반영하면서 짧은 시간 동안 많은 업데이트가 발생했습니다.",
        solution:
            "lodash의 throttle을 적용해 실시간 데이터 처리 주기를 제어하고 상태 업데이트 빈도를 제한했습니다.",
        results: [
            "과도한 상태 업데이트 방지",
            "실시간 데이터 업데이트 주기 제어",
        ],
    },
    {
        title: "Upbit API CORS 및 요청 제한 문제",
        problem:
            "Upbit API 연동 과정에서 CORS 오류와 Too Many Requests 요청 제한 문제가 발생했습니다.",
        reason:
            "외부 Upbit API 요청을 처리하는 과정에서 브라우저의 CORS 제약과 API 요청 제한의 영향을 받았습니다.",
        solution:
            "Node.js 백엔드에 중계 서버를 구축해 Upbit API 요청을 서버에서 처리하도록 구조를 변경했습니다.",
        results: [
            "Upbit API CORS 문제 해결",
            "Too Many Requests 요청 제한 문제 대응",
        ],
    },
]
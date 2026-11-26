import { TroubleshootingItem } from "@/shared/model/types";


export const fuellyTroubleshooting: TroubleshootingItem[] = [
  {
    title: "AI 응답 형식 편차로 인한 파싱 오류",
    problem:
      "AI가 반환하는 응답 형식이 일정하지 않아 영양 정보를 파싱하는 과정에서 오류가 발생할 수 있었습니다.",
    reason:
      "자연어 기반 AI 응답은 동일한 요청에서도 데이터의 형식이나 구조가 달라질 수 있어 클라이언트에서 안정적으로 처리하기 어려웠습니다.",
    solution:
      "JSON Schema 기반 구조화 응답을 적용하고 서버에서 AI 응답을 런타임 검증한 뒤, 검증을 통과한 데이터만 클라이언트에 반환하도록 변경했습니다.",
    results: [
      "AI 응답 형식 편차로 인한 파싱 오류 가능성 감소",
      "잘못된 응답 구조가 클라이언트까지 전달되는 흐름 방지",
      "클라이언트에서 일관된 영양 데이터 처리",
      "Vitest로 AI 검색 응답 유효성, 검색 요청값 및 식단 추천 프롬프트 생성 검증",
      "실제 실행 환경에서 알레르기, 비선호 및 선호 음식, 추가 요청과 충돌 조건을 포함한 AI 응답 평가 6개 시나리오를 직접 검증하고 모두 통과"
    ],
    update: "개선",
    tested: true,
  },
  {
    title: "AI 응답 지연 및 일시적 장애 대응",
    problem:
      "AI 요청은 일반 API보다 응답 시간이 길고 외부 API 상태에 따라 timeout이나 일시적인 요청 실패가 발생할 수 있었습니다.",
    reason:
      "외부 AI 모델의 추론 시간과 API 상태에 영향을 받기 때문에 응답 지연이나 429, 5xx 오류가 발생할 수 있었습니다.",
    solution:
      "AI 처리 중에는 로딩 UI를 표시하고 공통 요청 유틸에 timeout과 조건부 retry 로직을 적용했습니다. timeout, 429, 5xx 오류만 한 번 재시도하고 재요청으로 해결되지 않는 4xx 오류는 즉시 실패하도록 구성했습니다.",
    results: [
      "AI 처리 중 사용자에게 명확한 진행 UI 제공",
      "일시적인 AI API 장애 발생 시 자동 재시도",
      "재시도로 해결되지 않는 오류의 불필요한 AI 호출 방지",
      "Vitest로 AI 요청 실패 시 재시도 처리 3개 테스트 통과"
    ],
    update: "신규",
    tested: true,
  },
  {
    title: "동일 음식 재검색 시 반복 AI 요청",
    problem:
      "이미 조회한 음식도 다시 검색할 때마다 AI API 요청과 응답 대기 시간이 반복될 수 있었습니다.",
    reason:
      "이전에 조회한 영양 정보가 있더라도 검색 결과를 재사용하지 않으면 동일한 음식에 대해 매번 외부 AI API를 다시 호출해야 했습니다.",
    solution:
      "TanStack Query를 활용해 음식별 AI 검색 결과를 캐싱하고, 동일한 음식을 다시 검색할 경우 네트워크 요청 없이 기존 캐시 데이터를 재사용하도록 구성했습니다.",
    results: [
      "동일 음식 재검색 시 불필요한 AI API 및 네트워크 요청 제거",
      "동일 환경 5회 평균 기준 결과 표시 시간 867.1ms → 10.9ms로 약 98.7% 단축",
      "Chrome DevTools Network 탭에서 동일 음식 재검색 시 추가 네트워크 요청 없이 캐시가 재사용되는 동작을 수동 검증",

    ],
    update: "신규",
    tested: true,
  },
  {
    title: "동시 요청 환경에서의 토큰 재발급 중복",
    problem:
      "Access Token이 만료된 상태에서 여러 API 요청이 동시에 발생하면 각각의 요청에서 토큰 재발급 로직이 실행되었습니다.",
    reason:
      "인증 재발급 흐름이 각 요청 단위로 처리되면 동일한 시점에 여러 Refresh 요청이 중복으로 발생할 수 있었습니다.",
    solution:
      "Axios Instance와 Interceptor에 Access Token 주입 및 토큰 재발급 로직을 통합했습니다. 재발급이 진행 중이면 새로운 요청을 만들지 않고 기존 refreshPromise를 공유하고, 발급이 완료되면 각 요청을 새 Access Token으로 다시 실행하도록 구성했습니다.",
    results: [
      "17개 API 훅의 인증 및 토큰 재발급 로직 공통화",
      "동시 요청 환경에서 중복 Refresh 요청 방지",
      "재발급 완료 후 각 요청을 새로운 Access Token으로 재실행",
      "Vitest로 동시 재발급 요청이 하나의 refreshPromise를 공유하는 흐름 검증",
    ],
    update: "개선",
    tested: true,
  },
  {
    title: "로그아웃 이후 Refresh Token 재사용 위험",
    problem:
      "로그아웃할 때 브라우저의 Refresh Token 쿠키만 삭제하면 미리 탈취된 토큰은 만료 전까지 재사용될 수 있었습니다.",
    reason:
      "JWT의 서명과 만료 시간만 검증하면 서버에서 특정 로그인 세션의 Refresh Token을 즉시 무효화할 수 없기 때문입니다.",
    solution:
      "로그인마다 세션 ID를 생성하고 사용자 ID와 Refresh Token의 SHA-256 해시를 Redis에 저장했습니다. 로그아웃 시에는 토큰의 jti로 해당 Redis 세션을 삭제하고, 재발급 과정에서 JWT와 Redis의 토큰 해시가 모두 유효한지 확인하도록 변경했습니다.",
    results: [
      "로그아웃한 세션의 Refresh Token을 서버에서 즉시 무효화",
      "여러 기기 중 로그아웃한 세션만 선택적으로 종료",
      "JWT 유효기간이 남아 있어도 Redis 세션이 없으면 재발급 거부",
      "Vitest로 정상 Rotation과 이전 Refresh Token 재사용 거부 검증",
    ],
    update: "신규",
    tested: true,
  },
  {
    title: "Refresh Token Rotation의 동시성 및 응답 유실",
    problem:
      "동일한 Refresh Token으로 재발급 요청이 동시에 실행되면 새로운 토큰이 중복 발급될 수 있고, 서버에서 토큰을 교체한 뒤 응답이 유실되면 브라우저에는 이미 무효화된 토큰만 남을 수 있었습니다.",
    reason:
      "토큰 검증과 교체가 분리되어 있으면 여러 요청이 같은 기존 토큰을 동시에 유효하다고 판단할 수 있습니다. 또한 Rotation은 서버 상태를 먼저 변경하므로 응답 유실 후 기존 토큰으로 재시도하면 Redis의 최신 해시와 일치하지 않습니다.",
    solution:
      "Redis Lua Script로 기존 토큰 검증과 새 토큰 해시 교체, 복구 기록 저장을 원자적으로 처리했습니다. 클라이언트는 재발급 요청에 Idempotency-Key를 생성해 재시도에서도 유지하고, 서버는 암호화한 신규 Refresh Token과 발급 결과를 30초간 저장해 동일 요청의 결과를 복구하도록 구성했습니다.",
    results: [
      "동일한 기존 토큰을 이용한 중복 Rotation 제어",
      "동일한 Idempotency-Key 재요청 시 기존 발급 결과 복구",
      "다음 Rotation이 진행된 이후 과거 복구 결과가 반환되는 흐름 차단",
      "Vitest로 A→B→C Rotation과 이전 토큰 및 과거 복구 결과 거부 검증",
    ],
    update: "신규",
    tested: true,
  },
  {
    title: "재발급 장애 반복과 인증 복구 실패 처리",
    problem:
      "재발급 요청 중 네트워크나 서버 장애가 발생하면 곧바로 로그아웃되거나, 새로고침과 자동 재시도로 인증 오류가 반복될 수 있었습니다.",
    reason:
      "일시적 장애와 실제 인증 만료를 구분하지 않으면 복구 가능한 요청을 종료하거나, Rotation 결과가 불확실한 상태에서 새로운 요청 ID로 재발급을 반복할 수 있기 때문입니다.",
    solution:
      "네트워크 오류와 429, 502, 503, 504 응답은 동일한 Idempotency-Key로 지수 백오프 재시도하고 401은 즉시 인증 만료로 처리했습니다. 복구에 실패하면 refreshRecoveryFailed를 sessionStorage에도 기록해 새로고침 후 자동 재발급을 차단하고, 재로그인 시 쿠키와 인증 상태 및 실패 기록을 초기화하도록 구성했습니다.",
    results: [
      "일시적인 네트워크, 서버 장애와 인증 만료 처리 분리",
      "복구 실패 이후 새로고침 시 불필요한 재발급 요청 차단",
      "인증 상태가 불확실한 상황에서 새로운 요청 ID를 이용한 자동 Rotation 제한",
      "브라우저에서 지속적인 503 오류, 새로고침 및 재로그인 흐름 수동 검증",
    ],
    update: "신규",
    tested: true,
  },
];

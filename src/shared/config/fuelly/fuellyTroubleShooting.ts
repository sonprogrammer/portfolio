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
      "Axios Instance와 Interceptor에 Access Token 주입 및 토큰 재발급 로직을 통합했습니다. 재발급 중에는 이후 요청을 Queue에서 대기시키고, 새로운 Access Token 발급이 완료되면 대기 중인 요청을 새 토큰으로 재시도하도록 구성했습니다.",
    results: [
      "17개 API 훅의 인증 및 토큰 재발급 로직 공통화",
      "동시 요청 환경에서 중복 Refresh 요청 방지",
      "재발급 완료 후 대기 요청을 새로운 Access Token으로 일괄 재시도",
    ],
  },
];
import { TroubleshootingItem } from "@/shared/model/types";


export const fuellyTroubleshooting: TroubleshootingItem[] = [
  {
    title: "AI 응답 형식 편차로 인한 파싱 오류",
    problem:
      "AI가 반환하는 응답 형식이 일정하지 않아 영양 정보를 파싱하는 과정에서 오류가 발생할 수 있었습니다.",
    reason:
      "자연어 기반 AI 응답은 동일한 요청에서도 데이터의 형식이나 구조가 달라질 수 있어 클라이언트에서 안정적으로 처리하기 어려웠습니다.",
    solution:
      "Groq의 JSON Object 응답 형식을 적용하고, 서버에서 AI 응답을 파싱해 필요한 영양 정보 구조로 변환한 뒤 클라이언트에 반환하도록 변경했습니다.",
    results: [
      "AI 응답 형식 편차로 인한 파싱 오류 가능성 감소",
      "클라이언트에서 일관된 형태의 영양 데이터 처리",
    ],
  },
  {
    title: "AI 응답 지연에 따른 사용자 대기 경험",
    problem:
      "AI 식단 분석 및 추천 과정에서 약 2~3초의 응답 대기 시간이 발생했습니다.",
    reason:
      "AI 모델의 추론이 완료된 이후에 결과를 받을 수 있어 일반적인 API 요청보다 응답 시간이 길었습니다.",
    solution:
      "AI 요청 상태에 따라 스켈레톤 UI와 로딩 인터랙션을 표시해 사용자가 현재 처리 상태를 인지할 수 있도록 구성했습니다.",
    results: [
      "AI 처리 중 사용자에게 명확한 진행 상태 제공",
      "2~3초의 AI 응답 대기 시간에 대한 체감 UX 개선",
    ],
  },
  {
    title: "동시 요청 환경에서의 토큰 재발급 중복",
    problem:
      "Access Token이 만료된 상태에서 여러 API 요청이 동시에 발생하면 각각의 요청에서 토큰 재발급 로직이 실행될 수 있었습니다.",
    reason:
      "인증 재발급 흐름이 각 요청 단위로 처리되면 동일한 시점에 여러 Refresh 요청이 중복으로 발생할 수 있었습니다.",
    solution:
      "Axios Interceptor에 토큰 재발급 로직을 통합하고 Queue를 구성해 재발급이 진행되는 동안 발생한 요청은 대기한 뒤 새로운 Access Token으로 다시 처리하도록 구성했습니다.",
    results: [
      "파편화된 인증 로직 통합으로 중복 코드 약 70% 감소",
      "동시 요청 환경에서 불필요한 토큰 재발급 요청 감소",
    ],
  },
];
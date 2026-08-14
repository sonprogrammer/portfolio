import { TroubleshootingItem } from "@/shared/model/types";


export const mungTroubleshooting: TroubleshootingItem[] = [
  {
    title: "AI 매출 분석 API 중복 호출 최적화",
    problem:
      "사장님이 같은 날 매출 현황을 확인할 때마다 Gemini API를 호출하면 분석이 반복 생성되고 불필요한 응답 대기 시간과 API 비용이 발생했습니다.",
    reason:
      "매출 분석 결과를 조회할 때마다 새롭게 생성하는 구조였기 때문에 동일 날짜의 반복 조회도 모두 별도의 API 요청으로 처리됐습니다.",
    solution:
      "AI 매출 분석 결과를 DB에 저장하고 같은 날짜에는 저장된 결과를 재사용하도록 구성해 Gemini API가 하루에 한 번만 호출되도록 제한했습니다.",
    results: [
      "하루 3회 조회를 가정할 때 AI API 호출 약 67% 절감",
      "같은 날짜의 중복 분석 요청 방지",
      "반복 조회 시 저장된 분석 결과 즉시 제공",
    ],
  },
  {
    title: "재사용 컴포넌트의 캐시 잔상과 렌더링 엇박자",
    problem:
      "지도 API와 BottomSheet 컴포넌트를 여러 페이지에서 재사용할 때 이전 매장의 데이터가 잠시 남거나 새로운 데이터와 UI 렌더링 시점이 어긋나는 문제가 발생했습니다.",
    reason:
      "상위 데이터의 ID만 변경되고 컴포넌트가 언마운트되지 않으면서 내부 훅과 로컬 상태가 이전 데이터 기준으로 유지됐습니다.",
    solution:
      "컴포넌트에 매장 ID를 기반으로 한 고유한 key를 부여해 대상이 변경될 때 컴포넌트와 내부 훅이 새롭게 초기화되도록 구성했습니다.",
    results: [
      "이전 매장 데이터가 남는 캐시 잔상 제거",
      "지도와 BottomSheet 데이터 정합성 확보",
      "상위 ID 변경 시 내부 상태의 명확한 초기화",
    ],
  },
  {
    title: "Next.js 사전 렌더링과 Hydration 오류 해결",
    problem:
      "Vercel 빌드 과정에서 useSearchParams 관련 사전 렌더링 오류가 발생했고 새로고침 직후에는 Zustand Persist 데이터가 복구되기 전에 UI가 렌더링돼 사용자 정보가 비어 보이는 문제가 있었습니다.",
    reason:
      "useSearchParams는 런타임에 의존하는 클라이언트 훅이므로 정적 렌더링 과정에서 CSR Bailout을 발생시켰습니다. 또한 서버에서는 localStorage에 접근할 수 없어 서버 렌더링 시점과 클라이언트 Rehydration 완료 시점 사이에 차이가 발생했습니다.",
    solution:
      "쿼리 스트링을 사용하는 로직을 별도 클라이언트 컴포넌트로 분리하고 상위에서 Suspense로 감쌌습니다. Zustand Persist에는 onRehydrateStorage를 적용해 저장소 복구 완료 여부를 관리하고 Hydration이 완료된 이후에만 관련 UI를 렌더링했습니다.",
    results: [
      "useSearchParams로 인한 Vercel 빌드 오류 해결",
      "CSR 전환이 필요한 컴포넌트 경계 명확화",
      "새로고침 직후 사용자 데이터 깜빡임 방지",
      "서버와 클라이언트 초기 상태 불일치 해결",
    ],
  },
  {
    title: "Refine QueryClient 분리로 인한 캐시 불일치",
    problem:
      "매장 검색 요청은 정상적으로 실행됐지만 React Query Devtools에 쿼리가 표시되지 않거나 특정 상황에서 캐시 데이터와 실제 화면 상태가 일치하지 않는 문제가 발생했습니다.",
    reason:
      "Refine 내부에서 별도의 QueryClient가 사용되면서 애플리케이션 최상단 Provider의 QueryClient와 캐시 저장소가 분리됐습니다. 이로 인해 데이터 훅과 Devtools가 서로 다른 캐시 인스턴스를 참조했습니다.",
    solution:
      "애플리케이션 최상단에서 생성한 QueryClient 인스턴스를 Refine 설정에도 명시적으로 주입해 모든 데이터 훅과 Devtools가 하나의 캐시 저장소를 공유하도록 구조를 수정했습니다.",
    results: [
      "React Query 캐시 저장소 단일화",
      "데이터 훅과 Devtools의 조회 상태 일치",
      "매장 검색 결과와 실제 UI 상태의 정합성 확보",
    ],
  },

];
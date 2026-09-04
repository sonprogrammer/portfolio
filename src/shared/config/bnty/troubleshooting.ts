import { TroubleshootingItem } from "@/shared/model/types";


export const troubleshootingItems: TroubleshootingItem[] = [
  {
    title: "한글 IME 입력 시 메시지 중복 전송 ",
    problem:
      "한글의 마지막 글자가 조합 중인 상태에서 Enter를 누르면 동일한 메시지가 두 번 전송되는 문제가 발생했습니다.",
    reason:
      "한글 입력은 IME 조합 과정을 거치기 때문에 Enter 입력 시 조합 완료 이벤트와 키보드 이벤트가 함께 발생할 수 있었습니다.",
    solution:
      "KeyboardEvent의 nativeEvent.isComposing 값을 검사해 한글 조합이 완료된 경우에만 메시지를 전송하도록 분기했습니다.",
    results: [
      "한글 입력 환경에서 동일 메시지 중복 전송 방지",
      "Enter를 이용한 기존 전송 방식 유지",
    ],
  },
  {
    title: "초기 렌더링 성능 저하",
    problem:
      "초기 페이지 진입 시 여러 컴포넌트와 데이터 요청이 동시에 처리되면서 LCP가 약 8초까지 증가했습니다.",
    reason:
      "초기 화면에서 필요하지 않은 컴포넌트까지 한번에 로드되고 서로 독립적인 API 요청도 순차적으로 처리되고 있었습니다.",
    solution:
      "React.lazy와 Suspense를 이용해 초기 번들을 분리하고, 독립적인 요청을 Promise.all로 병렬 처리했습니다. 반복 렌더링이 발생하는 컴포넌트에는 메모이제이션을 적용했습니다.",
    results: [
      "Lighthouse 5회 측정 기준 LCP 8.0초 → 1.1초로 약 86% 개선",
      "네트워크 대기 시간 및 불필요한 렌더링 감소",
    ],
  },
];
export const mingleTroubleShooting = [
  {
    title: "OpenWeather API 요청 시 CORS 오류",
    problem:
      "공통 Axios 인스턴스를 사용해 OpenWeather API를 호출했을 때 CORS 오류가 발생해 날씨별 플레이리스트 데이터를 불러오지 못했습니다.",
    reason:
      "내부 API 인증을 위해 설정한 Axios 인터셉터가 외부 API 요청에도 적용되면서 Authorization 헤더가 OpenWeather 요청에 함께 포함되고 있었습니다.",
    solution:
      "네트워크 요청 헤더를 확인해 Authorization 헤더 충돌을 파악하고, 인증이 필요하지 않은 외부 API 요청은 별도의 Axios 인스턴스로 분리했습니다.",
    results: [
      "OpenWeather API CORS 및 Preflight 문제 해결",
      "날씨별 플레이리스트 데이터 정상 수신",
      "내부 API와 외부 API의 요청 책임 분리",
    ],
  },
];
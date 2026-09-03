export const fuellyTechChoice = {
  title: '기술 선택 배경',
  description:
    '사용자 식단 데이터와 인증, AI 추천 기능을 하나의 서비스에서 처리하면서 서버 상태와 클라이언트 상태의 책임을 분리하는 방향으로 기술을 구성했습니다.',
  points: [
    'Next.js는 프론트엔드 화면과 Route Handler 기반 서버 API를 하나의 프로젝트에서 함께 구성할 수 있어 별도의 백엔드 서버 없이 Fuelly의 인증, 식단, AI API를 통합해서 개발하기 위해 선택했습니다.',
"TanStack Query는 식단 기록, 영양 정보처럼 서버에서 관리되는 데이터의 조회와 캐시를 담당하고 Zustand는 전역 UI와 클라이언트 상태를 관리하도록 책임을 분리했습니다. 서버 데이터 조회·변경 로직은 TanStack Query 기반 Custom Hook으로 구성하고, 여러 컴포넌트에서 반복되는 상태와 비즈니스 로직 역시 Custom Hook으로 분리해 컴포넌트가 UI 표현에 집중할 수 있도록 했습니다.",
    'MongoDB는 사용자별 식단 기록과 영양 데이터를 문서 형태로 유연하게 저장하고, 기존 JavaScript 기반 개발 환경과 자연스럽게 연결할 수 있어 선택했습니다.',
    'JWT를 HttpOnly Cookie에 저장해 클라이언트 JavaScript의 직접 접근을 제한했으며 Next.js의 다양한 서버 런타임과 호환되고 공식 인증 가이드에서도 사용되는 jose를 JWT 생성, 검증 라이브러리로 선택했습니다.',
    'Groq API는 개발 당시 무료로 사용할 수 있어 비용 부담 없이 AI 영양 추천 기능을 구현하기 위해 선택했으며 응답을 JSON Object 형태로 제한해 일관된 데이터 구조로 처리했습니다.'
  ],
}
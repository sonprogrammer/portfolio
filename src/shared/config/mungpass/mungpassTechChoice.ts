export const mungpassTechChoice = {
  title: '기술 선택 배경',
  description:'기존 MongoDB 중심의 개발 경험에서 벗어나 SQL 기반 데이터 설계와 BaaS 환경을 경험하고 서비스 기능 개발에 집중할 수 있는 방향으로 기술을 구성했습니다.',
  points: [
    'Supabase는 별도의 백엔드 서버를 처음부터 구축하지 않고도 Database, Auth, Storage 등의 기능을 사용할 수 있는 BaaS라는 점에 관심을 가져 도입했습니다. 이를 통해 서비스 기능 구현에 집중하면서 백엔드 데이터 흐름까지 직접 경험하고자 했습니다.',
    '기존에는 MongoDB 기반 프로젝트를 주로 개발했기 때문에 PostgreSQL 기반의 Supabase를 선택해 관계형 데이터 모델링과 SQL까지 경험 범위를 넓히고자 했습니다.',
    '회원, 사장님, 관리자처럼 역할별 데이터 접근 범위가 달라 Supabase Auth와 RLS를 함께 사용해 인증뿐 아니라 데이터베이스 계층에서도 접근 권한을 제어하는 구조를 적용했습니다.',
    '매장 이용 현황처럼 데이터 변경을 즉시 반영해야 하는 기능은 별도의 WebSocket 서버를 추가하기보다 기존 Supabase 환경과 자연스럽게 연결되는 Supabase Realtime을 사용했습니다.',
    'TanStack Query는 매장, 상품, 이용 내역처럼 서버에서 관리되는 데이터의 요청과 캐시를 담당하고 Zustand는 역할 선택이나 UI와 관련된 클라이언트 상태를 분리해 관리하기 위해 사용했습니다.',
  ],
}
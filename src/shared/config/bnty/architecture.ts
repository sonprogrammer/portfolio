
import { ArchitectureItem } from "@/shared/model/types";
import { Database, MessageSquareText, QrCode, Server, ShieldCheck, Workflow } from "lucide-react";



export const architectureItems: ArchitectureItem[] = [
  {
    icon: Workflow,
    title: "트레이너와 회원의 역할별 서비스 흐름",
    description:
     "트레이너는 담당 회원의 PT 횟수와 운동 일지를 관리하고, 회원은 QR 체크인과 자신의 기록 조회 기능을 이용하도록 구성했습니다.",
    points: [
      "트레이너와 회원 역할별 기능 및 화면 분리",
      "트레이너와 담당 회원의 연결 관계 관리",
      "회원별 운동 일지 조회와 작성 화면 분리"
    ],
  },
  {
    icon: QrCode,
    title: "QR 기반 회원 연결과 PT 차감",
    description:
      "회원이 트레이너의 QR을 스캔하면 연결 관계를 확인하고, 서버에서 회원의 잔여 PT 횟수를 차감하도록 구성했습니다.",
    points: [
      "QR에 담긴 트레이너 ID와 인증된 회원 ID로 연결 처리",
      "트레이너의 PT 추가 API와 회원의 PT 차감 API 분리",
      "서버에서 차감량을 1회로 고정하고 잔여 횟수 조건과 $inc로 차감",
      "useRef 기반 잠금으로 카메라의 연속 인식에 따른 중복 요청 방지"
    ],
    update: '개선'
  },
  {
    icon: ShieldCheck,
    title: "JWT 기반 인증과 접근 권한 검증",
    description: "사용자 식별은 검증된 JWT를 기준으로 처리하고, 화면 접근에 필요한 인증 상태 복구와 데이터별 권한 검사를 구성했습니다.",
    points: [
      "Access Token은 메모리, Refresh Token은 HttpOnly 쿠키로 관리",
      "새로고침 시 토큰 재발급과 사용자 정보 조회로 인증 상태 복구",
      "동시 401 요청의 토큰 재발급 요청 공유와 기존 요청 재시도",
      "게시물 삭제 시 소유권 확인 및 역할별 데이터 접근 제한",
      "Socket.IO 연결 시 JWT 검증과 채팅방 참여 권한 검사"
    ],
    update: "개선"
  },
  {
    icon: Server,
    title: "React와 Node.js 기반 Client / Server 구조",
    description:
      "React 클라이언트는 화면과 사용자 상호작용을 담당하고, Express 서버는 인증 검증과 데이터 조회 및 변경을 처리하도록 분리했습니다.",
    points: [
      "React와 TypeScript 기반 클라이언트 구현",
      "Node.js와 Express 기반 REST API 서버 구성",
      "클라이언트가 전달한 사용자 정보 대신 검증된 JWT로 요청 사용자 식별",
      "조회 대상 회원과 채팅방 ID는 요청으로 받고 서버에서 접근 권한 확인"
    ],
  },
  {
    icon: Database,
    title: "서비스 데이터와 상태 관리",
    description:
     "MongoDB에 서비스 데이터를 저장하고, TanStack Query의 서버 데이터 캐시와 Recoil의 인증 및 클라이언트 상태를 구분해 관리했습니다.",
    points: [
      "Mongoose Schema를 이용한 서비스 데이터 구조 정의",
      "React Query Custom Hook으로 API 요청과 공통 처리 로직 분리",
      "계정과 조회 대상별로 캐시를 구분해 데이터 혼용 방지",
      "데이터 변경 성공 시 관련 쿼리 무효화로 화면 갱신",
      "Recoil을 활용한 사용자 역할 및 클라이언트 상태 관리",
      "트레이너·회원 관계를 기준으로 PT, 운동 기록, 채팅 데이터 연결",
    ],
    update: '개선'
  },
  {
    icon: MessageSquareText,
    title: "REST + Socket.IO 실시간 통신",
    description:
      "채팅 내역 조회와 메시지 저장은 REST API로 처리하고, 새 메시지 전달과 읽음 상태 변경은 Socket.IO 이벤트로 처리했습니다.",

    points: [
      "REST API를 통한 기존 채팅 내역 조회 및 신규 저장",
      "Socket.IO Room 기반 1:1 메시지 실시간 전달",
      "서버 인증 정보로 메시지 작성자와 읽음 처리 사용자 지정",
      "소켓 재연결 시 채팅방 재입장과 메시지 목록 재조회",
      "화면 이탈 시 이벤트 리스너 해제와 채팅방 퇴장"
    ],
    update: '개선'
  },
];
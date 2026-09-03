
import { ArchitectureItem } from "@/shared/model/types";
import { Database, MessageSquareText, QrCode, Server, Workflow } from "lucide-react";



export const architectureItems: ArchitectureItem[] = [
  {
    icon: Workflow,
    title: "트레이너 · 회원 역할 기반 서비스 흐름",
    description:
      "트레이너와 회원의 역할을 분리하고 동일한 브라우저에서 역할을 전환하며 전체 서비스 흐름을 체험할 수 있도록 구성했습니다.",
    points: [
      "트레이너와 회원 역할별 기능 및 화면 분리",
      "트레이너와 회원 간 1:1 연결 관계 관리",
      "연결된 회원을 기준으로 PT·운동 기록·채팅 데이터 관리",
    ],
  },
  {
    icon: QrCode,
    title: "QR 기반 출석 및 PT 관리 흐름",
    description:
      "오프라인 PT 수업에서 발생하는 출석과 잔여 수강 횟수 관리를 QR 기반 데이터 흐름으로 자동화했습니다.",
    points: [
      "트레이너 QR을 회원이 스캔해 출석 처리",
      "출석 처리와 동시에 잔여 PT 횟수 차감",
      "변경된 PT 정보를 트레이너와 회원 화면에 반영",
    ],
  },
  {
    icon: Server,
    title: "React · Node.js 기반 Client / Server 구조",
    description:
      "사용자 인터페이스와 비즈니스 로직을 분리하고 REST API를 통해 클라이언트와 서버가 데이터를 주고받도록 구성했습니다.",
    points: [
      "React · TypeScript 기반 클라이언트 구현",
      "Node.js · Express 기반 REST API 서버 구축",
      "사용자·PT·운동 기록·채팅·앨범 데이터 API 분리",
    ],
  },
  {
    icon: Database,
    title: "서비스 데이터 및 상태 관리",
    description:
      "MongoDB로 트레이너·회원 관계, PT 횟수, 운동 기록, 채팅 내역을 관리하고, React Query와 Recoil을 활용해 서버 데이터 캐싱과 클라이언트 상태를 분리하여 관리했습니다.",

    points: [
      "Mongoose Schema를 이용한 서비스 데이터 구조 정의",
      "React Query Custom Hook으로 데이터 조회·변경 로직 분리 및 캐싱 관리",
      "Recoil을 활용한 사용자 역할 및 클라이언트 상태 관리",
      "트레이너·회원 관계를 기준으로 PT, 운동 기록, 채팅 데이터 연결",
    ],
  },
  {
    icon: MessageSquareText,
    title: "REST + Socket.IO 실시간 통신",
    description:
      "저장된 데이터 조회와 실시간 이벤트의 책임을 즉시성이 필요한 채팅은 Socket.IO로 일반적 조회와 저장은 REST API로 처리했습니다.",

    points: [
      "REST API를 통한 기존 채팅 내역 조회",
      "Socket.IO Room 기반 1:1 메시지 실시간 전달",
      "메시지 전송과 읽음 상태 이벤트를 분리하여 처리",
    ],
  },
];
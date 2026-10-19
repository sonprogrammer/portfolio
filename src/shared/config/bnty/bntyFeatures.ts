
import { ProjectFeature } from "@/shared/ui/project-section-ui/ProjectFeatures"



export const bntyFeatures: ProjectFeature[] = [
  {
    id: "login",
    title: "로그인과 역할별 이용",
    description: "카카오 로그인과 일반 로그인을 지원하고, 트레이너와 회원에게 필요한 기능을 제공합니다.",
    items: [
      "카카오 계정 또는 일반 계정으로 로그인",
      "트레이너와 회원 역할에 따른 화면과 기능 제공"
    ]
  },
  {
    id: "pt-management",
    title: "QR 기반 회원 연결과 PT 관리",
    description: "QR로 트레이너와 회원을 연결하고, 수업 횟수 추가부터 이용 시 차감까지 관리합니다.",
    items: [
      "최초 QR 등록으로 트레이너와 회원 연결",
      "트레이너가 연결된 회원의 PT 수업 횟수 추가",
      "회원이 트레이너의 QR을 스캔하면 PT 1회 차감"
    ]
  },
  {
    id: "chat",
    title: "자동 연결되는 1:1 채팅",
    description: "트레이너와 회원이 연결되면 채팅방이 자동으로 생성되어 상담과 수업 관련 대화를 이어갈 수 있습니다.",
    items: [
      "회원 연결 시 1:1 채팅방 자동 생성",
      "실시간 메시지와 이미지 전송",
      "상대방의 메시지 읽음 상태 확인"
    ]
  },
  {
    id: "lesson-notes",
    title: "회원별 수업일지",
    description: "트레이너는 담당 회원의 수업 내용을 기록하고, 회원은 자신의 수업일지를 확인할 수 있습니다.",
    items: [
      "트레이너가 연결된 회원별 수업일지 작성",
      "회원은 본인의 수업일지만 조회"
    ]
  },
  {
    id: "personal-records",
    title: "운동과 식단, 사진 기록",
    description: "캘린더와 앨범으로 개인 운동 내역과 식단, 사진을 기록하고 관리할 수 있습니다.",
    items: [
      "캘린더에서 날짜별 운동 내역과 식단 작성",
      "앨범에 사진 저장"
    ]
  }
]
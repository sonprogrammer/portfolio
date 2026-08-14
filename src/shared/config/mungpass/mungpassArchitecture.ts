
import { ArchitectureItem } from "@/shared/model/types";
import {
    Database,
    Layers3,
    Network,
    ShieldCheck,
    UsersRound,
    Wifi,
} from "lucide-react";

export const mungArchitecture: ArchitectureItem[] = [
    {
        icon: Network,
        title: "QR 기반 O2O 서비스 데이터 흐름",
        description:
            "오프라인 애견카페 이용 경험을 온라인 서비스와 연결해 QR 체크인부터 이용 현황 확인까지 하나의 데이터 흐름으로 구성했습니다.",
        points: [
            "키오스크를 통한 QR 체크인으로 오프라인 시설 이용 데이터 생성",
            "체크인 데이터를 Supabase에 저장",
            "Supabase Realtime을 통해 사장님 화면에 현재 이용 현황 즉시 반영",
            "사용자 이용 내역과 사장님 운영 데이터를 연결",
        ],
    },
    {
    icon: Layers3,
    title: "FSD 기반 프론트엔드 아키텍처",
    description:
      "증가하는 코드 복잡도를 관리하기 위해 FSD(Feature-Sliced Design)를 적용해 기능과 책임을 레이어별로 분리했습니다.",
    points: [
      "비즈니스 기능 단위로 모듈과 슬라이스 분리",
      "레이어 간 단방향 의존성 구조 적용",
      "UI와 비즈니스 로직의 책임 분리",
      "기능 확장 시 기존 모듈을 재사용할 수 있는 구조 구성",
    ],
  },
    {
        icon: UsersRound,
        title: "회원 · 사장님 · 관리자 역할 기반 서비스",
        description:
            "일반 사용자, 사장님, 관리자의 역할에 따라 화면과 기능을 분리해 하나의 서비스 안에서 서로 다른 사용자 흐름을 구성했습니다.",
        points: [
            "일반 사용자·사장님·관리자 역할별 화면 및 기능 분리",
            "Zustand를 이용한 역할 및 클라이언트 UI 상태 관리",
            "역할에 따라 필요한 서비스 기능과 데이터 흐름 분리",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Supabase Auth 기반 사용자 인증",
        description:
            "Supabase Auth를 이용해 사용자를 식별하고 인증된 사용자 정보를 기준으로 서비스 데이터에 접근하도록 구성했습니다.",
        points: [
            "Supabase Auth 기반 로그인 및 사용자 식별",
            "인증 사용자 정보를 서비스 데이터와 연결",
            "RLS를 이용한 데이터 접근 권한 제어",
        ],
    },
    {
        icon: Database,
        title: "Supabase 기반 서비스 데이터 관리",
        description:
            "사용자, 반려견, 매장, 상품, 이용 기록과 문의 데이터를 Supabase에서 관계형 데이터로 관리했습니다.",
        points: [
            "사용자·반려견·매장·상품 데이터 관리",
            "매장과 사용자 관계를 기준으로 이용 기록 연결",
            "문의방과 메시지 데이터를 연결해 1:1 문의 구조 구성",
        ],
    },
    {
        icon: Wifi,
        title: "Supabase Realtime 기반 실시간 동기화",
        description:
            "즉시 반영이 필요한 데이터에는 Supabase Realtime을 적용해 새 데이터를 다시 요청하지 않고 화면에 동기화했습니다.",
        points: [
            "문의 메시지 INSERT 이벤트 실시간 수신",
            "React Query 캐시와 Realtime 데이터 동기화",
            "역할별 화면에서 변경된 데이터를 즉시 반영",
        ],
    },
];
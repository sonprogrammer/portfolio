
import { ArchitectureItem } from "@/shared/model/types";
import {
    Database,
    Layers3,
    Network,
    ShieldCheck,
} from "lucide-react";

export const mungArchitecture: ArchitectureItem[] = [
    {
        icon: Network,
        title: "QR 기반 O2O 서비스 데이터 흐름",
        description: "QR 체크인으로 생성된 오프라인 이용 데이터를 온라인 서비스와 연결하고 실시간 운영 화면까지 이어지도록 구성했습니다.",

        points: [
            "키오스크를 통한 QR 체크인으로 시설 이용 데이터 생성",
            "이용 기록을 Supabase에 저장",
            "Supabase Realtime으로 사장님과 회원 화면에 이용 현황 즉시 반영",
        ],
    },
    {
        icon: Layers3,
        title: "FSD 기반 프론트엔드 아키텍처",
        description: "증가하는 코드 복잡도를 관리하기 위해 FSD(Feature-Sliced Design)를 적용해 기능과 책임을 레이어별로 분리했습니다.",
        points: [
            "비즈니스 기능 단위로 모듈과 슬라이스 분리",
            "레이어 간 단방향 의존성 구조 적용",
            "UI와 비즈니스 로직의 책임 분리",
            "기능 확장 시 기존 모듈을 재사용할 수 있는 구조 구성",
        ],
    },
    {
        icon: ShieldCheck,
        title: "역할 기반 인증과 접근 제어",
        description: "Supabase Auth를 이용해 사용자를 식별하고 역할에 따라 접근할 수 있는 데이터와 기능을 분리했습니다.",
        points: [
            "Supabase Auth 기반 로그인 및 사용자 식별",
            "인증 사용자 정보를 서비스 데이터와 연결",
            "RLS를 이용한 데이터 접근 권한 제어",
        ],
    },
    {
        icon: Database,
        title: "Supabase 데이터 관리와 실시간 동기화",
        description: "관계형 데이터는 PostgreSQL 기반 Supabase에서 관리하고 즉시 반영이 필요한 데이터에는 Realtime을 적용했습니다.",
        points: [
            "사용자, 반려견, 매장, 상품, 이용 기록 관계형 데이터 관리",
            "문의방과 메시지를 연결한 1:1 문의 구조 구성",
      "Realtime 이벤트와 TanStack Query 캐시 동기화",
        ],
    }
];
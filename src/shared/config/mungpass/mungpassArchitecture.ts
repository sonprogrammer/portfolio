
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
        description: "매장 QR을 통해 오프라인 입실을 온라인 이용 기록으로 연결하고, 실시간 운영 화면에 반영하도록 구성했습니다.",

        points: [
            "매장 QR을 서비스 내 스캐너 또는 스마트폰 기본 카메라로 스캔해 입실",
            "외부 카메라 진입 시 URL의 매장, 상품 정보를 읽어 강아지 선택 화면 연결",
            "비로그인 사용자의 체크인 주소를 보존해 로그인 후 기존 흐름으로 복귀",
            "입실 기록을 Supabase에 저장하고 Realtime으로 사장님과 회원 화면에 이용 현황 반영"
        ],
        update: '개선'
    },
    {
        icon: Layers3,
        title: "FSD 기반 프론트엔드 아키텍처",
        description: "증가하는 코드 복잡도를 관리하기 위해 FSD(Feature-Sliced Design)를 적용해 기능과 책임을 레이어별로 분리했습니다.",
        points: [
            "비즈니스 기능 단위로 모듈과 슬라이스 분리",
            "레이어 간 단방향 의존성 구조 적용",
            "반복되는 상태와 비즈니스 로직을 Custom Hook으로 분리",
            "TanStack Query 기반 Custom Hook으로 서버 데이터 조회·변경 로직 관리",
        ],
    },
    {
        icon: ShieldCheck,
        title: "서버 기반 역할 검증과 데이터 접근 제어",
        description: "Supabase Auth를 이용해 사용자를 식별하고, 서버의 역할검증과 RLS로 접근할 수 있는 데이터와 기능을 분리했습니다.",
        points: [
            "서버 layout에서 인증 여부와 DB 역할 검증",
            "비허용 역할의 페이지 접근 시 해당 역할의 기본 화면으로 리다이렉트",
            "RLS 정책을 적용해 사용자별 데이터 접근 권한 제어",
            "Vitest 단위 테스트 16개와 배포 환경 수동 테스트로 역할별 접근 분기 검증"
        ],
        update: '개선'
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
        update: '개선'
    }
];
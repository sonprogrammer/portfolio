type Role = "user" | "owner" | "admin"
type Feature = {
    id: string
    title: string
    description: string
    update?: "신규" | "개선"
    image?: {
        src: string
        alt: string
    }
}


export const mungpassFeatures: Record<Role, Feature[]> = {
    user: [
        {
            id: "explore",
            title: "주변 애견카페 찾기",
            description: "지도에서 최대 10km 이내 애견카페를 찾고 매장별 서비스, 영업시간, 공지와 휴무 및 조기 마감 정보를 확인합니다."
        },
        {
            id: "checkin",
            title: "QR 입장과 기본 카메라 지원",
            description: "서비스 내 스캐너나 휴대전화 기본 카메라로 QR을 스캔하고 반려견을 선택해 입장합니다. 비로그인 상태라면 로그인 후 기존 체크인 흐름으로 돌아옵니다.",
            update: "개선",
            
        },
        {
            id: "pets",
            title: "반려견과 이용 기록 관리",
            description: "반려견을 등록하고 현재 이용 중인 반려견의 이용시간과 남은 시간, 이전 매장 이용 기록을 확인합니다."
        },
        {
            id: "favorites",
            title: "단골 매장 저장",
            description: "자주 방문하는 애견카페를 단골로 저장하고 다시 확인합니다."
        },
        {
            id: "support",
            title: "관리자 1:1 문의",
            description: "서비스 이용 중 궁금한 사항을 관리자에게 1:1 채팅으로 문의합니다."
        }
    ],
    owner: [
        {
            id: "registration",
            title: "매장 입점 신청",
            description: "지도에서 매장을 선택하고 사업자등록번호와 등록증을 제출합니다. 심사 대기 후 관리자 승인을 받으면 매장 운영 기능을 이용할 수 있습니다."
        },
        {
            id: "operation",
            title: "영업 일정과 공지 관리",
            description: "영업시간과 공지사항을 등록하고 휴가나 갑작스러운 조기 마감을 설정해 방문객에게 변경된 운영 정보를 안내합니다."
        },
        {
            id: "services",
            title: "서비스와 이용요금 관리",
            description: "카테고리별 상품과 호텔, 애견유치원 등의 서비스를 등록하고, 서비스별 이용시간과 추가 요금에 따른 최종 이용금액을 확인합니다."
        },
        {
            id: "live",
            title: "실시간 이용 현황",
            description: "QR 입장 시 이용 중인 회원과 반려견이 실시간으로 표시되고 이용시간 측정이 시작됩니다. 오늘 이용한 반려견 수와 예상 및 확정 매출을 확인합니다."
        },
        {
            id: "history",
            title: "이용 내역 조회",
            description: "이용 중인 반려견과 체크아웃한 반려견을 구분하고, 체크아웃 내역을 서비스와 반려견 이름으로 검색합니다."
        },
        {
            id: "report",
            title: "매출 통계와 AI 분석",
            description: "월별 실적 리포트와 일별, 월별 매출 차트를 확인하고 AI 매출 분석을 받습니다."
        },
        {
            id: "settings",
            title: "키오스크와 운영 문의",
            description: "매장 키오스크 모드를 설정하고 관리자에게 1:1 채팅으로 운영 관련 문의를 남깁니다."
        }
    ],
    admin: [
        {
            id: "dashboard",
            title: "서비스 운영 현황",
            description: "심사 대기 건수, 전체 파트너와 회원 수, 오늘 신규 회원 및 최근 7일 이내 입점 신청 현황을 확인합니다."
        },
        {
            id: "review",
            title: "입점 심사와 지점 관리",
            description: "매장이 제출한 사업자 정보를 확인해 입점을 승인하거나 반려하고, 신규 지점을 직접 등록합니다."
        },
        {
            id: "members",
            title: "회원 관리",
            description: "회원 이름으로 검색해 회원 정보를 조회하고 관리합니다."
        },
        {
            id: "support",
            title: "고객문의 관리",
            description: "일반 이용자와 사장님이 등록한 문의를 확인하고 1:1 채팅으로 응답합니다."
        },
        {
            id: "admin",
            title: "관리자 추가",
            description: "기존 회원을 검색하고 선택한 회원을 관리자 역할로 변경합니다.",
            update: "신규"
        }
    ]
}
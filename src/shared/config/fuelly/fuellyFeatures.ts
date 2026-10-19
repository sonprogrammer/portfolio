import { ProjectFeature } from "@/shared/ui/project-section-ui/ProjectFeatures"


export const fuellyFeatures: ProjectFeature[] = [
    {
        id: "onboarding",
        title: "로그인과 영양 목표 설정",
        description: "신체 정보와 활동량, 목표에 따라 하루 권장 칼로리와 단백질량을 확인할 수 있습니다.",
        items: [
            "일반 로그인과 카카오 로그인 지원",
            "단계별 온보딩으로 키, 몸무게, 출생연도, 성별과 활동량 입력",
            "유지, 체지방 감량, 벌크업 목표에 따른 영양 섭취량 계산",
            "출생연도로 나이를 자동 계산하고 이후 신체 정보와 목표 수정 지원"
        ]
    },
    {
        id: "daily-goals",
        title: "오늘의 영양 목표 확인",
        description: "오늘 섭취한 칼로리와 단백질을 목표량과 비교하며 확인할 수 있습니다.",
        items: [
            "칼로리와 단백질 섭취 현황을 프로그레스바로 표시",
            "하루 목표 대비 섭취량과 남은 영양량 확인"
        ]
    },
    {
        id: "preferences",
        title: "사용자 맞춤 AI 설정",
        description: "식습관과 요청사항을 저장하면 AI 추천에 함께 반영됩니다.",
        update: "신규",
        items: [
            "알레르기와 제외할 음식 설정",
            "선호 음식과 추가 요청 메시지 저장",
            "저장한 설정을 AI 추천과 검색에 반영"
        ]
    },
    {
        id: "meal-records",
        title: "식단 기록과 음식 관리",
        description: "기본 음식 목록이나 직접 등록한 음식으로 오늘 먹은 식단을 기록할 수 있습니다.",
        items: [
            "기본 제공 음식 약 20종에서 선택해 식단 등록",
            "음식명, 칼로리, 단백질과 제공 단위를 직접 입력해 음식 추가",
            "좋아요한 음식과 자주 먹는 음식을 조회해 식단 기록",
        ]
    },
    {
        id: "meal-sharing",
        title: "오늘 식단 카카오톡 공유",
        description: "오늘 기록한 식단을 카카오톡으로 공유할 수 있습니다.",
        update: "신규"
    },
    {
        id: "ai-food-registration",
        title: "AI로 음식 영양 정보 등록",
        description: "음식 이름만 알고 영양 정보를 모를 때 AI로 정보를 조회해 등록할 수 있습니다.",
        update: "신규",
        items: [
            "음식명을 입력하고 AI 버튼으로 영양 정보 조회",
            "AI가 반환한 칼로리, 단백질과 제공 단위로 음식 등록"
        ]
    },
    {
        id: "recommendation",
        title: "상황별 AI 음식 추천",
        description: "남은 칼로리와 단백질, 현재 시간과 식사 상황에 맞는 음식을 추천받을 수 있습니다.",
        update: "개선",
        items: [
            "편의점, 배달, 집밥 중 식사 상황 선택",
            "현재 시간과 남은 영양 목표를 반영한 추천",
            "알레르기, 선호 음식, 제외 음식과 추가 요청사항 반영"
        ]
    },
    {
        id: "ai-search",
        title: "AI 음식 검색과 식단 연결",
        description: "자유롭게 질문하고 설명과 음식 3개를 추천받아 식단에 활용할 수 있습니다.",
        items: [
            "사용자 맞춤 설정을 반영한 설명과 음식 3개 제공",
            "검색 결과에서 오늘 식단에 바로 추가",
            "추천받은 음식을 좋아요 목록에 저장"
        ]
    },
    {
        id: "search-history",
        title: "최근 AI 검색 내역",
        description: "최근 검색 내역 10개를 저장해 이전 질문과 응답을 다시 확인할 수 있습니다.",
        update: "신규",
        items: [
            "최근 AI 검색 질문과 응답 최대 10개 저장",
            "저장된 내역에서 이전 검색 결과 재확인"
        ]
    },
    {
        id: "statistics",
        title: "기간별 영양 통계",
        description: "최근 7일과 30일의 영양 섭취 추이와 날짜별 식단을 확인할 수 있습니다.",
        items: [
            "칼로리와 단백질 섭취량을 그래프로 표시",
            "최근 7일과 30일 기준으로 조회 기간 전환",
            "기간 내 기록한 식단을 날짜별로 확인"
        ]
    }
]
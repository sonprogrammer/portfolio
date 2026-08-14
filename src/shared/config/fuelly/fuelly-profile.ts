export const activityLevels = [
    {
        label: 'sedentary',
        name: '거의 운동 안 함',
    },
    {
        label: 'light',
        name: '가벼운 운동 (주 1~2회)',
    },
    {
        label: 'moderate',
        name: '보통 운동 (주 3~5회)',
    },
    {
        label: 'active',
        name: '많이 운동 (주 6회 이상)',
    },
] as const;

export const goals = [
    {
        label: 'bulk',
        name: '벌크업 (근육 증가)',
    },
    {
        label: 'diet',
        name: '다이어트 (체지방 감소)',
    },
    {
        label: 'maintain',
        name: '유지',
    },
] as const;
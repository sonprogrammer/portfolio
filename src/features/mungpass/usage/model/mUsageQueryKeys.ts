export const mUsageQueryKeys = {
    all: ['mungpass-usage'] as const,

    ownerDashboard: (shopId: string | null) => [
        ...mUsageQueryKeys.all,
        'owner-dashboard',
        shopId
    ] as const,
    current: (shopId: string) => [...mUsageQueryKeys.all, 'current', shopId] as const,
    completed: (shopId: string) => [...mUsageQueryKeys.all, 'completed', shopId] as const
};
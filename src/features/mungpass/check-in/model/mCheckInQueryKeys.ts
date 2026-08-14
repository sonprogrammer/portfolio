export const mungpassCheckInQueryKeys = {
    all: ['m-check-in'] as const,

    shops: () => [
        ...mungpassCheckInQueryKeys.all,
        'shops'
    ] as const,

    products: (shopId: string | null) => [
        ...mungpassCheckInQueryKeys.all,
        'products',
        shopId
    ] as const,

    usage: () => [
        ...mungpassCheckInQueryKeys.all,
        'usage'
    ] as const
};
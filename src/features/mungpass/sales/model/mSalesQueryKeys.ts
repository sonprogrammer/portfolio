export const mSalesQueryKeys = {
    all: ['mungpass-sales'] as const,
    shop: (shopId: string) => [...mSalesQueryKeys.all, shopId] as const,
    insight: (shopId: string) => [...mSalesQueryKeys.all, 'insight', shopId] as const
}
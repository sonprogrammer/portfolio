export const mProductQueryKeys = {
    all: ['mungpass-shop-products'] as const,
    products: (shopId: string) => [...mProductQueryKeys.all, shopId] as const
}
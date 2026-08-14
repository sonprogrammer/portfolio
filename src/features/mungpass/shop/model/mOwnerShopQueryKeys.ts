export const mOwnerShopQueryKeys = {
    all: ['mungpass-owner-shop'] as const,
    myShop: () => [...mOwnerShopQueryKeys.all, 'my-shop'] as const
}
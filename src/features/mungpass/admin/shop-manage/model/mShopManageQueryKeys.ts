export const mShopManageQueryKeys = {
    all: ['mungpass-shop-manage'] as const,

    list: () => [
        ...mShopManageQueryKeys.all,
        'list'
    ] as const
}
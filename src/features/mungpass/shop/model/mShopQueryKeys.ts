import {
    MMapcenter,
    MShopRadius,
} from './types'

export const mShopQueryKeys = {
    all: ['mungpass-shops'] as const,

    nearby: (
        center: MMapcenter | null,
        radius: MShopRadius,
    ) =>
        [
            ...mShopQueryKeys.all,
            'nearby',
            center?.lat,
            center?.lng,
            radius,
        ] as const,
}
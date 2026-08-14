'use client'

import { useQuery } from '@tanstack/react-query'

import { getShopProducts } from '../api/getShopProducts'
import { mProductQueryKeys } from '@/features/mungpass/shop-products/model/mProductQueryKeys'


export function useGetShopProducts(shopId: string) {
    return useQuery({
        queryKey: mProductQueryKeys.products(shopId),
        queryFn: () => getShopProducts(shopId),
        enabled: !!shopId,
        refetchOnWindowFocus: false
    })
}
'use client'

import { getMyShop } from "@/features/mungpass/shop/api/getMyShop"
import { mOwnerShopQueryKeys } from "@/features/mungpass/shop/model/mOwnerShopQueryKeys"
import { useQuery } from "@tanstack/react-query"

export function useGetMyShop(){
    return useQuery({
        queryKey: mOwnerShopQueryKeys.myShop(),
        queryFn: getMyShop,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
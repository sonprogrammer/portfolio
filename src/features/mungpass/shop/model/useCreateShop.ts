'use client'

import { MCreateShopPayload, MOwnerShop } from './owner-types';
import { createShop } from "@/features/mungpass/shop/api/createShop"
import { mOwnerShopQueryKeys } from '@/features/mungpass/shop/model/mOwnerShopQueryKeys';
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useCreateShop(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: MCreateShopPayload) => {
            return createShop(payload)
        },
        onSuccess: (res) => {
            if(!res.success || !res.shop)return
            queryClient.setQueryData<MOwnerShop>(
                mOwnerShopQueryKeys.myShop(), res.shop
            )
        }
    })
}
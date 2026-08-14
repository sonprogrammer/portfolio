'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateShopProduct } from '../api/updateShopProduct'
import { mProductQueryKeys } from './mProductQueryKeys'

export function useUpdateShopProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateShopProduct,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: mProductQueryKeys.products(variables.shopId)
            })
        }
    })
}
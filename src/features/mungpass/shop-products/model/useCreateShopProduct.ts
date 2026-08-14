'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createShopProduct } from '../api/createShopProduct'
import { mProductQueryKeys } from './mProductQueryKeys'

export function useCreateShopProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createShopProduct,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: mProductQueryKeys.products(variables.shopId)
            })
        }
    })
}
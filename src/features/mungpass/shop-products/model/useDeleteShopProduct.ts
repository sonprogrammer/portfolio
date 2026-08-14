'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteShopProduct } from '../api/deleteShopProduct'
import { mProductQueryKeys } from './mProductQueryKeys'

export function useDeleteShopProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteShopProduct,
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: mProductQueryKeys.products(variables.shopId)
            })
        }
    })
}
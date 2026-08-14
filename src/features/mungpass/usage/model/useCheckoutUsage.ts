'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { checkoutUsage } from '../api/checkoutUsage'
import { mUsageQueryKeys } from './mUsageQueryKeys'

export function useCheckoutUsage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: checkoutUsage,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: mUsageQueryKeys.all
            })
        }
    })
}
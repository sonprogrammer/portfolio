'use client'

import { useQuery } from '@tanstack/react-query'


import { mUsageQueryKeys } from './mUsageQueryKeys'
import { getCurrentUsage } from '@/features/mungpass/usage/api/getCurrentUsage'

export function useGetCurrentUsages(shopId: string) {
    return useQuery({
        queryKey: mUsageQueryKeys.current(shopId),
        queryFn: () => getCurrentUsage(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
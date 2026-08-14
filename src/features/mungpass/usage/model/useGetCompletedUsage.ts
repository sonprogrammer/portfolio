'use client'

import { useQuery } from '@tanstack/react-query'


import { mUsageQueryKeys } from './mUsageQueryKeys'
import { getCompletedUsages } from '@/features/mungpass/usage/api/getCompletedUsage'

export function useGetCompletedUsages(shopId: string) {
    return useQuery({
        queryKey: mUsageQueryKeys.completed(shopId),
        queryFn: () => getCompletedUsages(shopId),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
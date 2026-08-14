'use client'

import { useQuery } from '@tanstack/react-query'

import { getTodaySalesInsight } from '../api/getTodaySalesInsight'
import { mSalesQueryKeys } from './mSalesQueryKeys'
import { MSalesInsight } from '@/features/mungpass/sales/model'

export function useGetTodaySalesInsight(shopId: string) {
    return useQuery({
        queryKey: mSalesQueryKeys.insight(shopId),
        queryFn: () => getTodaySalesInsight(shopId),
        select: data => {
            if (Array.isArray(data)) {
                return (data[0] ?? null) as MSalesInsight | null
            }

            return data
        },
        enabled: !!shopId,
        refetchOnWindowFocus: false
    })
}
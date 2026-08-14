'use client'

import { useQuery } from '@tanstack/react-query'

import { getSalesData } from '../api/getSalesData'
import { mSalesQueryKeys } from './mSalesQueryKeys'

export function useGetSalesData(shopId: string) {
    return useQuery({
        queryKey: mSalesQueryKeys.shop(shopId),
        queryFn: () => getSalesData(shopId),
        enabled: !!shopId,
        refetchOnWindowFocus: false
    })
}
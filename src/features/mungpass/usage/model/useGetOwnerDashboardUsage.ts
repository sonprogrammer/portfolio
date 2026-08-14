'use client'

import { getOwnerDashboardUsage } from "@/features/mungpass/usage/api/getOwnerDashboardUsage"
import { mUsageQueryKeys } from "@/features/mungpass/usage/model/mUsageQueryKeys"
import { useQuery } from "@tanstack/react-query"

export function useGetOwnerDashboardUsage(shopId: string | null){
    return useQuery({
        queryKey: mUsageQueryKeys.ownerDashboard(shopId),
        queryFn: () => getOwnerDashboardUsage(shopId!),
        enabled: !!shopId,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
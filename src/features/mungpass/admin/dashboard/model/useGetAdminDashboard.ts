'use client'

import { useQuery } from '@tanstack/react-query'

import { getAdminDashboard } from '../api/getAdminDashboard'
import { mAdminDashboardQueryKeys } from './mAdminDashboardQueryKeys'

export function useGetAdminDashboard() {
    return useQuery({
        queryKey: mAdminDashboardQueryKeys.stats(),
        queryFn: getAdminDashboard,
        refetchOnWindowFocus: false
    })
}
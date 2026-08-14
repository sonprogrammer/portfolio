'use client'

import { useQuery } from '@tanstack/react-query'

import { getAllShops } from '../api/getAllShops'
import { mShopManageQueryKeys } from './mShopManageQueryKeys'

export function useGetAdminShops() {
    return useQuery({
        queryKey: mShopManageQueryKeys.list(),
        queryFn: getAllShops,
        refetchOnWindowFocus: false
    })
}
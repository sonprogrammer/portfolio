'use client'

import { useQuery } from '@tanstack/react-query'

import { getAllUsers } from '../api/getAllUsers'
import { mAdminUserQueryKeys } from './mAdminUserQueryKeys'

export function useGetAllUsers() {
    return useQuery({
        queryKey: mAdminUserQueryKeys.list(),
        queryFn: getAllUsers,
        refetchOnWindowFocus: false
    })
}
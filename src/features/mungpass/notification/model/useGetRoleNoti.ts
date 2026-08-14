'use client'

import { getRoleNoti } from '@/features/mungpass/notification/api/getRoleNoti'
import { mNotiQueryKeys } from '@/features/mungpass/notification/model/mNotiQueryKeys'
import { useQuery } from '@tanstack/react-query'

export function useGetRoleNotifications() {
    return useQuery({
        queryKey: mNotiQueryKeys.roles(),
        queryFn: getRoleNoti,
        refetchOnWindowFocus: false
    })
}
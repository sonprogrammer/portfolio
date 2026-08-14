'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mAdminDashboardQueryKeys } from '@/features/mungpass/admin/dashboard/model'
import { mAdminUserQueryKeys } from '@/features/mungpass/admin/user-manage/model'

import { updateShopStatus } from '../api/updateShopStatus'
import { mShopManageQueryKeys } from './mShopManageQueryKeys'

export function useUpdateShopStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateShopStatus,

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: mShopManageQueryKeys.all
                }),

                queryClient.invalidateQueries({
                    queryKey: mAdminDashboardQueryKeys.all
                }),

                queryClient.invalidateQueries({
                    queryKey: mAdminUserQueryKeys.all
                })
            ])
        }
    })
}
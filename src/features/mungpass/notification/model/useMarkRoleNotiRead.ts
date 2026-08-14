'use client'

import { markRoleNotisRead } from '@/features/mungpass/notification/api/markRoleNotiRead'
import { mNotiQueryKeys } from '@/features/mungpass/notification/model/mNotiQueryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'



export function useMarkRoleNotiRead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: markRoleNotisRead,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: mNotiQueryKeys.roles()
            })
        }
    })
}
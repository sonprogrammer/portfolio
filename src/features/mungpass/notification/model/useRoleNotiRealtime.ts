'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { supabaseClient } from '@/shared/db/supabase/client'
import { mNotiQueryKeys } from '@/features/mungpass/notification/model/mNotiQueryKeys'



export function useNotifRealtime() {
    const queryClient = useQueryClient()

    useEffect(() => {
        const supabase = supabaseClient()

        const channel = supabase
            .channel('mungpass-role-notifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications'
                },
                () => {
                    queryClient.invalidateQueries({
                        queryKey: mNotiQueryKeys.roles()
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [queryClient])
}
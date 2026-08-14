'use client'

import { mUsageQueryKeys } from "@/features/mungpass/usage/model/mUsageQueryKeys"
import { supabaseClient } from "@/shared/db/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export function useOwnerUsageRealtime(shopId: string | null) {
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!shopId) return

        const supabase = supabaseClient()

        const handleChange = () => {
            queryClient.invalidateQueries({
                queryKey: mUsageQueryKeys.all
            })
        }

        const channel = supabase.channel(`owner-usage-${shopId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'usage_logs',
                filter: `shop_id=eq.${shopId}`
            }, handleChange)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'usage_logs',
                filter: `shop_id=eq.${shopId}`
            }, handleChange)
            .subscribe()
        return () => {
            supabase.removeChannel(channel)
        }

    }, [shopId, queryClient])
}
'use client'

import { mInquiryManageQueryKeys } from "@/features/mungpass/admin/inquiry-manage/model/mInquiryManageQueryKeys"
import { supabaseClient } from "@/shared/db/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { MInquiryManageMessage } from './types'

export function useAdminInquiryRealtime(roomId: string | null) {
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!roomId) return

        const supabase = supabaseClient()

        const channel = supabase.channel(`mungpass-admin-inquiry-${roomId}`).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'inquiry_messages',
            filter: `room_id=eq.${roomId}`
        },
        payload => {
            const newMsg = payload.new
            const msg: MInquiryManageMessage = {
                id: newMsg.id,
                roomId: newMsg.room_id,
                senderId: newMsg.sender_id,
                senderRole: newMsg.sender_role,
                message: newMsg.message,
                createdAt: newMsg.created_at
            }

            queryClient.setQueryData<MInquiryManageMessage[]>(
                mInquiryManageQueryKeys.messages(roomId),
                (old=[]) => {
                    if(old.some(item => item.id === msg.id)){
                        return old
                    }
                    return [...old, msg]
                }
            )
        }
        ).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [roomId, queryClient])
}
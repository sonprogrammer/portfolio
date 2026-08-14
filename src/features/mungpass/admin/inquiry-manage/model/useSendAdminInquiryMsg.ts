'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { sendAdminInquiryMsg } from '../api/sendAdminInquiryMsg'
import { mInquiryManageQueryKeys } from './mInquiryManageQueryKeys'

export function useSendAdminInquiryMsg() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sendAdminInquiryMsg,

        onSuccess: async data => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: mInquiryManageQueryKeys.messages(data.roomId)
                }),

                queryClient.invalidateQueries({
                    queryKey: mInquiryManageQueryKeys.rooms()
                })
            ])
        }
    })
}
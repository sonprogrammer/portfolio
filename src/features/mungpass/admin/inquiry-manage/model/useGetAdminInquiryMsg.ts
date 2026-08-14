'use client'

import { useQuery } from '@tanstack/react-query'

import { getAdminInquiryMsg } from '../api/getAdminInquiryMsg'
import { mInquiryManageQueryKeys } from './mInquiryManageQueryKeys'

export function useGetAdminInquiryMsg(roomId: string) {
    return useQuery({
        queryKey: mInquiryManageQueryKeys.messages(roomId),
        queryFn: () => getAdminInquiryMsg(roomId),
        enabled: !!roomId,
        refetchOnWindowFocus: false
    })
}
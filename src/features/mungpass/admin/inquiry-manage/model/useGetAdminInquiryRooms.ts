'use client'

import { useQuery } from '@tanstack/react-query'

import { getAdminInquiryRooms } from '../api/getAdminInquiryRooms'
import { mInquiryManageQueryKeys } from './mInquiryManageQueryKeys'

export function useGetAdminInquiryRooms() {
    return useQuery({
        queryKey: mInquiryManageQueryKeys.rooms(),
        queryFn: getAdminInquiryRooms,
        refetchOnWindowFocus: false
    })
}
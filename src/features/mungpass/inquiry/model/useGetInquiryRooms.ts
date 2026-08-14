'use client';

import { useQuery } from '@tanstack/react-query';

import { getInquiryRooms } from '../api/getInquiryRooms';
import { mInquiryQueryKeys } from '@/features/mungpass/inquiry/model/mInquiryQueryKeys';


export function useGetInquiryRooms() {
    return useQuery({
        queryKey: mInquiryQueryKeys.rooms(),
        queryFn: getInquiryRooms,
        refetchOnWindowFocus: false
    });
}
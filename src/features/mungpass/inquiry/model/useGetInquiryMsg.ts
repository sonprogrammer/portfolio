'use client';

import { getInquiryMsg } from '@/features/mungpass/inquiry/api/getInquiryMsg';
import { mInquiryQueryKeys } from '@/features/mungpass/inquiry/model/mInquiryQueryKeys';
import { useQuery } from '@tanstack/react-query';



export function useGetInquiryMsg(roomId: string | null) {
    return useQuery({
        queryKey: mInquiryQueryKeys.messages(roomId),
        queryFn: () => getInquiryMsg(roomId!),
        enabled: !!roomId,
        refetchOnWindowFocus: false
    });
}
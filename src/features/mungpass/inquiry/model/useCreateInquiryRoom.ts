'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createInquiryRoom } from '../api/createInquiryRoom';
import { MCreateInquiryRoomPayload } from './types';
import { mInquiryQueryKeys } from '@/features/mungpass/inquiry/model/mInquiryQueryKeys';


export function useCreateInquiryRoom() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: MCreateInquiryRoomPayload) => {
            return createInquiryRoom(payload);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: mInquiryQueryKeys.rooms()
            });
        }
    });
}
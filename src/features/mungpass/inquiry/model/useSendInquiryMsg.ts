'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MInquiryMessage, MSendInquiryMessagePayload } from './types';
import { sendInquiryMsg } from '@/features/mungpass/inquiry/api/sendInquiryMsg';
import { mInquiryQueryKeys } from '@/features/mungpass/inquiry/model/mInquiryQueryKeys';

export function useSendInquiryMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: MSendInquiryMessagePayload) => {
            return sendInquiryMsg(payload)
        },

        onSuccess: (message) => {
            queryClient.setQueryData<MInquiryMessage[]>(
                mInquiryQueryKeys.messages(message.room_id),
                (old = []) => {
                    if (old.some((item) => item.id === message.id)) {
                        return old;
                    }

                    return [...old, message];
                }
            );

            queryClient.invalidateQueries({
                queryKey: mInquiryQueryKeys.rooms()
            });
        }
    });
}
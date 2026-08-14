'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { MInquiryMessage } from './types';

import { supabaseClient } from '@/shared/db/supabase/client';
import { mInquiryQueryKeys } from '@/features/mungpass/inquiry/model/mInquiryQueryKeys';

export function useInquiryRealtime(roomId: string | null) {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!roomId) return;

        const supabase = supabaseClient();

        const channel = supabase
            .channel(`mungpass-inquiry-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'inquiry_messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    const message = payload.new as MInquiryMessage;

                    queryClient.setQueryData<MInquiryMessage[]>(
                        mInquiryQueryKeys.messages(roomId),
                        (old = []) => {
                            if (old.some((item) => item.id === message.id)) {
                                return old;
                            }

                            return [...old, message];
                        }
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId, queryClient]);
}
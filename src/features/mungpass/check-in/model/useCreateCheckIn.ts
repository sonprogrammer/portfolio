'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCheckIn } from '@/features/mungpass/check-in/api/createCheckIn';
import { MCheckInPayload } from './types';
import { mungpassCheckInQueryKeys } from './mCheckInQueryKeys';

export function useCreateCheckIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: MCheckInPayload) => createCheckIn(payload),

        onSuccess: (result) => {
            if (!result.success) return;

            queryClient.invalidateQueries({
                queryKey: mungpassCheckInQueryKeys.usage()
            });
        }
    });
}
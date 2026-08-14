'use client';

import { useQuery } from '@tanstack/react-query';

import { getCheckInShops } from '@/features/mungpass/check-in/api/getCheckInShops';
import { mungpassCheckInQueryKeys } from './mCheckInQueryKeys';

export function useGetCheckInShops() {
    return useQuery({
        queryKey: mungpassCheckInQueryKeys.shops(),
        queryFn: getCheckInShops,
        refetchOnWindowFocus: false
    });
}
'use client';

import { useQuery } from '@tanstack/react-query';

import { getShopProducts } from '@/features/mungpass/check-in/api/getShopProducts';
import { mungpassCheckInQueryKeys } from './mCheckInQueryKeys';

export function useGetShopProducts(shopId: string | null) {
    return useQuery({
        queryKey: mungpassCheckInQueryKeys.products(shopId),
        queryFn: () => getShopProducts(shopId!),
        enabled: !!shopId,
        refetchOnWindowFocus: false
    });
}
// features/vc/order/model/useAllOrders.ts

import { useQuery } from '@tanstack/react-query';

import { getAllOrder } from '../api/getAllOrder';
import { vcOrderQueryKeys } from './queryKeys';

interface UseAllOrdersParams {
    guestId: string;
    enabled?: boolean;
}

export function useGetAllOrder({
    guestId,
    enabled = true,
}: UseAllOrdersParams) {
    return useQuery({
        queryKey:
            vcOrderQueryKeys.list(guestId),
        queryFn: ({ signal }) =>
            getAllOrder({
                guestId,
                signal,
            }),
        enabled:
            enabled &&
            !!guestId,

        staleTime: 1000 * 10,
        refetchOnWindowFocus: false,
    });
}
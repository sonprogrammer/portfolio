import { useQuery } from '@tanstack/react-query';

import { getAllHoldings } from '../api/getAllHoldings';
import { vcHoldingQueryKeys } from './queryKeys';

interface UseAllHoldingsParams {
    guestId: string;
    enabled?: boolean;
}

export function useAllHoldings({
    guestId,
    enabled = true,
}: UseAllHoldingsParams) {
    return useQuery({
        queryKey: vcHoldingQueryKeys.list(guestId),
        queryFn: ({ signal }) => getAllHoldings({
            guestId,
            signal,
        }),
        enabled: enabled && !!guestId,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    });
}
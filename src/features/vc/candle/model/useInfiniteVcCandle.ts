import { useInfiniteQuery } from "@tanstack/react-query";

import type { VcCandleUnit } from "@/entities/vc/coin/model";
import { getCandle } from "@/features/vc/candle/api/getCandle";
import { vcCandleQueryKeys } from "@/features/vc/candle/model/queryKeys";

interface UseInfiniteVcCandleParams{
    market: string;
    unit: VcCandleUnit
}

export function useInfiniteVcCandle({market, unit}: UseInfiniteVcCandleParams){

    return useInfiniteQuery({
        queryKey: vcCandleQueryKeys.market(market, unit),
        initialPageParam: undefined as string | undefined,
        queryFn: ({pageParam,signal}) => getCandle({market, unit, to: pageParam, signal}),
        getNextPageParam: (lastPage) => {
            if(!lastPage.hasMore || !lastPage.nextTo){
                return undefined
            }
            return lastPage.nextTo
        },
        enabled: !!market,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 30,
        retry: 1, 
        refetchOnWindowFocus: false
    })
}
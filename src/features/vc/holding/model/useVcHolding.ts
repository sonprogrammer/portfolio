import { getCoinHolding } from "@/features/vc/holding/api/getCoinHolding";
import { vcHoldingQueryKeys } from "@/features/vc/holding/model/queryKeys";
import { useQuery } from "@tanstack/react-query";


interface UseVcHoldingParams{
    guestId: string,
    market: string
    enabled?: boolean
}

// * 해당 코인 정용 자산
export function useCoinHolding({guestId,market, enabled}: UseVcHoldingParams){
    return useQuery({
        queryKey: vcHoldingQueryKeys.market(guestId, market),
        queryFn: ({signal}) => getCoinHolding({guestId, market, signal}),
        enabled: enabled && !!guestId && !!market,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false
    })
}
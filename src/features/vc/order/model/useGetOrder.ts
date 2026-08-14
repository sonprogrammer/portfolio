import { getOrder } from "@/features/vc/order/api/getOrder";
import { vcOrderQueryKeys } from "@/features/vc/order/model/queryKeys";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrdersParams {
    guestId: string;
    market: string;
    limit?: number;
    enabled?: boolean;
}

export function useGetOrder({guestId, market, limit=10, enabled=true}: UseGetOrdersParams){
    return useQuery({
        queryKey: vcOrderQueryKeys.recent(guestId, market, limit),
        queryFn: ({signal}) => getOrder({guestId, market, limit, signal}),
        enabled: enabled && !!guestId && !!market,
        staleTime: 1000 * 10,
        refetchOnWindowFocus: false
    })
}
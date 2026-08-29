import { reqVcMarketOrder } from "@/features/vc/order/api/reqVcMarketOrder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { VcMarketOrderPayload } from "@/features/vc/order/model/types";
import { vcOrderQueryKeys } from "@/features/vc/order/model/queryKeys";
import { vcGuestQueryKeys } from "@/features/vc/guest/model/queryKeys";
import { vcHoldingQueryKeys } from "@/features/vc/holding/model/queryKeys";
import { useSocket } from "@/shared/providers/SocketProvider";
import { toast } from "sonner";

type UseVcMarketOrderParams = {
    guestId: string
    market: string;
}

type MarketOrderInput = { type: 'buy'; orderAmount: number } | { type: 'sell'; quantity: number }

export function useMarketOrder({ guestId, market }: UseVcMarketOrderParams) {
    const queryClient = useQueryClient()

    const {socket} = useSocket()

    return useMutation({
        mutationFn: (input: MarketOrderInput) => {
            if (!socket) {
                throw new Error('check socket connection')
            }
            const payload: VcMarketOrderPayload = input.type === 'buy' ?
                {
                    guestId,
                    market,
                    type: 'buy',
                    orderAmount: input.orderAmount
                } :
                {
                    guestId,
                    market,
                    type: 'sell',
                    quantity: input.quantity
                }
            return reqVcMarketOrder(socket, payload)
        },
        onSuccess: async (data, variables) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: vcGuestQueryKeys.session()
                }),
                queryClient.invalidateQueries({
                    queryKey: vcHoldingQueryKeys.all
                }),
                queryClient.invalidateQueries({
                    queryKey: vcOrderQueryKeys.list(guestId)
                })
            ]
            )
            toast.success(`${data.market} ${variables.type}`)
        }
    })
}
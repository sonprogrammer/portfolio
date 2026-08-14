import type { Socket } from "socket.io-client";

import type { VcMarketOrderPayload, VcMarketOrderResponse, VcMarketOrderResult } from "@/features/vc/order/model/types";

const ORDER_TIMEOUT = 5_000

export function reqVcMarketOrder(socket: Socket, payload: VcMarketOrderPayload): Promise<VcMarketOrderResult> {
    return new Promise((resolve, reject) => {
        if (!socket.connected) {
            reject(
                new Error("실시간 서버에 연결되어 있지 않습니다.")
            );
            return
        }

        socket.timeout(ORDER_TIMEOUT).emit('vc:order:market', payload,(
            timeoutError: Error | null,
            response?: VcMarketOrderResponse
        ) => {
            if(timeoutError){
                reject(new Error('주문 요청 시간이 초과되었습니다'))
                return
            }
            if(!response){
                reject(new Error('주문 처리 결과가 업습니다'))
                return
            }

            if(!response.ok){
                reject(new Error(response.message))
                return
            }
            resolve(response.data)
        })
    })
}
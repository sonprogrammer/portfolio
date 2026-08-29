'use client'

import type { VcTicker} from '@/entities/vc/coin/model/coinTypes'
import { vcTickerQueryKeys } from "@/entities/vc/coin/model/queryKeys"
import { VC_SOCKET_EVENTS } from "@/entities/vc/coin/model/socketEvents"
import { useSocket } from '@/shared/providers/SocketProvider'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

function sortTickers(tickers: VcTicker[]) {
    return [...tickers].sort((a,b) => b.accTradePrice24h - a.accTradePrice24h)
}

export function useVcTickers() {
    const {socket} = useSocket()
    const queryClient = useQueryClient()

    const { data : tickers = []} = useQuery<VcTicker[]>({
        queryKey: vcTickerQueryKeys.all,
        queryFn: async() => [],
        enabled: false,
        initialData: [],
        staleTime: Infinity,
        gcTime: Infinity
    })

    useEffect(() => {
        const handleSnapShot = (snapshot: VcTicker[]) => {
            queryClient.setQueryData(vcTickerQueryKeys.all, sortTickers(snapshot))
        }

        const handleUpdate = (updates: VcTicker[]) => {
            queryClient.setQueryData<VcTicker[]>(
                vcTickerQueryKeys.all,
                (previousTickers) => {
                    const tickerMap = new Map(previousTickers?.map(ticker => [ticker.market, ticker]))
                    updates.forEach(ticker => {
                        tickerMap.set(ticker.market, ticker)
                    })
                    return sortTickers(Array.from(tickerMap.values()))
                }
            )
        }

        const subscribe = () => {
            socket.emit(VC_SOCKET_EVENTS.tickerSubscribe)
        }
        socket.on(VC_SOCKET_EVENTS.tickerSnapshot, handleSnapShot)
        socket.on(VC_SOCKET_EVENTS.tickerUpdate, handleUpdate)
        socket.on('connect', subscribe)
        if(socket.connected){
            subscribe()
        }

        return () => {
            socket.off('connect', subscribe)
            socket.off(VC_SOCKET_EVENTS.tickerSnapshot, handleSnapShot)
            socket.off(VC_SOCKET_EVENTS.tickerUpdate, handleUpdate)

            if(socket.connected){
                socket.emit(VC_SOCKET_EVENTS.tickerUnsubscribe)
            }
        }
        
    },[queryClient, socket])

    return { tickers, isLoading: tickers.length === 0}
}
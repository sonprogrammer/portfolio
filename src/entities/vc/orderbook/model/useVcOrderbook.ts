'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';


import { VC_SOCKET_EVENTS } from '@/entities/vc/coin/model/socketEvents';

import { useSocket } from '@/shared/providers/SocketProvider';
import { VcOrderbook, VcOrderbookErrorPayload } from '@/entities/vc/orderbook/model/orderbookTypes';


interface UseVcOrderbookParams {
  market: string;
}

export function useVcOrderbook({ market }: UseVcOrderbookParams) {
  const { socket, realtimeUnavailable } = useSocket()

  const [orderbook, setOrderbook] = useState<VcOrderbook | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const subscribe = useCallback(() => {
    if (realtimeUnavailable) {
      setIsLoading(false)
      setError('현재 실시간 서버를 사용할 수 없습니다.')
      return
    }

    setIsLoading(true);
    setError(null);

    socket.emit(VC_SOCKET_EVENTS.orderbookSubscribe, { market })
  }, [market, realtimeUnavailable, socket])

  useEffect(() => {
    setOrderbook(null)
    setError(null)

    if (realtimeUnavailable) {
      setIsLoading(false)
      setError('현재 실시간 서버를 사용할 수 없습니다.')
      return
    }

    setIsLoading(true)

    const handleOrderbookUpdate = (nextOrderbook: VcOrderbook) => {
      if (nextOrderbook.market !== market) {
        return;
      }

      setOrderbook(nextOrderbook);
      setIsLoading(false);
      setError(null);
    }

    const handleOrderbookError = (payload: VcOrderbookErrorPayload) => {
      if (payload.market !== market) {
        return;
      }

      setIsLoading(false);
      setError(payload.message);
    };


    socket.on(VC_SOCKET_EVENTS.orderbookUpdate, handleOrderbookUpdate)

    socket.on(VC_SOCKET_EVENTS.orderbookError, handleOrderbookError)

    socket.on('connect', subscribe)

    if (socket.connected) {
      subscribe();
    }

    return () => {
      socket.off(
        VC_SOCKET_EVENTS.orderbookUpdate,
        handleOrderbookUpdate,
      );

      socket.off(
        VC_SOCKET_EVENTS.orderbookError,
        handleOrderbookError,
      );

      socket.off(
        'connect',
        subscribe,
      );

      if (socket.connected) {
        socket.emit(
          VC_SOCKET_EVENTS.orderbookUnsubscribe,
          {
            market,
          },
        );
      }
    };
  }, [market, realtimeUnavailable, socket, subscribe])

  const bestAskPrice = orderbook?.units[0]?.askPrice ?? null;

  const bestBidPrice = orderbook?.units[0]?.bidPrice ?? null;

  const retry = useCallback(() => {
    subscribe();
  }, [subscribe]);

  return useMemo(
    () => ({
      orderbook,
      isLoading,
      error,
      realtimeUnavailable,
      bestAskPrice,
      bestBidPrice,

      retry,
    }),
    [orderbook, isLoading, error, realtimeUnavailable, bestAskPrice, bestBidPrice, retry],
  );
}

import type { Server, Socket } from 'socket.io';
import { UpbitOrderbookManager } from './upbitOrderbookManger';
import { VC_SOCKET_EVENTS } from '@/entities/vc/coin/model/socketEvents';
import { VcOrderbookErrorPayload, VcOrderbookSubscribePayload } from '@/entities/vc/orderbook/model/orderbookTypes';



interface RegisterVcOrderbookEventsParams {
  io: Server;
  socket: Socket;
  orderbookManager: UpbitOrderbookManager;
}

function createRoomName(
  market: string,
) {
  return `vc:orderbook:${market}`;
}

function normalizeMarket(
  market: string,
) {
  return market
    .trim()
    .toUpperCase();
}

function isValidMarket(
  market: string,
) {
  return /^KRW-[A-Z0-9]+$/.test(
    market,
  );
}

export function registerVcOrderbookEvents({
  socket,
  orderbookManager,
}: RegisterVcOrderbookEventsParams) {
  const subscribedMarkets =
    new Set<string>();

  socket.on(
    VC_SOCKET_EVENTS.orderbookSubscribe,
    (
      payload: VcOrderbookSubscribePayload,
    ) => {
      const market = normalizeMarket(
        payload?.market ?? '',
      );

      if (!isValidMarket(market)) {
        const errorPayload: VcOrderbookErrorPayload =
        {
          market,
          message:
            '올바르지 않은 마켓 코드입니다.',
        };

        socket.emit(
          VC_SOCKET_EVENTS.orderbookError,
          errorPayload,
        );

        return;
      }

      /*
       * 같은 socket에서 같은 마켓을
       * 중복 구독하지 않도록 방지
       */
      if (
        subscribedMarkets.has(market)
      ) {
        const snapshot =
          orderbookManager.getSnapshot(
            market,
          );

        if (snapshot) {
          socket.emit(
            VC_SOCKET_EVENTS.orderbookUpdate,
            snapshot,
          );
        }

        return;
      }

      subscribedMarkets.add(market);

      socket.join(
        createRoomName(market),
      );

      orderbookManager.subscribe(
        market,
      );

      /*
       * 이미 다른 클라이언트가 해당 마켓을
       * 구독 중이면 최신 캐시를 즉시 전송
       */
      const snapshot =
        orderbookManager.getSnapshot(
          market,
        );

      if (snapshot) {
        socket.emit(
          VC_SOCKET_EVENTS.orderbookUpdate,
          snapshot,
        );
      }
    },
  );

  socket.on(
    VC_SOCKET_EVENTS.orderbookUnsubscribe,
    (
      payload: VcOrderbookSubscribePayload,
    ) => {
      const market = normalizeMarket(
        payload?.market ?? '',
      );

      if (
        !subscribedMarkets.has(market)
      ) {
        return;
      }

      subscribedMarkets.delete(market);

      socket.leave(
        createRoomName(market),
      );

      orderbookManager.unsubscribe(
        market,
      );
    },
  );

  socket.on('disconnect', () => {
    for (const market of subscribedMarkets) {
      orderbookManager.unsubscribe(
        market,
      );
    }

    subscribedMarkets.clear();
  });
}
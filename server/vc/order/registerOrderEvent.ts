import type { Socket } from "socket.io";

import type {
  UpbitOrderbookManager,
} from "../orderbook/upbitOrderbookManger";
import {
  executeMarketOrder,
  type ExecuteVcMarketOrderResult,
} from "./executeMarketOrder";

type MarketBuyPayload = {
  guestId: string;
  market: string;
  type: "buy";
  orderAmount: number;
};

type MarketSellPayload = {
  guestId: string;
  market: string;
  type: "sell";
  quantity: number;
};

type MarketOrderPayload =
  | MarketBuyPayload
  | MarketSellPayload;

type MarketOrderResponse =
  | {
      ok: true;
      data: ExecuteVcMarketOrderResult;
    }
  | {
      ok: false;
      message: string;
    };

type MarketOrderAck = (
  response: MarketOrderResponse,
) => void;

interface RegisterVcOrderEventsParams {
  socket: Socket;
  orderbookManager:
    UpbitOrderbookManager;
}

export function registerVcOrderEvents({
  socket,
  orderbookManager,
}: RegisterVcOrderEventsParams) {
  socket.on(
    "vc:order:market",
    async (
      payload: MarketOrderPayload,
      ack?: MarketOrderAck,
    ) => {
      try {
        if (!payload || typeof payload !== "object") {
          throw new Error("주문 정보가 없습니다.")
        }

        const snapshot = orderbookManager.getSnapshot(payload.market)

        if (!snapshot) {
          throw new Error("호가 데이터를 불러오는 중입니다.")
        }

        const bestOrderbookUnit = snapshot.units[0]

        if (!bestOrderbookUnit) {
          throw new Error("사용 가능한 호가가 없습니다.")
        }

        const executedPrice =
          payload.type === "buy"
            ? bestOrderbookUnit.askPrice
            : bestOrderbookUnit.bidPrice;

        const result =
          payload.type === "buy"
            ? await executeMarketOrder({
                guestId:
                  payload.guestId,
                market: payload.market,
                type: "buy",
                orderAmount:
                  payload.orderAmount,
                executedPrice,
              })
            : await executeMarketOrder({
                guestId:
                  payload.guestId,
                market: payload.market,
                type: "sell",
                quantity:
                  payload.quantity,
                executedPrice,
              });

        ack?.({
          ok: true,
          data: result,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "주문 처리 중 오류가 발생했습니다.";

        console.error(
          "VC 시장가 주문 오류:",
          error,
        );

        ack?.({
          ok: false,
          message,
        });
      }
    },
  );
}
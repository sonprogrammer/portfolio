import { VcOrderbook } from "@/entities/vc/orderbook/model/orderbookTypes";



export interface UpbitOrderbookResponse {
  type: 'orderbook';
  code: string;
  timestamp: number;

  total_ask_size: number;
  total_bid_size: number;

  orderbook_units: {
    ask_price: number;
    bid_price: number;
    ask_size: number;
    bid_size: number;
  }[];

  stream_type: 'SNAPSHOT' | 'REALTIME';
  level: number;
}

export function normalizeUpbitOrderbook(orderbook: UpbitOrderbookResponse): VcOrderbook {
  return {
    market: orderbook.code,

    totalAskSize: orderbook.total_ask_size,
    totalBidSize: orderbook.total_bid_size,

    units: orderbook.orderbook_units.map(
      (unit) => ({
        askPrice: unit.ask_price,
        askSize: unit.ask_size,
        bidPrice: unit.bid_price,
        bidSize: unit.bid_size,
      }),
    ),

    timestamp: orderbook.timestamp,
    streamType: orderbook.stream_type,
  };
}
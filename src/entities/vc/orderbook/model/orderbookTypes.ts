export interface VcOrderbookUnit {
  askPrice: number;
  askSize: number;
  bidPrice: number;
  bidSize: number;
}

export interface VcOrderbook {
  market: string;
  totalAskSize: number;
  totalBidSize: number;
  units: VcOrderbookUnit[];
  timestamp: number;
  streamType: 'SNAPSHOT' | 'REALTIME';
}

export interface VcOrderbookSubscribePayload {
  market: string;
}

export interface VcOrderbookErrorPayload {
  market: string;
  message: string;
}
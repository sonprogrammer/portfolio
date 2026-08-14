export const VC_CANDLE_UNITS = [
  1,
  3,
  5,
  10,
  15,
  30,
  60,
  240,
] as const;

export type VcCandleUnit = (typeof VC_CANDLE_UNITS)[number];

export interface VcCandle {

  time: number;

  open: number;
  high: number;
  low: number;
  close: number;

  volume: number;
  tradeAmount: number;
}

export interface VcCandlePage {
  candles: VcCandle[];

  nextTo: string | null;

  hasMore: boolean;
}
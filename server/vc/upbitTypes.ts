export interface UpbitMarket {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface UpbitTickerMessage {
  type: 'ticker';
  code: string;

  trade_price: number;
  opening_price: number;
  high_price: number;
  low_price: number;

  signed_change_price: number;
  signed_change_rate: number;

  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;

  timestamp: number;
}

export interface VcTicker {
  market: string;
  koreanName: string;
  englishName: string;

  tradePrice: number;
  openingPrice: number;
  highPrice: number;
  lowPrice: number;

  signedChangePrice: number;
  signedChangeRate: number;

  accTradePrice24h: number;
  accTradeVolume24h: number;

  timestamp: number;
}
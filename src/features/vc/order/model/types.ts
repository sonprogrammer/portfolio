export type VcMarketOrderType = 'buy' | 'sell'

export interface VcMarketBuyPayload{
    guestId :string;
    market: string;
    type: 'buy'
    orderAmount: number
}

export interface VcMarketSellPayload{
    guestId: string;
    market: string;
    type: 'sell'
    quantity: number
}

export type VcMarketOrderPayload = VcMarketBuyPayload | VcMarketSellPayload


export interface VcMarketOrderResult{
    orderId: string;
    market: string;
    type: VcMarketOrderType
    executedPrice: number;
    executedQuantity: number;
    executedAmount: number;
    krwBalance: number;
    holdingQuantity: number;
    averagePrice: number;
}

export type VcMarketOrderResponse = {
    ok: true
    data: VcMarketOrderResult
}| {ok: false; message: string}

export interface VcOrderItem {
    id: string;
    guestId: string;
    market: string;
    type: VcMarketOrderType;
    executedPrice: number;
    executedQuantity: number;
    executedAmount: number;
    createdAt: string;
}

export interface GetVcOrdersResponse {
    orders: VcOrderItem[];
}

export interface VcOrder {
    id: string;
    guestId: string;
    market: string;
    type: VcMarketOrderType;
    executedPrice: number;
    executedQuantity: number;
    executedAmount: number;
    createdAt: string;
}


export interface GetVcOrdersResponse {
    orders: VcOrder[];
}
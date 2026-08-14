export interface VcHolding {
    id: string;
    guestId: string;
    market: string;
    quantity: number;
    averagePrice: number;
}

// * 해당 코인의 보유 내역. 즉, 하나
export interface GetCoinHoldingRes {
    holding: VcHolding | null;
}

// *보유한 모든 코인
export interface GetAllHoldingsRes {
    holdings: VcHolding[];
}
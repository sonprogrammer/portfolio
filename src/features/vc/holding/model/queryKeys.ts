export const vcHoldingQueryKeys = {
    all: ['vc', 'holdings'] as const,
    // * 유저의 전체 홀딩 코인들(=지신들)
    list: (guestId: string) => [...vcHoldingQueryKeys.all, 'list', guestId] as const,
    // * 유저가 갖고 있는 해당 코인의 자사 
    market: (guestId: string, market: string) => [...vcHoldingQueryKeys.all, 'market', guestId, market] as const
}
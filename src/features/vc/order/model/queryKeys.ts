export const vcOrderQueryKeys ={ 
    all: ['vc', 'orders'] as const,
    guest: (guestId: string) => [...vcOrderQueryKeys.all, 'guest', guestId] as const,
    list: (guestId: string) => [...vcOrderQueryKeys.guest(guestId), 'list', guestId] as const,
    market: (guestId: string, market: string) => [...vcOrderQueryKeys.guest(guestId), 'market', market] as const,
    recent: (guestId: string, market: string, limit: number) => 
    [
        ...vcOrderQueryKeys.market(guestId, market), 'recent', limit
    ] as const
}
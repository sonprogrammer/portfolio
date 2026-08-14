import type { VcCandleUnit } from "@/entities/vc/coin/model";

export const vcCandleQueryKeys = {
    all: ['vc', 'candles'] as const,
    market: (
        market: string,
        unit: VcCandleUnit
    ) => [...vcCandleQueryKeys.all, market, unit] as const
}
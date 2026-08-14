import type { VcHolding } from "@/features/vc/holding/model/types";

interface VcTickerPrice {
    market: string;
    tradePrice: number
}

export interface VcEvaluatedHolding extends VcHolding {
    currentPrice: number;
    purchaseAmount: number;
    valuationAmount: number;
    profitLoss: number;
    profitRate: number;
}

export interface VcAssetSummary {
    krwBalance: number;
    totalPurchaseAmount: number;
    totalCoinValuation: number;
    totalAssets: number;
    totalProfitLoss: number;
    totalProfitRate: number;
    holdings: VcEvaluatedHolding[];
}

interface CalculateVcAssetsParams {
    krwBalance: number;
    holdings: VcHolding[];
    tickers: VcTickerPrice[];
}

export function calculateVcAsset({ krwBalance, holdings, tickers }: CalculateVcAssetsParams): VcAssetSummary {
    const tickerMap = new Map(
        tickers.map((ticker) => [
            ticker.market,
            ticker.tradePrice,
        ]),
    )
    const evaluatedHoldings = holdings.map((holding) => {
        const currentPrice = tickerMap.get(holding.market) ?? 0

        const purchaseAmount = holding.quantity * holding.averagePrice;

        const valuationAmount = holding.quantity * currentPrice;

        const profitLoss = valuationAmount - purchaseAmount;

        const profitRate = purchaseAmount > 0
            ? (profitLoss / purchaseAmount) * 100
            : 0

        return {
            ...holding,
            currentPrice,
            purchaseAmount,
            valuationAmount,
            profitLoss,
            profitRate,
        };
    });

    const totalPurchaseAmount =
        evaluatedHoldings.reduce((sum, holding) =>
            sum + holding.purchaseAmount,
            0,
        )

    const totalCoinValuation = evaluatedHoldings.reduce((sum, holding) =>
        sum + holding.valuationAmount,
        0,
    )

    const totalProfitLoss = totalCoinValuation - totalPurchaseAmount;

    const totalProfitRate = totalPurchaseAmount > 0
            ? (totalProfitLoss / totalPurchaseAmount) * 100
            : 0

    return {
        krwBalance,
        totalPurchaseAmount,
        totalCoinValuation,
        totalAssets: krwBalance + totalCoinValuation,
        totalProfitLoss,
        totalProfitRate,
        holdings: evaluatedHoldings,
    };
}
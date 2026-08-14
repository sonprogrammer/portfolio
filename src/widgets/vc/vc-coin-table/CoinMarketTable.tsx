'use client'
import { CoinItem } from "@/entities/vc/coin/ui"
import { useVcTickers } from "@/features/vc/market/model"
import { useVcNavStore } from "@/features/vc/nav/model"


export function CoinMarketTable() {
    const { tickers, isLoading } = useVcTickers()
    const setSelectedMarket = useVcNavStore(state => state.setSelectedMarket)

    if (isLoading) {
        return (
            <div className="py-20 text-center text-sm text-zinc-500 animate-pulse">
                실시간 시세를 불러오는 중입니다.
            </div>
        )
    }

    return (
        <section>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        원화 마켓
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        거래대금 TOP 10개 코인의 실시간 시세
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-800">
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr] bg-zinc-900 px-5 py-3 text-xs text-zinc-500">
                    <span>코인</span>

                    <span className="text-right">
                        현재가
                    </span>

                    <span className="text-right">
                        전일 대비
                    </span>

                    <span className="text-right">
                        거래대금
                    </span>
                </div>
            </div>

            {tickers.slice(0, 10).map(ticker => {
              
                return (
                    <CoinItem 
                        coin={ticker}
                        key={ticker.market}
                        onSelectCoin={() => setSelectedMarket(ticker.market)}
                    />
                )
            })}
        </section>
    )
}
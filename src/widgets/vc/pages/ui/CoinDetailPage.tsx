'use client';

import { ArrowLeft } from 'lucide-react';

import { useVcTickers } from '@/features/vc/market/model';
import { useVcNavStore } from '@/features/vc/nav/model';
import { VcCoinSum } from '@/widgets/vc/coin-detail/VcCoinSum';
import { CoinChart } from '@/widgets/vc/coin-detail/CoinChart';
import { RecentTrade } from '@/widgets/vc/coin-detail/RecentTrade';
import { CoinOrderbook } from '@/widgets/vc/coin-detail/CoinOrderbook';
import { useShallow } from 'zustand/shallow';
import { CoinTradeForm } from '@/features/vc/order/ui';


interface CoinDetailPageProps {
    market: string;
}

export function CoinDetailPage({ market }: CoinDetailPageProps) {
    const { clearSelectedCoin } = useVcNavStore(useShallow((state) => ({
        clearSelectedCoin: state.clearSelectedCoin
    })
    ))

    const { tickers, isLoading } = useVcTickers()

    const coin = tickers.find((ticker) => ticker.market === market)

    if (isLoading) {
        return (
            <div className="flex min-h-125 animate-pulse items-center justify-center text-sm text-white/40">
                실시간 시세를 불러오는 중입니다.
            </div>
        );
    }

    if (!coin) {
        return (
            <div className="flex min-h-125 flex-col  items-center justify-center gap-4">
                <p className="text-sm text-white/40">
                    코인 정보를 찾을 수 없습니다.
                </p>

                <button
                    type="button"
                    onClick={clearSelectedCoin}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const coinUnit = coin.market.split('-')[1]
    const coinLogo = `https://static.upbit.com/logos/${coinUnit}.png`


    return (
        <main className="space-y-5">
            <button
                type="button"
                onClick={clearSelectedCoin}
                className="flex items-center gap-2 text-sm text-white/45 transition hover:text-white"
            >
                <ArrowLeft size={18} />
                코인 목록
            </button>

            <VcCoinSum
                coin={coin}
                coinLogo={coinLogo}
            />

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0 space-y-5">
                    <CoinChart market={coin.market} />

                    <RecentTrade market={coin.market} />
                </div>

                <aside className="space-y-5">
                    <CoinOrderbook currentPrice={coin.tradePrice} market={coin.market} />

                    <CoinTradeForm market={coin.market} />
                </aside>
            </section>
        </main>
    );
}


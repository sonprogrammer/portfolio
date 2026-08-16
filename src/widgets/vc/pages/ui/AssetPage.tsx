// widgets/vc/assets/VcAssetsPage.tsx

'use client';

import { useMemo } from 'react';

import { useVcGuestSession } from '@/features/vc/guest/model';

import { useVcTickers } from '@/features/vc/market/model';
import { calculateVcAsset, useAllHoldings } from '@/features/vc/holding/model';
import { AssetSummary } from '@/widgets/vc/assets/ui/AssetSummary';
import { VcHoldingList } from '@/widgets/vc/assets/ui/HoldingList';


export function AssetPage() {
    const { data: userInfo, isPending: isGuestPending } = useVcGuestSession();

    const user = userInfo?.guest
    const guestId = user?.id ?? ''

    const { data: holdingsData, isPending: isHoldingsPending, isError, error } = useAllHoldings({ guestId, enabled: !!user })

    const { tickers, isLoading: isTickersLoading } = useVcTickers()

    const koreanOb = useMemo(() => Object.fromEntries(tickers.map(ticker => [ticker.market, ticker.koreanName])), [tickers])

    const summary = useMemo(
        () =>
            calculateVcAsset({
                krwBalance: user?.krwBalance ?? 0,
                holdings: holdingsData?.holdings ?? [],
                tickers,
            }),
        [
            user?.krwBalance,
            holdingsData?.holdings,
            tickers,
        ],
    )

    const isLoading =
        isGuestPending ||
        (!!user &&
            (isHoldingsPending ||
                isTickersLoading));

    if (isLoading) {
        return (
            <div className="flex min-h-80 animate-pulse items-center justify-center px-4 text-center text-xs text-white/40 sm:min-h-100 sm:text-sm md:min-h-125">
                자산 정보를 불러오는 중입니다.
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#111318] px-4 text-center text-xs text-red-400 sm:min-h-100 sm:rounded-3xl sm:px-5 sm:text-sm md:min-h-125">
                {error instanceof Error
                    ? error.message + 'her'
                    : '자산 조회에 실패했습니다.'}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-125 items-center justify-center rounded-3xl border border-white/10 bg-[#111318] px-5 text-center text-sm text-red-400">
                {error instanceof Error
                    ? error.message + 'her'
                    : '자산 조회에 실패했습니다.'}
            </div>
        );
    }

    return (
        <main className="w-full min-w-0 max-w-full space-y-4 sm:space-y-5">
            <div>
                <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                    내 자산
                </h1>
                <p className="text-xs leading-6 text-white/40 sm:text-sm">
                    현재 보유 중인 원화와 코인 자산
                </p>

            </div>

            <AssetSummary summary={summary} />

            <VcHoldingList holdings={summary.holdings} koreanOb={koreanOb} />
        </main>
    );
}
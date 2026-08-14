// widgets/vc/assets/VcAssetsPage.tsx

'use client';

import { useMemo } from 'react';

import { useVcGuestSession } from '@/features/vc/guest/model';

import { useVcTickers } from '@/features/vc/market/model';
import { calculateVcAsset, useAllHoldings } from '@/features/vc/holding/model';
import { AssetSummary } from '@/widgets/vc/assets/ui/AssetSummary';
import { VcHoldingList } from '@/widgets/vc/assets/ui/HoldingList';


export function AssetPage() {
    const {
        data: userInfo,
        isPending: isGuestPending,
    } = useVcGuestSession();

    const user = userInfo?.guest
    const guestId = user?.id ?? ''

    const {
        data: holdingsData,
        isPending: isHoldingsPending,
        isError,
        error,
    } = useAllHoldings({ guestId, enabled: !!user })

    const {
        tickers,
        isLoading: isTickersLoading,
    } = useVcTickers()

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
            <div className="flex min-h-125 animate-pulse items-center justify-center text-sm text-white/40">
                자산 정보를 불러오는 중입니다.
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-125 flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-[#111318]">
                <p className="text-sm text-white/50">
                    게스트 로그인 후 자산을
                    확인할 수 있습니다.
                </p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-125 items-center justify-center rounded-3xl border border-white/10 bg-[#111318] px-5 text-center text-sm text-red-400">
                {error instanceof Error
                    ? error.message +'her'
                    : '자산 조회에 실패했습니다.'}
            </div>
        );
    }

    return (
        <main className="space-y-5">
            <div>
                <p className="text-sm text-white/40">
                    현재 보유 중인 원화와
                    코인 자산입니다.
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-white">
                    내 자산
                </h1>
            </div>

            <AssetSummary summary={summary} />

            <VcHoldingList holdings={summary.holdings} />
        </main>
    );
}
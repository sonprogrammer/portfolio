import type { VcAssetSummary as VcAssetSummaryData } from "@/features/vc/holding/model/calculateVcAsset";

interface VcAssetSummaryProps{
    summary: VcAssetSummaryData
}

function formatKrw(value: number){
    return Math.floor(value).toLocaleString('ko-KR')
}

export function AssetSummary({summary}: VcAssetSummaryProps){
    const isProfit = summary.totalProfitLoss >= 0
    const profitClass = isProfit ? 'text-red-500' : 'text-blue-500'


    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-[#111318] p-5">
                <p className="text-xs text-white/40">
                    총 보유자산
                </p>

                <p className="mt-3 text-2xl font-semibold text-white">
                    {formatKrw(
                        summary.totalAssets,
                    )}{' '}
                    KRW
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111318] p-5">
                <p className="text-xs text-white/40">
                    보유 원화
                </p>

                <p className="mt-3 text-xl font-semibold text-white">
                    {formatKrw(
                        summary.krwBalance,
                    )}{' '}
                    KRW
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111318] p-5">
                <p className="text-xs text-white/40">
                    코인 평가금액
                </p>

                <p className="mt-3 text-xl font-semibold text-white">
                    {formatKrw(
                        summary.totalCoinValuation,
                    )}{' '}
                    KRW
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111318] p-5">
                <p className="text-xs text-white/40">
                    총 평가손익
                </p>

                <p
                    className={[
                        'mt-3 text-xl font-semibold',
                        profitClass,
                    ].join(' ')}
                >
                    {isProfit ? '+' : ''}
                    {formatKrw(
                        summary.totalProfitLoss,
                    )}{' '}
                    KRW
                </p>

                <p
                    className={[
                        'mt-1 text-sm',
                        profitClass,
                    ].join(' ')}
                >
                    {isProfit ? '+' : ''}
                    {summary.totalProfitRate.toFixed(
                        2,
                    )}
                    %
                </p>
            </div>
        </section>
    )
}
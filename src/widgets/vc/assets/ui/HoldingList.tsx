import type { VcEvaluatedHolding } from '@/features/vc/holding/model/calculateVcAsset'

interface VcHoldingListProps {
    holdings: VcEvaluatedHolding[];
    koreanOb: Record<string, string>
}

function formatKrw(value: number) {
    return Math.floor(value).toLocaleString(
        'ko-KR',
    );
}

function formatQuantity(value: number) {
    return value.toLocaleString('ko-KR', {
        maximumFractionDigits: 8,
    });
}

export function VcHoldingList({
    holdings,
    koreanOb
}: VcHoldingListProps) {
    return (
        <section className="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
                <h2 className="font-medium text-white">
                    보유자산
                </h2>

                <span className="text-xs text-white/30">
                    {holdings.length}개
                </span>
            </div>

            {holdings.length === 0 ? (
                <div className="flex h-48 items-center justify-center px-4 text-center text-sm text-white/30">
                    현재 보유 중인 코인이 없습니다.
                </div>
            ) : (
                <>
                    <div className="lg:hidden">
                        {holdings.map(holding => {
                            const symbol = holding.market.split("-")[1];
                            const korea = koreanOb[holding.market] ?? symbol
                            const isProfit = holding.profitLoss >= 0;
                            const marketUnit = holding.market.split('-')[1]

                            const profitClassName = isProfit
                                ? "text-red-400"
                                : "text-blue-400";

                            return (
                                <div
                                    key={holding.id}
                                    className="mb-2 w-full border-b border-white/10 bg-white/2 last:mb-0 last:border-b-0"
                                >
                                    <div className="flex items-center gap-4 p-4">
                                        <div className="shrink-0">
                                            <p className="text-base font-bold text-white">
                                                {korea}
                                            </p>

                                            <p className="mt-1 text-xs font-medium text-white/30">
                                                {marketUnit}
                                            </p>
                                        </div>

                                        <div className="flex flex-1 flex-col gap-1">
                                            <p className="flex items-center justify-between gap-4 text-sm">
                                                <span className="text-white/40">
                                                    현재가
                                                </span>

                                                <span className="text-right font-medium text-white/80">
                                                    {formatKrw(holding.currentPrice)} KRW
                                                </span>
                                            </p>

                                            <p className="flex items-center justify-between gap-4 text-sm">
                                                <span className="text-white/40">
                                                    평가손익
                                                </span>

                                                <span
                                                    className={`text-right font-medium ${profitClassName}`}
                                                >
                                                    {isProfit ? "+" : ""}
                                                    {formatKrw(holding.profitLoss)} KRW
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mx-auto w-[92%] border-t border-white/10" />

                                    <div className="flex flex-wrap p-2">
                                        <div className="flex-[1_1_50%] p-3 text-right">
                                            <p className="text-sm font-bold text-white/80">
                                                {formatQuantity(holding.quantity)}
                                            </p>

                                            <p className="mt-1 text-[11px] text-white/30">
                                                보유 수량
                                            </p>
                                        </div>

                                        <div className="flex-[1_1_50%] p-3 text-right">
                                            <p className="text-sm font-bold text-white/80">
                                                {formatKrw(holding.averagePrice)}
                                                <span className="ml-1 text-[10px] font-normal text-white/30">
                                                    KRW
                                                </span>
                                            </p>

                                            <p className="mt-1 text-[11px] text-white/30">
                                                평균 매수가
                                            </p>
                                        </div>

                                        <div className="flex-[1_1_50%] p-3 text-right">
                                            <p className="text-sm font-bold text-white/80">
                                                {formatKrw(holding.valuationAmount)}
                                                <span className="ml-1 text-[10px] font-normal text-white/30">
                                                    KRW
                                                </span>
                                            </p>

                                            <p className="mt-1 text-[11px] text-white/30">
                                                평가금액
                                            </p>
                                        </div>

                                        <div className="flex-[1_1_50%] p-3 text-right">
                                            <p className={`text-sm font-bold ${profitClassName}`}>
                                                {isProfit ? "+" : ""}
                                                {holding.profitRate.toFixed(2)}%
                                            </p>

                                            <p className="mt-1 text-[11px] text-white/30">
                                                수익률
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden w-full min-w-0 max-w-full overflow-x-auto lg:block">
                        <div className="min-w-225">
                            <div className="grid grid-cols-[130px_1fr_1fr_1fr_1fr_1fr] border-b border-white/10 px-5 py-3 text-xs text-white/30">
                                <span>자산</span>

                                <span className="text-right">
                                    보유 수량
                                </span>

                                <span className="text-right">
                                    평균 매수가
                                </span>

                                <span className="text-right">
                                    현재가
                                </span>

                                <span className="text-right">
                                    평가금액
                                </span>

                                <span className="text-right">
                                    평가손익
                                </span>
                            </div>

                            <ul>
                                {holdings.map(holding => {
                                    const symbol = holding.market.split("-")[1];

                                    const isProfit = holding.profitLoss >= 0;

                                    const profitClassName = isProfit
                                        ? "text-red-400"
                                        : "text-blue-400";

                                    return (
                                        <li
                                            key={holding.id}
                                            className="grid grid-cols-[130px_1fr_1fr_1fr_1fr_1fr] items-center border-b border-white/5 px-5 py-4 text-sm last:border-b-0"
                                        >
                                            <div>
                                                <p className="font-medium text-white">
                                                    {symbol}
                                                </p>

                                                <p className="mt-1 text-xs text-white/30">
                                                    {holding.market}
                                                </p>
                                            </div>

                                            <span className="text-right text-white/70">
                                                {formatQuantity(holding.quantity)}
                                            </span>

                                            <span className="text-right text-white/60">
                                                {formatKrw(holding.averagePrice)} KRW
                                            </span>

                                            <span className="text-right text-white/70">
                                                {formatKrw(holding.currentPrice)} KRW
                                            </span>

                                            <span className="text-right text-white/80">
                                                {formatKrw(holding.valuationAmount)} KRW
                                            </span>

                                            <div className={`text-right ${profitClassName}`}>
                                                <p>
                                                    {isProfit ? "+" : ""}
                                                    {formatKrw(holding.profitLoss)} KRW
                                                </p>

                                                <p className="mt-1 text-xs">
                                                    {isProfit ? "+" : ""}
                                                    {holding.profitRate.toFixed(2)}%
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
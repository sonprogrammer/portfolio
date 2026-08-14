// widgets/vc/assets/VcHoldingList.tsx

import type {VcEvaluatedHolding} from '@/features/vc/holding/model/calculateVcAsset'

interface VcHoldingListProps {
    holdings: VcEvaluatedHolding[];
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
}: VcHoldingListProps) {
    return (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="font-medium text-white">
                    보유자산
                </h2>

                <span className="text-xs text-white/30">
                    {holdings.length}개
                </span>
            </div>

            {holdings.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-sm text-white/30">
                    현재 보유 중인 코인이
                    없습니다.
                </div>
            ) : (
                <div className="overflow-x-auto">
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
                            {holdings.map(
                                (holding) => {
                                    const symbol =
                                        holding.market.split(
                                            '-',
                                        )[1];

                                    const isProfit =
                                        holding.profitLoss >=
                                        0;

                                    const profitClassName =
                                        isProfit
                                            ? 'text-red-400'
                                            : 'text-blue-400';

                                    return (
                                        <li
                                            key={
                                                holding.id
                                            }
                                            className="grid grid-cols-[130px_1fr_1fr_1fr_1fr_1fr] items-center border-b border-white/5 px-5 py-4 text-sm last:border-b-0"
                                        >
                                            <div>
                                                <p className="font-medium text-white">
                                                    {
                                                        symbol
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-white/30">
                                                    {
                                                        holding.market
                                                    }
                                                </p>
                                            </div>

                                            <span className="text-right text-white/70">
                                                {formatQuantity(
                                                    holding.quantity,
                                                )}
                                            </span>

                                            <span className="text-right text-white/60">
                                                {formatKrw(
                                                    holding.averagePrice,
                                                )}{' '}
                                                KRW
                                            </span>

                                            <span className="text-right text-white/70">
                                                {formatKrw(
                                                    holding.currentPrice,
                                                )}{' '}
                                                KRW
                                            </span>

                                            <span className="text-right text-white/80">
                                                {formatKrw(
                                                    holding.valuationAmount,
                                                )}{' '}
                                                KRW
                                            </span>

                                            <div
                                                className={[
                                                    'text-right',
                                                    profitClassName,
                                                ].join(
                                                    ' ',
                                                )}
                                            >
                                                <p>
                                                    {isProfit
                                                        ? '+'
                                                        : ''}
                                                    {formatKrw(
                                                        holding.profitLoss,
                                                    )}{' '}
                                                    KRW
                                                </p>

                                                <p className="mt-1 text-xs">
                                                    {isProfit
                                                        ? '+'
                                                        : ''}
                                                    {holding.profitRate.toFixed(
                                                        2,
                                                    )}
                                                    %
                                                </p>
                                            </div>
                                        </li>
                                    );
                                },
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}
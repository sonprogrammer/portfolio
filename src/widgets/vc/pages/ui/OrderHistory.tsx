'use client';

import { format } from 'date-fns';

import { useVcGuestSession } from '@/features/vc/guest/model';
import { useGetAllOrder } from '@/features/vc/order/model/useGetAllOrder';
import { useVcTickers } from '@/features/vc/market/model';
import { useMemo } from 'react';
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

export function OrderHistoryPage() {

    const { data: userInfo, isPending: isGuestPending } = useVcGuestSession()
    const { tickers } = useVcTickers();

    const koreanNameOb = useMemo(
        () =>
            Object.fromEntries(
                tickers.map(ticker => [
                    ticker.market,
                    ticker.koreanName,
                ]),
            ),
        [tickers],
    );

    const user = userInfo?.guest
    const guestId = user?.id ?? '';

    const { data, isPending: isOrdersPending, isError, error } = useGetAllOrder({ guestId, enabled: !!user });

    const orders = data?.orders ?? [];

    const isPending =
        isGuestPending ||
        (!!user && isOrdersPending);

    if (isPending) {
        return (
            <div className="flex min-h-125 animate-pulse items-center justify-center text-sm text-white/40">
                거래내역을 불러오는 중입니다.
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-125 items-center justify-center rounded-3xl border border-white/10 bg-[#111318] text-sm text-white/40">
                게스트 로그인 후 거래내역을
                확인할 수 있습니다.
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-125 items-center justify-center rounded-3xl border border-white/10 bg-[#111318] px-5 text-center text-sm text-red-400">
                {error instanceof Error
                    ? error.message
                    : '거래내역 조회에 실패했습니다.'}
            </div>
        );
    }

    return (
        <main className="w-full min-w-0 max-w-full space-y-4 sm:space-y-5">
            <header>
                <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
                    거래내역
                </h1>
                <p className="text-xs text-white/40 sm:text-sm">
                    지금까지 체결된 모든 주문내역
                </p>

            </header>

            <section className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111318] sm:rounded-3xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
                    <h2 className="text-sm font-medium text-white sm:text-base">
                        전체 체결 내역
                    </h2>

                    <span className="text-xs text-white/30">
                        총 {orders.length}건
                    </span>
                </div>

                {orders.length === 0 ? (
                    <div className="flex h-64 items-center justify-center px-4 text-center text-sm text-white/30">
                        아직 체결된 거래가 없습니다.
                    </div>
                ) : (
                    <>
                        <div className="lg:hidden">
                            {orders.map(order => {
                                const isBuy = order.type === 'buy';
                                const symbol = order.market.split('-')[1];
                                const koreanName = koreanNameOb[order.market] ?? symbol;

                                return (
                                    <div
                                        key={order.id}
                                        className="border-b border-white/5 p-4 last:border-b-0 sm:p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-white">
                                                        {koreanName}
                                                    </p>

                                                    <span
                                                        className={
                                                            isBuy
                                                                ? 'text-xs font-medium text-red-400'
                                                                : 'text-xs font-medium text-blue-400'
                                                        }
                                                    >
                                                        {isBuy ? '매수' : '매도'}
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-xs text-white/30">
                                                    {order.market}
                                                </p>
                                            </div>

                                            <time
                                                dateTime={order.createdAt}
                                                className="shrink-0 text-[11px] text-white/30 sm:text-xs"
                                            >
                                                {format(
                                                    new Date(order.createdAt),
                                                    'yyyy.MM.dd HH:mm',
                                                )}
                                            </time>
                                        </div>

                                        <div className="my-4 border-t border-white/10" />

                                        <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
                                            <div>
                                                <p className="text-[11px] text-white/30">
                                                    체결가
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-white/70 sm:text-sm">
                                                    {formatKrw(order.executedPrice)} KRW
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[11px] text-white/30">
                                                    체결 수량
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">
                                                    {formatQuantity(order.executedQuantity)}
                                                </p>
                                            </div>

                                            <div className="col-span-2 sm:col-span-1">
                                                <p className="text-[11px] text-white/30">
                                                    거래 금액
                                                </p>

                                                <p className="mt-1 text-xs font-medium text-white/80 sm:text-sm">
                                                    {formatKrw(order.executedAmount)} KRW
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="hidden w-full min-w-0 max-w-full overflow-x-auto lg:block">
                            <div className="min-w-225">
                                <div className="grid grid-cols-[130px_100px_80px_1fr_1fr_1fr] border-b border-white/10 px-5 py-3 text-xs text-white/30">
                                    <span>체결 시간</span>
                                    <span>코인</span>
                                    <span>구분</span>

                                    <span className="text-right">
                                        체결가
                                    </span>

                                    <span className="text-right">
                                        체결 수량
                                    </span>

                                    <span className="text-right">
                                        거래 금액
                                    </span>
                                </div>

                                <ul>
                                    {orders.map(order => {
                                        const isBuy = order.type === 'buy';
                                        const symbol = order.market.split('-')[1];

                                        return (
                                            <li
                                                key={order.id}
                                                className="grid grid-cols-[130px_100px_80px_1fr_1fr_1fr] items-center border-b border-white/5 px-5 py-4 text-sm last:border-b-0"
                                            >
                                                <time
                                                    dateTime={order.createdAt}
                                                    className="text-xs text-white/40"
                                                >
                                                    {format(
                                                        new Date(order.createdAt),
                                                        'yyyy.MM.dd HH:mm',
                                                    )}
                                                </time>

                                                <div>
                                                    <p className="font-medium text-white">
                                                        {symbol}
                                                    </p>

                                                    <p className="mt-1 text-xs text-white/30">
                                                        {order.market}
                                                    </p>
                                                </div>

                                                <span
                                                    className={
                                                        isBuy
                                                            ? 'font-medium text-red-400'
                                                            : 'font-medium text-blue-400'
                                                    }
                                                >
                                                    {isBuy ? '매수' : '매도'}
                                                </span>

                                                <span className="text-right text-white/70">
                                                    {formatKrw(order.executedPrice)} KRW
                                                </span>

                                                <span className="text-right text-white/60">
                                                    {formatQuantity(order.executedQuantity)}
                                                </span>

                                                <span className="text-right text-white/80">
                                                    {formatKrw(order.executedAmount)} KRW
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}
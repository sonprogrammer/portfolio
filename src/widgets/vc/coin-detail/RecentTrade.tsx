'use client'

import { useVcGuestSession } from "@/features/vc/guest/model"
import { useGetOrder } from "@/features/vc/order/model/useGetOrder"
import { format } from "date-fns";


interface RecentTradeProps{
    market: string;
}

function formatKrw(value: number){
    return Math.floor(value).toLocaleString('ko-KR')
}

function formatQuantity(value: number) {
    return value.toLocaleString('ko-KR', {
        maximumFractionDigits: 8,
    });
}



export function RecentTrade({market}: RecentTradeProps) {
    const { data: userInfo, isPending: isGuestPending} = useVcGuestSession()

    const user = userInfo?.guest
    const guestId = user?.id ?? ''

    const {data, isPending: isOrderPending, isError, error} = useGetOrder({guestId, market, limit: 10, enabled: !!user})

    const orders = data?.orders ?? []

    const isPending = isGuestPending || (!!user && isOrderPending)

    return (
        <div className="rounded-3xl border border-white/10 bg-[#111318]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="font-medium text-white">
                    최근 거래
                </h2>

                {orders.length > 0 && (
                    <span className="text-xs text-white/30">
                        최근 {orders.length}건
                    </span>
                )}
            </div>

            {isPending ? (
                <div className="flex h-48 animate-pulse items-center justify-center text-sm text-white/30">
                    거래내역을 불러오는 중입니다.
                </div>
            ) : !user ? (
                <div className="flex h-48 items-center justify-center text-sm text-white/30">
                    게스트 로그인 후 거래내역을
                    확인할 수 있습니다.
                </div>
            ) : isError ? (
                <div className="flex h-48 items-center justify-center px-5 text-center text-sm text-red-400">
                    {error instanceof Error
                        ? error.message
                        : '거래내역 조회에 실패했습니다.'}
                </div>
            ) : orders.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-sm text-white/30">
                    아직 체결된 거래가 없습니다.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="min-w-175">
                        <div className="grid grid-cols-[70px_1fr_1fr_1fr_100px] border-b border-white/10 px-5 py-3 text-xs text-white/30">
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

                            <span className="text-right">
                                체결 시간
                            </span>
                        </div>

                        <ul>
                            {orders.map((order) => {
                                const isBuy = order.type === 'buy';

                                return (
                                    <li
                                        key={order.id}
                                        className="grid grid-cols-[70px_1fr_1fr_1fr_100px] items-center border-b border-white/5 px-5 py-3 text-sm last:border-b-0"
                                    >
                                        <span
                                            className={
                                                isBuy
                                                    ? 'font-medium text-red-400'
                                                    : 'font-medium text-blue-400'
                                            }
                                        >
                                            {isBuy ? '매수' : '매도'}
                                        </span>

                                        <span className="text-right text-white/75">
                                            {formatKrw(order.executedPrice)}{' '}
                                            KRW
                                        </span>

                                        <span className="text-right text-white/60">
                                            {formatQuantity(order.executedQuantity)}
                                        </span>

                                        <span className="text-right text-white/60">
                                            {formatKrw(order.executedAmount)}{' '}
                                            KRW
                                        </span>

                                        <time
                                            dateTime={order.createdAt}
                                            className="text-right text-xs text-white/35"
                                        >
                                            {format(new Date(order.createdAt), 'MM.dd HH:mm')}
                                        </time>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
import { useVcOrderbook } from "@/entities/vc/orderbook/model";
import { VcOrderbookUnit } from "@/entities/vc/orderbook/model/orderbookTypes";


interface OrderbookItem {
    price: number;
    size: number;
}

function formatPrice(
    price: number,
) {
    return price.toLocaleString(
        'ko-KR',
        {
            maximumFractionDigits:
                price >= 1_000 ? 0 : 8,
        },
    );
}

function formatQuantity(
    quantity: number,
) {
    return quantity.toLocaleString(
        'ko-KR',
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
        },
    );
}

export function CoinOrderbook({ market, currentPrice }: { market: string, currentPrice: number }) {

    const {
        orderbook,
        isLoading,
        error,
        retry
    } = useVcOrderbook({ market })
    if (isLoading) {
        return (
            <OrderbookContainer>
                <div className="flex h-155 items-center justify-center">
                    <p className="animate-pulse text-sm text-white/35">
                        실시간 호가를 불러오는
                        중입니다.
                    </p>
                </div>
            </OrderbookContainer>
        );
    }

    if (error || !orderbook) {
        return (
            <OrderbookContainer>
                <div className="flex h-155 flex-col items-center justify-center gap-4 px-4 text-center">
                    <p className="text-sm text-red-400">
                        {error ??
                            '호가 정보를 불러오지 못했습니다.'}
                    </p>

                    <button
                        type="button"
                        onClick={retry}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                        다시 시도
                    </button>
                </div>
            </OrderbookContainer>
        );
    }

    const maxSize = Math.max(
        ...orderbook.units.flatMap(
            (unit: VcOrderbookUnit) => [
                unit.askSize,
                unit.bidSize,
            ],
        ),
        1,
    );

    const asks: OrderbookItem[] = orderbook.units
        .map((unit: VcOrderbookUnit) => ({
            price: unit.askPrice,
            size: unit.askSize,
        }))
        .reverse();

    const bids: OrderbookItem[] = orderbook.units.map(
        (unit: VcOrderbookUnit) => ({
            price: unit.bidPrice,
            size: unit.bidSize,
        }),
    );

    return (
        <OrderbookContainer>
            <div className="grid grid-cols-[1fr_1fr] border-b border-white/10 px-4 py-3 text-xs text-white/35">
                <span>가격(KRW)</span>

                <span className="text-right">
                    수량
                </span>
            </div>

            <div>
                {asks.map((ask) => (
                    <OrderbookRow
                        key={`ask-${ask.price}`}
                        type="ask"
                        price={ask.price}
                        size={ask.size}
                        maxSize={maxSize}
                    />
                ))}
            </div>

            <div className="border-y border-white/10 bg-white/2.5 px-4 py-4">
                <p className="text-xs text-white/35">
                    현재가
                </p>

                <p className="mt-1 text-xl font-semibold text-white">
                    {formatPrice(
                        currentPrice,
                    )}
                    <span className="ml-1 text-xs font-normal text-white/35">
                        KRW
                    </span>
                </p>

                <div className="mt-3 flex justify-between text-xs">
                    <div>
                        <p className="text-white/30">
                            총 매도 잔량
                        </p>

                        <p className="mt-1 text-blue-300">
                            {formatQuantity(
                                orderbook.totalAskSize,
                            )}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-white/30">
                            총 매수 잔량
                        </p>

                        <p className="mt-1 text-red-300">
                            {formatQuantity(
                                orderbook.totalBidSize,
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                {bids.map((bid) => (
                    <OrderbookRow
                        key={`bid-${bid.price}`}
                        type="bid"
                        price={bid.price}
                        size={bid.size}
                        maxSize={maxSize}
                    />
                ))}
            </div>

            <div className="border-t border-white/10 px-4 py-3 text-right text-[11px] text-white/25">
                {new Date(
                    orderbook.timestamp,
                ).toLocaleTimeString(
                    'ko-KR',
                )}{' '}
                업데이트
            </div>
        </OrderbookContainer>
    );
}

interface OrderbookRowProps {
    type: 'ask' | 'bid';

    price: number;
    size: number;
    maxSize: number;
}

function OrderbookRow({
    type,
    price,
    size,
    maxSize,
}: OrderbookRowProps) {
    const ratio = Math.min(
        (size / maxSize) * 100,
        100,
    );

    const isAsk = type === 'ask';

    return (
        <button
            type="button"
            className="relative grid h-8 w-full grid-cols-[1fr_1fr] items-center overflow-hidden px-4 text-xs transition hover:bg-white/4"
        >
            <span
                aria-hidden
                className={
                    isAsk
                        ? 'absolute inset-y-0 right-0 bg-blue-500/10'
                        : 'absolute inset-y-0 left-0 bg-red-500/10'
                }
                style={{
                    width: `${ratio}%`,
                }}
            />

            <span
                className={
                    isAsk
                        ? 'relative z-10 text-left font-medium text-blue-300'
                        : 'relative z-10 text-left font-medium text-red-300'
                }
            >
                {formatPrice(price)}
            </span>

            <span className="relative z-10 text-right text-white/55">
                {formatQuantity(size)}
            </span>
        </button>
    );
}

function OrderbookContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
            <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-medium text-white">
                    실시간 호가
                </h2>

                <p className="mt-1 text-xs text-white/35">
                    업비트 5호가 기준
                </p>
            </div>

            {children}
        </section>
    );
}
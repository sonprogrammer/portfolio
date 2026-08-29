'use client';

import {
    type FormEvent,
    useMemo,
    useState,
} from 'react';

import { useVcGuestSession } from '@/features/vc/guest/model';
import { useVcOrderbook } from '@/entities/vc/orderbook/model';
import { useMarketOrder } from '@/features/vc/order/model/useMarketOrder';
import { useCoinHolding } from '@/features/vc/holding/model';
import { RealtimeUnavailableModal } from '@/shared/ui/unavailable-modal';
import { ModalPortal } from '@/shared/ui/modal';

type OrderSide = 'buy' | 'sell';

interface CoinTradeFormProps {
    market: string;
}

const PERCENT_OPTIONS = [
    { label: '10%', value: 0.1 },
    { label: '25%', value: 0.25 },
    { label: '50%', value: 0.5 },
    { label: '최대', value: 1 },
] as const;

function formatKrw(value: number) {
    return Math.floor(value).toLocaleString('ko-KR');
}

function floorCoinQuantity(value: number) {
    const factor = 10 ** 8;

    return Math.floor(value * factor) / factor;
}

export function CoinTradeForm({ market }: CoinTradeFormProps) {
    const [openModal, setOpenModal] = useState(true)
    const [type, setType] = useState<OrderSide>('buy');
    const [inputValue, setInputValue] = useState('');

    const { data: userInfo, isPending: isGuestPending } = useVcGuestSession();

    const user = userInfo?.guest

    const guestId = user?.id ?? '';

    const { data: holdingData, isPending: isHoldingPending, } = useCoinHolding({ guestId, market, enabled: !!user });

    const { orderbook, isLoading: isOrderbookLoading, realtimeUnavailable } = useVcOrderbook({ market });

    const orderMutation = useMarketOrder({ guestId, market });

    const symbol = market.replace('KRW-', '');

    const krwBalance = user?.krwBalance ?? 0;

    const holdingQuantity = holdingData?.holding?.quantity ?? 0;

    const bestUnit = orderbook?.units[0];

    const bestAskPrice = bestUnit?.askPrice ?? 0;
    const bestBidPrice = bestUnit?.bidPrice ?? 0;

    const parsedValue = Number(inputValue);

    const isValidValue =
        Number.isFinite(parsedValue) &&
        parsedValue > 0;

    const isBuy = type === 'buy';

    const estimatedValue = useMemo(() => {
        if (!isValidValue) {
            return 0;
        }

        if (isBuy) {
            if (bestAskPrice <= 0) {
                return 0;
            }

            return floorCoinQuantity(
                parsedValue / bestAskPrice,
            );
        }

        if (bestBidPrice <= 0) {
            return 0;
        }

        return Math.floor(
            parsedValue * bestBidPrice,
        );
    }, [
        isBuy,
        isValidValue,
        parsedValue,
        bestAskPrice,
        bestBidPrice,
    ]);

    const isOverBalance =
        isBuy &&
        parsedValue > krwBalance;

    const isOverHolding =
        !isBuy &&
        parsedValue > holdingQuantity;

    const isLoading =
        isGuestPending ||
        isHoldingPending ||
        isOrderbookLoading;

    const isSubmitDisabled =
        !user ||
        !isValidValue ||
        isOverBalance ||
        isOverHolding ||
        orderMutation.isPending ||
        bestAskPrice <= 0 ||
        bestBidPrice <= 0;

    const handleSideChange = (
        nextSide: OrderSide,
    ) => {
        setType(nextSide);
        setInputValue('');
        orderMutation.reset();
    };

    const handlePercentClick = (
        percent: number,
    ) => {
        if (isBuy) {
            const orderAmount = Math.floor(
                krwBalance * percent,
            );

            setInputValue(String(orderAmount));

            return;
        }

        const quantity = floorCoinQuantity(
            holdingQuantity * percent,
        );

        setInputValue(String(quantity));
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (
            !user ||
            !isValidValue ||
            isOverBalance ||
            isOverHolding
        ) {
            return;
        }

        try {
            if (isBuy) {
                await orderMutation.mutateAsync({
                    type: 'buy',
                    orderAmount: Math.floor(
                        parsedValue,
                    ),
                });
            } else {
                await orderMutation.mutateAsync({
                    type: 'sell',
                    quantity: floorCoinQuantity(
                        parsedValue,
                    ),
                });
            }

            setInputValue('');
        } catch {
            // 에러 메시지는 orderMutation.error로 표시
        }
    };

    if (realtimeUnavailable && openModal) {
        return (
            <ModalPortal isOpen={openModal}>
                <RealtimeUnavailableModal onClose={() => setOpenModal(false)} />
            </ModalPortal>
        )
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
            <div className="grid grid-cols-2 border-b border-white/10">
                <button
                    type="button"
                    onClick={() =>
                        handleSideChange('buy')
                    }
                    className={[
                        'py-4 text-sm font-medium transition',
                        isBuy
                            ? 'border-b-2 border-red-400 text-red-400'
                            : 'text-white/40 hover:text-red-400',
                    ].join(' ')}
                >
                    매수
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleSideChange('sell')
                    }
                    className={[
                        'py-4 text-sm font-medium transition',
                        !isBuy
                            ? 'border-b-2 border-blue-400 text-blue-400'
                            : 'text-white/40 hover:text-blue-400',
                    ].join(' ')}
                >
                    매도
                </button>
            </div>

            <div className="space-y-4 p-5">
                {isLoading ? (
                    <div className="flex h-40 items-center justify-center text-sm text-white/35">
                        주문 정보를 불러오는 중입니다.
                    </div>
                ) : !user ? (
                    <button
                        type="button"
                        disabled
                        className={[
                            'h-12 w-full cursor-not-allowed rounded-xl',
                            isBuy
                                ? 'bg-red-500/40'
                                : 'bg-blue-500/40',
                            'text-sm font-medium text-white/50',
                        ].join(' ')}
                    >
                        게스트 로그인 후{' '}
                        {isBuy ? '매수' : '매도'}
                    </button>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-white/40">
                                주문 가능
                            </span>

                            <span className="font-medium text-white/80">
                                {isBuy
                                    ? `${formatKrw(
                                        krwBalance,
                                    )} KRW`
                                    : `${holdingQuantity.toFixed(8)} ${symbol}`}
                            </span>
                        </div>

                        <div>
                            <label
                                htmlFor="order-value"
                                className="mb-2 block text-xs text-white/40"
                            >
                                {isBuy
                                    ? '주문 금액'
                                    : '매도 수량'}
                            </label>

                            <div
                                className={[
                                    'flex items-center rounded-xl border bg-white/5 px-4',
                                    isBuy
                                        ? 'border-white/10 focus-within:border-red-400/60'
                                        : 'border-white/10 focus-within:border-blue-400/60',
                                ].join(' ')}
                            >
                                <input
                                    id="order-value"
                                    type="number"
                                    min="0"
                                    step={
                                        isBuy
                                            ? '1'
                                            : '0.00000001'
                                    }
                                    value={inputValue}
                                    onChange={(event) =>
                                        setInputValue(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="0"
                                    className="h-12 min-w-0 flex-1 bg-transparent text-right text-sm text-white outline-none placeholder:text-white/20"
                                />

                                <span className="ml-2 text-sm text-white/35">
                                    {isBuy
                                        ? 'KRW'
                                        : symbol}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {PERCENT_OPTIONS.map(
                                ({ label, value }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() =>
                                            handlePercentClick(
                                                value,
                                            )
                                        }
                                        className="rounded-lg border border-white/10 py-2 text-xs text-white/45 transition hover:bg-white/10 hover:text-white"
                                    >
                                        {label}
                                    </button>
                                ),
                            )}
                        </div>

                        <div className="space-y-2 rounded-xl bg-white/5 p-3 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-white/35">
                                    예상 체결가
                                </span>

                                <span className="text-white/70">
                                    {formatKrw(
                                        isBuy
                                            ? bestAskPrice
                                            : bestBidPrice,
                                    )}{' '}
                                    KRW
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-white/35">
                                    {isBuy
                                        ? '예상 매수 수량'
                                        : '예상 주문 금액'}
                                </span>

                                <span className="text-white/70">
                                    {isBuy
                                        ? `${estimatedValue.toFixed(
                                            8,
                                        )} ${symbol}`
                                        : `${formatKrw(
                                            estimatedValue,
                                        )} KRW`}
                                </span>
                            </div>
                        </div>

                        {isOverBalance && (
                            <p className="text-xs text-red-400">
                                주문 가능한 원화가
                                부족합니다.
                            </p>
                        )}

                        {isOverHolding && (
                            <p className="text-xs text-blue-400">
                                주문 가능한 코인 수량이
                                부족합니다.
                            </p>
                        )}

                        {orderMutation.isError && (
                            <p className="text-xs text-red-400">
                                {orderMutation.error
                                    instanceof Error
                                    ? orderMutation.error
                                        .message
                                    : '주문 처리에 실패했습니다.'}
                            </p>
                        )}

                        {orderMutation.isSuccess && (
                            <div className="rounded-xl bg-white/5 p-3 text-xs">
                                <p className="font-medium text-white/80">
                                    {orderMutation.data
                                        .type === 'buy'
                                        ? '매수가 체결되었습니다.'
                                        : '매도가 체결되었습니다.'}
                                </p>

                                <p className="mt-1 text-white/40">
                                    체결가{' '}
                                    {formatKrw(
                                        orderMutation.data
                                            .executedPrice,
                                    )}
                                    원 ·{' '}
                                    {orderMutation.data.executedQuantity.toFixed(
                                        8,
                                    )}{' '}
                                    {symbol}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={
                                isSubmitDisabled
                            }
                            className={[
                                'h-12 w-full rounded-xl text-sm font-medium text-white transition',
                                isSubmitDisabled
                                    ? 'cursor-not-allowed bg-white/10 text-white/30'
                                    : isBuy
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-blue-500 hover:bg-blue-600',
                            ].join(' ')}
                        >
                            {orderMutation.isPending
                                ? '주문 처리 중...'
                                : isBuy
                                    ? '시장가 매수'
                                    : '시장가 매도'}
                        </button>
                    </form>
                )}

                <p className="text-center text-xs leading-5 text-white/30">
                    포트폴리오 체험 버전에서는
                    시장가 매매만 지원합니다.
                </p>
            </div>
        </div>
    );
}

import { VC_CANDLE_UNITS, type VcCandle, type VcCandlePage, type VcCandleUnit } from "@/entities/vc/coin/model";
import { NextRequest, NextResponse } from "next/server";

const UPBIT_API_URL = 'https://api.upbit.com/v1/candles/minutes'

const CANDLE_COUNT = 200;

interface UpbitMinuteCandle {
    market: string;

    candle_date_time_utc: string;
    candle_date_time_kst: string;

    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;

    timestamp: number;

    candle_acc_trade_price: number;
    candle_acc_trade_volume: number;

    unit: number;
}

function isCandleUnit(
    value: number,
): value is VcCandleUnit {
    return VC_CANDLE_UNITS.includes(
        value as VcCandleUnit,
    );
}

function isValidMarket(market: string) {
    return /^KRW-[A-Z0-9]+$/.test(market);
}

function normalizeUtcDateTime(value: string) {
    const hasTimezone =
        value.endsWith('Z') ||
        /[+-]\d{2}:\d{2}$/.test(value);

    return hasTimezone ? value : `${value}Z`;
}

function toUnixTimestamp(value: string) {
    const date = new Date(
        normalizeUtcDateTime(value),
    );

    return Math.floor(date.getTime() / 1000);
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams

    const market = (searchParams.get('market') ?? '').toUpperCase()

    const unit = Number(searchParams.get('unit'))

    const to = searchParams.get('to') ?? undefined

    if (!isValidMarket(market)) {
        return NextResponse.json({ message: '없는 마켓입니다' }, { status: 400 })
    }
    if (!isCandleUnit(unit)) {
        return NextResponse.json(
            {
                message:
                    '지원하지 않는 캔들 단위입니다.',
            },
            {
                status: 400,
            },
        );
    }

    if (
        to &&
        Number.isNaN(new Date(to).getTime())
    ) {
        return NextResponse.json(
            {
                message:
                    '올바르지 않은 조회 시각입니다.',
            },
            {
                status: 400,
            },
        );
    }

    const upbitSearchParams =
        new URLSearchParams({
            market,
            count: String(CANDLE_COUNT),
        });

    if (to) {
        upbitSearchParams.set('to', to);
    }

    const res = await fetch(`${UPBIT_API_URL}/${unit}?${upbitSearchParams.toString()}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        cache: 'no-store'
    })

    if (!res.ok) {
        const errorBody =
            await res.text();

        console.error(
            '[VC Candle API]',
            res.status,
            errorBody,
        )
        return NextResponse.json(
            {
                message:
                    '업비트 캔들 조회에 실패했습니다.',
            },
            {
                status: 502,
            },
        )
    }

    const rawCandles = (await res.json()) as UpbitMinuteCandle[]

    const candles: VcCandle[] =
        rawCandles
            .map((candle) => ({
                time: toUnixTimestamp(
                    candle.candle_date_time_utc,
                ),

                open: candle.opening_price,
                high: candle.high_price,
                low: candle.low_price,
                close: candle.trade_price,

                volume:
                    candle.candle_acc_trade_volume,

                tradeAmount:
                    candle.candle_acc_trade_price,
            }))
            .sort(
                (first, second) =>
                    first.time - second.time,
            )

    const oldestCandle =
        rawCandles.at(-1);

    const nextTo = oldestCandle
        ? new Date(
            normalizeUtcDateTime(
                oldestCandle.candle_date_time_utc,
            ),
        ).toISOString()
        : null;

    const result: VcCandlePage = {
        candles,
        nextTo,
        hasMore:
            rawCandles.length ===
            CANDLE_COUNT,
    };

    return NextResponse.json(result);
}
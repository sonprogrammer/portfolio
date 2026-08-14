// features/vc/holding/api/getVcHoldings.ts

import type {
    GetCoinHoldingRes,
} from '../model/types';

interface GetVcHoldingsParams {
    guestId: string;
    market: string;
    signal?: AbortSignal;
}

interface ErrorResponse {
    message?: string;
}

export async function getCoinHolding({
    guestId,
    market,
    signal,
}: GetVcHoldingsParams): Promise<GetCoinHoldingRes> {
    const searchParams = new URLSearchParams({
        guestId,
        market
    });

    const response = await fetch(
        `/api/vc/holdings?${searchParams.toString()}`,
        {
            method: 'GET',
            signal,
        },
    );

    const data = (await response.json()) as
        | GetCoinHoldingRes
        | ErrorResponse;

    if (!response.ok) {
        throw new Error(
            'message' in data && data.message
                ? data.message
                : '보유자산 조회에 실패했습니다.',
        );
    }

    return data as GetCoinHoldingRes;
}
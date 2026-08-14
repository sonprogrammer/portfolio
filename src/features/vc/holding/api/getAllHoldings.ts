import type {
    GetAllHoldingsRes,
} from '../model/types';

interface GetAllHoldingsParams {
    guestId: string;
    signal?: AbortSignal;
}

export async function getAllHoldings({
    guestId,
    signal,
}: GetAllHoldingsParams): Promise<GetAllHoldingsRes> {
    const searchParams = new URLSearchParams({
        guestId,
    });

    const response = await fetch(
        `/api/vc/holdings?${searchParams.toString()}`,
        {
            method: 'GET',
            signal,
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ??
                '전체 보유자산 조회에 실패했습니다.',
        );
    }

    return data;
}
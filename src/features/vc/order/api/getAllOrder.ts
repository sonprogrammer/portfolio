
import type {
    GetVcOrdersResponse,
} from '../model/types';

interface GetAllOrdersParams {
    guestId: string;
    signal?: AbortSignal;
}

interface ErrorResponse {
    message?: string;
}

export async function getAllOrder({guestId, signal}: GetAllOrdersParams): Promise<GetVcOrdersResponse> {
    const searchParams = new URLSearchParams({ guestId })

    const response = await fetch(`/api/vc/orders?${searchParams.toString()}`,
        {
            method: 'GET',
            signal,
        },
    );

    const data = (await response.json()) as
        | GetVcOrdersResponse
        | ErrorResponse;

    if (!response.ok) {
        throw new Error(
            'message' in data && data.message
                ? data.message
                : '전체 거래내역 조회에 실패했습니다.',
        );
    }

    return data as GetVcOrdersResponse;
}
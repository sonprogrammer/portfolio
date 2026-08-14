import { GetVcOrdersResponse } from './../model/types';

interface GetOrdersParams {
    guestId: string;
    market: string;
    limit?: number;
    signal?: AbortSignal;
}

interface ErrorResponse {
    message?: string;
}

export async function getOrder({guestId, market, limit=10, signal}: GetOrdersParams): Promise<GetVcOrdersResponse>{
    const searchParams = new URLSearchParams({guestId, market, limit: String(limit)})

    const res = await fetch(`/api/vc/orders?${searchParams.toString()}`,{
        method: 'GET',
        signal
    })

    const data = (await res.json()) as GetVcOrdersResponse | ErrorResponse

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '거래내역 조회 실패')
    }

    return data as GetVcOrdersResponse
}
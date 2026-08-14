
import type { VcCandlePage, VcCandleUnit } from '@/entities/vc/coin/model/candleTypes';

interface GetVcCandlesParams{
    market: string;
    unit: VcCandleUnit;
    to?: string;
    signal?: AbortSignal // Fetch요청 취소하는 거ㅣㅁ
}

export async function getCandle({market, unit, to, signal}: GetVcCandlesParams):Promise<VcCandlePage>{
    const searchParams = new URLSearchParams({market, unit: String(unit)})

    if(to){
        searchParams.set('to', to)
    }
    const res = await fetch(`/api/vc/candles?${searchParams.toString()}`, {
        method: 'GET',
        signal
    })

    if(!res.ok){
        const body = (await res.json().catch(() => null)) as { message?: string} | null
        throw new Error(body?.message ?? '캔들데이터 블러오지 못했습니다.')
        
    }

    return res.json()
    
}
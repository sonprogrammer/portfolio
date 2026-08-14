import { GetFuellyUserResponse } from './../../../../entities/fuelly/user/model/types';

export async function getFuellyUser({signal}: {signal?:AbortSignal}): Promise<GetFuellyUserResponse>{
    const res = await fetch('/api/fuelly/user', {
        method: 'GET',
        signal
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '사용자 조회 시패')
    }
    return data
}
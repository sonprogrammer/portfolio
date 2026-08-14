import { FuellyProfile, GetFuellyUserResponse } from '@/entities/fuelly/user/model/types';



export async function updateFuellyProfiles(payload: FuellyProfile): Promise<GetFuellyUserResponse>{
    const res = await fetch(`/api/fuelly/user`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message ?? '신체정보 저장에 실패했습니다.')
    }

    return data
}
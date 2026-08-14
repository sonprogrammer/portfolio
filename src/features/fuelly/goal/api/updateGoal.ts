import type { GetFuellyUserResponse } from "@/entities/fuelly/user/model/types";
import type { UpdateFuellyProfilePayload } from "@/features/fuelly/goal/model/types";

export async function updateGoal(payload: UpdateFuellyProfilePayload): Promise<GetFuellyUserResponse>{
    const res = await fetch('/api/fuelly/profile',{
        method: 'PATCH',
        headers: {
            'Contetn-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? 'failed to edit profile')
    }

    return data
}
import type { SaveFuellyFoodPayload } from "@/entities/fuelly/food/model/types";

export async function saveFood(payload: SaveFuellyFoodPayload){
    const res = await fetch('/api/fuelly/foods',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? 'failed to save')
    }

    return data
}
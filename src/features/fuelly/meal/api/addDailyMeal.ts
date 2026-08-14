import type { AddDailyMealPayload } from "@/features/fuelly/meal/model";

export async function addDailyMeal(payload: AddDailyMealPayload){
    const res = await fetch('/api/fuelly/meals/today',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? 'failed to add')
    }

    return data.userDailMeal


}
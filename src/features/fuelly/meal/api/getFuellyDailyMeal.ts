import type { GetFuellyDailyMealResponse } from "@/entities/fuelly/meal/model/types";

export async function getFuellyDailyMeal({signal} : {signal?: AbortSignal}):Promise<GetFuellyDailyMealResponse>{
    const res = await fetch(`/api/fuelly/meals/today`,{
        method: "GET",
        signal
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '식단 불러오기 실패')
    }

    return data.userDailyMeal
}
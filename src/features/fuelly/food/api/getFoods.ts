import type { GetFuellyFoodsRes } from "@/entities/fuelly/food/model/types";

export async function getFoods():Promise<GetFuellyFoodsRes>{
    const res = await fetch('/api/fuelly/foods')

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '음식 조회 실패 ')
    }

    return data
}
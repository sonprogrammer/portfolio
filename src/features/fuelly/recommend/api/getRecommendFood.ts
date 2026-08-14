import { RecommendFoodsPayload, RecommendFoodsRes } from './../model/types';

export async function getRecommendFood(payload: RecommendFoodsPayload): Promise<RecommendFoodsRes>{
    const res = await fetch('/api/fuelly/recommend',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? 'failed to recommend')
    }

    return data
}
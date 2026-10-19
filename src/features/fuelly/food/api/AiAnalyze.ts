export async function AiAnalyze(name: string){
    const res = await fetch('/api/fuelly/foods/ai',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? 'ai failed')
    }

    if(!data.isFood){
        throw new Error('정확한 음식명을 입력해주세요')
    }

    return data.food
}
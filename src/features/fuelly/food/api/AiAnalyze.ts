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

    return data.food
}
export async function deleteFood(foodId: string) {
    const res = await fetch('/api/fuelly/foods/',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foodId)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '삭제 실패')
    }

    return true
}
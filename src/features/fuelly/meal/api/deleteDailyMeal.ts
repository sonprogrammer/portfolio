export async function deleteDailyMeal(mealId: string){
    const res = await fetch('/api/fuelly/meals/today',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealId)
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message ?? '삭제 실패')
    }
    return data.userDailMeal
}
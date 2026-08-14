'use client'

import { FuellyDailyMealItem } from "@/entities/fuelly/meal/model/types"
import { TodayMealItem } from "@/entities/fuelly/meal/ui"
import { useDeleteDailyMeal, useGetFuellyDailyMeal } from "@/features/fuelly/meal/model"
import { ChevronDown, UtensilsCrossed } from "lucide-react"
import { useState } from "react"


export function TodayMealList() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: dailyMeal, isPending } = useGetFuellyDailyMeal()

    const { mutate: deleteDailyMeal, isPending: isDeleting } = useDeleteDailyMeal()

    console.log('dailymeal', dailyMeal)
    const meals = dailyMeal?.meals ?? []

    const groupFoods = meals.reduce((acc: Record<string, FuellyDailyMealItem & { quantity: number }>, cur: FuellyDailyMealItem) => {
        const key = cur.foodId || cur.foodName

        if (acc[key]) {
            acc[key].quantity += 1
        } else {
            acc[key] = { ...cur, quantity: 1 }
        }
        return acc
    }, {})
    const groupFoodsArray = Object.values(groupFoods)




    return (
        <section className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                    오늘 먹은 음식
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    오늘 식단에 추가한 음식입니다.
                </p>
            </div>

            {isPending ? (
                <p className="py-6 text-center text-sm text-gray-500">
                    식단을 불러오는 중입니다.
                </p>
            ) : meals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <UtensilsCrossed className="w-10 h-10 text-gray-700 mb-3" />
                    <p className="text-sm text-gray-500">아직 기록된 음식이 없어요</p>
                    <p className="text-xs text-gray-700 mt-1">오른쪽에서 음식을 추가해보세요</p>
                </div>
            ) : (
                <div className="border border-gray-800 rounded-xl overflow-hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-300">목록 보기</span>
                            <span className="text-xs bg-gray-700 text-gray-400 rounded-full px-2 py-0.5">{meals.length}개</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
                            {groupFoodsArray.map(
                                (meal) => (
                                    <TodayMealItem
                                        key={meal.id}
                                        id={meal.id}
                                        foodName={
                                            meal.foodName
                                        }
                                        calories={
                                            meal.calories
                                        }
                                        protein={
                                            meal.protein
                                        }
                                        unit={
                                            meal.unit
                                        }
                                        isDeleting={
                                            isDeleting
                                        }
                                        onDelete={
                                            deleteDailyMeal
                                        }
                                        quantity={meal.quantity}
                                    />
                                ),
                            )}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
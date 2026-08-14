'use client'

import { useAddDailyMeal } from "@/features/fuelly/meal/model"
import { RecommendFood } from "@/features/fuelly/recommend/model/types"

interface RecommendFoodItemProps{
    food: RecommendFood
}

export function RecommendFoodItem({food}: RecommendFoodItemProps) {
    const { mutate: addDailyMeal, isPending} = useAddDailyMeal()
    
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-semibold text-white">
                        {food.name}
                    </p>

                    <div className="mt-1 flex gap-3 text-xs text-gray-400">
                        <span>
                            {food.calorie} kcal
                        </span>

                        <span>
                            단백질 {food.protein}g
                        </span>

                        <span>
                            {food.unit}
                        </span>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        {food.description}
                    </p>
                </div>

                <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                        addDailyMeal({
                            foodName: food.name,
                            calories: food.calorie,
                            protein: food.protein,
                            unit: food.unit,
                        })
                    }
                    className="shrink-0 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                    식단 추가
                </button>
            </div>
        </div>
  )
}
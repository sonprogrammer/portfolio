'use client'

import { useAddDailyMeal } from "@/features/fuelly/meal/model"
import { RecommendFood } from "@/features/fuelly/recommend/model/types"
import { Calendar } from "lucide-react"

interface RecommendFoodItemProps {
    food: RecommendFood
}

export function RecommendFoodItem({ food }: RecommendFoodItemProps) {
    const { mutate: addDailyMeal, isPending } = useAddDailyMeal()

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-4 text-xs sm:text-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-semibold text-white text-sm sm:text-base">
                        {food.name}
                    </p>

                    <div className="mt-1 flex gap-3 text-xs text-gray-400">
                        <span>
                            {food.calorie} kcal
                        </span>

                        <span>
                            |
                        </span>

                        <span>
                            {food.protein}g
                        </span>

                        <span>
                            |
                        </span>

                        <span>
                            {food.unit}
                        </span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-gray-500">
                        {food.description}
                    </p>
                </div>

                <button
                    type="button"
                    title="식단 추가"
                    disabled={isPending}
                    onClick={() =>
                        addDailyMeal({
                            foodName: food.name,
                            calories: food.calorie,
                            protein: food.protein,
                            unit: food.unit,
                        })
                    }
                    className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-blue-400/50 disabled:opacity-50"
                >
                    <Calendar className="h-5 w-5 text-blue-400" />
                </button>
            </div>
        </div>
    )
}
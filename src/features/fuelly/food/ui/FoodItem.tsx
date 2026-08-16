import type { FuellyFood } from "@/entities/fuelly/food/model/types"
import { Calendar,  Trash2 } from "lucide-react"

interface FoodItemProps {
    food: FuellyFood
    isAdding: boolean
    isDeleting: boolean
    isMine: boolean
    onAdd: (food: FuellyFood) => void
    onDelete: (foodId: string) => void
}


export function FoodItem({ food, isAdding, onAdd, isMine, onDelete, isDeleting }: FoodItemProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div>
                <p className="font-semibold text-white text-xs sm:text-base">
                    {food.name}
                </p>

                <div className="mt-1 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-400">
                    <span>
                        칼로리 {food.calorie} kcal
                    </span>

                    <span>
                        단백질 {food.protein}g
                    </span>

                    <span>
                        {food.unit}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    aria-label="오늘 식단 추가"
                    disabled={isAdding}
                    onClick={() =>onAdd(food)}
                    className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-blue-400/50 disabled:opacity-50"
                >
                    <Calendar className="h-5 w-5 text-blue-400" />
                </button>

                {isMine && (
                    <button
                        type="button"
                        aria-label="음식 삭제"
                        disabled={isDeleting}
                        onClick={() =>onDelete(food.id)}
                        className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-red-500/50 disabled:opacity-50"
                    >
                        <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                )}
            </div>
        </div>
    )
}
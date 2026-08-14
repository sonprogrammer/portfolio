import { Trash2 } from 'lucide-react'

interface TodayMealItemProps {
    id: string
    foodName: string
    calories: number
    protein: number
    unit: string
    isDeleting: boolean
    onDelete: (mealId: string) => void
    quantity: number
}

export function TodayMealItem({
    id,
    foodName,
    calories,
    protein,
    unit,
    isDeleting,
    onDelete,
    quantity,
}: TodayMealItemProps) {
    return (
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/3 px-4 py-3 transition-colors hover:bg-white/[0.05]">
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-gray-100">
                        {foodName}
                    </p>

                    {quantity > 1 && (
                        <span className="shrink-0 rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-gray-400">
                            ×{quantity}
                        </span>
                    )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span>
                        <span className="text-gray-400">
                            {calories}
                        </span>{' '}
                        kcal
                    </span>

                    <span className="h-3 w-px bg-white/10" />

                    <span>
                        단백질{' '}
                        <span className="text-gray-400">
                            {protein}g
                        </span>
                    </span>

                    <span className="h-3 w-px bg-white/10" />

                    <span>{unit}</span>
                </div>
            </div>

            <button
                type="button"
                disabled={isDeleting}
                onClick={() => onDelete(id)}
                aria-label={`${foodName} 삭제`}
                className="
                    ml-4 flex size-8 shrink-0 items-center justify-center
                    rounded-lg text-gray-500
                    opacity-100 transition-all duration-200
                    hover:bg-red-500/10 hover:text-red-400
                    disabled:cursor-not-allowed disabled:opacity-40
                    md:opacity-0 md:group-hover:opacity-100
                "
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
}


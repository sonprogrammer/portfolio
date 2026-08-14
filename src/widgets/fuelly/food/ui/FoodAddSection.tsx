'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useGetFoods } from '@/features/fuelly/food/model/useGetFoods'
import { AddFoodModal } from '@/features/fuelly/food/ui/AddFoodModal'

import { FoodList } from './FoodList'

type FoodTab =
    | 'system'
    | 'saved'

export function FoodAddSection() {
    const [activeTab, setActiveTab] = useState<FoodTab>('system')

    const [
        isAddModalOpen,
        setIsAddModalOpen,
    ] = useState(false)

    const {
        data,
        isPending,
    } = useGetFoods()


    const foods =
        data?.foods ?? []

    const systemFoods =
        foods.filter(
            (food) =>
                food.createdBy ===
                'system',
        )

    const savedFoods =
        foods.filter(
            (food) =>
                food.createdBy !==
                'system',
        )

    const displayedFoods =
        activeTab === 'system'
            ? systemFoods
            : savedFoods

  

    return (
        <>
            <section className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            음식 추가
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            음식 목록에서 선택하거나 직접 추가하세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setIsAddModalOpen(
                                true,
                            )
                        }
                        className="flex items-center gap-1.5 rounded-xl border border-gray-600 px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-gray-500 hover:bg-gray-700"
                    >
                        <Plus className="size-4" />

                        직접 추가
                    </button>
                </div>

                <div className="mt-5 flex gap-2 border-b border-gray-700">
                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab(
                                'system',
                            )
                        }
                        className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab ===
                            'system'
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        기본 음식
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setActiveTab(
                                'saved',
                            )
                        }
                        className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab ===
                            'saved'
                                ? 'border-emerald-500 text-emerald-400'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        내 음식
                    </button>
                </div>

                <div className="mt-4">
                    {isPending ? (
                        <p className="py-8 text-center text-sm text-gray-500">
                            음식을 불러오는 중입니다.
                        </p>
                    ) : (
                        <FoodList foods={displayedFoods} />
                    )}
                </div>
            </section>

            {isAddModalOpen && (
                <AddFoodModal
                isOpen={isAddModalOpen}
                    onClose={() =>
                        setIsAddModalOpen(
                            false,
                        )
                    }
                />
            )}
        </>
    )
}
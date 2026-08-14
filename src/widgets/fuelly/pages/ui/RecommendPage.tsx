'use client'

import type { FuellyProfile } from '@/entities/fuelly/user/model/types'

import { useRemainNutrition } from '@/features/fuelly/meal/model/useRemainNutrition'
import { useGetRecommendFood } from '@/features/fuelly/recommend/model'
import { RecommendFoodItem } from '@/features/fuelly/recommend/ui'


interface RecommendPageProps {
    profile: FuellyProfile
}

export function RecommendPage({
    profile,
}: RecommendPageProps) {
    const {
        remain,
        isPending:
            isNutritionPending,
    } = useRemainNutrition(profile)

    const {
        mutate: recommendMeals,
        data,
        isPending,
        error,
    } = useGetRecommendFood()

    const handleRecommend = () => {
        recommendMeals({
            remainCalorie:
                remain.calorie,
            remainProtein:
                remain.protein,
            goal: profile.goal,
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    AI 메뉴 추천
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    오늘 부족한 영양량을 기준으로 메뉴를 추천합니다.
                </p>
            </div>

            {!isNutritionPending && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                        <p className="text-sm text-gray-400">
                            남은 칼로리
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                            {remain.calorie} kcal
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-5">
                        <p className="text-sm text-gray-400">
                            남은 단백질
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                            {remain.protein}g
                        </p>
                    </div>
                </div>
            )}

            <button
                type="button"
                disabled={
                    isPending ||
                    isNutritionPending
                }
                onClick={
                    handleRecommend
                }
                className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
            >
                {isPending
                    ? 'AI가 추천 중...'
                    : '오늘 메뉴 추천받기'}
            </button>

            {error && (
                <p className="text-sm text-red-400">
                    {error.message}
                </p>
            )}

            {data?.meals && (
                <div className="space-y-3">
                    {data.meals.map(
                        (food) => (
                            <RecommendFoodItem
                                key={food.name}
                                food={food}
                            />
                        ),
                    )}
                </div>
            )}
        </div>
    )
}
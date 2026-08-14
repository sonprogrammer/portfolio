'use client'


import {  FuellyUser } from '@/entities/fuelly/user/model/types';
import { useRemainNutrition } from '@/features/fuelly/meal/model/useRemainNutrition';
import { AmountProgress } from '@/shared/fuelly/meal/ui/AmountProgress';
import { Beef, Flame } from 'lucide-react';

export function NutritionSummary({ user }: {user: FuellyUser}) {
    const { recommended, consumed, isPending, isError } = useRemainNutrition(user.profile)
    if (isPending) {
        return (
            <div>
                오늘 식단을 불러오는 중입니다.
            </div>
        )
    }


    if (isError) {
        return (
            <div>
                오늘 식단을 불러오지 못했습니다.
            </div>
        )
    }
    
    return (
        <section className="grid gap-4 md:grid-cols-2">
            <AmountProgress
                label="칼로리"
                currentAmount={consumed.calorie}
                targetAmount={recommended.calorie}
                unit="kcal"
                icon={
                    <Flame className="size-5 text-orange-400" />
                }
            />

            <AmountProgress
                label="단백질"
                currentAmount={consumed.protein}
                targetAmount={recommended.protein}
                unit="g"
                icon={
                    <Beef className="size-5 text-emerald-400" />
                }
            />
        </section>
    );
}


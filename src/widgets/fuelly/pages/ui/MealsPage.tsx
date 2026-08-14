import { FuellyProfile } from "@/entities/fuelly/user/model/types"
import { useRemainNutrition } from "@/features/fuelly/meal/model"
import { FoodAddSection } from "@/widgets/fuelly/food/ui"

import { TodayMealList } from "@/widgets/fuelly/meal/ui"
import { RemainNutrition } from "@/widgets/fuelly/meal/ui/RemainNutrition"

interface MealsPageProps{
  profile: FuellyProfile
}

export function MealsPage({profile}: MealsPageProps) {
  const { remain, exceed, isPending} = useRemainNutrition(profile)


  return (
    <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">
                    오늘 식단
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    오늘 먹은 음식과 남은 영양량을 확인하세요.
                </p>
            </div>

            {!isPending && (
              <RemainNutrition 
                remainCalorie={remain.calorie}
                remainProtein={remain.protein}
                exceedCalorie={exceed.calorie}
                exceedProtein={exceed.protein}
              />

            )}


            <TodayMealList />

            <FoodAddSection />
        </div>
  )
}
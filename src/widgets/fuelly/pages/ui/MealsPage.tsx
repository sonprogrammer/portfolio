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
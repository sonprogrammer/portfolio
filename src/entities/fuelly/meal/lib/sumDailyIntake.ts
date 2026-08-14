import type { FuellyDailyMealItem } from '../model/types'

interface DailyIntake {
    dailyCalories: number;
    dailyProteins: number
}

export function sumDailyIntake(meals: FuellyDailyMealItem[]): DailyIntake {
    return meals.reduce(
        (total, meal) => ({
            dailyCalories: total.dailyCalories + meal.calories,
            dailyProteins: total.dailyProteins + meal.protein
        }),
        {
            dailyCalories: 0,
            dailyProteins: 0,
        },
    )
}
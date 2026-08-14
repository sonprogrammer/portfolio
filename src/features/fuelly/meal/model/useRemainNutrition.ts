import { sumDailyIntake } from "@/entities/fuelly/meal/lib/sumDailyIntake";
import { calculateFuellyNutrition } from "@/entities/fuelly/user/lib/caculateNutrition";
import type { FuellyProfile } from "@/entities/fuelly/user/model/types";
import { useGetFuellyDailyMeal } from "@/features/fuelly/meal/model/useGetFuellyDailyMeal";

const EMPTY_NUTRITION = {
    recommended: {
        calorie: 0,
        protein: 0,
    },
    consumed: {
        calorie: 0,
        protein: 0,
    },
    remain: {
        calorie: 0,
        protein: 0,
    },
    exceed: {
        calorie: 0,
        protein: 0,
    },
}

export function useRemainNutrition(profile: FuellyProfile | null) {
    const { data, isPending, isError, error } = useGetFuellyDailyMeal({ enabled: Boolean(profile) })

    const meals = data?.meals ?? []

    const { dailyCalories, dailyProteins } = sumDailyIntake(meals)

    if (!profile) {
        return {
            ...EMPTY_NUTRITION,
            isPending: false,
            isError: false,
            error: null
        }
    }

    const { recommendedCalories, recommendedProteins } = calculateFuellyNutrition(profile)

    const remainCalories = Math.max(recommendedCalories - dailyCalories, 0)
    const remainProteins = Math.max(recommendedProteins - dailyProteins, 0)

    const exceededCalories = Math.max(dailyCalories - recommendedCalories, 0)

    const exceededProteins = Math.max(dailyProteins - recommendedProteins, 0)

    return {
        isPending, isError, error,
        recommended: {
            calorie: recommendedCalories,
            protein: recommendedProteins
        },
        consumed: {
            calorie: dailyCalories,
            protein: dailyProteins
        },
        remain: {
            calorie: remainCalories,
            protein: remainProteins
        },
        exceed: {
            calorie: exceededCalories,
            protein: exceededProteins
        }

    }
}
// entities/fuelly/user/lib/calculateFuellyNutrition.ts

import type {
    FuellyActivityLevel,
    FuellyProfile,
} from '../model/types';

export interface FuellyNutritionResult {
    BMR: number;
    TDEE: number;
    recommendedCalories: number;
    recommendedProteins: number;
}

const ACTIVITY_FACTOR_MAP: Record<
    FuellyActivityLevel,
    number
> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.73,
};

export function calculateFuellyNutrition(
    profile: FuellyProfile,
): FuellyNutritionResult {
    const {
        height,
        weight,
        gender,
        activityLevel,
        goal,
        age,
    } = profile;

    const BMR =
        gender === 'male'
            ? 10 * weight +
              6.25 * height -
              5 * age +
              5
            : 10 * weight +
              6.25 * height -
              5 * age -
              161;

    const activityFactor =
        ACTIVITY_FACTOR_MAP[activityLevel];

    const TDEE =
        BMR * activityFactor;

    let recommendedCalories = TDEE;

    if (goal === 'diet') {
        recommendedCalories -= 300;
    }

    if (goal === 'bulk') {
        recommendedCalories += 300;
    }

    const minimumCalories =
        gender === 'male'
            ? 1500
            : 1200;

    recommendedCalories = Math.max(
        recommendedCalories,
        minimumCalories,
    );

    let proteinPerKg = 1.2;

    if (goal === 'diet') {
        proteinPerKg = 1.8;
    }

    if (goal === 'bulk') {
        proteinPerKg = 2;
    }

    const recommendedProteins =
        weight * proteinPerKg;

    return {
        BMR: Math.round(BMR),
        TDEE: Math.round(TDEE),
        recommendedCalories: Math.round(
            recommendedCalories,
        ),
        recommendedProteins: Math.round(
            recommendedProteins,
        ),
    };
}
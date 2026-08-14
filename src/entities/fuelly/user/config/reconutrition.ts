
import type { FuellyActivityLevel, FuellyGoal, FuellyGender } from '../model/types';

export const FUELLY_ACTIVITY_MULTIPLIER: Record<FuellyActivityLevel,number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.73,
}

export const FUELLY_GOAL_CALORIE_ADJUSTMENT: Record<FuellyGoal,number> = {
    diet: -300,
    maintain: 0,
    bulk: 300,
};

export const FUELLY_PROTEIN_MULTIPLIER: Record<FuellyGoal,number> = {
    diet: 1.8,
    maintain: 1.2,
    bulk: 2,
};

export const FUELLY_MINIMUM_CALORIES: Record<FuellyGender,number> = {
    male: 1500,
    female: 1200,
};
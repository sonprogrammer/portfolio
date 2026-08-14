export interface FuellyDailyMealItem {
    id: string;
    foodId?: string
    foodName: string;
    calories: number;
    protein: number;
    amount: number;
    unit: string;
}

export interface GetFuellyDailyMealResponse {
    meals: FuellyDailyMealItem[];
}
export interface FuellyFood {
    id: string;
    name: string;
    protein: number;
    calorie: number;
    unit: string;
    createdBy: string
}

export interface GetFuellyFoodsRes{
    foods: FuellyFood[]
}

export interface SaveFuellyFoodPayload{
    name: string;
    protein: number;
    calorie: number;
    unit: string
}
import { FuellyGoal } from "@/entities/fuelly/user/model/types";

export interface RecommendFood{
    name: string;
    calorie: number;
    protein: number;
    unit: string;
    description: string
}

export interface RecommendFoodsPayload{
    remainCalorie: number;
    remainProtein: number;
    goal: FuellyGoal
}

export interface RecommendFoodsRes{
    meals: RecommendFood[]
}
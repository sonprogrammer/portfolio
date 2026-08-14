import { FuellyActivityLevel, FuellyGoal } from "@/entities/fuelly/user/model/types";

export interface FuellyGoalInfo {
    goal?: FuellyGoal
    weight?: number;
    activity?: FuellyActivityLevel
}
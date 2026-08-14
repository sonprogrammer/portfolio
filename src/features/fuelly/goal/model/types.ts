import { FuellyActivityLevel, FuellyGoal } from "@/entities/fuelly/user/model/types"

export type GoalEditType = 'weight' | 'goal'| 'activity'

export type UpdateFuellyProfilePayload = {
    type: 'goal'
    value: FuellyGoal
}|{
    type: 'weight'
    value: number
}|{
    type: 'activity'
    value: FuellyActivityLevel
}
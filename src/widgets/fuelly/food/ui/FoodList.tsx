import type { FuellyFood } from "@/entities/fuelly/food/model/types";
import { useGetFuellyUser } from "@/features/fuelly/auth/model/useGetFuellyUser";
import { useDeleteFood } from "@/features/fuelly/food/model";
import { FoodItem } from "@/features/fuelly/food/ui";
import { useAddDailyMeal } from "@/features/fuelly/meal/model";


interface FoodListProps {
    foods: FuellyFood[]
}

export function FoodList({ foods }: FoodListProps) {
     const { data: userInfo } = useGetFuellyUser()
    const { mutate: addDailyMeal, isPending: isAdding } = useAddDailyMeal()
    const { mutate: deleteFood, isPending: isDeleting } = useDeleteFood()

    const handleAddFood = (food: FuellyFood) => {
        addDailyMeal({
            foodId: food.id,
            foodName: food.name,
            calories: food.calorie,
            protein: food.protein,
            unit: food.unit
        })
    }

    const handleDeleteFood = (foodId: string) => {
        deleteFood(foodId)
    }
    const user = userInfo?.user

    const isMine = (createdBy?: string) => {
        return createdBy !== 'system' && createdBy === user?.id
    }


    if (foods.length === 0) {
        return (
            <p className="py-8 text-center text-sm text-gray-500">
                등록된 음식이 없습니다.
            </p>
        )
    }
    return (
        <div className="space-y-1">
            {foods.map((food) => (
                <FoodItem
                    key={food.id}
                    food={food}
                    isMine={isMine(food.createdBy ?? '')}
                    isAdding={isAdding}
                    isDeleting={isDeleting}
                    onDelete={handleDeleteFood}
                    onAdd={handleAddFood}
                />
            ))}
        </div>
    )
}
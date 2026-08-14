import { deleteDailyMeal } from "@/features/fuelly/meal/api";
import { fuellyMealQueryKeys } from "@/features/fuelly/meal/model/fuellyMealQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDailyMeal(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteDailyMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: fuellyMealQueryKeys.today()})
            toast.success('삭제 성공')
        }
    })
}
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { addDailyMeal } from "@/features/fuelly/meal/api";
import { fuellyMealQueryKeys } from "@/features/fuelly/meal/model/fuellyMealQueryKeys";
import { toast } from "sonner";

export function useAddDailyMeal(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addDailyMeal,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: fuellyMealQueryKeys.today()})
            toast.success('식단 추가')
        }
    })
}
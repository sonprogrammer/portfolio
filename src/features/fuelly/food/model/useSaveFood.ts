import { saveFood } from "@/features/fuelly/food/api";
import { fuellyFoodQueryKeys } from "@/features/fuelly/food/model/fuellyFoodQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveFood(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: saveFood,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:fuellyFoodQueryKeys.list()})
        }
    })
}
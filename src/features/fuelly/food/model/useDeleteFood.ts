import { deleteFood } from "@/features/fuelly/food/api";
import { fuellyFoodQueryKeys } from "@/features/fuelly/food/model/fuellyFoodQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteFood(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteFood,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: fuellyFoodQueryKeys.list()})
            toast.success('삭제 성공')
        }
    })
}
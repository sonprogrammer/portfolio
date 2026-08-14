import { getFoods } from "@/features/fuelly/food/api";
import { fuellyFoodQueryKeys } from "@/features/fuelly/food/model/fuellyFoodQueryKeys";
import { useQuery } from "@tanstack/react-query";

export function useGetFoods(){
    return useQuery({
        queryKey: fuellyFoodQueryKeys.list(),
        queryFn: getFoods,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
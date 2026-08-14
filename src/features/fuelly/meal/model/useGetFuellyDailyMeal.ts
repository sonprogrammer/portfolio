import { getFuellyDailyMeal } from "@/features/fuelly/meal/api/getFuellyDailyMeal";
import { fuellyMealQueryKeys } from "@/features/fuelly/meal/model/fuellyMealQueryKeys";
import { useQuery } from "@tanstack/react-query";

interface UseGetFuellyDailyMealParams{
    enabled?: boolean
}

export function useGetFuellyDailyMeal({enabled= true}: UseGetFuellyDailyMealParams={}){
    return useQuery({
        queryKey: fuellyMealQueryKeys.today(),
        queryFn: ({signal}) => getFuellyDailyMeal({signal}),
        enabled,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false
    })
}
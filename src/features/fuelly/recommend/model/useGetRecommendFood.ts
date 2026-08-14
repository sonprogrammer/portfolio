import { getRecommendFood } from "@/features/fuelly/recommend/api"
import { useMutation } from "@tanstack/react-query"


export function useGetRecommendFood(){
    return useMutation({
        mutationFn: getRecommendFood,
    })
}
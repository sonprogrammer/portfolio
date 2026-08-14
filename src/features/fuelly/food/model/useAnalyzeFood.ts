import { AiAnalyze } from "@/features/fuelly/food/api";
import { useMutation } from "@tanstack/react-query";

export function useAnalyzeFood(){
    return useMutation({
        mutationFn: AiAnalyze,
    })
}
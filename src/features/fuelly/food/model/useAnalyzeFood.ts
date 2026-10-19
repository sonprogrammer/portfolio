import { AiAnalyze } from "@/features/fuelly/food/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAnalyzeFood(){
    return useMutation({
        mutationFn: AiAnalyze,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
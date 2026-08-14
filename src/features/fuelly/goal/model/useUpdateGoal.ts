import { FuellyAuthQueryKeys } from "@/features/fuelly/auth/model/FuellyAuthQueryKeys";
import { updateGoal } from "@/features/fuelly/goal/api/updateGoal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateGoal(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateGoal,
        onSuccess: (data) => {
            queryClient.setQueryData(FuellyAuthQueryKeys.session(), data)
            toast.success('수정 완료')
        }
    })
}
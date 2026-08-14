import { loginFuelly } from "@/features/fuelly/auth/api/loginFuelly";
import { FuellyAuthQueryKeys } from "@/features/fuelly/auth/model/FuellyAuthQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFuellyLogin(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: loginFuelly,
        onSuccess: (data) => {
            queryClient.setQueryData(FuellyAuthQueryKeys.session(), data)
            
            toast.success('로그인 성공')
        }
    })
}
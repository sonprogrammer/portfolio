import { createMuser } from "@/features/mungpass/auth/api";
import { mAuthQueryKeys } from "@/features/mungpass/auth/model/mAuthQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useCreateMungpassUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async(name: string) => {
            const res = await createMuser(name)
            if(!res.success){
                throw new Error(res.message)
            }

            if(!res.user){
                throw new Error('유저 정보가 없습니다')
            }
            return res.user
        },
        onSuccess: (user) => {
            queryClient.setQueryData(mAuthQueryKeys.session(), user)
            toast.success('로그인 성공')
        }
    })
}
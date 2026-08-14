import { getMuser } from "@/features/mungpass/auth/api";
import { mAuthQueryKeys } from "@/features/mungpass/auth/model/mAuthQueryKeys";
import { useQuery } from "@tanstack/react-query";



export function useGetMUser(){
    return useQuery({
        queryKey: mAuthQueryKeys.session(),
        queryFn: async() => {
            const res = await getMuser()
            if(!res.success){
                throw new Error(res.message)
            }
            return res.user
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}
import { getMdog } from "@/features/mungpass/dog/api";
import { mDogQueryKeys } from "@/features/mungpass/dog/model/mDogQueryKeys";
import { useQuery } from "@tanstack/react-query";

export function useGetMdog(){
    return useQuery({
        queryKey: mDogQueryKeys.session(),
        queryFn: async() => {
            const res = await getMdog()

            if(!res.success){
                throw new Error(res.message)
            }
            return res.dog
        }
    })
}
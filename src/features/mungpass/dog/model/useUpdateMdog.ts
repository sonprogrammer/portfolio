import { updateDog } from "@/features/mungpass/dog/api";
import { mDogQueryKeys } from "@/features/mungpass/dog/model/mDogQueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateMdog(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateDog,
        onSuccess: (res) => {
            if(!res.success)return

            queryClient.setQueryData(mDogQueryKeys.session(), res.dog)
        }
    })
}
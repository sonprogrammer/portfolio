import { FuellyAuthQueryKeys } from "@/features/fuelly/auth/model/FuellyAuthQueryKeys";
import { updateFuellyProfiles } from "@/features/fuelly/profile/api/updateFuellyProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateFuellyProfile() {
    const queyrClient = useQueryClient()

    return useMutation({
        mutationFn: updateFuellyProfiles,
        onSuccess: (data) => {
            queyrClient.setQueryData(FuellyAuthQueryKeys.session(),data)
            toast.success('업로드 성공')
        }
    })

}
import { getFuellyUser } from "@/features/fuelly/auth/api/getFuellyUser";
import { FuellyAuthQueryKeys } from "@/features/fuelly/auth/model/FuellyAuthQueryKeys";
import { useQuery } from "@tanstack/react-query";

export function useGetFuellyUser(){
    return useQuery({
        queryKey: FuellyAuthQueryKeys.session(),
        queryFn: ({signal}) => getFuellyUser({signal}),
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}
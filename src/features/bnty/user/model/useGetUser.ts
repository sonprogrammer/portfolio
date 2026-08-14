
import { getBntyUser } from "@/entities/bnty/user/api/getUser";
import { useQuery } from "@tanstack/react-query";
import { bntyUserQueryKeys } from '@/features/bnty/user/model/useCreateUser';

export function useGetUser(role: 'trainer' | 'member'){
    return useQuery({
        queryKey: bntyUserQueryKeys.role(role),
        queryFn: () => getBntyUser(role),
        enabled: !!role,
        staleTime: 1000 * 60 * 10
    })
}
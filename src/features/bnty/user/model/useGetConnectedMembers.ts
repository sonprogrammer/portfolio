import { getConnectedMember } from "@/features/bnty/user/api";
import { useQuery } from "@tanstack/react-query";

export const connectedMemberQueryKeys = {
    all: ['bnty-connected-members'] as const,
    trainer: (trainerId: string) => 
    [...connectedMemberQueryKeys.all, trainerId] as const
}

export function useGetConnectedMembers(trainerId: string) {
    return useQuery({
        queryKey: connectedMemberQueryKeys.trainer(trainerId),
        queryFn: () => getConnectedMember(trainerId),
        enabled: !!trainerId
    })
}
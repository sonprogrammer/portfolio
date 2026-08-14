import { BntyUser } from '@/entities/bnty/user/model/userTypes';
import { ConnectedMember } from './types';
import { addPtCount } from "@/features/bnty/user/api";
import { connectedMemberQueryKeys } from '@/features/bnty/user/model/useGetConnectedMembers';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bntyUserQueryKeys } from '@/features/bnty/user/model/useCreateUser';

export function useAddMemberPtCount(trainerId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addPtCount,
        onSuccess: ({ member }) => {
            queryClient.setQueryData<ConnectedMember[]>(
                connectedMemberQueryKeys.trainer(trainerId),
                (prevMembers) => {
                    if (!prevMembers) {
                        return prevMembers
                    }

                    return prevMembers.map(
                        prev => prev.id === member.id ? { ...prev, ptCount: member.ptCount } : prev
                    )
                }
            )
            queryClient.setQueryData<BntyUser | null>(
                bntyUserQueryKeys.role('member'),
                (prevUser) => {
                    if (!prevUser || prevUser.id !== member.id) {
                        return prevUser;
                    }

                    return {
                        ...prevUser,
                        ptCount: member.ptCount,
                    };
                },
            );
            toast.success(`${member.name}님 PT가${member.ptCount}회 등록되었습니다`)
        }
    })
}
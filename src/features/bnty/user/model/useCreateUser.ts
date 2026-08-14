import { BntyUserRole } from '@/entities/bnty/user/model/userTypes';
import { createUser } from "@/entities/bnty/user/api/createUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const bntyUserQueryKeys = {
    all: ['bnty-users'] as const,

    role: (role: BntyUserRole) =>
        [...bntyUserQueryKeys.all, role] as const,
};

export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,
        onSuccess: ({ user }) => {
            queryClient.setQueryData(
                bntyUserQueryKeys.role(user.role),
                user,
            );
        },
    });
}
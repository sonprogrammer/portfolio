import { getNotes } from "@/features/bnty/note/api/getNotes";
import { useQuery } from "@tanstack/react-query";

interface UseGetNotesParams{
    userId: string;
    role: 'trainer'|'member'
    memberId?: string;
}

export const noteQueryKeys = {
    all: ['bnty-notes'] as const,
    list: ({userId, role, memberId}: UseGetNotesParams) => 
        [...noteQueryKeys.all,
            'list',
            role, userId, memberId ?? 'self'
        ] as const
    
}

export function useGetNotes(params: UseGetNotesParams){
    const { userId, role, memberId} = params
    return useQuery({
        queryKey: noteQueryKeys.list(params),
        queryFn: () => getNotes(params),
        enabled: !!userId && (role === 'member' || !!memberId)
    })
}
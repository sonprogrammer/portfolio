import { getChat } from "@/features/bnty/chat/api";
import { useQuery } from "@tanstack/react-query";


export const chatQueryKeys = {
    all: ['bnty-chat'] as const,
    detail: (chatRoomId: string) =>
        [...chatQueryKeys.all, 'detail', chatRoomId] as const
}


export function useGetChat(chatRoomId: string | null) {
    return useQuery({
        queryKey: chatQueryKeys.detail(chatRoomId ?? 'none'),
        queryFn: () => getChat(chatRoomId!),
        enabled: !!chatRoomId
    })
}
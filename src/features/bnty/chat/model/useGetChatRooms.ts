import { getChatRoom } from "@/features/bnty/chat/api";
import { chatRoomQueryKeys } from "@/features/bnty/chat/model";
import { useQuery } from "@tanstack/react-query";

export function useGetChatRooms({userId, role}: {userId: string; role: 'member' | 'trainer'}) {
    return useQuery({
        queryKey: chatRoomQueryKeys.user(userId, role),
        queryFn: () => getChatRoom({userId, role}),
        enabled: !!userId
    })

}


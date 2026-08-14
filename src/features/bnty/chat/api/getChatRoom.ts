

import type { ChatRoomListItem } from "@/features/bnty/chat/model"

interface GetChatRoomRes {
    chatRooms: ChatRoomListItem[]
}

export async function getChatRoom({userId, role}: {userId: string; role: 'member' | 'trainer'}):Promise<ChatRoomListItem[]> {
    const params = new URLSearchParams({userId, role})

    const res = await fetch(`/api/bnty/chat/rooms?${params.toString()}`)

    const data = await res.json() as GetChatRoomRes | {message?: string}

    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '채팅방 조회 실패')
    }

    return (data as GetChatRoomRes).chatRooms
}
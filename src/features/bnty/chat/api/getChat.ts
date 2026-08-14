import { ChatRoomDetail } from "@/entities/bnty/chat/model/chatTypes"


interface GetChatRes {
    chat: ChatRoomDetail
}



export async function getChat(chatRoomId: string): Promise<ChatRoomDetail>{
    const res = await fetch(`/api/bnty/chat/rooms/${chatRoomId}`)

    const data = await res.json() as GetChatRes | {message?: string}
    
    if(!res.ok){
        throw new Error('message' in data && data.message ? data.message : '조회 실패')
    }

    return (data as GetChatRes).chat
}
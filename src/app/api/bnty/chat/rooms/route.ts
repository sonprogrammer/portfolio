import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const role = searchParams.get('role')
        const userId = searchParams.get('userId')

        if (!userId || !role) {
            return NextResponse.json({ message: 'userId와 role을 확인해주세요 ' }, { status: 401 })
        }

        if (role !== 'member' && role !== 'trainer') {
            return NextResponse.json({ message: 'its not a right role' }, { status: 400 })
        }

        await connectMongoDB()

        const filter = role === 'trainer' ? { trainerId: userId } : { memberId: userId }

        const chatRooms = await ChatRoomModel.find(filter).sort({ updatedAt: -1 }).lean()

        const res = chatRooms.map(room => {
            const unreadCount = room.messages.filter(msg => msg.senderId.toString() !== userId &&
                                                        !msg.readBy.some(readUserId => readUserId.toString() === userId)
                                                    ).length            
            return {
                id: room._id.toString(),
                partnerId: role === 'trainer' ? room.memberId.toString() : room.trainerId.toString(),
                partnerName: role === 'trainer' ? room.memberName : room.trainerName,
                lastMessage: room.lastMessage ?? null,
                lastMessageAt: room.lastMessageAt?.toISOString() ?? null,
                unreadCount
            }
        })
        return NextResponse.json({chatRooms: res})

    } catch (error) {
        console.error('채팅방 목록 조회 실패 ', error)
        return NextResponse.json({message:'오류 발생'},{status: 500})
    }
}
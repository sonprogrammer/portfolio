
import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const trainerId = req.nextUrl.searchParams.get('trainerId')

        if (!trainerId) {
            return NextResponse.json({ message: '트레이너 Id가 필요합니다' }, { status: 400 })
        }
        await connectMongoDB()

        const ChatRooms = await ChatRoomModel.find({
            trainerId
        }).select('_id memberId').lean()

        const memberIds = ChatRooms.map(room => room.memberId)

        const members = await BntyUserModel.find({
            _id: {
                $in: memberIds
            },
            role: 'member'
        }).select('name ptCount').lean()

        const chatRoomMap = new Map(
            ChatRooms.map((room) => [
                room.memberId.toString(),
                room._id.toString(),
            ]),
        )

        return NextResponse.json({
            members: members.map(m => ({
                id: m._id.toString(),
                name: m.name,
                ptCount: m.ptCount,
                chatRoomId:
                    chatRoomMap.get(m._id.toString()) ?? '',
            }))
        })

    } catch (error) {
        console.error('연결된 회원 조회 실패', error)
        return NextResponse.json({ message: '연결된 회원 조회 실패' }, { status: 500 })
    }
}
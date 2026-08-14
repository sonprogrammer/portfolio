import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext{
    params: Promise<{chatRoomId: string}>
}

export async function GET(req: NextRequest, context: RouteContext){
    try {
        const { chatRoomId} = await context.params

        if(!chatRoomId){
            return NextResponse.json({message:'올바르지 않는 채팅방 id입니다'},{status: 400})
        }
        
        await connectMongoDB()

        const chatRoom = await ChatRoomModel.findById(chatRoomId).lean()

        if(!chatRoom){
            return NextResponse.json({message: 'there is no chat'}, {status: 404})
        }

        const chat = {
            id: chatRoom._id.toString(),
            trainerId: chatRoom.trainerId.toString(),
            trainerName: chatRoom.trainerName,
            memberId: chatRoom.memberId.toString(),
            memberName: chatRoom.memberName,
            messages: chatRoom.messages.map(msg => ({
                id: msg._id.toString(),
                senderId: msg.senderId.toString(),
                senderRole: msg.senderRole,
                type: msg.type,
                message: msg.message,
                data: msg.data,
                fileName: msg.fileName,
                readBy: msg.readBy.map(userId => userId.toString()),
                sentAt: msg.sentAt.toISOString(),
            }))
            
        }
        return NextResponse.json({ chat })
    } catch (error) {
        console.error(error)
        return NextResponse.json({message: 'error'}, {status: 500})
    }
}
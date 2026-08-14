import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextResponse } from "next/server";

interface QrCheckInReq{
    memberId: string;
    trainerId: string;
}

export async function POST(req: Request){
    try {
        const body = await req.json() as Partial<QrCheckInReq>
        const memberId = body.memberId
        const trainerId = body.trainerId

        if(!memberId || !trainerId){
            return NextResponse.json({message: '각 역할의 id가 필요합니다'}, {status: 400})
        }

        await connectMongoDB()

        const [member, trainer] = await Promise.all([
            BntyUserModel.findOne({
                _id: memberId,
                role: 'member'
            }),
            BntyUserModel.findOne({
                _id: trainerId,
                role: 'trainer'
            })
        ])


        if(!member){
            return NextResponse.json({message: '회원 정보를 찾을 수 없다'}, {status: 404})
        }

        if(!trainer){
            return NextResponse.json({message:'트레이너 정보를 찾을 수 없다'}, {status: 404})
        }

        const chatRoom = await ChatRoomModel.findOne({
            memberId: member._id,
            trainerId: trainer._id
        })


        if(!chatRoom){
            await ChatRoomModel.create({
                demoSessionId: member.demoSessionId,
                memberId: member._id,
                memberName: member.name,
                trainerId: trainer._id,
                trainerName: trainer.name,
                messages:[]
            })

            return NextResponse.json(
                {
                    type: 'connected',
                    message: `${trainer.name} 트레이너와 연결되었습니다`,
                    ptCount: member.ptCount
                },{
                    status: 200
                }
            )
            
        }

        if(member.ptCount <= 0){
            return NextResponse.json({message: '남은 PT 횟수가 없습니다'}, {status: 400})
        }
        
        const updatedMember = await BntyUserModel.findOneAndUpdate(
            {
                _id: member._id,
                role: 'member',
                ptCount: {
                    $gt: 0
                }
            },{
                $inc: {
                    ptCount: -1
                }
            },{
                new: true
            }
        )

        if(!updatedMember){
            return NextResponse.json({message:'PT 차감에 실패했습니다'},{status: 400})
        }

        return NextResponse.json({type: 'checked-in', message:'출석처리 완료', ptCount: updatedMember.ptCount}, {status: 200})
        
    } catch (error) {
        console.error('QR 체크인 처리 실패:', error)
        return NextResponse.json({message: 'QR 체크인 처리 중 오류 발생'},{status: 500})
    }
}
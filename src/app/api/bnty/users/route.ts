import { CreateBntyUserRequest } from '@/entities/bnty/user/model/userTypes';
import { NextResponse } from "next/server";
import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";

import { connectMongoDB } from "@/shared/db/mongodb";

export async function POST(req: Request) {
    try {
        const body = (await req.json() as Partial<CreateBntyUserRequest>)
        const name = body.name?.trim()
        const role = body.role
        const demoSession = body.demoSession
        console.log('body', body)

        if (!name || !demoSession) {
            return NextResponse.json({ message: '이름을 입력해주세요' }, { status: 400 })
        }

        if (!role) {
            return NextResponse.json({ message: '역할을 다시 확인해주세요' }, { status: 400 })
        }

        await connectMongoDB()

        const createdUser = await BntyUserModel.create({
            demoSessionId: demoSession,
            name,
            role,
            ptCount: 0
        })

        return NextResponse.json({
            user: {
                id: createdUser._id.toString(),
                demoSessionId: createdUser.demoSessionId,
                name: createdUser.name,
                role: createdUser.role,
                ptCount: createdUser.ptCount,
                createdAt: createdUser.createdAt.toISOString(),
                updatedAt: createdUser.updatedAt.toISOString(),
            }
        }, { status: 200 })

    } catch (error) {
        console.error('bnty 유저 생성 실패', error)
        return NextResponse.json({message: '사용자 생성 중 오류가 발생했습니다'}, { status: 500})
    }
}
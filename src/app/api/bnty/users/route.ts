import { CreateBntyUserRequest } from '@/entities/bnty/user/model/userTypes';
import { NextResponse } from "next/server";
import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";

import { connectMongoDB } from "@/shared/db/mongodb";
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const COOKIE_NAME = 'bnty-demo-session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()

        const body = (await req.json() as Partial<CreateBntyUserRequest>)
        const name = body.name?.trim()
        const role = body.role


        if (!name) {
            return NextResponse.json({ message: '이름을 입력해주세요f' }, { status: 400 })
        }

        if (!role) {
            return NextResponse.json({ message: '역할을 다시 확인해주세요' }, { status: 400 })
        }

        const existingSessionId = cookieStore.get(COOKIE_NAME)?.value

        const sessionId = existingSessionId ?? randomUUID()
        

        await connectMongoDB()


        const createdUser = await BntyUserModel.create({
            demoSessionId: sessionId,
            name,
            role,
            ptCount: 0
        })

        const res =  NextResponse.json({
            user: {
                id: createdUser._id.toString(),
                demoSessionId: createdUser.demoSessionId,
                name: createdUser.name,
                role: createdUser.role,
                ptCount: createdUser.ptCount,
                createdAt: createdUser.createdAt.toISOString(),
                updatedAt: createdUser.updatedAt.toISOString(),
            }
        })

        res.cookies.set(COOKIE_NAME, sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path:'/',
            maxAge: COOKIE_MAX_AGE
        })
        return res

    } catch (error) {
        console.error('bnty 유저 생성 실패', error)
        return NextResponse.json({message: '사용자 생성 중 오류가 발생했습니다'}, { status: 500})
    }
}
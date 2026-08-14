import { FuellyProfile } from '@/entities/fuelly/user/model/types';
import { FuellyUserModel } from "@/entities/fuelly/user/model/FuellyUserSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const COOKIE_NAME = 'fuelly-session'

function serializeUser(user: { _id: unknown, name: string, profile: unknown }) {
    return {
        id: String(user._id),
        name: user.name,
        profile: user.profile ?? null
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get(COOKIE_NAME)?.value

        if (!sessionId) {
            return NextResponse.json({ user: null })
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOne({ sessionId }).lean().exec()

        return NextResponse.json({ user: user ? serializeUser(user) : null })
    } catch (error) {
        console.error(
            'Fuelly 사용자 조회 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '사용자 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const cookieStore = await cookies()

        const name = body.name?.trim()

        if (!name) {
            return NextResponse.json({ message: '이름을 입력하세요 ' }, { status: 400 })
        }
        if (name.length > 10) {
            return NextResponse.json({ message: '10자 이내로 작성' }, { status: 400 })
        }

        const existSessionId = cookieStore.get(COOKIE_NAME)?.value

        const sessionId = existSessionId ?? randomUUID()

        await connectMongoDB()

        let user = await FuellyUserModel.findOne({ sessionId }).lean().exec()

        if (!user) {
            const newUser = await FuellyUserModel.create({
                sessionId,
                name
            })
            user = newUser
        }

        const res = NextResponse.json({ user: serializeUser(user) })

        res.cookies.set(COOKIE_NAME, sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: COOKIE_MAX_AGE
        })

        return res

    } catch (error) {
        console.error(
            'Fuelly 로그인 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '로그인에 실패했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get(COOKIE_NAME)?.value

        if (!sessionId) {
            return NextResponse.json({ message: 'login required' }, { status: 401 })
        }

        const profile = await req.json() as FuellyProfile

        const { height, weight, age, gender, activityLevel, goal } = profile

        const isValid =
            height > 0 &&
            weight > 0 &&
            age > 0 &&
            ['male', 'female'].includes(gender) &&
            [
                'sedentary',
                'light',
                'moderate',
                'active',
            ].includes(activityLevel) &&
            [
                'bulk',
                'diet',
                'maintain',
            ].includes(goal)

        if (!isValid) {
            return NextResponse.json(
                {
                    message:
                        '신체정보를 올바르게 입력해주세요.',
                },
                {
                    status: 400,
                },
            );
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOneAndUpdate({ sessionId }, { $set: { profile } }, { new: true }).lean().exec()

        if (!user) {
            return NextResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 })
        }
        return NextResponse.json({ user: serializeUser(user) })

    } catch (error) {
        console.error(
            'Fuelly 프로필 저장 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '신체정보 저장에 실패했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
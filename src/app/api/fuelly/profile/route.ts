import { FuellyUserModel } from "@/entities/fuelly/user/model/FuellyUserSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = 'fuelly-session'

const goalValues = ['bulk', 'diet', 'maintain']
const activityValues = [
    'sedentary',
    'light',
    'moderate',
    'active',
]

export async function PATCH(req: Request) {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get(COOKIE_NAME)?.value

        if (!sessionId) {
            return NextResponse.json({ message: 'login required' }, { status: 401 })
        }

        const body = await req.json()

        const { type, value } = body

        let updateField: Record<string, string> | Record<string, number>

        if (type === 'goal') {
            if (
                typeof value !== 'string' ||
                !goalValues.includes(value)
            ) {
                return NextResponse.json(
                    {
                        message:
                            'invalid goal',
                    },
                    {
                        status: 400,
                    },
                );
            }

            updateField = {
                'profile.goal': value,
            };
        } else if (type === 'weight') {
            const weight =
                Number(value);

            if (
                !Number.isFinite(weight) ||
                weight < 30 ||
                weight > 300
            ) {
                return NextResponse.json(
                    {
                        message:
                            'invalid weight',
                    },
                    {
                        status: 400,
                    },
                );
            }

            updateField = {
                'profile.weight':
                    weight,
            };
        } else if (
            type === 'activity'
        ) {
            if (
                typeof value !== 'string' ||
                !activityValues.includes(
                    value,
                )
            ) {
                return NextResponse.json(
                    {
                        message:
                            'invalid activity',
                    },
                    {
                        status: 400,
                    },
                );
            }

            updateField = {
                'profile.activity':
                    value,
            };
        } else {
            return NextResponse.json(
                {
                    message:
                        'invalid edit type',
                },
                {
                    status: 400,
                },
            );
        }

        await connectMongoDB()

        const user =
            await FuellyUserModel
                .findOneAndUpdate(
                    {
                        sessionId,
                        profile: {
                            $ne: null,
                        },
                    },
                    {
                        $set: updateField,
                    },
                    {
                        new: true,
                        runValidators: true,
                    },
                )
                .lean()
                .exec()

        if (!user) {
            return NextResponse.json(
                {
                    message:
                        'can not find user',
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json({
            user: {
                id: String(user._id),
                name: user.name,
                profile: user.profile,
            },
        })
    } catch (error) {
        console.error(
            'Fuelly 프로필 수정 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '프로필 수정에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}
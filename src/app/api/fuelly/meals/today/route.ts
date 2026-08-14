
import { FuellyDailyMealModel } from "@/entities/fuelly/meal/model/FuellyDailyMealSchema";
import { FuellyUserModel } from "@/entities/fuelly/user/model/FuellyUserSchema";
import { getFuellySessionId } from "@/features/fuelly/auth/lib/fuelly-session/getFuellySessionId";
import { connectMongoDB } from "@/shared/db/mongodb";
import { format } from "date-fns";
import { Types } from "mongoose";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";


const COOKIE_NAME = 'fuelly-session'


export async function GET() {
    try {
        const cookieStore = await cookies()

        const sessionId = cookieStore.get(COOKIE_NAME)?.value

        if (!sessionId) {
            return NextResponse.json({ message: 'login required' }, { status: 401 })
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOne({ sessionId }).select('_id').lean().exec()

        if (!user) {
            return NextResponse.json({ message: 'can not find user' }, { status: 404 })
        }

        const dateKey = format(new Date(), 'yyyy-MM-dd')

        const dailyMeal = await FuellyDailyMealModel.findOne({
            userId: user._id,
            dateKey
        }).lean().exec()

        if (!dailyMeal) {
            return NextResponse.json({
                userDailyMeal: {
                    id: null,
                    userId: String(user._id),
                    dateKey,
                    meals: []
                }
            })
        }

        const meals = dailyMeal.meals.map((m) => ({
            id: String(m._id),
            foodId: m.foodId ? String(m.foodId): undefined,
            foodName: m.foodName,
            calories: m.calories,
            protein: m.protein,
            unit: m.unit,
        }))

        return NextResponse.json({
            userDailyMeal: {
                id: String(dailyMeal._id),
                userId: String(dailyMeal.userId),
                dateKey: dailyMeal.dateKey,
                meals
            }
        })


    } catch (error) {
        console.error(
            '오늘 식단 조회 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '오늘 식단 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}

export async function POST(req: Request) {
    try {
        const sessionId = await getFuellySessionId()

        if (!sessionId) {
            return NextResponse.json({ message: 'login required' }, { status: 401 })
        }

        const { foodId, foodName, calories, protein, unit } = await req.json()

        if (foodId &&
            !foodName?.trim() ||
            !unit?.trim() ||
            Number(calories) < 0 ||
            Number(protein) < 0
        ) {
            return NextResponse.json(
                {
                    message:
                        'invalid meal data',
                },
                {
                    status: 400,
                },
            )
        }

        const user =
            await FuellyUserModel
                .findOne({
                    sessionId,
                })
                .select('_id')
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
            )
        }

        const dateKey = format(
            new Date(),
            'yyyy-MM-dd'
        )

        const dailyMeal = await FuellyDailyMealModel.findOneAndUpdate(
            {
                userId: user._id,
                dateKey
            },
            {
                $setOnInsert: {
                    userId: user._id,
                    dateKey
                },
                $push: {
                    meals: {
                        ...(foodId && {
                            foodId:
                                new Types.ObjectId(
                                    foodId,
                                ),
                        }),
                        foodName: foodName.trim(),
                        calories: Number(calories),
                        protein: Number(protein),
                        unit: unit.trim()
                    }
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        ).lean().exec()

        return NextResponse.json({
            userDailMeal: {
                id: String(dailyMeal._id),
                userId: String(dailyMeal.userId),
                dateKey: dailyMeal.dateKey,
                meals: dailyMeal.meals.map(m => ({
                    id: String(m._id),
                    foodId: m.foodId ? String(m.foodId): undefined,
                    foodName: m.foodName,
                    calories: m.calories,
                    protein: m.protein,
                    unit: m.unit
                }))
            }
        })


    } catch (error) {
        console.error(
            '오늘 식단 추가 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    '오늘 식단 추가에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}

export async function DELETE(req: Request) {
    try {
        const sessionId =
            await getFuellySessionId()

        if (!sessionId) {
            return NextResponse.json(
                {
                    message:
                        'login required',
                },
                {
                    status: 401,
                },
            )
        }

        const mealId = await req.json()

        if (
            !mealId ||
            !Types.ObjectId.isValid(
                mealId,
            )
        ) {
            return NextResponse.json(
                {
                    message:
                        'invalid meal id',
                },
                {
                    status: 400,
                },
            )
        }

        await connectMongoDB()

        const user =
            await FuellyUserModel
                .findOne({
                    sessionId,
                })
                .select('_id')
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
            )
        }

        const dateKey = format(
            new Date(),
            'yyyy-MM-dd',
        )

        const dailyMeal =
            await FuellyDailyMealModel
                .findOneAndUpdate(
                    {
                        userId:
                            user._id,
                        dateKey,
                    },
                    {
                        $pull: {
                            meals: {
                                _id:
                                    new Types.ObjectId(
                                        mealId,
                                    ),
                            },
                        },
                    },
                    {
                        new: true,
                    },
                )
                .lean()
                .exec()

        if (!dailyMeal) {
            return NextResponse.json(
                {
                    message:
                        'daily meal not found',
                },
                {
                    status: 404,
                },
            )
        }

        return NextResponse.json({
            userDailyMeal: {
                id: String(dailyMeal._id),
                userId: String(dailyMeal.userId),
                dateKey: dailyMeal.dateKey,
                meals: dailyMeal.meals.map(
                    (m) => ({
                        id: String(m._id),
                        foodId: m.foodId ? String(m.foodId): undefined,
                        foodName: m.foodName,
                        calories: m.calories,
                        protein: m.protein,
                        unit: m.unit,
                    }),
                ),
            },
        })
    } catch (error) {
        console.error(
            '오늘 식단 삭제 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    '오늘 식단 삭제에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}
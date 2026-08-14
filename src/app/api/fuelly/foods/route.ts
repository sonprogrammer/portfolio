import { FuellyFoodModel } from "@/entities/fuelly/food/model/FuellyFoodSchema";
import { FuellyUserModel } from "@/entities/fuelly/user/model/FuellyUserSchema";
import { getFuellySessionId } from "@/features/fuelly/auth/lib/fuelly-session/getFuellySessionId";
import { connectMongoDB } from "@/shared/db/mongodb";
import { format } from "date-fns";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sessionId = await getFuellySessionId()

        if (!sessionId) {
            return NextResponse.json({ message: 'login requird' }, { status: 401 })
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOne({ sessionId }).select('_id').lean().exec()

        if (!user) {
            return NextResponse.json({ message: 'can not find user' }, { status: 404 })
        }

        const foods = await FuellyFoodModel.find({
            createdBy: {
                $in: [
                    'system',
                    String(user._id)
                ]
            }
        }).lean().exec()

        return NextResponse.json({
            foods: foods.map(food => ({
                id: String(
                    food._id,
                ),
                name: food.name,
                protein:
                    food.protein,
                calorie:
                    food.calorie,
                unit: food.unit,
                createdBy:
                    food.createdBy,
            }))
        })

    } catch (error) {
        console.error(
            '음식 조회 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    '음식 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}

export async function POST(req: Request){
    try {
        const sessionId = await getFuellySessionId()
        if(!sessionId){
            return NextResponse.json({message: 'login required'}, { status: 401})
        }

        const { name, protein, calorie, unit} = await req.json()

        if (
            !name?.trim() ||
            !unit?.trim() ||
            Number(protein) < 0 ||
            Number(calorie) < 0
        ) {
            return NextResponse.json(
                {
                    message:
                        'invalid food data',
                },
                {
                    status: 400,
                },
            )
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOne({sessionId}).select('_id').lean().exec()

        if(!user){
            return NextResponse.json({message: 'can not find user'},{status: 404})
        }

        const food = await FuellyFoodModel.create({
            name: name.trim(),
            protein: Number(protein),
            calorie: Number(calorie),
            unit: unit.trim(),
            createdBy: String(user._id)
        })

        return NextResponse.json({food: {
            id: String(food._id),
            name: food.name,
            protein: food.protein,
            calorie: food.calorie,
            unit: food.unit,
            createdBy: food.createdBy
        }},{ status: 200})

    } catch (error) {
        console.error(
            '음식 저장 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    '음식 저장에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}


export async function DELETE(req: Request){
    try {
        const sessionId = await getFuellySessionId()

        if(!sessionId){
            return NextResponse.json({message: 'login required'},{status: 401})
        }

        const foodId = await req.json()
        if (!foodId || !Types.ObjectId.isValid(foodId)) {
            return NextResponse.json(
                {
                    message:'invalid food id',
                },
                {
                    status: 400,
                },
            )
        }

        await connectMongoDB()

        const user = await FuellyUserModel.findOne({sessionId}).select('_id').lean().exec()

        if(!user){
            return NextResponse.json({message: 'can not find user'}, {status: 404})
        }

        const deleteFood = await FuellyFoodModel.findOneAndDelete({_id: foodId, createdBy: String(user._id)}).lean().exec()

        if(!deleteFood){
            return NextResponse.json({message: 'can not find food'}, { status: 404})
        }
        return NextResponse.json({message: 'food deleted'})

    } catch (error) {
        console.error(
            '음식 삭제 실패:',
            error,
        )

        return NextResponse.json(
            {
                message:
                    '음식 삭제에 실패했습니다.',
            },
            {
                status: 500,
            },
        )
    }
}
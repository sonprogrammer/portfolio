import { VcOrderModel } from "@/entities/vc/order/model/VcOrder";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";


const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const guestId = searchParams.get('guestId')
        const market = searchParams.get('market')
        const limitParam = searchParams.get('limitParam')


        if (!guestId) {
            return NextResponse.json({ message: 'guestId is essential' }, { status: 400 })
        }

        const parsedLimit = Number(limitParam ?? DEFAULT_LIMIT)

        const limit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, MAX_LIMIT) : DEFAULT_LIMIT

        await connectMongoDB()

        //* 마켓이 있으면 해당 마켓 주문 내역만 없으면 전체 주문 내역
        const filter = {
            guestId,
            ...(market
                ? {
                    market,
                }
                : {}),
        }

        const orders =
            await VcOrderModel.find(filter)
                .sort({
                    createdAt: -1,
                })
                .limit(limit)
                .lean()
                .exec();


        return NextResponse.json({
            orders: orders.map((order) => ({
                id: order._id.toString(),
                guestId: order.guestId.toString(),
                market: order.market,
                type: order.type,
                executedPrice: order.executedPrice,
                executedQuantity: order.executedQuantity,
                executedAmount: order.executedAmount,
                createdAt: order.createdAt.toISOString(),
            })),
        });


    } catch (error) {
        console.error(
            'VC 거래내역 조회 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '거래내역 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
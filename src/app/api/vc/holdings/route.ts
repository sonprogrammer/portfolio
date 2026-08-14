import { VcHoldingModel } from "@/entities/vc/holding/model/VcHolding";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const guestId = searchParams.get('guestId')
        const market = searchParams.get('market')

        if (!guestId) {
            return NextResponse.json({ message: 'guestid is essential' }, { status: 400 })
        }

        await connectMongoDB()

        // *해당 코인한에서의 자산 조회용
        if (market) {
            const holding = await VcHoldingModel.findOne({
                guestId,
                market,
            })
                .lean()
                .exec();

            return NextResponse.json({
                holding: holding //* 해당 코인의 자산이 있을 때
                    ? {
                        id: holding._id.toString(),
                        guestId: holding.guestId.toString(),
                        market: holding.market,
                        quantity: holding.quantity,
                        averagePrice: holding.averagePrice
                    }
                    : null, //*해당 코인 자산 없을 대
            });
        }

        // * 전체 자산용
        const holdings =
            await VcHoldingModel.find({
                guestId,
                quantity: {
                    $gt: 0,
                },
            })
                .lean()
                .exec();

        return NextResponse.json({
            holdings: holdings.map(
                holding => ({
                    id: holding._id.toString(),
                    guestId: holding.guestId.toString(),
                    market: holding.market,
                    quantity: holding.quantity,
                    averagePrice: holding.averagePrice

                })
            )
        })

    } catch (error) {
        console.error(
            'VC 보유자산 조회 실패:',
            error,
        );

        return NextResponse.json(
            {
                message:
                    '보유자산 조회에 실패했습니다.',
            },
            {
                status: 500,
            },
        );
    }
}
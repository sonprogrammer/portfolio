import { ChatRoomModel } from "@/entities/bnty/chat/model/chatSchema";
import { BntyUserModel } from "@/entities/bnty/user/model/userSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import { NextResponse } from "next/server";

interface UpdatePtCountReq{
    memberId: string;
    trainerId: string;
    count : number;
}

export async function PATCH(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as Partial<UpdatePtCountReq>

    const {
      memberId,
      trainerId,
      count,
    } = body;

    if (
      !memberId ||
      !trainerId ||
      !Number.isInteger(count) ||
      Number(count) <= 0
    ) {
      return NextResponse.json(
        {
          message:
            '올바른 회원, 트레이너, PT 횟수가 필요합니다.',
        },
        {
          status: 400,
        },
      );
    }

    await connectMongoDB();

    const isConnected =
      await ChatRoomModel.exists({
        memberId,
        trainerId,
      });

    if (!isConnected) {
      return NextResponse.json(
        {
          message:
            '연결되지 않은 회원입니다.',
        },
        {
          status: 403,
        },
      );
    }

    const updatedMember =
      await BntyUserModel.findOneAndUpdate(
        {
          _id: memberId,
          role: 'member',
        },
        {
          $inc: {
            ptCount: Number(count),
          },
        },
        {
          new: true,
        },
      );

    if (!updatedMember) {
      return NextResponse.json(
        {
          message:
            '회원 정보를 찾을 수 없습니다.',
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      member: {
        id: updatedMember._id.toString(),
        name: updatedMember.name,
        ptCount:
          updatedMember.ptCount,
      },
    });
  } catch (error) {
    console.error(
      'PT 횟수 등록 실패:',
      error,
    );

    return NextResponse.json(
      {
        message:
          'PT 횟수 등록 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}

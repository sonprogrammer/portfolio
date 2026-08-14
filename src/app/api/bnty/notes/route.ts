import { LessonNoteModel } from "@/entities/bnty/note/model/noteSchema";
import { connectMongoDB } from "@/shared/db/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { ChatRoomModel } from '@/entities/bnty/chat/model/chatSchema';
import { BntyUserModel } from '@/entities/bnty/user/model/userSchema';

export async function GET(req: NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams

        const userId = searchParams.get('userId')
        const role = searchParams.get('role')
        const memberId = searchParams.get('memberId')

        if(!userId || !role){
            return NextResponse.json({message:'userid, role을 확인해주세요'}, {status:400})
        }

        if(role!== 'member' && role !== 'trainer'){
            return NextResponse.json({message:'올바른 role이 아닙니다'}, {status: 400})
        }

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({message:'올바르지않은 사용자입니다'}, {status: 400})
        }

        await connectMongoDB()

        const filter = role === 'trainer' ? { trainerId: userId, memberId} : { memberId: userId}

        if(role === 'trainer' && (!memberId || !mongoose.Types.ObjectId.isValid(memberId))){
            return NextResponse.json({message: '회원 ID을 확인해주세요'},{status: 400})
        }

        const notes = await LessonNoteModel.find(filter).sort({workoutDate: -1}).lean()

        const res = notes.map(n => ({
            id: n._id.toString(),
            demoSessionId: n.demoSessionId,
            chatRoomId: n.chatRoomId.toString(),
            trainerId: n.trainerId.toString(),
            memberId: n.memberId.toString(),
            title: n.title,
            content: n.content,
            workoutDate: n.workoutDate.toISOString(),
            createdAt: n.createdAt.toISOString(),
            updatedAt: n.updatedAt.toISOString()
        }))

        return NextResponse.json({notes: res})
    } catch (error) {
        console.error('노트 조회 실패', error)
    }
}


type CreateNoteBody = {
  trainerId: string;
  memberId: string;
  chatRoomId: string;
  title: string;
  content: string;
  workoutDate: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateNoteBody;

    const {
      trainerId,
      memberId,
      chatRoomId,
      title,
      content,
      workoutDate,
    } = body;

    if (
      !trainerId ||
      !memberId ||
      !chatRoomId ||
      !title?.trim() ||
      !content?.trim() ||
      !workoutDate
    ) {
      return NextResponse.json(
        { message: '노트 작성 정보를 모두 입력해주세요.' },
        { status: 400 },
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(trainerId) ||
      !mongoose.Types.ObjectId.isValid(memberId) ||
      !mongoose.Types.ObjectId.isValid(chatRoomId)
    ) {
      return NextResponse.json(
        { message: '올바르지 않은 ID입니다.' },
        { status: 400 },
      );
    }

    const parsedWorkoutDate = new Date(workoutDate);

    if (Number.isNaN(parsedWorkoutDate.getTime())) {
      return NextResponse.json(
        { message: '운동 날짜를 확인해주세요.' },
        { status: 400 },
      );
    }

    await connectMongoDB();

    const trainer = await BntyUserModel.findOne({
      _id: trainerId,
      role: 'trainer',
    }).lean();

    if (!trainer) {
      return NextResponse.json(
        { message: '트레이너만 일지를 작성할 수 있습니다.' },
        { status: 403 },
      );
    }

    const chatRoom = await ChatRoomModel.findOne({
      _id: chatRoomId,
      trainerId,
      memberId,
    }).lean();

    if (!chatRoom) {
      return NextResponse.json(
        { message: '연결된 회원 관계를 확인할 수 없습니다.' },
        { status: 403 },
      );
    }

    const createdNote = await LessonNoteModel.create({
      demoSessionId: chatRoom.demoSessionId,
      chatRoomId,
      trainerId,
      memberId,
      title: title.trim(),
      content: content.trim(),
      workoutDate: parsedWorkoutDate,
    });

    return NextResponse.json(
      {
        message: '운동 일지가 작성되었습니다.',
        note: {
          id: createdNote._id.toString(),
          demoSessionId: createdNote.demoSessionId,
          chatRoomId: createdNote.chatRoomId.toString(),
          trainerId: createdNote.trainerId.toString(),
          memberId: createdNote.memberId.toString(),
          title: createdNote.title,
          content: createdNote.content,
          workoutDate:
            createdNote.workoutDate.toISOString(),
          createdAt: createdNote.createdAt.toISOString(),
          updatedAt: createdNote.updatedAt.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('운동 일지 작성 실패:', error);

    return NextResponse.json(
      { message: '운동 일지 작성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
import { isValidObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import { LessonNoteModel } from '@/entities/bnty/note/model/noteSchema';
import { BntyUserModel } from '@/entities/bnty/user/model/userSchema';
import { connectMongoDB } from '@/shared/db/mongodb';

interface RouteParams {
  params: Promise<{
    noteId: string;
  }>;
}

interface UpdateNoteBody {
  trainerId: string;
  title: string;
  content: string;
  workoutDate: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    const { noteId } = await params;
    const body = (await req.json()) as UpdateNoteBody;

    const {
      trainerId,
      title,
      content,
      workoutDate,
    } = body;

    if (
      !isValidObjectId(noteId) ||
      !isValidObjectId(trainerId)
    ) {
      return NextResponse.json(
        { message: '올바르지 않은 ID입니다.' },
        { status: 400 },
      );
    }

    if (!title?.trim() || !content?.trim() || !workoutDate) {
      return NextResponse.json(
        { message: '제목, 내용, 운동 날짜가 필요합니다.' },
        { status: 400 },
      );
    }

    const parsedWorkoutDate = new Date(workoutDate);

    if (Number.isNaN(parsedWorkoutDate.getTime())) {
      return NextResponse.json(
        { message: '올바르지 않은 운동 날짜입니다.' },
        { status: 400 },
      );
    }

    await connectMongoDB();

    const trainer = await BntyUserModel.findOne({
      _id: trainerId,
      role: 'trainer',
    })
      .select('_id')
      .lean();

    if (!trainer) {
      return NextResponse.json(
        { message: '트레이너만 일지를 수정할 수 있습니다.' },
        { status: 403 },
      );
    }

    const note = await LessonNoteModel.findById(noteId)
      .select('trainerId')
      .lean();

    if (!note) {
      return NextResponse.json(
        { message: '운동 일지를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (note.trainerId.toString() !== trainerId) {
      return NextResponse.json(
        { message: '본인이 작성한 일지만 수정할 수 있습니다.' },
        { status: 403 },
      );
    }

    const updatedNote =
      await LessonNoteModel.findByIdAndUpdate(
        noteId,
        {
          $set: {
            title: title.trim(),
            content: content.trim(),
            workoutDate: parsedWorkoutDate,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      ).lean();

    if (!updatedNote) {
      return NextResponse.json(
        { message: '운동 일지 수정에 실패했습니다.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      note: {
        id: updatedNote._id.toString(),
        demoSessionId: updatedNote.demoSessionId,
        chatRoomId: updatedNote.chatRoomId.toString(),
        trainerId: updatedNote.trainerId.toString(),
        memberId: updatedNote.memberId.toString(),
        title: updatedNote.title,
        content: updatedNote.content,
        workoutDate: updatedNote.workoutDate.toISOString(),
        createdAt: updatedNote.createdAt.toISOString(),
        updatedAt: updatedNote.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('운동 일지 수정 실패', error);

    return NextResponse.json(
      { message: '운동 일지 수정에 실패했습니다.' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams,
) {
  try {
    const { noteId } = await params;
    const trainerId =
      req.nextUrl.searchParams.get('trainerId');

    if (
      !isValidObjectId(noteId) ||
      !trainerId ||
      !isValidObjectId(trainerId)
    ) {
      return NextResponse.json(
        { message: '올바른 노트 ID와 트레이너 ID가 필요합니다.' },
        { status: 400 },
      );
    }

    await connectMongoDB();

    const trainer = await BntyUserModel.findOne({
      _id: trainerId,
      role: 'trainer',
    })
      .select('_id')
      .lean();

    if (!trainer) {
      return NextResponse.json(
        { message: '트레이너만 일지를 삭제할 수 있습니다.' },
        { status: 403 },
      );
    }

    const deletedNote =
      await LessonNoteModel.findOneAndDelete({
        _id: noteId,
        trainerId,
      }).lean();

    if (!deletedNote) {
      return NextResponse.json(
        {
          message:
            '운동 일지가 없거나 삭제 권한이 없습니다.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: '운동 일지가 삭제되었습니다.',
      noteId,
    });
  } catch (error) {
    console.error('운동 일지 삭제 실패', error);

    return NextResponse.json(
      { message: '운동 일지 삭제에 실패했습니다.' },
      { status: 500 },
    );
  }
}
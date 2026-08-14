'use client';

import {
  type FormEvent,
  useState,
} from 'react';
import { format } from 'date-fns';

import { useCreateNote } from '@/features/bnty/note/model';

interface NoteCreateFormProps {
  trainerId: string;
  memberId: string;
  chatRoomId: string;
  onSuccess: () => void;
}

export function NoteCreateForm({
  trainerId,
  memberId,
  chatRoomId,
  onSuccess,
}: NoteCreateFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [workoutDate, setWorkoutDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const {
    mutateAsync: createNote,
    isPending,
  } = useCreateNote();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (
      !trimmedTitle ||
      !trimmedContent ||
      !workoutDate ||
      isPending
    ) {
      return;
    }

    try {
      setErrorMessage(null);

      await createNote({
        trainerId,
        memberId,
        chatRoomId,
        title: trimmedTitle,
        content: trimmedContent,
        workoutDate: new Date(
          `${workoutDate}T00:00:00`,
        ).toISOString(),
      });

      setTitle('');
      setContent('');
      setWorkoutDate(
        format(new Date(), 'yyyy-MM-dd'),
      );

      onSuccess();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '운동 일지 작성에 실패했습니다.',
      );
    }
  };

  const isSubmitDisabled =
    !title.trim() ||
    !content.trim() ||
    !workoutDate ||
    isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="note-workout-date"
          className="text-sm font-medium text-gray-300"
        >
          운동 날짜
        </label>

        <input
          id="note-workout-date"
          type="date"
          value={workoutDate}
          onChange={(event) =>
            setWorkoutDate(event.target.value)
          }
          disabled={isPending}
          className="rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-gray-100 outline-none focus:border-indigo-500 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="note-title"
          className="text-sm font-medium text-gray-300"
        >
          제목
        </label>

        <input
          id="note-title"
          type="text"
          value={title}
          maxLength={100}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="예: 하체 운동 및 자세 교정"
          disabled={isPending}
          className="rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-600 focus:border-indigo-500 disabled:opacity-50"
        />

        <span className="text-right text-xs text-gray-500">
          {title.length}/100
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="note-content"
          className="text-sm font-medium text-gray-300"
        >
          운동 내용
        </label>

        <textarea
          id="note-content"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="진행한 운동, 자세 피드백, 다음 수업 계획 등을 작성해주세요."
          rows={8}
          disabled={isPending}
          className="resize-none rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-6 text-gray-100 outline-none placeholder:text-gray-600 focus:border-indigo-500 disabled:opacity-50"
        />
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="text-sm text-red-400"
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="mt-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? '일지 작성 중...'
          : '운동 일지 작성'}
      </button>
    </form>
  );
}
'use client';

import {
    type FormEvent,
    useState,
} from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

import type { NoteItem } from '@/entities/bnty/note/model/noteTypes';
import {
    useUpdateNote,
} from '@/features/bnty/note/model';
import { DeleteConfirmModal } from '@/features/bnty/note/ui/DeleteConfimModal';

interface NoteEditFormProps {
    note: NoteItem;
    onSuccess: () => void;
}

export function NoteEditForm({
    note,
    onSuccess
}: NoteEditFormProps) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [workoutDate, setWorkoutDate] = useState(
        format(new Date(note.workoutDate), 'yyyy-MM-dd'),
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [deleteCheck, setDeletCheck] = useState(false)

    const {
        mutateAsync: updateNote,
        isPending: isUpdating,
    } = useUpdateNote();


    const isPending = isUpdating

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

            await updateNote({
                noteId: note.id,
                trainerId: note.trainerId,
                title: trimmedTitle,
                content: trimmedContent,
                workoutDate: new Date(
                    `${workoutDate}T00:00:00`,
                ).toISOString(),
            });

            onSuccess();
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : '운동 일지 수정에 실패했습니다.',
            )
        }
    }

    const isSubmitDisabled =
        !title.trim() ||
        !content.trim() ||
        !workoutDate ||
        isPending;

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor={`note-date-${note.id}`}
                        className="text-sm font-medium text-gray-300"
                    >
                        운동 날짜
                    </label>

                    <input
                        id={`note-date-${note.id}`}
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
                        htmlFor={`note-title-${note.id}`}
                        className="text-sm font-medium text-gray-300"
                    >
                        제목
                    </label>

                    <input
                        id={`note-title-${note.id}`}
                        type="text"
                        value={title}
                        maxLength={100}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        disabled={isPending}
                        className="rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-gray-100 outline-none focus:border-indigo-500 disabled:opacity-50"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor={`note-content-${note.id}`}
                        className="text-sm font-medium text-gray-300"
                    >
                        운동 내용
                    </label>

                    <textarea
                        id={`note-content-${note.id}`}
                        value={content}
                        rows={8}
                        onChange={(event) =>
                            setContent(event.target.value)
                        }
                        disabled={isPending}
                        className="resize-none rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-sm leading-6 text-gray-100 outline-none focus:border-indigo-500 disabled:opacity-50"
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

                <div className="mt-2 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={() => setDeletCheck(true)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={17} />
                        삭제
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isUpdating ? '수정 중...' : '수정 완료'}
                    </button>
                </div>
            </form>

            {deleteCheck && (
                <DeleteConfirmModal
                    isOpen={deleteCheck}
                    note={note}
                    onClose={() => setDeletCheck(false)}
                />
            )}

        </>
    );
}
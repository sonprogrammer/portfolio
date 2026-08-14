'use client'

import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { NoteItem } from "@/entities/bnty/note/model/noteTypes"
import { useState } from "react";
import { DeleteConfirmModal, NoteEditModal } from "@/features/bnty/note/ui";

interface NoteCardProps {
    note: NoteItem;
    canManage: boolean;
}

export function NoteCard({ note, canManage }: NoteCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [deleteCheck, setDeletCheck] = useState(false)

    return (
        <>
            <article
                className={[
                    'rounded-xl border border-gray-800 bg-gray-900 p-5',
                    canManage
                        ? 'cursor-pointer transition hover:border-gray-600'
                        : '',
                ].join(' ')}
                onClick={() => {
                    if (canManage) {
                        setIsEditModalOpen(true)
                    }
                }}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-100">
                            {note.title}
                        </h3>

                        <time className="mt-1 block text-xs text-gray-500">
                            {format(
                                new Date(note.workoutDate),
                                'yyyy년 M월 d일',
                                {
                                    locale: ko,
                                },
                            )}
                        </time>
                    </div>

                    {canManage && (
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(true)}
                                className="text-xs text-gray-400 hover:text-white cursor-pointer"
                            >
                                수정
                            </button>

                            <button
                                type="button"
                                onClick={() => setDeletCheck(true)}
                                className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                    {note.content}
                </p>
            </article>

            {canManage && (
                <NoteEditModal
                    open={isEditModalOpen}
                    note={note}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {canManage && deleteCheck &&
                <DeleteConfirmModal
                    isOpen={deleteCheck}
                    note={note}
                    onClose={()=>setDeletCheck(false)}
                />
            }
        </>
    )
}
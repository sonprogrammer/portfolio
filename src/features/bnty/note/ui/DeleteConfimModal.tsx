'use client'

import { NoteItem } from "@/entities/bnty/note/model/noteTypes"
import { useDeleteNote } from "@/features/bnty/note/model"
import { ModalPortal } from "@/shared/ui/modal"
import { toast } from "sonner"

interface DeleteConfirmModalProps {
    isOpen: boolean
    note: NoteItem
    onClose: () => void
}

export function DeleteConfirmModal({
    isOpen,
    note,
    onClose,
}: DeleteConfirmModalProps) {
    const { mutate: deleteNote } = useDeleteNote()


    if (!isOpen) return null


    const handleDelete = () => {
        deleteNote({
            noteId: note.id,
            trainerId: note.trainerId
        },
            {
                onSuccess: () => { toast.success('노트 삭제 성공') }
            }
        )
    }


    return (
        <ModalPortal isOpen={isOpen}>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">

                <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl text-neutral-100 flex flex-col gap-4">


                    <div className="flex flex-col gap-1.5 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2.5">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 text-red-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold tracking-tight text-neutral-100">
                                노트를 삭제하시겠습니까?
                            </h3>
                        </div>
                        <p className="text-sm text-neutral-400 pl-0 sm:pl-12.5 leading-relaxed">
                            이 작업은 되돌릴 수 없으며 작성된 노트가 영구적으로 삭제됩니다.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-800/50 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 transition-all cursor-pointer"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                handleDelete()
                                onClose()
                            }}
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-500 transition-all shadow-sm hover:shadow-red-600/20 cursor-pointer"
                        >
                            삭제하기
                        </button>
                    </div>

                </div>
            </div>
        </ModalPortal>
    )
}
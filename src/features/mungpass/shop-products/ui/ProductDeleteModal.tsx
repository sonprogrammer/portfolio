'use client'

import { ModalPortal } from '@/shared/ui/modal'
import { Loader2, Trash2, X } from 'lucide-react'

interface ProductDeleteModalProps {
    isOpen: boolean
    isPending: boolean
    onClose: () => void
    onConfirm: () => void
}

export function ProductDeleteModal({ isOpen, isPending, onClose, onConfirm }: ProductDeleteModalProps) {
    if (!isOpen) return null

    return (
        <ModalPortal isOpen={isOpen}>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
                onClick={onClose}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-sm rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl"
                >
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-800 hover:text-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                            <Trash2 className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-lg font-extrabold text-gray-100">
                            상품을 삭제하시겠습니까?
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-gray-400">
                            삭제한 상품은 상품 목록에서 더 이상 표시되지 않습니다.
                        </p>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm font-bold text-gray-300 transition hover:bg-gray-800 disabled:opacity-50"
                        >
                            취소
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isPending}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
                        >
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    )
}
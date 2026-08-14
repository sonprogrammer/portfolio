'use client'

import { X } from 'lucide-react'

import { DogForm } from '@/features/mungpass/dog/ui/DogForm'
import { ModalPortal } from '@/shared/ui/modal'

interface DogPostModalProps {
    isOpen: boolean
    onClose: () => void
}

export function DogPostModal({
    isOpen,
    onClose,
}: DogPostModalProps) {
    if (!isOpen) return null

    return (
        <ModalPortal isOpen={isOpen}>
            <div 
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div 
                    onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                반려견 등록
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                반려견 정보를 입력해주세요.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <DogForm
                        onSuccess={onClose}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </ModalPortal>
    )
}
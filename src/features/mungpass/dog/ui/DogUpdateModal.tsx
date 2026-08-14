'use client'

import { MDog } from "@/entities/mungpass/dog/model/types";
import { DogForm } from "@/features/mungpass/dog/ui/DogForm";
import { ModalPortal } from "@/shared/ui/modal";
import { X } from 'lucide-react'


interface DogUpdateModalProps {
    dog: MDog
    isOpen: boolean
    onClose: () => void
}

export function DogUpdateModal({ dog, isOpen, onClose }: DogUpdateModalProps) {
    if (!isOpen) return null

    return (
        <ModalPortal isOpen={isOpen}>
            <div 
                onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                <div 
                    onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-950 p-6 relative">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white">
                            반려견 정보 수정
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            반려견 정보를 수정해주세요.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-6 top-6 cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-900 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                    <DogForm
                        dog={dog}
                        onSuccess={onClose}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </ModalPortal>
    )
}
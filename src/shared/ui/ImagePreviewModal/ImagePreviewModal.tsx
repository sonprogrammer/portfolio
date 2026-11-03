'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ImagePreviewModalProps {
    open: boolean
    onClose: () => void
    title: string
    src: string
    alt: string
}

export function ImagePreviewModal({
    open,
    onClose,
    title,
    src,
    alt,
}: ImagePreviewModalProps) {
    useEffect(() => {
        if (!open) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [open, onClose])

    if (!open) return null

    return createPortal(
        <div
            className="fixed inset-0 z-10001 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-5"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="architecture-image-preview-title"
        >
            <div
                className="w-[min(94vw,1400px)] overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-950 text-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
                    <h2
                        id="architecture-image-preview-title"
                        className="truncate text-sm font-extrabold text-white sm:text-base"
                    >
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="이미지 미리보기 닫기"
                        autoFocus
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors hover:border-purple-500/60 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                    >
                        <X size={17} aria-hidden="true" />
                    </button>
                </div>

                <div className="relative h-[calc(90vh-66px)] w-full bg-[#090d18]">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="94vw"
                        className="object-contain p-2 sm:p-4"
                    />
                </div>
            </div>
        </div>,
        document.body
    )
}

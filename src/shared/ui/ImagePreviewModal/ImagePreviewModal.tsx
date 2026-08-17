'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ImagePreviewModalProps {
    open: boolean
    onClose: () => void
    src: string
    alt: string
}

export function ImagePreviewModal({
    open,
    onClose,
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
            className="fixed inset-0 z-10001 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="이미지 미리보기 닫기"
                className="absolute right-5 top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition hover:bg-white/10"
            >
                <X className="h-5 w-5" />
            </button>

            <div
                className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center"
                onClick={(event) => event.stopPropagation()}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={1400}
                    height={1400}
                    className="max-h-[90vh] h-auto w-auto max-w-[95vw] object-contain"
                />
            </div>
        </div>,
        document.body
    )
}
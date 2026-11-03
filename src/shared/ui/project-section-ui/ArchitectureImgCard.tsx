'use client'

import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import { useState } from 'react'

import { ImagePreviewModal } from '@/shared/ui/ImagePreviewModal'

interface ArchitectureImgCardrops {
    title: string
    description: string
    src: string
    alt: string
    width?: number
    height?: number
}

export function ArchitectureImgCard({
    title,
    description,
    src,
    alt,
    width = 600,
    height = 700,
}: ArchitectureImgCardrops) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-card shadow-sm">
                <div className="border-b px-6 py-5 text-white">
                    <h3 className="font-bold">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-300 text-muted-foreground">
                        {description}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label={`${title} 이미지 크게 보기`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#090d18] p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-400 sm:p-6"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/85 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm transition-colors group-hover:border-purple-400/50 group-hover:text-purple-200">
                        <Maximize2 size={12} aria-hidden="true" />
                        크게 보기
                    </span>
                </button>
            </div>

            <ImagePreviewModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title={title}
                src={src}
                alt={alt}
            />
        </>
    )
}

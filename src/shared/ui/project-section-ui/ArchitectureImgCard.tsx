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
                    className="group relative block w-full cursor-zoom-in bg-[#090d18] p-3 sm:p-6"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={`mx-auto transition-transform duration-300 group-hover:scale-[1.03]`}
                    />

                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                        <Maximize2 className="h-4 w-4" />
                    </div>
                </button>
            </div>

            <ImagePreviewModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                src={src}
                alt={alt}
            />
        </>
    )
}
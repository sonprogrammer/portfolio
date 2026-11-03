"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GalleryImage = {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
};

const galleryImages: GalleryImage[] = [
    {
        src: "/teumsae-main.png",
        alt: "틈새의 주간 달력과 AI 빈 시간 추천이 표시된 메인 화면",
        title: "달력과 빈 시간 추천",
        width: 1415,
        height: 910,
    },
    {
        src: "/ai-find-schedules.png",
        alt: "AI 대화로 다음 날 일정을 조회한 틈새 화면",
        title: "자연어 일정 조회",
        width: 1418,
        height: 856,
    },
    {
        src: "/ai-reschedule.png",
        alt: "AI가 제안한 일정 변경 내용을 사용자가 확인하는 화면",
        title: "일정 변경 확인",
        width: 389,
        height: 372,
    },
];

export function TeumsaeImageGallery() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) {
            return;
        }

        if (selectedImage && !dialog.open) {
            dialog.showModal();
        }

        if (!selectedImage && dialog.open) {
            dialog.close();
        }
    }, [selectedImage]);

    return (
        <>
            <div className="grid gap-4 md:grid-cols-3">
                {galleryImages.map(image => (
                    <button
                        key={image.src}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        aria-label={`${image.title} 이미지 크게 보기`}
                        className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 text-left transition-colors hover:border-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                    >
                        <div className="relative h-36 overflow-hidden bg-[#f8f7f0] sm:h-44">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 768px) 30vw, calc(100vw - 80px)"
                                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/85 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm">
                                <Maximize2 size={12} aria-hidden="true" />
                                크게 보기
                            </span>
                        </div>
                        <span className="block border-t border-zinc-800 px-4 py-3 text-xs font-bold text-zinc-300 transition-colors group-hover:text-teal-300">
                            {image.title}
                        </span>
                    </button>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                onClose={() => setSelectedImage(null)}
                onClick={event => {
                    if (event.target === event.currentTarget) {
                        setSelectedImage(null);
                    }
                }}
                className="m-auto max-h-[92vh] w-[min(92vw,1400px)] overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-950 p-0 text-white shadow-2xl backdrop:bg-black/85 backdrop:backdrop-blur-sm"
                aria-labelledby="teumsae-gallery-title"
            >
                {selectedImage && (
                    <div>
                        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 px-5 py-4">
                            <h5
                                id="teumsae-gallery-title"
                                className="text-sm font-extrabold text-white sm:text-base"
                            >
                                {selectedImage.title}
                            </h5>
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors hover:border-teal-700 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                                aria-label="이미지 닫기"
                            >
                                <X size={17} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="flex max-h-[calc(92vh-66px)] items-center justify-center overflow-auto bg-[#f8f7f0] p-2 sm:p-4">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                width={selectedImage.width}
                                height={selectedImage.height}
                                sizes="92vw"
                                className="h-auto max-h-[calc(92vh-98px)] w-auto max-w-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </dialog>
        </>
    );
}

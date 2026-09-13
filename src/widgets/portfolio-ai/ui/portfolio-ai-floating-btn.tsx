'use client'

import { usePortfolioAiStore } from '@/widgets/portfolio-ai/model/portfolio-ai-store'
import Image from 'next/image'
import { useShallow } from 'zustand/shallow'


export function AiFloat() {
    const { isOepn, openAssistant } = usePortfolioAiStore(useShallow(state => ({
        isOepn: state.isOpen,
        openAssistant: state.openAssistant
    })))
    return (
        <>
        {!isOepn && (

        
            <button
                type="button"
                title="질문하기"
                aria-label="손영진 AI에게 질문하기"
                onClick={() => openAssistant()}
                className="
        group fixed bottom-10 right-10 z-50
        flex flex-col items-center gap-1.5
        transition-transform duration-300
        hover:-translate-y-1
      "
            >
                <div
                    className="
          relative flex h-16 w-16 items-center justify-center
          rounded-2xl
          border border-white/10
          bg-white/5
          shadow-[0_0_25px_rgba(99,102,241,0.18)]
          backdrop-blur-md
          transition-all duration-300
          group-hover:border-violet-400/30
          group-hover:bg-white/10
          group-hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]
        "
                >
                    <Image
                        src="/float.png"
                        alt="나에게 질문하기"
                        width={56}
                        height={56}
                        priority
                        className="
            object-contain
            transition-transform duration-300
            group-hover:scale-110
          "
                    />
                </div>

                <div className="flex flex-col items-center leading-none">
                    <span className="whitespace-nowrap text-xs font-semibold text-white">
                        Ask Youngjin
                    </span>

                    <span
                        className="
            mt-1 whitespace-nowrap
            text-[9px] font-medium
            tracking-wide text-violet-300/70
          "
                    >
                        Powered by RAG
                    </span>
                </div>
            </button>
            )}
        </>
    )
}
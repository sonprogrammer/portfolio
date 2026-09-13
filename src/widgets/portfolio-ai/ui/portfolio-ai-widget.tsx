'use client'

import Image from 'next/image'


import { PortfolioAiPanel } from './portfolio-ai-panel'
import { usePortfolioAiStore } from '@/widgets/portfolio-ai/model/portfolio-ai-store'

export function PortfolioAiWidget() {
  const { isOpen, openAssistant } = usePortfolioAiStore()

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          title="AI에게 질문하기"
          aria-label="AI에게 손영진에 대해 질문하기"
          onClick={() => openAssistant()}
          className="
            fixed bottom-[calc(1rem+env(safe-area-inset-bottom))]
            right-4 z-50 flex items-center gap-3
            transition-transform duration-200
            hover:scale-105

            md:bottom-8 md:right-8
          "
        >
          <span className="hidden rounded-xl border border-white/10 bg-[#151517]/95 px-4 py-2 text-left shadow-2xl backdrop-blur md:block">
            <span className="block text-sm font-medium text-white">
              AI에게 질문하기
            </span>
            <span className="block text-[11px] text-zinc-500">
              RAG 기반 Portfolio AI
            </span>
          </span>

          <span className="flex size-16 items-center justify-center rounded-full">
            <Image
              src="/float.png"
              alt=""
              width={64}
              height={64}
              priority
              className="size-16 object-contain"
            />
          </span>
        </button>
      )}

      <PortfolioAiPanel />
    </>
  )
}
'use client'

import { X, ServerOff } from 'lucide-react'

interface RealtimeUnavailableModalProps {
  onClose: () => void
}

export function RealtimeUnavailableModal({
  onClose
}: RealtimeUnavailableModalProps) {
  return (
    <div 
        onClick={onClose}
    className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div 
        onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <ServerOff className="h-7 w-7 text-red-400" />
          </div>

          <h2 className="text-lg font-bold text-white">
            실시간 기능 체험이 제한되어 있습니다
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            현재 실시간 서버의 무료 사용량이 소진되어
            BNTY 채팅 및 VC 실시간 기능을 일시적으로
            사용할 수 없습니다.
          </p>

          <p className="mt-2 text-xs text-gray-500">
            프로젝트의 다른 기능은 정상적으로 체험할 수 있습니다.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-gray-200"
          >
            확인
          </button>

        </div>
      </div>
    </div>
  )
}
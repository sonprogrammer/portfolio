'use client'
import { Search } from 'lucide-react';


interface CoinSearchBtnProps {
    onClick: () => void
}


export function CoinSearchBtn({ onClick }: CoinSearchBtnProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="코인 검색"
            className="
        group flex size-11 items-center justify-center
        rounded-full border border-white/10
        bg-white/5 text-white/70
        backdrop-blur-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:border-white/20
        hover:bg-white/10 hover:text-white
        hover:shadow-lg hover:shadow-black/20
        active:translate-y-0 active:scale-95
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-white/40
      "
        >
            <Search
                size={19}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:scale-110"
            />
        </button>
    )
}
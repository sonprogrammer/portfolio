'use client'



import { RADIUS_OPTIONS } from "@/features/mungpass/shop/config/radiusOptions";
import { MShopRadius } from "@/features/mungpass/shop/model/types";
import { ShopRadiusSelector } from "@/features/mungpass/shop/ui/ShopRadiusSelector";
import { LocateFixed, Map as MapIcon, Search, X } from "lucide-react";
import { memo, useState } from "react";

interface AroundHeaderProps {
    radius: MShopRadius;
    toggle: () => void
    showMap: boolean
    onSearch: (keyword: string) => void
    setRadius: (radius: MShopRadius) => void
    onMyLocation: () => void
}

export function AroundHeader({ radius, setRadius, showMap, toggle, onSearch, onMyLocation }: AroundHeaderProps) {
    const [localValue, setLocalValue] = useState('')

    const handleSearch = () => {
        const trimmed = localValue.trim()
        if (trimmed) {
            onSearch(trimmed)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }


    return (
        <section className="relative z-50 space-y-3 rounded-b-4xl border-b border-gray-800 bg-gray-900/90 p-4 shadow-2xl backdrop-blur-xl sm:space-y-4 sm:rounded-b-4xl sm:p-5 md:p-6">
            <div className="flex w-full min-w-0 items-start justify-between gap-4 sm:items-center">
                <div className="min-w-0">
                    <h2 className="text-xl font-black tracking-tight text-gray-100 sm:text-2xl">
                        어디로 갈까요?
                    </h2>

                    <p className="mt-0.5 text-xs font-bold text-orange-400 sm:text-sm">
                        내 주변 멍패스 샵
                    </p>
                </div>

                <button
                    onClick={toggle}
                    className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold shadow-md transition-all duration-300 active:scale-95 sm:gap-2 sm:rounded-2xl sm:px-4 sm:py-2.5 ${showMap
                        ? 'bg-orange-500 text-white shadow-orange-500/20'
                        : 'border border-gray-700/80 bg-gray-800/80 text-orange-400 hover:border-orange-500/50 hover:bg-gray-800'
                        }`}
                >
                    {showMap ? (
                        <X className="h-4 w-4" />
                    ) : (
                        <MapIcon className="h-4 w-4" />
                    )}

                    {showMap ? '닫기' : '지도보기'}
                </button>
            </div>

            <div className="group relative w-full min-w-0">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-orange-400 sm:left-4 sm:h-5 sm:w-5" />

                <input
                    type="text"
                    value={localValue ?? ''}
                    placeholder="시설명을 검색해보세요"
                    className="w-full rounded-xl border border-gray-800 bg-gray-950/60 py-3 pl-10 pr-10 text-xs font-semibold text-gray-100 shadow-inner outline-none transition-all placeholder-gray-500 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:text-sm"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setLocalValue(e.target.value)}
                />

                {localValue && (
                    <button
                        type="button"
                        onClick={() => {
                            setLocalValue('')
                            onSearch('')
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-gray-400 hover:text-gray-200 sm:right-3.5"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="flex w-full min-w-0 items-center gap-2 overflow-hidden pt-1 sm:gap-3">
                {!localValue && (
                    <div className="no-scrollbar flex w-0 flex-1 gap-2 overflow-x-auto py-1">
                        {RADIUS_OPTIONS.map(option => (
                            <ShopRadiusSelector
                                key={option.value}
                                option={option}
                                setRadius={() => setRadius(option.value)}
                                radius={radius}
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={onMyLocation}
                    className="ml-auto flex shrink-0 cursor-pointer items-center justify-center rounded-xl border border-gray-700 bg-gray-800/90 p-2.5 text-orange-400 shadow-md transition-all duration-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white active:scale-95 sm:rounded-2xl sm:p-3"
                    aria-label="현재위치로 이동"
                    title="현재 위치 탐색"
                >
                    <LocateFixed className="h-4 w-4" />
                </button>
            </div>
        </section>
    )
}

export default memo(AroundHeader)
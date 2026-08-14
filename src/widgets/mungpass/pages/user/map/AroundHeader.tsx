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
        <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-gray-800 bg-gray-900/90 p-6 shadow-2xl backdrop-blur-xl space-y-4 z-50">

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-100 tracking-tight">어디로 갈까요?</h2>
                    <p className="text-orange-400 text-sm font-bold mt-0.5">내 주변 멍패스 샵</p>
                </div>

                <button
                    onClick={toggle}
                    className={`cursor-pointer px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 font-bold text-xs shadow-md active:scale-95 ${showMap
                            ? 'bg-orange-500 text-white shadow-orange-500/20'
                            : 'bg-gray-800/80 border border-gray-700/80 text-orange-400 hover:bg-gray-800 hover:border-orange-500/50'
                        }`}
                >
                    {showMap ? <X className="w-4 h-4" /> : <MapIcon className="w-4 h-4" />}
                    {showMap ? '닫기' : '지도보기'}
                </button>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-orange-400" />
                <input
                    type="text"
                    value={localValue ?? ''}
                    placeholder="시설명을 검색해보세요"
                    className="w-full pl-12 pr-10 py-3.5 bg-gray-950/60 border border-gray-800 rounded-2xl outline-none focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-semibold text-gray-100 placeholder-gray-500 shadow-inner"
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
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
                {!localValue && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                        {RADIUS_OPTIONS.map((option) => (
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
                    className='ml-auto shrink-0 p-3 rounded-2xl bg-gray-800/90 border border-gray-700 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-md active:scale-95'
                    aria-label='현재위치로 이동'
                    title="현재 위치 탐색"
                >
                    <LocateFixed className="w-4 h-4" />
                </button>
            </div>
        </section>
    )
}

export default memo(AroundHeader)
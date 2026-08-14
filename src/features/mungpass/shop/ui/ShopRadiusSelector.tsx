'use client'


import { MShopRadius } from '../model/types'

interface ShopRadiusSelectorProps {
    radius: MShopRadius
    option: {label: string; value: number}
    setRadius: () => void
}

export function ShopRadiusSelector({
    radius,
    setRadius,
    option
}: ShopRadiusSelectorProps) {
    return (
        <button
            key={option.value}
            onClick={setRadius}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border-2 cursor-pointer
                        ${radius === option.value
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-white border-orange-100 text-orange-300'}`}
        >
            {option.label}
        </button>
    )
}
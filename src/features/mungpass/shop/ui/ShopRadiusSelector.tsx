'use client'


import { MShopRadius } from '../model/types'

interface ShopRadiusSelectorProps {
    radius: MShopRadius
    option: { label: string; value: number }
    setRadius: () => void
}

export function ShopRadiusSelector({
    radius,
    setRadius,
    option
}: ShopRadiusSelectorProps) {
    return (
        <button
            onClick={setRadius}
            className={` rounded-full border-2 px-2 sm:px-4 py-1.5 text-[8px] sm:text-xs font-bold transition-all cursor-pointer
        ${radius === option.value
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-orange-100 bg-white text-orange-300'
                }
      `}
        >
            {option.label}
        </button>
    )
}
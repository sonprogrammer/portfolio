'use client'

import { CoinSearchBtn } from "@/features/vc/coin-search/ui/CoinSearchBtn"
import { CoinSearchModal } from "@/features/vc/coin-search/ui/CoinSearchModal"
import { useState } from "react"

export function CoinSearch() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <CoinSearchBtn onClick={() => setIsOpen(true)} />
            <CoinSearchModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    )
}
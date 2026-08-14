'use client'

import { useVcNavStore } from "@/features/vc/nav/model"
import { AssetPage } from "@/widgets/vc/pages/ui/AssetPage"

import { CoinDetailPage } from "@/widgets/vc/pages/ui/CoinDetailPage"
import { MainPage } from "@/widgets/vc/pages/ui/MainPage"
import { OrderHistoryPage } from "@/widgets/vc/pages/ui/OrderHistory"
import { useShallow } from "zustand/shallow"

export function VcPages() {
    const {activePage, selectedMarket} = useVcNavStore(useShallow(
        (state) => ({
            activePage: state.activePage,
            selectedMarket: state.selectedMarket,
        })
    ))

    if(selectedMarket){
        return (
            <CoinDetailPage 
                market={selectedMarket}
            />
        )
    }

    const page = activePage ?? 'home'
    
  return(
    <div>
        {page === 'home' && <MainPage />}
        {page === 'asset' && <AssetPage />}
        {page === 'transactions' && <OrderHistoryPage />}
    </div>
  )
}
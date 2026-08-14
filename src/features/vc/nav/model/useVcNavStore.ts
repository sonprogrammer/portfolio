import { create } from "zustand";

export type VcPage = 'home' | 'asset' | 'transactions'

interface VcNavStore {
    activePage: VcPage
    selectedMarket: string | null
    setActivePage: (page: VcPage) => void
    setSelectedMarket: (market: string) => void
    clearSelectedCoin: () => void
}

export const useVcNavStore = create<VcNavStore>((set) => ({
    activePage: 'home',
    selectedMarket: null,
    setActivePage: (activePage) => set({ activePage,selectedMarket:null }),
    setSelectedMarket: (selectedMarket: string) => set({selectedMarket}),
    clearSelectedCoin: () => set({ selectedMarket: null})
}))
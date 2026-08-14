import { create } from "zustand";


export type FuellyPage = 'nutrition' | 'diet' | 'ai'

interface FuellyNavStore {
    activePage: FuellyPage
    setActivePage: (page: FuellyPage) => void;
}

export const useFuellyNavStore = create<FuellyNavStore>((set) => ({
    activePage: 'nutrition',
    setActivePage: (activePage) => set({ activePage })
}))
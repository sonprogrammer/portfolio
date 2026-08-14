import { create } from "zustand";

export type BntyPage = 'home' | 'chat' | 'note'

interface BntyNavStore{
    activePage: BntyPage
    setActivePage: (page: BntyPage) => void
}

export const useBntyNavStore = create<BntyNavStore>((set) => ({
    activePage: 'home',
    setActivePage: (activePage) => {
        set({activePage})
    }
}))
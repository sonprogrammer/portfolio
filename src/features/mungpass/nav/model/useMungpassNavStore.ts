import { create } from "zustand";
import { persist } from 'zustand/middleware'

import type { MungpassPage, MungpassRole } from "@/features/mungpass/nav/model/types";
import { mungpassDefaultPage } from "@/features/mungpass/nav/model/navItem";

interface MungpassNavStore {
    role: MungpassRole | null
    activePage: MungpassPage | null
    setRole: (role: MungpassRole) => void
    setActivePage: (page: MungpassPage) => void
}


export const useMungpassNavStore = create<MungpassNavStore>()(
    persist(
        set => ({
            role: null,
            activePage: null,
            setRole: (role) => set({ role, activePage: mungpassDefaultPage[role] }),
            setActivePage: (activePage) => set({ activePage })
        }),
        {
            name: 'mungpass-nav',
            partialize: (state) => ({
                role: state.role
            })
        }
    ))
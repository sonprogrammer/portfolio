import { create } from "zustand";

export type BntyRole = 'trainer' | 'member' | null

export interface BntyRoleState{
    role: BntyRole;
    setRole: (role: BntyRole) => void;
    resetRole : () => void
}

export const useBntyRoleStore = create<BntyRoleState>((set) => ({
    role: null,
    setRole: (role) => set({role}),
    resetRole: () => set({role: null})
}))
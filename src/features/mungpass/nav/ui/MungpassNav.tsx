'use client'

import { useMungpassNavStore } from "@/features/mungpass/nav/model"
import { mungpassNavItems } from "@/features/mungpass/nav/model/navItem"
import { useGetRoleNotifications, useNotifRealtime } from "@/features/mungpass/notification/model"
import { MungpassRoleSelector } from "@/features/mungpass/role/ui"
import { useShallow } from "zustand/shallow"

export function MungpassNav() {
    const { role, activePage, setActivePage, setRole } = useMungpassNavStore(useShallow(state => ({
        role: state.role,
        activePage: state.activePage,
        setActivePage: state.setActivePage,
        setRole: state.setRole
    })))

    const { data: noti} = useGetRoleNotifications()
    useNotifRealtime()

    const owner = role === 'owner'

    if (!role) return null

    const navItems = mungpassNavItems[role]
    return (
        <nav className="flex items-center justify-between border-b border-gray-800 px-5">
            <div className="flex items-center gap-1">
                {navItems.map((item) => {
                    const isActive = activePage === item.id

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() =>setActivePage(item.id)}
                            className={`border-b-2 px-4 py-4 text-sm font-medium transition-colors 
                                ${isActive
                                    ? owner
                                        ? 'border-emerald-500 text-emerald-400'
                                        : 'border-orange-500 text-orange-500'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </button>
                    )
                })}
            </div>

            <MungpassRoleSelector role={role} noti={noti} onChange={setRole} />
        </nav>
    )
}
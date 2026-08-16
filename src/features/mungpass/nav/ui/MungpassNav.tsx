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

    const { data: noti } = useGetRoleNotifications()
    useNotifRealtime()

    const owner = role === 'owner'

    if (!role) return null

    const navItems = mungpassNavItems[role]
    return (
        <nav className="flex flex-col gap-3 border-b border-gray-800 px-3 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-5">
            <div className="flex w-full items-center gap-1 overflow-x-auto lg:w-auto">
                {navItems.map(item => {
                    const isActive = activePage === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActivePage(item.id)}
                            className={`shrink-0 border-b-2 px-3 py-3 text-xs font-medium transition-colors sm:px-4 sm:py-4 sm:text-sm
            ${isActive
                                    ? owner
                                        ? "border-emerald-500 text-emerald-400"
                                        : "border-orange-500 text-orange-500"
                                    : "border-transparent text-gray-400 hover:text-white"
                                }
          `}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            <div className="w-full pb-3 lg:w-auto lg:pb-0">
                <MungpassRoleSelector
                    role={role}
                    noti={noti}
                    onChange={setRole}
                />
            </div>
        </nav>
    )
}
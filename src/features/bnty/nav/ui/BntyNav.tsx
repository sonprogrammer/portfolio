'use client'

import { useBntyNavStore } from "@/features/bnty/nav/model"
import { BNTY_NAV_ITEMS } from "@/shared/config/bnty"
import { useSocket } from "@/shared/providers/SocketProvider"
import { RealtimeUnavailableModal } from "@/shared/ui/unavailable-modal"
import { useState } from "react"
import { useShallow } from "zustand/shallow"

export function BntyNav() {
    const { realtimeUnavailable } = useSocket()
    const [isNoticeOpen, setIsNoticeOpen] = useState(false)
    const { activePage, setActivePage } = useBntyNavStore(useShallow(
        (state) => ({
            activePage: state.activePage,
            setActivePage: state.setActivePage
        })
    ))


    return (
        <>
            <nav className="flex rounded-xl border border-gray-700 bg-gray-900 p-1">
                {BNTY_NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.path;

                    return (
                        <button
                            key={item.path}
                            type="button"
                            onClick={() => {
                                if (item.path === "chat" && realtimeUnavailable) {
                                    setIsNoticeOpen(true)
                                    return
                                }
                                setActivePage(item.path)
                            }}
                            className={`min-w-24 rounded-lg px-5 py-2 text-sm font-semibold transition ${isActive
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {isNoticeOpen && (

                <RealtimeUnavailableModal
                    onClose={() => setIsNoticeOpen(false)}
                />
            )}

        </>
    )
}
'use client'

import {
    PanelLeftClose,
    PanelLeftOpen,
    ShieldCheck
} from 'lucide-react'

interface MadminHeaderProps {
    collapsed: boolean
    onToggleSidebar: () => void
}

export function MadminHeader({
    collapsed,
    onToggleSidebar
}: MadminHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 bg-gray-950 px-5">
            <button
                type="button"
                onClick={onToggleSidebar}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-900 hover:text-gray-200"
            >
                {collapsed ? (
                    <PanelLeftOpen className="h-5 w-5" />
                ) : (
                    <PanelLeftClose className="h-5 w-5" />
                )}
            </button>

            <div className="flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-orange-400" />

                <span className="text-xs font-bold text-gray-400">
                    관리자 모드
                </span>
            </div>
        </header>
    )
}
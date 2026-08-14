'use client'

import {
    LayoutDashboard,
    MessageSquare,
    Store,
    Users
} from 'lucide-react'

import { MungpassAdminPage } from '@/features/mungpass/nav/model/types'

interface MadminSidebarProps {
    collapsed: boolean
    activePage: MungpassAdminPage
    onChangePage: (page: MungpassAdminPage) => void
}

const adminMenus: {
    page: MungpassAdminPage
    label: string
    icon: typeof LayoutDashboard
}[] = [
        {
            page: 'dashboard',
            label: '대시보드',
            icon: LayoutDashboard
        },
        {
            page: 'shops',
            label: '상점 관리',
            icon: Store
        },
        {
            page: 'inquiries',
            label: '문의 관리',
            icon: MessageSquare
        },
        {
            page: 'users',
            label: '회원 관리',
            icon: Users
        },
    ]

export function MadminSidebar({
    collapsed,
    activePage,
    onChangePage
}: MadminSidebarProps) {
    return (
        <aside
            className={`shrink-0 border-r border-gray-800 bg-gray-950 transition-all duration-200 ${collapsed ? 'w-20' : 'w-60'
                }`}
        >
            <div className="flex h-16 items-center border-b border-gray-800 px-5">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 font-black text-white">
                        M
                    </div>

                    {!collapsed && (
                        <div className="whitespace-nowrap">
                            <p className="text-sm font-extrabold text-gray-100">
                                멍패스
                            </p>

                            <p className="text-xs font-semibold text-gray-500">
                                Admin
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <nav className="space-y-2 p-3">
                {adminMenus.map(menu => {
                    const Icon = menu.icon
                    const isActive = activePage === menu.page

                    return (
                        <button
                            key={menu.page}
                            type="button"
                            onClick={() => onChangePage(menu.page)}
                            className={`flex w-full items-center rounded-xl px-3 py-3 text-sm font-bold transition ${isActive
                                    ? 'bg-orange-500/10 text-orange-400'
                                    : 'text-gray-500 hover:bg-gray-900 hover:text-gray-200'
                                } ${collapsed
                                    ? 'justify-center'
                                    : 'gap-3'
                                }`}
                        >
                            <Icon className="h-5 w-5 shrink-0" />

                            {!collapsed && (
                                <span>
                                    {menu.label}
                                </span>
                            )}
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}
'use client'

import { ReactNode, useState } from 'react'

import { MungpassAdminPage } from '@/features/mungpass/nav/model/types'

import { MadminHeader } from './MadminHeader'
import { MadminSidebar } from './MadminSidebar'

interface MadminLayoutProps {
    activePage: MungpassAdminPage
    onChangePage: (page: MungpassAdminPage) => void
    children: ReactNode
}

export function MadminLayout({
    activePage,
    onChangePage,
    children
}: MadminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex min-h-175 overflow-hidden rounded-3xl border border-gray-800 bg-gray-950">
            <MadminSidebar
                collapsed={collapsed}
                activePage={activePage}
                onChangePage={onChangePage}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <MadminHeader
                    collapsed={collapsed}
                    onToggleSidebar={() => setCollapsed(prev => !prev)}
                />

                <main className="min-w-0 flex-1 bg-black p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
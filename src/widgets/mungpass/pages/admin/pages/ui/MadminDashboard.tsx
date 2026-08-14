'use client'

import {
    ClipboardClock,
    Loader2,
    Store,
    Users
} from 'lucide-react'

import { useGetAdminDashboard } from '@/features/mungpass/admin/dashboard/model'
import { AdminDashboardCard } from '@/features/mungpass/admin/dashboard/ui'

export function MadminDashboard() {
    const { data, isPending, isError } = useGetAdminDashboard()

    if (isPending) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                관리자 대시보드 정보를 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-extrabold text-gray-100">
                    대시보드
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    멍패스의 회원과 입점 현황을 확인합니다.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <AdminDashboardCard
                    title="전체 가입자"
                    value={data.users.total}
                    unit="명"
                    change={data.users.change}
                    icon={Users}
                />

                <AdminDashboardCard
                    title="입점 완료"
                    value={data.approvedShops.total}
                    unit="개"
                    change={data.approvedShops.change}
                    icon={Store}
                />

                <AdminDashboardCard
                    title="입점 심사 요청"
                    value={data.pendingShops.total}
                    unit="개"
                    change={data.pendingShops.change}
                    icon={ClipboardClock}
                />
            </div>
        </div>
    )
}
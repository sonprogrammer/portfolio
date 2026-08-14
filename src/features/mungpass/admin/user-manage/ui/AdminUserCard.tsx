import { format } from 'date-fns'
import {
    CircleUserRound,
    Clock3,
    Store
} from 'lucide-react'

import { MAdminUser } from '../model'

interface AdminUserCardProps {
    user: MAdminUser
}

const shopStatusMap = {
    pending: {
        label: '심사중',
        className: 'bg-yellow-500/10 text-yellow-400'
    },

    rejected: {
        label: '반려',
        className: 'bg-red-500/10 text-red-400'
    },

    approved: {
        label: '입점완료',
        className: 'bg-emerald-500/10 text-emerald-400'
    }
} as const

export function AdminUserCard({
    user
}: AdminUserCardProps) {
    const status = user.shopStatus
        ? shopStatusMap[user.shopStatus]
        : null

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-900">
                        <CircleUserRound className="h-5 w-5 text-gray-500" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate font-extrabold text-gray-100">
                                {user.name}
                            </h3>

                            {user.userType === 'owner' ? (
                                <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-[11px] font-bold text-orange-400">
                                    사장
                                </span>
                            ) : (
                                <span className="rounded-full bg-gray-800 px-2.5 py-1 text-[11px] font-bold text-gray-400">
                                    일반 회원
                                </span>
                            )}

                            {status && (
                                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}>
                                    {status.label}
                                </span>
                            )}
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-gray-600">
                            <Clock3 className="h-3.5 w-3.5" />

                            <span>
                                {format(
                                    new Date(user.createdAt),
                                    'yyyy.MM.dd'
                                )} 가입
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {user.userType === 'owner' && (
                <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-900/70 px-4 py-3">
                    <Store className="h-4 w-4 shrink-0 text-gray-500" />

                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-600">
                            매장
                        </p>

                        <p className="mt-0.5 truncate text-sm font-bold text-gray-300">
                            {user.shopName ?? '매장 정보 없음'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
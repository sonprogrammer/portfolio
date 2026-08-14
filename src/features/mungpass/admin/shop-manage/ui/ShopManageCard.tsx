import { format } from 'date-fns'
import {
    CalendarDays,
    MapPin,
    Phone,
    Store,
    UserRound
} from 'lucide-react'

import { MAdminShop } from '../model'

interface ShopManageCardProps {
    shop: MAdminShop
    onOpen: (shop: MAdminShop) => void
}

const statusMap = {
    pending: {
        label: '심사중',
        className: 'bg-yellow-500/10 text-yellow-400'
    },

    approved: {
        label: '입점완료',
        className: 'bg-emerald-500/10 text-emerald-400'
    },

    rejected: {
        label: '반려',
        className: 'bg-red-500/10 text-red-400'
    }
} as const

export function ShopManageCard({
    shop,
    onOpen
}: ShopManageCardProps) {
    const status = statusMap[shop.status]

    const address = shop.roadAddressName || shop.addressName

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10">
                        <Store className="h-5 w-5 text-orange-400" />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate font-extrabold text-gray-100">
                                {shop.name}
                            </h3>

                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status.className}`}>
                                {status.label}
                            </span>
                        </div>

                        <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                <UserRound className="h-3.5 w-3.5 shrink-0" />

                                <span>
                                    {shop.ownerName}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />

                                <span className="truncate">
                                    {address}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                <Phone className="h-3.5 w-3.5 shrink-0" />

                                <span>
                                    {shop.phone || '전화번호 없음'}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                <CalendarDays className="h-3.5 w-3.5 shrink-0" />

                                <span>
                                    {format(new Date(shop.createdAt), 'yyyy.MM.dd')} 신청
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => onOpen(shop)}
                    className="shrink-0 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-xs font-bold text-gray-300 transition hover:bg-gray-800"
                >
                    {shop.status === 'pending'
                        ? '심사하기'
                        : '상세보기'
                    }
                </button>
            </div>
        </div>
    )
}
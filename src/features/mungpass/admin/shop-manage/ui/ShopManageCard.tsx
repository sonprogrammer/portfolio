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
        <div className="w-full min-w-0 rounded-2xl border border-gray-800 bg-gray-950 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <div className="sm:flex size-10 sm:items-center sm:justify-center rounded-xl bg-orange-500/10 sm:size-12 sm:rounded-2xl hidden">
                        <Store className="h-4 w-4 text-orange-400 sm:h-5 sm:w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="min-w-0 truncate text-sm font-extrabold text-gray-100 sm:text-base">
                                {shop.name}
                            </h3>

                            <span
                                className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:text-[11px] ${status.className}`}
                            >
                                {status.label}
                            </span>
                        </div>

                        <div className="mt-3 space-y-2">
                            <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-gray-500">
                                <UserRound className="h-3.5 w-3.5" />

                                <span className="truncate">
                                    {shop.ownerName}
                                </span>
                            </div>

                            <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-gray-500">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />

                                <span className="truncate">
                                    {address}
                                </span>
                            </div>

                            <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-gray-500">
                                <Phone className="h-3.5 w-3.5 shrink-0" />

                                <span className="truncate">
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
                    className="w-full shrink-0 cursor-pointer rounded-xl border border-gray-800 bg-gray-900 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:bg-gray-800 sm:w-auto sm:py-2"
                >
                    {shop.status === 'pending'
                        ? '심사하기'
                        : '상세보기'}
                </button>
            </div>
        </div>
    )
}
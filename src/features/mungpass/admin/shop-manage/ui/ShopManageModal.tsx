'use client'

import { format } from 'date-fns'
import {
    Check,
    Loader2,
    MapPin,
    Phone,
    Store,
    UserRound,
    X
} from 'lucide-react'

import { MAdminShop } from '../model'

interface ShopManageModalProps {
    shop: MAdminShop
    isPending: boolean
    onClose: () => void
    onApprove: () => void
    onReject: () => void
}

const statusMap = {
    pending: '심사중',
    approved: '입점완료',
    rejected: '반려'
} as const

export function ShopManageModal({
    shop,
    isPending,
    onClose,
    onApprove,
    onReject
}: ShopManageModalProps) {
    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 z-50000 flex items-center justify-center bg-black/70 p-4"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full  max-w-lg rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold text-orange-400">
                            입점 심사
                        </p>

                        <h2 className="mt-1 text-xl font-extrabold text-gray-100">
                            {shop.name}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-900 hover:text-gray-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl bg-gray-900/60 p-5">
                    <div className="flex items-start gap-3">
                        <Store className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

                        <div>
                            <p className="text-xs font-semibold text-gray-600">
                                매장명
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-300">
                                {shop.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

                        <div>
                            <p className="text-xs font-semibold text-gray-600">
                                신청자
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-300">
                                {shop.ownerName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

                        <div>
                            <p className="text-xs font-semibold text-gray-600">
                                주소
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-300">
                                {shop.roadAddressName || shop.addressName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />

                        <div>
                            <p className="text-xs font-semibold text-gray-600">
                                전화번호
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-300">
                                {shop.phone || '전화번호 없음'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-600">
                            신청일
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-300">
                            {format(
                                new Date(shop.createdAt),
                                'yyyy.MM.dd HH:mm'
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-600">
                            현재 상태
                        </p>

                        <p className="mt-1 text-sm font-bold text-gray-300">
                            {statusMap[shop.status]}
                        </p>
                    </div>
                </div>

                {shop.status === 'pending' && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={onReject}
                            disabled={isPending}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-extrabold text-red-400 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <X className="h-4 w-4" />
                            )}

                            반려
                        </button>

                        <button
                            type="button"
                            onClick={onApprove}
                            disabled={isPending}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Check className="h-4 w-4" />
                            )}

                            입점 승인
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
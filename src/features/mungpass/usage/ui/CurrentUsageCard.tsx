'use client'

import { format } from 'date-fns'
import { Clock3, Dog, LogOut } from 'lucide-react'

import { MOwnerUsageDetail } from '../model'

interface CurrentUsageCardProps {
    item: MOwnerUsageDetail
    onCheckout: (item: MOwnerUsageDetail) => void
}

export function CurrentUsageCard({ item, onCheckout }: CurrentUsageCardProps) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                        <Dog className="h-5 w-5 text-orange-400" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate font-extrabold text-gray-100">
                            {item.dog.name}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-gray-400">
                            {item.product.name}
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                    이용 중
                </span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-gray-400">
                <Clock3 className="h-4 w-4 text-gray-500" />
                <span>{format(new Date(item.started_at), 'HH:mm')}</span>
                <span className="text-gray-600">→</span>
                <span>{format(new Date(item.expected_ended_at), 'HH:mm')}</span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">
                <p className="text-sm font-extrabold text-gray-200">
                    {item.total_price.toLocaleString()}원
                </p>

                <button
                    type="button"
                    onClick={() => onCheckout(item)}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                    <LogOut className="h-4 w-4" />
                    체크아웃
                </button>
            </div>
        </div>
    )
}
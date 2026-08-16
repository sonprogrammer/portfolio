'use client'

import { format } from "date-fns"
import { Clock3, Dog, Inbox } from "lucide-react"
import { MOwnerUsageItem } from '@/features/mungpass/usage/model'

interface RealtimeUsageTableProps {
    items: MOwnerUsageItem[]
}


export function RealtimeUsageTable({ items }: RealtimeUsageTableProps) {
    return (
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-800 bg-gray-900/60 backdrop-blur-md shadow-xl text-gray-100">
            <div className="border-b border-gray-800 px-6 py-5 bg-gray-900/40">
                <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />

                    <h3 className="font-extrabold text-gray-100 tracking-tight text-sm sm:text-base">
                        현재 이용 현황
                    </h3>
                </div>

                <p className="mt-1 text-xs font-semibold text-gray-400">
                    체크인 상태가 실시간으로 반영됩니다.
                </p>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="w-12 h-12 bg-gray-800/80 border border-gray-700 rounded-2xl flex items-center justify-center shadow-md mb-3 text-gray-400">
                        <Inbox className="h-5 w-5" />
                    </div>

                    <p className="text-sm font-extrabold text-gray-200">
                        현재 이용 중인 반려견이 없습니다.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-800/60">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-4 px-6 py-4.5 transition-colors hover:bg-gray-800/30"
                        >
                            <div className="flex min-w-0 items-center gap-3.5">
                                <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-inner">
                                    <Dog className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-extrabold text-gray-100">
                                        {item.product?.name ?? '이용 상품'}
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-gray-400">
                                        반려견 이름: {item.dog.name}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 text-right">
                                <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-gray-400">
                                    <Clock3 className="h-3.5 w-3.5 text-gray-500" />

                                    <span>
                                        {format(
                                            new Date(item.started_at),
                                            'HH:mm'
                                        )}
                                    </span>

                                    <span className="text-gray-600">→</span>

                                    <span>
                                        {format(
                                            new Date(item.expected_ended_at),
                                            'HH:mm'
                                        )}
                                    </span>
                                </div>

                                <p className="mt-1 text-xs font-extrabold text-emerald-400">
                                    이용 중
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
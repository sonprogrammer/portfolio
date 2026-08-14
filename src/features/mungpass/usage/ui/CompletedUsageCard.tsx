import { format } from 'date-fns'
import { CalendarDays, Dog } from 'lucide-react'

import { MOwnerUsageDetail } from '../model'

interface CompletedUsageCardProps {
    item: MOwnerUsageDetail
}

export function CompletedUsageCard({ item }: CompletedUsageCardProps) {
    const basePrice = item.total_price - item.extra_charge

    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-800">
                        <Dog className="h-5 w-5 text-gray-400" />
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

                <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400">
                    이용 완료
                </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                <CalendarDays className="h-4 w-4" />

                <span>
                    {format(new Date(item.started_at), 'yyyy.MM.dd HH:mm')}
                </span>

                <span>→</span>

                <span>
                    {item.ended_at ? format(new Date(item.ended_at), 'HH:mm') : '-'}
                </span>
            </div>

            <div className="mt-5 space-y-2 border-t border-gray-800 pt-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">기본 요금</span>
                    <span className="font-semibold text-gray-300">
                        {basePrice.toLocaleString()}원
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-500">추가 요금</span>
                    <span className="font-semibold text-orange-400">
                        +{item.extra_charge.toLocaleString()}원
                    </span>
                </div>

                <div className="flex justify-between border-t border-gray-800 pt-2">
                    <span className="font-bold text-gray-300">최종 금액</span>
                    <span className="font-extrabold text-gray-100">
                        {item.total_price.toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    )
}
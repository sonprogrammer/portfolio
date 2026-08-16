import { CalendarDays, ReceiptText, TrendingUp, Users } from 'lucide-react'

import { MSalesSummary } from '../model'

interface SalesSummaryCardProps {
    summary: MSalesSummary
}

export function SalesSummaryCard({ summary }: SalesSummaryCardProps) {
    return (
        <div className="rounded-3xl border border-gray-800 bg-gray-950 p-6">
            <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-orange-400" />

                <p className="text-sm font-bold text-gray-400">
                    {summary.month} 매출
                </p>
            </div>

            <div className="mt-4">
                <p className="text-3xl font-black text-gray-100">
                    {summary.totalSales.toLocaleString()}
                    <span className="ml-1 text-lg text-gray-400">원</span>
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-900 p-4">
                    <Users className="h-4 w-4 text-gray-500" />

                    <p className="mt-3 text-xs font-bold text-gray-500">
                        총 이용
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-gray-200">
                        {summary.totalVisits}건
                    </p>
                </div>

                <div className="rounded-2xl bg-gray-900 p-4">
                    <ReceiptText className="h-4 w-4 text-gray-500" />

                    <p className="mt-3 text-xs font-bold text-gray-500">
                        평균 객단가
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-gray-200">
                        {summary.averageSalesPerVisit.toLocaleString()}원
                    </p>
                </div>

                <div className="col-span-2 rounded-2xl bg-gray-900 p-4 md:col-span-1">
                    <TrendingUp className="h-4 w-4 text-gray-500" />

                    <p className="mt-3 text-xs font-bold text-gray-500">
                        최고 매출일
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-gray-200">
                        {summary.topSalesDay
                            ? `${summary.topSalesDay.label} - ${summary.topSalesDay.sales.toLocaleString()}원`
                            : '-'}
                    </p>
                </div>
            </div>
        </div>
    )
}
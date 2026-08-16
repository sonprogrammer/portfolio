'use client'

import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { buildSalesSummary } from '@/features/mungpass/sales/lib/buildSalesSummary'
import { mockSalesSummary, useGetSalesData } from '@/features/mungpass/sales/model'
import {
    DailySalesChart,
    SalesInsightCard,
    SalesSummaryCard
} from '@/features/mungpass/sales/ui'
import { MOwnerShop } from '@/features/mungpass/shop/model/owner-types'

interface MownerChardProps {
    shop: MOwnerShop
}

export function MownerChart({ shop }: MownerChardProps) {
    const [showMockData, setShowMockData] = useState(false)
    const shopId = shop.id
    const shopStatus = shop.status

    const { data: salesData = [], isPending, isError } = useGetSalesData(shopId)


    const summary = useMemo(() => {
        return buildSalesSummary(salesData ?? [])
    }, [salesData])

    const displaySummary = showMockData ? mockSalesSummary : summary

    if (isPending) {
        return (
            <div className="flex h-72 items-center justify-center pt-3">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400 pt-3">
                매출 데이터를 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <div className="space-y-6 pt-3">
            <div>
                <h1 className="text-xl font-extrabold text-gray-100">
                    매출 분석
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-500">
                    완료된 이용 내역을 기반으로 매출 현황을 확인합니다.
                </p>
            </div>

            <SalesSummaryCard summary={displaySummary} />

            <div className="space-y-3">
                <div className="flex items-center justify-end gap-3">
                    {showMockData && (
                        <span className="rounded-full cursor-pointer bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                            테스트 데이터
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={() => setShowMockData(prev => !prev)}
                        className="rounded-xl cursor-pointer border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-bold text-gray-300 transition hover:bg-gray-800"
                    >
                        {showMockData ? '실제 데이터 보기' : '테스트 데이터 보기'}
                    </button>
                </div>

                <DailySalesChart
                    data={displaySummary.dailySales}
                />
            </div>

            <SalesInsightCard
                shopId={shopId}
                shopStatus={shopStatus}
                summary={displaySummary}
                isMockupMode={showMockData}
            />
        </div>
    )
}
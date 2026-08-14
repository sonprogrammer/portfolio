'use client'

import { MOwnerShop } from "@/features/mungpass/shop/model/owner-types"
import { useGetOwnerDashboardUsage, useOwnerUsageRealtime } from "@/features/mungpass/usage/model"
import { OwnerUsageStats, RealtimeUsageTable } from "@/features/mungpass/usage/ui"
import { Loader2 } from "lucide-react"



export function OwnerDashboard({shop} : {shop: MOwnerShop}) {

    const shopId = shop?.id ?? null

    const { data: usage, isPending: usagePending } = useGetOwnerDashboardUsage(shopId)
    useOwnerUsageRealtime(shopId)


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">
                    사장님 대시보드
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {shop.name}의 실시간 이용 현황입니다.
                </p>
                
            </div>

            {usagePending ? (
                <div className="flex h-40 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                </div>
            ) : (
                <>
                    <OwnerUsageStats
                        currentCount={usage?.currentCount ?? 0}
                        expectedSales={usage?.expectedSales ?? 0}
                    />

                    <RealtimeUsageTable
                        items={usage?.currentLogs ?? []}
                    />
                </>
            )}
        </div>
    )
}
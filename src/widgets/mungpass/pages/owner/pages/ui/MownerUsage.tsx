'use client'

import { MOwnerShop } from '@/features/mungpass/shop/model/owner-types'
import { useOwnerUsageRealtime } from '@/features/mungpass/usage/model'
import { OwnerUsageManager } from '@/features/mungpass/usage/ui/OwnerUsageManger'


interface MownerUsageProps {
    shop: MOwnerShop
}

export function MownerUsage({ shop }: MownerUsageProps) {
    const shopId = shop.id
    const shopStatus = shop.status
    useOwnerUsageRealtime(shopId)

    return (
        <OwnerUsageManager shopId={shopId} shopStatus={shopStatus} />
    )
}
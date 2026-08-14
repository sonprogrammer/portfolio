import { Store } from 'lucide-react'

import { MAdminShop } from '../model'

import { ShopManageCard } from './ShopManageCard'

interface ShopManageListProps {
    shops: MAdminShop[]
    onOpen: (shop: MAdminShop) => void
}

export function ShopManageList({
    shops,
    onOpen
}: ShopManageListProps) {
    if (shops.length === 0) {
        return (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-950">
                <Store className="h-7 w-7 text-gray-700" />

                <p className="mt-3 text-sm font-bold text-gray-500">
                    해당 상태의 매장이 없습니다.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {shops.map(shop => (
                <ShopManageCard
                    key={shop.id}
                    shop={shop}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}
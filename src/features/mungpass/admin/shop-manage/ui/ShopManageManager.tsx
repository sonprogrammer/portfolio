'use client'

import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import {
    MAdminShop,
    MShopManageStatusFilter,
    useGetAdminShops,
    useUpdateShopStatus
} from '../model'

import { ShopManageFilters } from './ShopManageFilters'
import { ShopManageList } from './ShopManageList'
import { ShopManageModal } from './ShopManageModal'
import { ModalPortal } from '@/shared/ui/modal'

export function ShopManageManager() {
    const [status, setStatus] = useState<MShopManageStatusFilter>('pending')
    const [selectedShop, setSelectedShop] = useState<MAdminShop | null>(null)

    const { data: shops = [], isPending, isError } = useGetAdminShops()
    const updateMutation = useUpdateShopStatus()

    const filteredShops = useMemo(() => {
        if (status === 'all') {
            return shops
        }

        return shops.filter(shop => {
            return shop.status === status
        })
    }, [shops, status])

    const counts = useMemo(() => {
        return {
            all: shops.length,

            pending: shops.filter(shop => {
                return shop.status === 'pending'
            }).length,

            approved: shops.filter(shop => {
                return shop.status === 'approved'
            }).length,

            rejected: shops.filter(shop => {
                return shop.status === 'rejected'
            }).length
        }
    }, [shops])

    const handleApprove = () => {
        if (!selectedShop) {
            return
        }

        updateMutation.mutate({
            shopId: selectedShop.id,
            status: 'approved'
        }, {
            onSuccess: () => {
                toast.success('입점이 승인되었습니다.')
                setSelectedShop(null)
            },

            onError: error => {
                toast.error(error.message)
            }
        })
    }

    const handleReject = () => {
        if (!selectedShop) {
            return
        }

        updateMutation.mutate({
            shopId: selectedShop.id,
            status: 'rejected'
        }, {
            onSuccess: () => {
                toast.success('입점 신청이 반려되었습니다.')
                setSelectedShop(null)
            },

            onError: error => {
                toast.error(error.message)
            }
        })
    }

    if (isPending) {
        return (
            <div className="flex h-72 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                매장 목록을 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <>
            <div className="space-y-5">
                <ShopManageFilters
                    status={status}
                    onChange={setStatus}
                    counts={counts}
                />

                <div className="flex items-center justify-between px-1">
                    <p className="text-sm font-bold text-gray-500">
                        매장 목록
                    </p>

                    <span className="text-xs font-bold text-gray-600">
                        {filteredShops.length.toLocaleString()}개
                    </span>
                </div>

                <ShopManageList
                    shops={filteredShops}
                    onOpen={setSelectedShop}
                />
            </div>

            {selectedShop && (
                <ModalPortal isOpen={true}>
                    <ShopManageModal
                        shop={selectedShop}
                        isPending={updateMutation.isPending}
                        onClose={() => setSelectedShop(null)}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                </ModalPortal>
            )}
        </>
    )
}
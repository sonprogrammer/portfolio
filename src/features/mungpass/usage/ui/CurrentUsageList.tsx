'use client'

import { useState } from 'react'
import { Inbox, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { MOwnerUsageDetail, useCheckoutUsage, useGetCurrentUsages } from '../model'
import { CheckoutConfirmModal } from './CheckoutConfirmModal'
import { CurrentUsageCard } from './CurrentUsageCard'
import { ModalPortal } from '@/shared/ui/modal'

interface CurrentUsageListProps {
    shopId: string
    shopStatus: 'pending' | 'approved' | 'rejected'
}

export function CurrentUsageList({ shopId, shopStatus }: CurrentUsageListProps) {
    const [checkModalOpen, setCheckModalOpen] = useState(false)
    const [selectedUsage, setSelectedUsage] = useState<MOwnerUsageDetail | null>(null)

    const { data: items = [], isPending, isError } = useGetCurrentUsages(shopId)
    const checkoutMutation = useCheckoutUsage()

    const handleCheckout = (item: MOwnerUsageDetail) => {
        if (shopStatus === 'pending') {
            toast.info('관리자 승인 후 기능을 이용할 수 있습니다.')
            return
        }

        if (shopStatus === 'rejected') {
            toast.info('매장 입점 신청이 거절되었습니다.')
            return
        }

        setSelectedUsage(item)
        setCheckModalOpen(true)
    }

    const handleClose = () => {
        if (checkoutMutation.isPending) return

        setCheckModalOpen(false)
        setSelectedUsage(null)
    }

    const handleConfirm = () => {
        if (!selectedUsage) return

        checkoutMutation.mutate({
            shopId,
            usageId: selectedUsage.id
        }, {
            onSuccess: result => {
                toast.success(`체크아웃 완료 · ${result.totalPrice.toLocaleString()}원`)
                setCheckModalOpen(false)
                setSelectedUsage(null)
            },
            onError: error => {
                toast.error(error.message)
            }
        })
    }

    if (isPending) {
        return (
            <div className="flex h-52 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-400">
                현재 이용 현황을 불러오지 못했습니다.
            </div>
        )
    }

    return (
        <>
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/60 py-16">
                    <Inbox className="h-7 w-7 text-gray-500" />

                    <p className="mt-3 text-sm font-extrabold text-gray-200">
                        현재 이용 중인 반려견이 없습니다.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {items.map(item => (
                        <CurrentUsageCard key={item.id} item={item} onCheckout={handleCheckout} />
                    ))}
                </div>
            )}

            {checkModalOpen && selectedUsage && (
                <ModalPortal isOpen={checkModalOpen}>
                    <CheckoutConfirmModal
                        item={selectedUsage}
                        isPending={checkoutMutation.isPending}
                        onClose={handleClose}
                        onConfirm={handleConfirm}
                    />
                </ModalPortal>
            )}
        </>
    )
}
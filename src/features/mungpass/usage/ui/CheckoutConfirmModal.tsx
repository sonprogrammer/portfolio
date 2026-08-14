'use client'

import { format } from 'date-fns'
import { Clock3, Loader2, LogOut, X } from 'lucide-react'

import { calculateCheckoutPrice } from '../lib/calculateCheckoutPrice'
import { MOwnerUsageDetail } from '../model'

interface CheckoutConfirmModalProps {
    item: MOwnerUsageDetail
    isPending: boolean
    onClose: () => void
    onConfirm: () => void
}

export function CheckoutConfirmModal({ item, isPending, onClose, onConfirm }: CheckoutConfirmModalProps) {
    const checkoutAt = new Date()
    const basePrice = item.total_price - item.extra_charge

    const preview = calculateCheckoutPrice({
        expectedEndedAt: item.expected_ended_at,
        checkoutAt,
        basePrice,
        gracePeriodMins: item.product.grace_period_mins,
        overtimeUnitMins: item.product.overtime_unit_mins,
        overtimeUnitPrice: item.product.overtime_unit_price
    })

    return (
        <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div 
                onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} disabled={isPending} className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-800">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                        <LogOut className="h-6 w-6" />
                    </div>

                    <h2 className="mt-4 text-lg font-extrabold text-gray-100">
                        {item.dog.name}을 체크아웃하시겠습니까?
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-gray-400">
                        {item.product.name}
                    </p>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl border border-gray-800 bg-gray-900/70 p-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">예상 종료</span>
                        <span className="font-bold text-gray-200">
                            {format(new Date(item.expected_ended_at), 'HH:mm')}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1.5 text-gray-400">
                            <Clock3 className="h-3.5 w-3.5" />
                            현재 시간
                        </span>
                        <span className="font-bold text-gray-200">
                            {format(checkoutAt, 'HH:mm')}
                        </span>
                    </div>

                    <div className="border-t border-gray-800 pt-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">기본 요금</span>
                            <span className="font-bold text-gray-200">
                                {basePrice.toLocaleString()}원
                            </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-400">예상 추가 요금</span>
                            <span className="font-bold text-orange-400">
                                +{preview.extraCharge.toLocaleString()}원
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
                            <span className="text-sm font-bold text-gray-300">최종 금액</span>
                            <span className="text-lg font-extrabold text-gray-100">
                                {preview.totalPrice.toLocaleString()}원
                            </span>
                        </div>
                    </div>
                </div>

                <p className="mt-3 text-center text-[11px] font-semibold text-gray-500">
                    최종 요금은 실제 체크아웃 시점을 기준으로 다시 계산됩니다.
                </p>

                <div className="mt-5 flex gap-3">
                    <button type="button" onClick={onClose} disabled={isPending} className="flex-1 rounded-xl border border-gray-700 px-4 py-3 text-sm font-bold text-gray-300 transition hover:bg-gray-800">
                        취소
                    </button>

                    <button type="button" onClick={onConfirm} disabled={isPending} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-50">
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        체크아웃
                    </button>
                </div>
            </div>
        </div>
    )
}
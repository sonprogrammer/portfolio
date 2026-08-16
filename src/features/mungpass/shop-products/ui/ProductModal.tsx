'use client'

import { FormEvent, useState } from 'react'
import { Loader2, Sparkles, X } from 'lucide-react'

import { MShopProduct, useCreateShopProduct, useGenerateAiProduct, useUpdateShopProduct } from '../model'
import { toast } from 'sonner'

interface ProductModalProps {
    shopId: string
    product: MShopProduct | null
    onClose: () => void
}

export function ProductModal({ shopId, product, onClose }: ProductModalProps) {
    const [name, setName] = useState(product?.name ?? '')
    const [price, setPrice] = useState(String(product?.price ?? ''))
    const [durationMinutes, setDurationMinutes] = useState(String(product?.duration_minutes ?? ''))
    const [overtimeUnitMins, setOvertimeUnitMins] = useState(String(product?.overtime_unit_mins ?? ''))
    const [overtimeUnitPrice, setOvertimeUnitPrice] = useState(String(product?.overtime_unit_price ?? ''))
    const [gracePeriodMins, setGracePeriodMins] = useState(String(product?.grace_period_mins ?? ''))
    const [isActive, setIsActive] = useState(product?.is_active ?? true)
    const [error, setError] = useState('')

    const createMutation = useCreateShopProduct()
    const updateMutation = useUpdateShopProduct()
    const generateMutation = useGenerateAiProduct()

    const isEdit = !!product
    const isPending = createMutation.isPending || updateMutation.isPending
    const isGenerating = generateMutation.isPending


    const handleGenerateAi = () => {
        setError('')

        generateMutation.mutate(undefined, {
            onSuccess: aiProduct => {
                setName(aiProduct.name)
                setPrice(String(aiProduct.price))
                setDurationMinutes(String(aiProduct.durationMinutes))
                setOvertimeUnitMins(String(aiProduct.overtimeUnitMins))
                setOvertimeUnitPrice(String(aiProduct.overtimeUnitPrice))
                setGracePeriodMins(String(aiProduct.gracePeriodMins))
                setIsActive(true)

                toast.success('AI가 상품 정보를 생성했습니다.')
            },
            onError: error => {
                toast.error('AI 상품 생성에 실패했습니다. 다시 시도 혹은 수동 입력 부탁드립니다.')
            }
        })
    }



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const values = {
            shopId,
            name,
            price: Number(price),
            durationMinutes: Number(durationMinutes),
            overtimeUnitMins: Number(overtimeUnitMins),
            overtimeUnitPrice: Number(overtimeUnitPrice),
            gracePeriodMins: Number(gracePeriodMins),
            isActive
        }

        if (isEdit) {
            updateMutation.mutate({
                ...values,
                productId: product.id
            }, {
                onSuccess: onClose,
                onError: error => setError(error.message)
            })

            return
        }

        createMutation.mutate(values, {
            onSuccess: onClose,
            onError: error => setError(error.message)
        })
    }

    return (
        <div className="fixed inset-0 z-50000 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray-800 bg-gray-950 p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-100">
                            {isEdit ? '상품 수정' : '상품 등록'}
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            매장에서 제공할 상품 정보를 입력해주세요.
                        </p>
                    </div>

                    <button type="button" onClick={onClose} className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-800 hover:text-gray-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">


                    <div>
                        <label className="mb-2 block text-xs font-bold text-gray-300">
                            상품명
                        </label>

                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="유치원 3시간"
                            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold text-gray-300">
                            가격
                        </label>

                        <input
                            type="number"
                            min="0"
                            placeholder="20,000"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-300">
                                기본 이용 시간
                            </label>

                            <input
                                type="number"
                                min="1"
                                placeholder='180'
                                value={durationMinutes}
                                onChange={e => setDurationMinutes(e.target.value)}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                            />

                            <p className="mt-1 text-[11px] text-gray-500">
                                분 단위
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-300">
                                초과 시간 단위
                            </label>

                            <input
                                type="number"
                                min="1"
                                placeholder='10'
                                value={overtimeUnitMins}
                                onChange={e => setOvertimeUnitMins(e.target.value)}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                            />

                            <p className="mt-1 text-[11px] text-gray-500">
                                분 단위
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-300">
                                초과 요금
                            </label>

                            <input
                                type="number"
                                min="0"
                                placeholder='1,000'
                                value={overtimeUnitPrice}
                                onChange={e => setOvertimeUnitPrice(e.target.value)}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold text-gray-300">
                                유예 시간
                            </label>

                            <input
                                type="number"
                                min="0"
                                placeholder='5'
                                value={gracePeriodMins}
                                onChange={e => setGracePeriodMins(e.target.value)}
                                className="w-full rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-orange-500"
                            />

                            <p className="mt-1 text-[11px] text-gray-500">
                                분 단위
                            </p>
                        </div>
                    </div>

                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
                        <div>
                            <p className="text-sm font-bold text-gray-200">
                                상품 활성화
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                                비활성화하면 회원이 상품을 선택할 수 없습니다.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={e => setIsActive(e.target.checked)}
                            className="h-4 w-4"
                        />
                    </label>

                    {error && (
                        <p className="text-sm font-semibold text-red-400">
                            {error}
                        </p>
                    )}

                    <div className="grid grid-cols-3 gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 cursor-pointer rounded-xl border border-gray-700 px-4 py-3  font-bold text-gray-300 transition hover:bg-gray-800"
                        >
                            취소
                        </button>

                        {!isEdit && (
                            <button
                                type="button"
                                onClick={handleGenerateAi}
                                disabled={isGenerating || isPending}
                                className="flex flex-1 cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10  py-3 text-sm font-extrabold text-violet-300 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        상품 생성 중...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        AI로 등록
                                    </>
                                )}
                            </button>
                        )}
                        

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                        >
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isEdit ? '수정하기' : '등록하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}